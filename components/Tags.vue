<template>
  <div class="flex gap-2">
    <p class="text-black/20">Today</p>
    <div class="tags-container">
      <span v-for="tag in tags" :key="tag"
        :class="['bg-slate-100', 'rounded-md', 'py-0.5', 'px-2', 'cursor-pointer', { 'selected': activeTags.includes(tag) }]"
        @click="$emit('toggle-tag', tag)">
        {{ tag }}
        <span v-if="activeTags.includes(tag)" class="ml-1 text-red-500">×</span>
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  tags: {
    type: Array,
    required: true
  },
  activeTags: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['toggle-tag'])
</script>

<style scoped>
.tags-container {
  display: flex;
  gap: 5px;
}

.selected {
  background-color: #c1d9ff;
}
</style>