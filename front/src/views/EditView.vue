<template>
  <EditForm @onSubmitHandler="onSubmitHandler" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EditForm from "@/components/EditForm.vue";
import { BucketData, ErrorData } from "@/types/service";
import { AxiosError } from "axios";

export default defineComponent({
  name: "EditView",
  components: {
    EditForm,
  },
  methods: {
    async onSubmitHandler(body: BucketData) {
      try {
        const { data } = await this.$axios.post("api/main/bucklist", body);
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
