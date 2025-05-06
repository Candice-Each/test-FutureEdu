<template>
  <div class="site-content">
    <!-- 导航栏组件 -->
    <NavBar @search="handleSearch" />

    <div class="container">
      <div class="mainheading">
        <h1 class="sitetitle">未来教育</h1>
        <p class="lead">{{ description }}</p>
      </div>

      <!-- 搜索状态提示 -->
      <div v-if="searchQuery" class="alert alert-info mb-4">
        当前搜索关键词："{{ searchQuery }}"，找到 {{ displayedArticles.length }} 条结果
      </div>

      <!-- 文章列表 -->
      <section class="recent-posts">
        <div class="section-title">
          <h2><span>{{ currentCategory }}</span></h2>
        </div>

        <div class="row listrecent">
          <ArticleItem 
            v-for="(article, index) in displayedArticles"
            :key="article.id"
            :article="article"
            :search-query="searchQuery"
          />
        </div>

        <!-- 无结果提示 -->
        <div v-if="displayedArticles.length === 0" class="text-center py-5">
          <h3>未找到相关结果</h3>
          <button class="btn btn-link" @click="resetSearch">清除搜索条件</button>
        </div>
      </section>

      <!-- 分页组件 -->
      <Pagination 
        v-if="!filteredArticles"
        :current-page="currentPage"
        :total-pages="totalPages"
        @page-changed="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import lunr from 'lunr'
import NavBar from '@/components/NavBar'
import ArticleItem from '@/components/ArticleItem'
import Pagination from '@/components/Pagination'

export default {
  name: 'Home',
  components: {
    NavBar,
    ArticleItem,
    Pagination
  },
  data() {
    return {
      description: '探索未来教育新模式',
      currentPage: 1,
      totalPages: 2,
      searchQuery: '',
      filteredArticles: null,
      searchIndex: null,
      articles: [
        {
          id: 1,
          title: '创新教育模式',
          description: '探讨人工智能在教育领域的应用与发展趋势',
          image: require('@/assets/images/image_0.jpg'),
          link: '/detail/1',
          category: '教育科技',
          date: '2023-08-20'
        },
        {
          id: 2,
          title: '在线学习平台',
          description: '分析最新在线教育平台的架构设计与用户体验优化',
          image: require('@/assets/images/image_1.jpg'),
          link: '/detail/2',
          category: '在线教育',
          date: '2023-08-19'
        }
        // 可添加更多文章...
      ]
    }
  },
  computed: {
    displayedArticles() {
      return this.filteredArticles || this.articles
    },
    currentCategory() {
      return this.filteredArticles ? '搜索结果' : '最新文章'
    }
  },
  mounted() {
    this.initSearchEngine()
  },
  methods: {
    initSearchEngine() {
      // 初始化Lunr搜索引擎
      this.searchIndex = lunr(function() {
        this.ref('id')
        this.field('title', { boost: 10 })
        this.field('description', { boost: 5 })
        this.field('category')

        this.articles.forEach(article => {
          this.add({
            id: article.id,
            title: article.title,
            description: article.description,
            category: article.category
          })
        })
      })
    },

    handleSearch(query) {
      this.searchQuery = query.trim()
      if (this.searchQuery.length > 1) {
        try {
          const results = this.searchIndex.search(`*${this.searchQuery}*`)
          this.filteredArticles = results.map(result => 
            this.articles.find(article => article.id === parseInt(result.ref))
          )
        } catch (error) {
          console.error('搜索出错:', error)
          this.filteredArticles = []
        }
      } else {
        this.resetSearch()
      }
    },

    resetSearch() {
      this.searchQuery = ''
      this.filteredArticles = null
    },

    handlePageChange(page) {
      this.currentPage = page
      // 这里可以添加加载新页面数据的逻辑
      console.log('切换到页面:', page)
      // 示例：this.loadPageData(page)
    },

    async loadPageData(page) {
      // 异步加载数据的示例方法
      try {
        // const response = await fetch(`/api/articles?page=${page}`)
        // const data = await response.json()
        // this.articles = data.articles
        // this.totalPages = data.totalPages
      } catch (error) {
        console.error('加载数据失败:', error)
      }
    }
  }
}
</script>

<style scoped>
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