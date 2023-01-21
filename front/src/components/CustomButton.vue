<template>
  <button>
    <slot></slot>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "custom-button",
});
</script>

<style scoped lang="scss">
button {
  color: white;
  font-weight: 600;
  font-size: 20px;
  padding: 8px 24px;
  border-radius: 4px;
  background-color: #8c8cf8;
  border: none;

  &:disabled {
    opacity: 0.8;
  }
}
</style>
