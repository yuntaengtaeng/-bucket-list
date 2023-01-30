<template>
  <template v-if="JSON.stringify(saved) !== '{}'">
    <EditForm @onSubmitHandler="onSubmitHandler" :saved="saved" />
  </template>
</template>

<script lang="ts">
import { ErrorData } from "@/types/service";
import { AxiosError } from "axios";
import { defineComponent } from "vue";
import EditForm from "@/components/EditForm.vue";
import { BucketData } from "@/types/service";
export default defineComponent({
  name: "DetailView",
  components: {
    EditForm,
  },
  data: () => ({
    saved: {} as BucketData,
  }),
  computed: {
    paramsId() {
      return this.$route.params.id;
    },
  },
  async created() {
    try {
      const {
        data: { bucklistInfo },
      } = await this.$axios.get(`api/main/bucklist/detail/${this.paramsId}`);
      const { isChecked, ...saved } = bucklistInfo;
      console.log(saved);
      this.saved = { ...saved };
    } catch (error) {
      const errorResponse = (error as AxiosError).response;
      if (errorResponse?.status === 400) {
        const data = errorResponse.data as ErrorData;
        alert(data.message);
      }
    }
  },
  methods: {
    async onSubmitHandler(body: BucketData) {
      console.log(body);
      try {
        await this.$axios.patch(
          `api/main/bucklist/patch/${this.paramsId}`,
          body
        );
        this.$router.back();
      } catch (error) {
        const errorResponse = (error as AxiosError).response;
        if (errorResponse?.status === 400) {
          const data = errorResponse.data as ErrorData;
          alert(data.message);
        }
      }
    },
  },
});
</script>

<style scoped lang="scss"></style>
