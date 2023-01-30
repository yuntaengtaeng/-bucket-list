<template>
  <form @submit.prevent="onSubmit">
    <select v-model="categoryID">
      <option v-for="item in categorys" :key="item.id" :value="item.id">
        {{ `${item.icon} ${item.name}` }}
      </option>
    </select>
    <CustomInput type="text" :value="title" v-model="title" />
    <textarea v-model="context"></textarea>
    <CustomButton :disabled="!categoryID || !context || !title"
      >추가</CustomButton
    >
  </form>
</template>
<script lang="ts">
import { defineComponent, PropType, Ref, toRefs, watch } from "vue";
import CustomButton from "./CustomButton.vue";
import CustomInput from "./CustomInput.vue";
import { BucketData, CategoryList, ErrorData } from "../types/service";
import { AxiosError } from "axios";

export default defineComponent({
  name: "edit-form",
  components: {
    CustomButton,
    CustomInput,
  },
  async created() {
    try {
      const { data } = await this.$axios.get("/api/category");
      const categoryList: CategoryList[] = data.categoryList;
      console.log(categoryList);
      this.categorys = categoryList;
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse?.status === 400) {
        const data = errorResponse.data as ErrorData;
        alert(data.message);
      }
    }
  },
  props: {
    saved: Object as PropType<BucketData>,
  },
  data: () => ({
    categorys: [] as CategoryList[],
    categoryID: "",
    context: "",
    title: "",
  }),
  methods: {
    onSubmit() {
      this.$emit("onSubmitHandler", {
        title: this.title,
        categoryID: this.categoryID,
        context: this.context,
      });
    },
  },
  watch: {
    saved: {
      deep: true,
      immediate: true,
      handler(data: BucketData) {
        this.title = data.title;
        this.categoryID = data.categoryID;
        this.context = data.context;
      },
    },
  },
});
</script>

<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 16px auto;
}

select {
  height: 40px;
  margin-bottom: 16px;
  border: 1px solid #e5e7eb;
  background-color: #fff;
}

input {
  margin-bottom: 16px;
}

textarea {
  height: 300px;
  resize: none;
  margin-bottom: 16px;
  border-color: #e5e7eb;
}
</style>
