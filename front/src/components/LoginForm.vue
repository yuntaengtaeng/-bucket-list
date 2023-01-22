<template>
  <form @submit.prevent="onsubmit">
    <h2>Bucket Login</h2>
    <CustomInput type="text" :value="id" v-model="id" placeholder="ID" />
    <CustomInput
      type="password"
      :value="password"
      v-model="password"
      placeholder="PASSWORD"
    />
    <CustomButton disabled="true">로그인</CustomButton>
    <p @click="moveJoin">회원가입</p>
  </form>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import CustomButton from "./CustomButton.vue";
import CustomInput from "./CustomInput.vue";

export default defineComponent({
  name: "login-form",
  components: {
    CustomButton,
    CustomInput,
  },
  data: () => ({
    id: "",
    password: "",
  }),
  methods: {
    onsubmit() {
      console.log(this.id);
      console.log(this.password);
    },
    moveJoin() {
      this.$router.push("/join");
    },
  },
});
</script>

<style scoped lang="scss">
form {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 12px;
  }

  p {
    font-size: 14px;
    color: #999999;
    text-align: center;
  }
}

h2 {
  text-align: center;
}
</style>
