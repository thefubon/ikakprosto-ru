<template>
  <div v-if="error" class="error">
    {{ error.message }}
  </div>
  <div v-else-if="!data" class="loading">
    Загрузка...
  </div>
  <div v-else>
    <h1>{{ data.title }}</h1>
    <p>{{ data.body }}</p>
    <p>Tags: {{ data.tags.join(', ') }}</p>
    <p>Likes: {{ data.reactions.likes }}, Dislikes: {{ data.reactions.dislikes }}</p>
    <p>Views: {{ data.views }}</p>

    <!-- Включаем компонент Comments, передавая postId -->
    <Comments :postId="postId" />
  </div>
</template>

<script setup>
import { useFetch } from '#app'
import { useRoute } from 'vue-router'
import Comments from '~/components/Comments.vue'

const route = useRoute()
// Извлекаем ID поста из slug
const slugParts = route.params.slug.split('-')
const postId = +slugParts[slugParts.length - 1]

const { data, error } = await useFetch(`https://dummyjson.com/posts/${postId}`)

// Передаем postId в компонент Comments
</script>

<style scoped>
.error {
  color: red;
}

.loading {
  color: grey;
}
</style>