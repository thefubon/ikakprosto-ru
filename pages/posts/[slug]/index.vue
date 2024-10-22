<template>
  <div class="container py-12">
    <button @click="goBack" class="back-button">Назад</button>
    <Post />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

useSeoMeta({
  title: 'Posts | ikakprosto.ru',
  description: 'Фронтендер в Сасфликс',
});

const router = useRouter()

const goBack = () => {
  router.back()
}
</script>

<style scoped>
.back-button {
  @apply py-2 px-4 bg-primary text-white hover:bg-primary/75 duration-200 rounded-full mb-6
}
</style>