<template>
  <div class="comments">
    <h2>Комментарии ({{ commentsData?.comments.length || 0 }})</h2>
    <div v-if="error" class="error">
      {{ error.message }}
    </div>
    <div v-else-if="!commentsData" class="loading">
      Загрузка комментариев...
    </div>
    <div v-else>
      <ul>
        <li v-for="comment in commentsData.comments" :key="comment.id" class="comment-item">
          <img :src="comment.user.avatar || '/default-avatar.png'" alt="User Avatar" class="avatar">
          <div>
            <strong>{{ comment.user.username }}</strong>
            <p>{{ comment.body }}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useFetch } from '#app'
import { ref } from 'vue'

const props = defineProps({
  postId: {
    type: Number,
    required: true
  }
})

const { data: commentsData, error } = await useFetch(`https://dummyjson.com/posts/${props.postId}/comments`)
</script>

<style scoped>
.error {
  color: red;
}

.loading {
  color: grey;
}

.comments {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

strong {
  color: #333;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

/* Add class for comment item to align avatar and text properly */
.comment-item {
  display: flex;
  align-items: center;
}

.comment-item>div {
  max-width: calc(100% - 50px);
  /* Adjust comment text layout */
}
</style>