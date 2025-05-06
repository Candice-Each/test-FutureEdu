<template>
    <div id="app">
      <NavBar />
      <router-view />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js"></script>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue'
  
  export default {
    components: {
      NavBar
    }
  }
  </script>
  
  <style>
  /* Global styles can go here */
  </style>