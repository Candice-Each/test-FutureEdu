<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white fixed-top mediumnavigation nav-down">
    <div class="container pr-0">
      <router-link class="navbar-brand" to="/">
        <img src="../assets/images/logo.png" alt="AAA">
      </router-link>

      <button class="navbar-toggler" type="button" @click="toggleMenu">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div :class="['collapse navbar-collapse', { 'show': menuOpen }]" id="navbarMediumish">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" :class="{ 'active': $route.path === '/' }">
            <router-link class="nav-link" to="/">HOME</router-link>
          </li>
          <li class="nav-item" :class="{ 'active': $route.path === '/detail' }">
            <router-link class="nav-link" to="/detail">Details</router-link>
          </li>
          <li class="nav-item" :class="{ 'active': $route.path === '/about' }">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
          <li class="nav-item">
            <form class="bd-search" @submit.prevent="handleSearch">
              <input type="text" class="form-control text-small launch-modal-search" 
                     v-model="searchQuery"
                     placeholder="Type and enter...">
            </form>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
      searchQuery: ''
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    },
    handleSearch() {
      // 实现搜索逻辑
      this.$emit('search', this.searchQuery)
    }
  }
}
</script>