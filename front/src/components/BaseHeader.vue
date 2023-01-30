<template>
  <header>
    <span @click="homeClickHandler">📃bucket</span>
    <router-link to="/login" v-if="!IsLoggedIn">로그인</router-link>
    <div v-else class="right">
      <div>{{ nickname }}</div>
      <div @click="logoutHandler">로그아웃</div>
    </div>
  </header>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "base-header",
  computed: {
    IsLoggedIn() {
      return this.$store.getters.getIsLoggedIn;
    },
    nickname() {
      return this.$store.getters.getNickname;
    },
  },
  methods: {
    logoutHandler() {
      this.$store.commit("initData");
    },
    homeClickHandler() {
      this.$router.push("/");
    },
  },
});
</script>

<style scoped lang="scss">
header {
  min-height: 56px;
  width: 100%;
  padding: 0px 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 0 0 rgb(0 0 0 / 10%);

  position: sticky;
  background-color: #fff;
  top: 0;
  z-index: 1;

  span {
    font-weight: bold;
    font-size: 26px;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  .right {
    display: flex;
    align-items: center;

    > div:first-child {
      margin-right: 16px;
    }
  }
}
</style>
