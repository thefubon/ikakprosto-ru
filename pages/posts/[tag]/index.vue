<template>
  <div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="!filteredPosts.length" class="loading">
      Загрузка...
    </div>
    <div v-else class="space-y-8">
      <h2>Посты с тегом: {{ tag }}</h2>
      <div v-for="post in filteredPosts" :key="post.id" class="post space-y-6">
        <NuxtLink :to="`/posts/${generateSlug(post)}`">
          <h2 class="headline">{{ post.title }}</h2>
          <p class="text">{{ post.body }}</p>
        </NuxtLink>

        <div class="inline-flex flex-col sm:flex-row gap-4">
          <div class="flex gap-2">
            <Like :post-id="post.id" />
            <button @click="toggleComments(post.id)" class="text-primary text-sm underline">
              {{ post.showComments ? 'Close comments' : 'Open comments' }}
            </button>
          </div>

          <div class="inline-flex gap-2">
            <p class="text-black/20">Today</p>
            <div class="tags-container">
              <span v-for="tag in post.tags" :key="tag" class="bg-slate-100 rounded-md py-0.5 px-2">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <div v-if="post.showComments">
          <Comments :postId="post.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Like from '~/components/Like.vue'
import Comments from '~/components/Comments.vue'

const route = useRoute()
const tag = route.params.tag
const posts = ref([])
const error = ref(null)

// Fetch all posts
const fetchPosts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/posts')
    const data = await response.json()
    posts.value = data.posts.map(post => ({ ...post, showComments: false }))
  } catch (err) {
    error.value = err.message
  }
}

onMounted(fetchPosts)

const filteredPosts = computed(() => {
  return posts.value.filter(post => post.tags.includes(tag))
})

const generateSlug = (post) => {
  return post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') + `-${post.id}`
}

const toggleComments = (postId) => {
  posts.value = posts.value.map(post =>
    post.id === postId ? { ...post, showComments: !post.showComments } : post
  )
}
</script>

<style scoped>
.error {
  color: red;
}

.loading {
  color: grey;
}

.post-item {
  margin-bottom: 20px;
}

.post-item a {
  text-decoration: none;
  color: inherit;
}

.tags-container {
  display: flex;
  gap: 5px;
}

.tag {
  background-color: #e0e0e0;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.875rem;
}

.tag:not(:last-child) {
  margin-right: 5px;
}
</style>