<template>
  <div class="wrap">
    <div class="loader"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "loading-component",
});
</script>

<style scoped lang="scss">
// variables
$size: 60px !default;
$thickness: 6px !default;
$base-color: #fff !default;
$wheel-color: #8c8cf8 !default;
$speed: 800ms !default;

// styles
.wrap {
  /* background-color: #fff; */
  position: fixed;
  /* opacity: 0.8; */
  background-color: rgba(255, 255, 255, 0.5);
  width: 100vw;
  height: 100vh;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader {
  height: $size;
  width: $size;
  border: $thickness solid $base-color;
  border: {
    right-color: $wheel-color;
    top-color: $wheel-color;
    radius: 100%;
  }
  animation: spin $speed infinite linear;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}
</style>
