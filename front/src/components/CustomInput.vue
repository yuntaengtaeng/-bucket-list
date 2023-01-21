<template>
  <input :type="type" :value="value" @input="onChange" />
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "custom-input",
  props: {
    type: String,
    value: String,
  },
  emits: ["update:modelValue"],
  methods: {
    onChange(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit("update:modelValue", target.value);
    },
  },
});
</script>

<style scoped lang="scss">
input {
  font-size: 18px;
  padding: 8px;
  border-radius: 4px;
  border-color: #e5e7eb;
}
</style>
