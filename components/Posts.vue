<template>
  <div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="!postsToShow.length" class="skeleton-container">
      <div class="skeleton" v-for="n in 5" :key="n">
        <div class="skeleton-title"></div>
        <div class="skeleton-body"></div>
        <div class="skeleton-tags"></div>
      </div>
    </div>
    <div v-else class="space-y-8">
      <div v-for="post in postsToShow" :key="post.id" class="post space-y-6">
        <NuxtLink :to="`/posts/${generateSlug(post)}`">
          <h2 class="headline">{{ post.title }}</h2>
          <p class="text">{{ post.body }}</p>
        </NuxtLink>

        <div class="inline-flex flex-col sm:flex-row gap-2">
          <div class="flex gap-2">
            <Like :post-id="post.id" />
            <!-- <span v-if="commentsCount[post.id] !== undefined">
            ({{ commentsCount[post.id] }} комментариев)
          </span> -->
            <button @click="toggleComments(post.id)" class="text-primary text-sm underline">
              {{ post.showComments ? 'Close comments' : 'Open comments' }}
            </button>
          </div>

          <div class="inline-flex gap-2">
            <p>Today: {{ post.tags.join(', ') }}</p>
          </div>
        </div>

        <div v-if="post.showComments">
          <Comments :postId="post.id" />
        </div>
      </div>
      <button v-if="canLoadMore" @click="loadMorePosts"
        class="border border-primary text-primary p-2 w-full rounded-lg">Load
        More</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Like from '~/components/Like.vue'
import Comments from '~/components/Comments.vue'

const posts = ref([])
const error = ref(null)
const commentsCount = ref({})

// Fetch all posts
const fetchPosts = async () => {
  try {
    const response = await fetch('https://dummyjson.com/posts')
    const data = await response.json()
    posts.value = data.posts.map(post => ({ ...post, showComments: false }))
    await fetchCommentsCount()
  } catch (err) {
    error.value = err.message
  }
}

// Fetch count of comments for each post
const fetchCommentsCount = async () => {
  for (const post of posts.value) {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${post.id}/comments`)
      const data = await response.json()
      commentsCount.value[post.id] = data.comments.length || 0
    } catch (err) {
      commentsCount.value[post.id] = 0
    }
  }
}

onMounted(fetchPosts)

const POSTS_BATCH_SIZE = 5
const postsLoaded = ref(0)

const postsToShow = computed(() => {
  return posts.value.slice(0, postsLoaded.value)
})

const canLoadMore = computed(() => {
  return posts.value.length > postsLoaded.value
})

const generateSlug = (post) => {
  return post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') + `-${post.id}`
}

const loadMorePosts = () => {
  if (canLoadMore.value) {
    postsLoaded.value += POSTS_BATCH_SIZE
  }
}

postsLoaded.value = POSTS_BATCH_SIZE

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

.skeleton-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.skeleton {
  background-color: #f0f0f0;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-title {
  width: 80%;
  height: 24px;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.skeleton-body {
  width: 100%;
  height: 14px;
  background-color: #e0e0e0;
  border-radius: 4px;
}

.skeleton-tags {
  width: 60%;
  height: 14px;
  background-color: #e0e0e0;
  border-radius: 4px;
}
</style>