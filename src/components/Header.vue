<script>

import {store} from '../data/store'

export default {
  name: "Header",
  created() {},
  data() {
    return {
      store
    };
  },
  props: {},
  methods: {},
};
</script>

<template>
  <header>
    <div class="container h-100  d-flex align-items-center justify-content-between">
      <div class="logo">
        <img src="../assets/logo.png" alt="logo">
      </div>
      <div class="search-bar ">
        <input type="text" placeholder="Cerca">
      </div>
      <div class="user-menu d-flex ">
          <div class="favorites">
            <i class="fa-regular fa-heart"></i>
          </div>
          <div class="dashboard">
            <i class="fa-solid fa-house-chimney"></i>
          </div>
          <div class="profile">
            <img :src="store.currentUserImg" alt="">
          </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>

.container {
  .logo {
    width: 150px;
    cursor: pointer;
  }
  .user-menu {
    align-items: center;
    font-size: 1.5rem;
    .favorites,
    .dashboard,
    .profile{
      margin-left: 20px;
      cursor: pointer;
    }
    .profile {
      width: 60px;
      height: 60px;
      border: 1px solid var(--border-color);
      border-radius: 50%;
      overflow: hidden;
    }
  }
}
</style>