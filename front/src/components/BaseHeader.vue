<template>
  <header>
    <span>📃bucket</span>
    <router-link to="/login">로그인</router-link>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "base-header",
});
</script>

<style scoped lang="scss">
header {
  min-height: 56px;
  width: 100%;
  padding: 0px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 0 0 rgb(0 0 0 / 10%);

  position: sticky;
  background-color: #fff;
  top: 0;
  z-index: 1;

  span {
    font-weight: bold;
    font-size: 26px;
  }
}
</style>
