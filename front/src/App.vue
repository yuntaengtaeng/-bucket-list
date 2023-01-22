<template>
  <div class="wrap">
    <div class="margin"></div>
    <div class="container">
      <BaseHeader />
      <router-view />
    </div>
    <div class="margin"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseHeader from "./components/BaseHeader.vue";

export default defineComponent({
  name: "App",
  components: {
    BaseHeader,
  },
});
</script>

<style lang="scss">
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  box-sizing: border-box;
}

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

body {
  margin: 0;
}

.wrap {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.container {
  display: flex;
  width: 100%;
  flex-direction: column;
  overflow: scroll;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }

  @media (min-width: 576px) {
    max-width: 500px;
  }
}

.margin {
  width: auto;
  flex-grow: 1;
  background-color: #f2f4f7;
}
</style>
