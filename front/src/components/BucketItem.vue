<template>
  <div class="item">
    <div class="top">
      <div class="left">
        <input
          type="checkbox"
          @change.stop="onChangeHandler"
          :checked="data?.isChecked"
        />
        <div>{{ data?.title }}</div>
      </div>
      <div class="right" @click.prevent="onDelete">❌</div>
    </div>
    <div class="bottom" :class="{ isChecked: data?.isChecked }">
      {{ data?.context }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BucketData } from "@/types/service";

export default defineComponent({
  name: "bucket-item",
  props: {
    data: {
      type: Object as PropType<BucketData>,
    },
  },
  methods: {
    onChangeHandler() {
      this.$emit("onCheckboxHandler", this.data?.id);
    },
    onDelete() {
      this.$emit("onDeleteHandler", this.data?.id);
    },
  },
});
</script>

<style scoped lang="scss">
.item {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  padding: 16px;

  .top {
    display: flex;
    align-items: center;

    .left {
      display: flex;
      align-items: center;
      flex: 1;
      font-weight: bold;

      input {
        width: 20px;
        height: 20px;
        margin-right: 16px;
      }
    }

    .right {
      margin-left: 16px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #e5e7eb;
      text-align: center;
      line-height: 24px;
      font-size: 12px;
    }
  }
  .bottom {
    font-size: 14px;
  }

  .bottom.isChecked {
    text-decoration: line-through;
  }
}
</style>
