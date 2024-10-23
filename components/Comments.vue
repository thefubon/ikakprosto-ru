<template>
  <div class="comments">
    <h3 class="text-[28px] font-bold my-6">{{ visibleComments.length }} {{ getCommentWord(visibleComments.length) }}
    </h3>

    <div v-if="error" class="error">
      {{ error.message }}
    </div>

    <div v-else-if="loading" class="loading">
      Загрузка комментариев...
    </div>

    <div v-else>
      <ul>
        <li v-for="comment in visibleComments" :key="comment.id" class="comment-item">
          <img :src="comment.user.avatar || '/default-avatar.png'" alt="User Avatar" class="avatar" />
          <div>
            <strong>{{ comment.user.username }}</strong>
            <p>{{ comment.body }}</p>
            <button @click="hideComment(comment.id)" class="delete-button">Delete</button>
          </div>
        </li>
      </ul>
      <button v-if="hiddenComments.length" @click="restoreComments" class="restore-button">Restore All comments</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  postId: {
    type: Number,
    required: true
  }
})

const commentsData = ref([])
const loading = ref(true)
const error = ref(null)
const hiddenComments = ref([])

const fetchComments = async () => {
  loading.value = true
  try {
    const response = await fetch(`https://dummyjson.com/posts/${props.postId}/comments`)
    if (!response.ok) throw new Error(`Ошибка: ${response.status}`)
    const data = await response.json()
    commentsData.value = data.comments || []
  } catch (err) {
    error.value = err
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (typeof window !== "undefined") {
    const storedHiddenComments = localStorage.getItem(`hiddenComments-${props.postId}`)
    hiddenComments.value = storedHiddenComments ? JSON.parse(storedHiddenComments) : []
  }
  fetchComments()
})

const visibleComments = computed(() => {
  return commentsData.value.filter(comment => !hiddenComments.value.includes(comment.id))
})

const hideComment = (commentId) => {
  hiddenComments.value.push(commentId)
  localStorage.setItem(`hiddenComments-${props.postId}`, JSON.stringify(hiddenComments.value))
}

const restoreComments = () => {
  hiddenComments.value = []
  localStorage.removeItem(`hiddenComments-${props.postId}`)
}

const getCommentWord = (count) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return 'комментарий'
  } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return 'комментария'
  } else {
    return 'комментариев'
  }
}
</script>

<style scoped>
/* Вариант на посмотреть как работает с CSS */
.error {
  color: red;
}

.loading {
  color: grey;
}

.comments {
  margin-top: 20px;
}

strong {
  color: #333;
}

.avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;

  @apply border-2 border-black
}

.comment-item>div {
  max-width: calc(100% - 50px);
}

/* Вариант на посмотреть как работает с SCSS */
ul {
  list-style-type: none;
  padding: 0;

  li {
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }
}

/* Вариант на посмотреть как работает с Tailwind CSS */
.delete-button {
  @apply text-primary text-sm underline
}

.restore-button {
  @apply text-black py-1 px-3 border rounded-full
}
</style>