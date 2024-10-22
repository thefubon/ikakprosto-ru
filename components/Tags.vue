<template>
  <div class="tags-container">
    <h2>Теги</h2>
    <ul>
      <li v-for="tag in tags" :key="tag" class="tag-item">
        <NuxtLink :to="`/posts/${tag}`">{{ tag }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const tags = ref([])

// Получаем список всех доступных тегов
const fetchTags = async () => {
  try {
    const response = await fetch('https://example.com/tags') // Убедитесь, что URL верный.
    const data = await response.json()
    tags.value = data.tags
  } catch (error) {
    console.error('Ошибка загрузки тегов:', error)
  }
}

onMounted(fetchTags)
</script>

<style scoped>
.tags-container {
  margin-top: 20px;
}

.tag-item {
  margin-bottom: 10px;
}

.tag-item a {
  text-decoration: none;
  color: blue;
}
</style>