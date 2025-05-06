<!-- src/components/Gallery.vue -->
<template>
    <div class="gallery-container">
      <div class="gallery-wrap">
        <div 
          v-for="(item, index) in items" 
          :key="index"
          :class="['item', `item-${index + 1}`]"
          :style="{ backgroundImage: `url(${getImageUrl(item.image)})` }"
          @mouseover="hoverIndex = index"
          @mouseleave="hoverIndex = -1"
        ></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      items: {
        type: Array,
        default: () => [
          { image: 'image_0.jpg' },
          { image: 'image_1.jpg' },
          { image: 'image_2.jpg' },
          { image: 'image_3.jpg' }
        ]
      }
    },
    data() {
      return {
        hoverIndex: -1
      }
    },
    methods: {
      getImageUrl(name) {
        return require(`@/assets/images/${name}`)
      }
    }
  }
  </script>
  
  <style scoped>
  /* 基础样式 */
  .gallery-container {
    padding: 5px 0;
    margin: 0 auto;
    width: 90%;
  }
  
  .gallery-wrap {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 70vh;
  }
  
  .item {
    flex: 1;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    transition: flex 0.8s ease-out;
    cursor: pointer;
  }
  
  .item:hover {
    flex: 10;
  }
  
  /* 响应式适配 */
  @media (max-width: 768px) {
    .gallery-wrap {
      height: 50vh;
      flex-direction: column;
    }
    
    .item {
      width: 100%;
      height: auto;
      flex: 1 0 25%;
    }
  }
  
  @media (min-width: 1500px) {
    .gallery-container {
      max-width: 80%;
    }
  }
  </style>