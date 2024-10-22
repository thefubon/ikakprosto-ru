<template>
  <div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-else class="grid md:grid-cols-3 gap-4">
      <template v-if="!posts.length">
        <!-- Скелетон для загрузки данных -->
        <div v-for="n in 3" :key="n" class="skeleton">
          <div class="skeleton-title"></div>
          <div class="skeleton-body"></div>
        </div>
      </template>
      <template v-else>
        <div v-for="post in posts" :key="post.id" class="post-container">
          <div class="space-y-4">
            <h2 class="headline !text-2xl !leading-[24px] line-clamp-2">{{ post.title }}</h2>
            <p class="text line-clamp-3">{{ post.body }}</p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const error = ref(null)

const fetchPosts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/posts')
    const data = await response.json()
    posts.value = data.posts.slice(0, 3) // Возьмем только первые три поста
  } catch (err) {
    error.value = err.message
  }
}

onMounted(() => {
  fetchPosts()
})
</script>

<style scoped>
.error {
  color: red;
}

.skeleton {
  padding: 16px;
  background-color: #f3f3f3;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.skeleton-title {
  width: 80%;
  height: 24px;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.skeleton-body {
  width: 100%;
  height: 48px;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.post-container {
  /* Additional styles for the post container if needed */
}
</style>