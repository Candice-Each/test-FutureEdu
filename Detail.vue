<template>
    <div class="site-content">
      <div class="container">
        <div class="mainheading">
          <h1 class="sitetitle">AAA</h1>
          <p class="lead">aaa</p>
        </div>
        
        <div class="main-content">
          <div class="row listrecent">
            <div class="col-lg-4 col-md-6 mb-30px card-group" v-for="(item, index) in items" :key="index">
              <ContentCard :item="item" />
            </div>
            
            <h1 style="display: flex; justify-content: center; width: 100%">-repeat-</h1>
            <br><br><br>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ContentCard from '@/components/ContentCard.vue'
  
  export default {
    components: {
      ContentCard
    },
    data() {
      return {
        items: [
          {
            title: "BBB",
            description: "bbb",
            date: "b",
            image: "image_1.jpg",
            link: "/BBB/"
          }
        ]
      }
    }
  }
  </script>