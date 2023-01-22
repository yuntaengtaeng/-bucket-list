<template>
  <JoinForm />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import JoinForm from "@/components/JoinForm.vue";

export default defineComponent({
  name: "JoinView",
  components: {
    JoinForm,
  },
});
</script>

<style scoped lang="scss"></style>
