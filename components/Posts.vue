<template>
  <div>
    <div v-if="error" class="error">
      {{ error }}
    </div>
    <div v-else>
      <div v-if="activeTags.length"
        class="filter-header mb-4 sticky top-[60px] py-2 bg-white flex items-center justify-center">
        <span>Фильтр: {{ activeTags.join(', ') }}</span>
        <button @click="resetTagFilter" class="reset-button">Сбросить фильтр</button>
      </div>

      <div v-if="!filteredPosts.length" class="skeleton-container">
        <div class="skeleton" v-for="n in 10" :key="n">
          <div class="skeleton-title"></div>
          <div class="skeleton-body"></div>
          <div class="skeleton-tags"></div>
        </div>
      </div>
      <div v-else class="space-y-8">
        <div v-for="post in filteredPosts" :key="post.id" class="post space-y-6">
          <NuxtLink :to="`/posts/${generateSlug(post)}`" class="space-y-4">
            <h2 class="headline">{{ post.title }}</h2>
            <p class="text">{{ post.body }}</p>
          </NuxtLink>

          <div class="inline-flex flex-col md:flex-row gap-4">
            <div class="flex gap-2">
              <Like :post-id="post.id" />
              <button @click="toggleComments(post.id)" class="text-primary text-sm underline">
                {{ post.showComments ? 'Close comments' : 'Open comments' }}
              </button>
            </div>

            <div class="flex gap-2">
              <p class="text-black/20">Today</p>
              <div class="tags-container">
                <span v-for="tag in post.tags" :key="tag" class="bg-slate-100 rounded-md py-0.5 px-2 cursor-pointer"
                  @click="toggleTagFilter(tag)">
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="post.showComments">
            <Comments :postId="post.id" />
          </div>
        </div>
        <button v-if="canLoadMore && !activeTags.length" @click="loadMorePosts"
          class="border border-primary text-primary p-2 w-full rounded-lg">
          Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Like from '~/components/Like.vue'
import Comments from '~/components/Comments.vue'

const route = useRoute()
const router = useRouter()

const posts = ref([])
const error = ref(null)
const commentsCount = ref({})

const activeTags = ref([])

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

const toggleTagFilter = (tag) => {
  if (activeTags.value.includes(tag)) {
    activeTags.value = activeTags.value.filter(t => t !== tag)
  } else {
    activeTags.value.push(tag)
  }
  updateUrl()
}

const resetTagFilter = () => {
  activeTags.value = []
  updateUrl()
}

const updateUrl = () => {
  const query = activeTags.value.length ? { 'tags': activeTags.value.join(',') } : {}
  router.push({ path: route.path, query })
}

const filteredPosts = computed(() => {
  if (!activeTags.value.length) return posts.value.slice(0, postsLoaded.value)
  return posts.value.filter(post =>
    activeTags.value.some(tag => post.tags.includes(tag))
  )
})

const POSTS_BATCH_SIZE = 5
const postsLoaded = ref(0)

onMounted(() => {
  fetchPosts()
  postsLoaded.value = POSTS_BATCH_SIZE

  // Initialize based on route query
  const initialTags = route.query['tags-name']
  if (initialTags) {
    activeTags.value = initialTags.split(',')
  }
})

const generateSlug = (post) => {
  return post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') + `-${post.id}`
}

const loadMorePosts = () => {
  if (canLoadMore.value) {
    postsLoaded.value += POSTS_BATCH_SIZE
  }
}

const canLoadMore = computed(() => {
  return posts.value.length > postsLoaded.value
})

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
  gap: 40px;
}

.skeleton {
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.skeleton-title {
  width: 80%;
  height: 24px;
  border-radius: 4px;
  @apply bg-muted
}

.skeleton-body {
  width: 100%;
  height: 14px;
  border-radius: 4px;
  @apply bg-muted
}

.skeleton-tags {
  width: 60%;
  height: 14px;
  border-radius: 4px;

  @apply bg-muted
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
  cursor: pointer;
}

.tag:hover {
  background-color: #d1d1d1;
}

.reset-button {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.reset-button:hover {
  background-color: darkred;
}
</style>