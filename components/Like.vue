<template>
  <div class="space-x-[1px]">
    <button @click="toggleLike" class="like" :class="{ activeLike: userVote === 'like' }">
      <img :src="userVote === 'like' ? '/icons/like.svg' : '/icons/like-stroke.svg'" alt="Like Icon" class="like-icon">
      <span class="caption">Like</span> <span class="likeNumber">{{ likes }}</span>
    </button>
    <button @click="toggleDislike" class="dislike" :class="{ activeDislike: userVote === 'dislike' }">
      <img :src="userVote === 'dislike' ? '/icons/dislike.svg' : '/icons/dislike-stroke.svg'" alt="Dislike Icon"
        class="dislike-icon">
      <span class="caption">Trach</span> <span class="dislikeNumber">{{ dislikes }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  postId: Number
})

const likes = ref(0)
const dislikes = ref(0)
const userVote = ref(null) // null, 'like', 'dislike'

const LOCAL_STORAGE_KEY = `post-${props.postId}`

const loadFromLocalStorage = () => {
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY)
  if (storedData) {
    const { likes: storedLikes, dislikes: storedDislikes, userVote: storedVote } = JSON.parse(storedData)
    likes.value = storedLikes
    dislikes.value = storedDislikes
    userVote.value = storedVote
  }
}

const saveToLocalStorage = () => {
  const dataToStore = JSON.stringify({ likes: likes.value, dislikes: dislikes.value, userVote: userVote.value })
  localStorage.setItem(LOCAL_STORAGE_KEY, dataToStore)
}

const toggleLike = () => {
  if (userVote.value === 'like') {
    likes.value -= 1
    userVote.value = null
  } else {
    if (userVote.value === 'dislike') {
      dislikes.value -= 1
    }
    likes.value += 1
    userVote.value = 'like'
  }
}

const toggleDislike = () => {
  if (userVote.value === 'dislike') {
    dislikes.value -= 1
    userVote.value = null
  } else {
    if (userVote.value === 'like') {
      likes.value -= 1
    }
    dislikes.value += 1
    userVote.value = 'dislike'
  }
}

watch([likes, dislikes, userVote], saveToLocalStorage)

loadFromLocalStorage()
</script>

<style scoped>
button {
  margin-right: 10px;
}

.like {
  @apply bg-muted rounded-l-full py-0.5 px-2 m-0 inline-flex items-center gap-2
}

.dislike {
  @apply bg-muted rounded-r-full py-0.5 px-2 m-0 inline-flex items-center gap-2
}

.activeLike {
  @apply bg-red-500 text-white
}

.activeDislike {
  @apply bg-black text-white
}

.likeNumber {
  @apply text-[#040405]/30 text-sm
}

.activeLike>.likeNumber {
  @apply text-white/95 text-sm
}

.activeDislike>.likeNumber {
  @apply text-white/30 text-sm
}

.caption {
  @apply tracking-[-0.08px] text-sm
}
</style>