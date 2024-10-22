<template>
  <main class="section">
    <Posts />
  </main>
</template>

<script setup>
useSeoMeta({
  title: 'Posts | ikakprosto.ru',
  description: 'Фронтендер в Сасфликс',
});
</script>

<style scoped>
.section {
  @apply container py-12
}
</style>