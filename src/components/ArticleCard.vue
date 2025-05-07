<template>
  <div class="article-card">
    <!-- 卡片内容 -->
  </div>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      required: true,
      validator(value) {
        // 基础类型验证
        if (typeof value !== 'object' || value === null) {
          console.error('article prop 必须是一个非空对象')
          return false
        }

        // 必需字段验证
        const requiredKeys = ['id', 'title', 'description', 'image', 'link']
        const hasAllKeys = requiredKeys.every(key => {
          const exists = key in value
          if (!exists) {
            console.warn(`缺少必需字段: ${key}`)
          }
          return exists
        })

        // 字段类型验证 (增强校验)
        const isValidTypes = 
          typeof value.id === 'number' &&
          typeof value.title === 'string' &&
          typeof value.description === 'string' &&
          typeof value.image === 'string' &&
          typeof value.link === 'string'

        if (!isValidTypes) {
          console.error('字段类型验证失败:', {
            id: typeof value.id,
            title: typeof value.title,
            description: typeof value.description,
            image: typeof value.image,
            link: typeof value.link
          })
        }

        return hasAllKeys && isValidTypes
      }
    }
  }
}
</script>