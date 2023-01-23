<template>
  <div
    class="category"
    :class="{ selected: isSelected }"
    :style="{ 'background-color': backgroundColor }"
  >
    <div>{{ icon }}</div>
    <div>{{ title }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "category-item",
  props: {
    icon: String,
    title: String,
    backgroundColor: String,
    isSelected: Boolean,
  },
});
</script>

<style scoped lang="scss">
.category {
  width: 80px;
  padding: 8px;
  margin: 8px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  cursor: pointer;
  opacity: 0.4;
}

.category.selected {
  opacity: 1;
}
</style>
