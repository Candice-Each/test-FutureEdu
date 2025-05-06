<template>
  <main class="site-content">
    <!-- 响应式导航栏 -->
    <NavBar @search="handleSearch" />

    <!-- 轮播图组件 -->
    <Gallery :items="galleryItems" />

    <div class="container">
      <div class="mainheading">
        <h1 class="sitetitle">未来教育</h1>
        <p class="lead">{{ description }}</p>
      </div>

      <!-- 搜索状态提示 -->
      <transition name="fade">
        <div v-if="searchQuery" class="alert alert-info mb-4">
          当前搜索关键词："{{ searchQuery }}"，找到 {{ displayedArticles.length }} 条结果
        </div>
      </transition>

      <!-- 文章列表 -->
      <section class="recent-posts">
        <div class="section-title">
          <h2><span>{{ currentCategory }}</span></h2>
        </div>

        <transition-group name="staggered-fade" tag="div" class="row listrecent">
          <ArticleCard
            v-for="article in displayedArticles"
            :key="article.id"
            :article="article"
            :search-query="searchQuery"
            v-lazyload
          />
        </transition-group>

        <!-- 无结果提示 -->
        <div v-if="displayedArticles.length === 0" class="text-center py-5">
          <h3>未找到相关结果</h3>
          <button class="btn btn-link" @click="resetSearch">清除搜索条件</button>
        </div>
      </section>

      <!-- 分页组件（仅在非搜索状态显示） -->
      <Pagination
        v-if="!searchQuery"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-changed="handlePageChange"
      />
    </div>
  </main>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import lunr from 'lunr'
import NavBar from '@/components/NavBar'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import Gallery from '@/components/Gallery'

export default {
  components: {
    NavBar,
    ArticleCard,
    Pagination,
    Gallery
  },
  
  setup() {
    const description = ref('探索未来教育新模式')
    const currentPage = ref(1)
    const totalPages = ref(2)
    const searchQuery = ref('')
    const filteredArticles = ref(null)
    const searchIndex = ref(null)

    // 文章数据
    const articles = ref([
      {
        id: 1,
        title: '创新教育模式',
        description: '探讨人工智能在教育领域的应用与发展趋势',
        image: 'image_0.jpg',
        link: '/detail/1',
        category: '教育科技',
        date: '2023-08-20'
      },
      // 更多文章...
    ])

    // 轮播图数据
    const galleryItems = ref([
      { image: 'featured-1.jpg' },
      { image: 'featured-2.jpg' },
      { image: 'featured-3.jpg' }
    ])

    // 初始化搜索引擎
    const initSearchEngine = () => {
      searchIndex.value = lunr(function() {
        this.ref('id')
        this.field('title', { boost: 10 })
        this.field('description', { boost: 5 })
        this.field('category')

        articles.value.forEach(article => {
          this.add({
            id: article.id,
            title: article.title,
            description: article.description,
            category: article.category
          })
        })
      })
    }

    // 搜索处理
    const handleSearch = (query) => {
      const cleanQuery = query.trim()
      searchQuery.value = cleanQuery
      
      if (cleanQuery.length > 1) {
        try {
          const searchTerms = cleanQuery.split(/\s+/)
          const queryString = searchTerms.map(term => `*${term}*`).join(' ')
          const results = searchIndex.value.search(queryString)
          
          filteredArticles.value = results.map(result => 
            articles.value.find(article => article.id === parseInt(result.ref))
          ).filter(Boolean)
        } catch (error) {
          console.error('搜索出错:', error)
          filteredArticles.value = []
        }
      } else {
        resetSearch()
      }
    }

    // 重置搜索
    const resetSearch = () => {
      searchQuery.value = ''
      filteredArticles.value = null
    }

    // 计算属性
    const displayedArticles = computed(() => 
      filteredArticles.value || articles.value
    )

    const currentCategory = computed(() => 
      searchQuery.value ? '搜索结果' : '最新文章'
    )

    // 生命周期钩子
    onMounted(() => {
      initSearchEngine()
    })

    return {
      description,
      currentPage,
      totalPages,
      searchQuery,
      displayedArticles,
      currentCategory,
      galleryItems,
      handleSearch,
      resetSearch,
      handlePageChange: (page) => {
        currentPage.value = page
        // 加载页面数据的逻辑...
      }
    }
  }
}
</script>

<style scoped>
/* 淡入淡出过渡 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 交错列表动画 */
.staggered-fade-move {
  transition: transform 0.5s ease;
}
.staggered-fade-enter-active {
  transition: all 0.3s ease 0.1s;
}
.staggered-fade-leave-active {
  transition: all 0.3s ease;
}
.staggered-fade-enter-from,
.staggered-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .mainheading {
    text-align: center;
  }
  
  .listrecent {
    margin: 0 -10px;
  }
}

/* 深度选择器 */
::v-deep .bootstrap-component {
  .dropdown-menu {
    border-radius: 0.5rem;
  }
}

.alert-info {
  background-color: #e3f2fd;
  border-color: #bbdefb;
  color: #0d47a1;
}

.btn-link {
  color: #1976d2;
}
.btn-link:hover {
  text-decoration: underline;
}
</style>