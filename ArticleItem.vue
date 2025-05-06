<template>
  <div class="col-md-6 mb-30px">
    <div class="listfeaturedtag h-100">
      <div class="row h-100">
        <div class="col-12 col-md-12 col-lg-5 pr-lg-0">
          <div class="h-100 wrapthumbnail">
            <router-link :to="article.link">
              <img 
                class="featured-box-img-cover"
                :src="article.image" 
                :alt="article.title"
              >
            </router-link>
          </div>
        </div>
        <div class="col-12 col-md-12 col-lg-7">
          <div class="h-100 card-group">
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">
                  <router-link 
                    class="text-dark" 
                    :to="article.link"
                    v-html="highlightTitle"
                  ></router-link>
                </h2>
                <h4 class="card-text" v-html="highlightDescription"></h4>
                <div class="article-meta">
                  <span class="category-badge">{{ article.category }}</span>
                  <span class="publish-date">{{ formattedDate }}</span>
                </div>
              </div>
              <div class="card-footer b-0 bg-white mt-auto">
                <div class="wrapfooter">
                  <router-link 
                    :to="article.link" 
                    class="post-read-more"
                  >
                    阅读全文
                    <svg class="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                      <path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fill-rule="evenodd"></path>
                    </svg>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true
    },
    searchQuery: {
      type: String,
      default: ''
    }
  },
  computed: {
    formattedDate() {
      return new Date(this.article.date).toLocaleDateString()
    },
    highlightTitle() {
      return this.highlightText(this.article.title)
    },
    highlightDescription() {
      return this.highlightText(this.article.description)
    }
  },
  methods: {
    highlightText(text) {
      if (!this.searchQuery) return text
      const regex = new RegExp(`(${this.searchQuery})`, 'gi')
      return text.replace(regex, '<mark>$1</mark>')
    }
  }
}
</script>

<style scoped>
.category-badge {
  background-color: #f8f9fa;
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 0.9em;
  margin-right: 10px;
}

.publish-date {
  color: #6c757d;
  font-size: 0.9em;
}

mark {
  background-color: #fff3cd;
  padding: 0 2px;
}
</style>