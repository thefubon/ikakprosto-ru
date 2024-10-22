<template>
  <main class="container space-y-8 py-12">
    <div class="w-full rounded-2xl overflow-hidden">
      <NuxtImg class="object-cover w-full object-center" src="/home.jpg" alt="" />
    </div>

    <Home />

    <NuxtLink class="w-full bg-primary text-white py-2 px-4 inline-flex justify-center items-center rounded-lg"
      to="/posts">
      All Posts
    </NuxtLink>
  </main>
</template>

<script setup>
useSeoMeta({
  title: 'ikakprosto.ru',
  description: 'Фронтендер в Сасфликс',
});
</script>