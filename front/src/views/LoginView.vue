<template>
  <LoginForm />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "@/components/LoginForm.vue";

export default defineComponent({
  name: "LoginView",
  components: {
    LoginForm,
  },
});
</script>

<style scoped lang="scss"></style>
