<template>
  <div class="listfeaturedtag h-100">
    <div class="row h-100">
      <div class="col-12 col-md-12 col-lg-5 pr-lg-0">
        <div class="h-100">
          <div class="wrapthumbnail">
            <router-link :to="item.link">
              <img class="featured-box-img-cover" :src="require(`@/assets/images/${article.image}`)"
                :alt="article.title">
            </router-link>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-12 col-lg-7">
        <div class="h-100 card-group">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title">
                <router-link class="text-dark" :to="item.link">{{ item.title }}</router-link>
              </h2>
              <h4 class="card-text">{{ item.description }}</h4>
            </div>

            <div class="card-footer b-0 bg-white mt-auto">
              <div class="wrapfooter">
                <span class="post-date">{{ item.date }}</span>
                <span class="post-read-more">
                  <router-link :to="item.link" title="Read Story">
                    <svg class="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                      <path
                        d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z"
                        fill-rule="evenodd"></path>
                    </svg>
                  </router-link>
                </span>
                <div class="clearfix"></div>
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
    item: {
      type: Object,
      required: true
    }
  }
}
</script>