<template>
  <div class="comments">
    <h2>Комментарии</h2>
    <div v-if="error" class="error">
      {{ error.message }}
    </div>
    <div v-else-if="!commentsData" class="loading">
      Загрузка комментариев...
    </div>
    <div v-else>
      <ul>
        <li v-for="comment in commentsData.comments" :key="comment.id">
          <p><strong>{{ comment.user.username }}</strong>: {{ comment.body }}</p>
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
  margin-bottom: 10px;
}

strong {
  color: #333;
}
</style>