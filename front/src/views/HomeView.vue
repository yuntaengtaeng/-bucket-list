<template>
  <div>
    <div class="category-items">
      <CategoryItem
        v-for="(item, i) in categorys"
        :key="item.id"
        :title="item.name"
        :icon="item.icon"
        :backgroundColor="backgroundPalette[i]"
        :isSelected="item.id === selectedCategoryId"
        @click="onCategoryClickHandler(item.id)"
      />
    </div>
    <BucketTotal
      :total="count.total"
      :completed="count.checked"
      :remaining="count.notChecked"
    />
    <div>
      <MoveEdit />
    </div>
    <div>
      <template v-if="bucketList.length">
        <BucketItem
          v-for="item in bucketList"
          :key="item.id"
          :data="item"
          @click.stop="(event) => onBucketItemClickHandler(event, item.id)"
          @onDeleteHandler="onDeleteHandler"
          @onCheckboxHandler="onCheckboxHandler"
        />
      </template>
      <template v-else>
        <Guidance />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";

import { CategoryList, ErrorData, BucketData, Count } from "@/types/service";

import CategoryItem from "@/components/CategoryItem.vue";
import MoveEdit from "@/components/MoveEdit.vue";
import BucketItem from "@/components/BucketItem.vue";
import BucketTotal from "@/components/BucketTotal.vue";
import Guidance from "@/components/Guidance.vue";
import { AxiosError } from "axios";
import { useStore } from "vuex";

export default defineComponent({
  name: "HomeView",
  components: {
    CategoryItem,
    MoveEdit,
    BucketItem,
    BucketTotal,
    Guidance,
  },

  setup() {
    const store = useStore();
    const accessToken = computed(
      () => store.getters["userState/getAccessToken"]
    );

    return { accessToken };
  },
  data: () => ({
    selectedCategoryId: "" as string,
    backgroundPalette: [
      "#fef3c7",
      "#fce7f3",
      "#fee2e2",
      "#e0e7ff",
      "#d1fae5",
      "#ede9fe",
    ] as string[],
    categorys: [] as CategoryList[],
    bucketList: [] as BucketData[],
    count: { total: 0, notChecked: 0, checked: 0 } as Count,
  }),
  methods: {
    onCategoryClickHandler(id: string) {
      this.selectedCategoryId = id;
    },
    onBucketItemClickHandler(event: Event, id: string) {
      const target = event.target as Element;

      if (target.tagName === "INPUT" || target.className === "right") {
        return;
      }

      this.$router.push(`/detail/${id}`);
    },
    async processAfterRequestFromServer({
      url,
      method,
    }: {
      url: string;
      method: string;
    }) {
      try {
        const {
          data: { data },
        } = await this.$axios({
          url,
          method,
        });

        const bucklist: BucketData[] = data.bucketlist;
        const count: Count = data.count;
        this.bucketList = bucklist;
        this.count = count;
      } catch (error) {
        const errorResponse = (error as AxiosError).response;
        if (errorResponse?.status === 400) {
          const data = errorResponse.data as ErrorData;
          alert(data.message);
        }
      }
    },
    async requestBucketList() {
      const accessToken = this.accessToken;
      if (!accessToken) {
        return;
      }
      this.processAfterRequestFromServer({
        url: `/api/main/bucklist/${this.selectedCategoryId}`,
        method: "get",
      });
    },
    async onCheckboxHandler(id: string) {
      this.processAfterRequestFromServer({
        url: `/api/main/bucklist/checked/${id}`,
        method: "patch",
      });
    },
    async requestCategoryList() {
      try {
        const { data } = await this.$axios.get("/api/category");
        const categoryList: CategoryList[] = data.categoryList;
        this.categorys = categoryList;
      } catch (error) {
        const errorResponse = (error as AxiosError).response;
        if (errorResponse?.status === 400) {
          const data = errorResponse.data as ErrorData;
          alert(data.message);
        }
      }
    },
    async onDeleteHandler(id: string) {
      this.processAfterRequestFromServer({
        url: `/api/main/bucklist/deleted/${id}`,
        method: "delete",
      });
    },
  },
  watch: {
    selectedCategoryId: "requestBucketList",
  },
  created() {
    this.requestCategoryList();
  },
});
</script>

<style scoped lang="scss">
.category-items {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
