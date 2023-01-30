<template>
  <div>
    상단의 작성 버튼을 이용해<br />
    버킷리스트를 작성해보세요!
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "guidance-component",
});
</script>

<style scoped lang="scss">
div {
  text-align: center;
  font-weight: bold;
  margin: 24px 0px;
}
</style>
