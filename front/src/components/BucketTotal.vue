<template>
  <div>
    <h1>{{ total }}</h1>
    <p>버킷리스트 총합</p>
    <div class="statistics">
      <div>
        <span class="completed">{{ remaining }}</span>
        <span>진행</span>
      </div>
      <div>
        <span class="remaining">{{ completed }}</span>
        <span>완료</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "bucket-total",
  props: {
    total: Number,
    completed: Number,
    remaining: Number,
  },
});
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  margin: 12px 0px;
}

p {
  font-size: 20px;
  text-align: center;
  margin: 12px 0px;
}

.statistics {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;

  > div {
    padding: 8px 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e7eb;
    margin: 4px;
  }
}

.completed,
.remaining {
  font-weight: 700;
  font-size: 30px;
  margin-right: 16px;
}

.completed {
  color: #f87171;
}

.remaining {
  color: #34d399;
}
</style>
