<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-primary">Плейлист</h2>
    <div class="grid md:grid-cols-2 gap-8 md:gap-4">
      <div v-for="(item, index) in images" :key="index" class="relative rounded-md overflow-hidden">
        <template v-if="item.url && item.url !== '#'">
          <a :href="item.url" target="_blank">
            <img :src="item.image" alt="Image"
              class="w-full h-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <div v-if="item.close" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <img src="/public/key.svg" alt="Icon" class="w-8 h-8">
            </div>
          </a>
        </template>
        <template v-else>
          <p>
            <img :src="item.image" alt="Image" class="w-full h-auto rounded-lg shadow-md">
          <div v-if="item.close" class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <img src="/public/key.svg" alt="Icon" class="w-8 h-8">
          </div>
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [
        { image: '/playlist/video-1.webp', url: 'https://sasflix.ru/topics/ff6440b1-5767-454a-a957-280ce0b344fb', close: false },
        { image: '/playlist/video-2.webp', url: '', close: true },
        { image: '/playlist/video-3.webp', url: '', close: true },
        { image: '/playlist/video-4.webp', url: '', close: true }
      ]
    };
  }
};
</script>