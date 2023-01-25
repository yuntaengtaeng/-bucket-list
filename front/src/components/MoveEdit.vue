<template>
  <div class="wrap box" @click="moveEdit">
    <div class="box inner">
      버킷리스트를 작성해보세요!
      <i>📝</i>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "custom-input",
  methods: {
    moveEdit() {
      this.$router.push("/edit");
    },
  },
});
</script>

<style scoped lang="scss">
.box {
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}

.inner {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
