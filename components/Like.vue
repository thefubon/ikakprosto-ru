<template>
  <div class="space-x-[1px]">
    <button @click="toggleLike" class="like" :class="{ activeLike: userVote === 'like' }">
      <img :src="userVote === 'like' ? '/icons/like.svg' : '/icons/like-stroke.svg'" alt="Like Icon" class="like-icon">
      <span class="caption">Like</span> <span class="likeNumber">{{ likes }}</span>
    </button>
    <button @click="toggleDislike" class="dislike" :class="{ activeDislike: userVote === 'dislike' }">
      <img :src="userVote === 'dislike' ? '/icons/dislike.svg' : '/icons/dislike-stroke.svg'" alt="Dislike Icon"
        class="dislike-icon">
      <span class="caption">Dislike</span> <span class="dislikeNumber">{{ dislikes }}</span>
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  postId: Number
})

const likes = ref(0)
const dislikes = ref(0)
const userVote = ref(null) // null, 'like', 'dislike'

const LOCAL_STORAGE_LIKES_KEY = `post-${props.postId}-likes`
const LOCAL_STORAGE_DISLIKES_KEY = `post-${props.postId}-dislikes`
const LOCAL_STORAGE_USER_VOTE_KEY = `post-${props.postId}-vote`

const loadFromLocalStorage = () => {
  const storedLikes = localStorage.getItem(LOCAL_STORAGE_LIKES_KEY)
  const storedDislikes = localStorage.getItem(LOCAL_STORAGE_DISLIKES_KEY)
  const storedVote = localStorage.getItem(LOCAL_STORAGE_USER_VOTE_KEY)

  likes.value = storedLikes ? parseInt(storedLikes) : 0
  dislikes.value = storedDislikes ? parseInt(storedDislikes) : 0
  userVote.value = storedVote ? storedVote : null
}

const saveToLocalStorage = () => {
  localStorage.setItem(LOCAL_STORAGE_LIKES_KEY, likes.value)
  localStorage.setItem(LOCAL_STORAGE_DISLIKES_KEY, dislikes.value)
  localStorage.setItem(LOCAL_STORAGE_USER_VOTE_KEY, userVote.value)
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
  saveToLocalStorage()
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
  saveToLocalStorage()
}

loadFromLocalStorage()
</script>

<style scoped>
button {
  margin-right: 10px;
}

.like {
  @apply bg-muted rounded-l-full py-0.5 px-2 m-0 inline-flex items-center gap-2;
}

.dislike {
  @apply bg-muted rounded-r-full py-0.5 px-2 m-0 inline-flex items-center gap-2;
}

.activeLike {
  @apply bg-red-500 text-white;
}

.activeDislike {
  @apply bg-black text-white;
}

.likeNumber {
  @apply text-[#040405]/30 text-sm;
}

.activeLike>.likeNumber {
  @apply text-white/95 text-sm;
}

.activeDislike>.likeNumber {
  @apply text-white/30 text-sm;
}

.caption {
  @apply tracking-[-0.08px] text-sm;
}
</style>