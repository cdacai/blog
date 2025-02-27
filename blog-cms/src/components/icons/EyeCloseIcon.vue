<template>
  <div class="icon-wrapper" :style="{ width: size + 'px', height: size + 'px' }">
    <svg width="100%" height="100%" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M64 32c-28.8 0-51.2 16.9-61.44 32 10.24 15.1 32.64 32 61.44 32s51.2-16.9 61.44-32C115.2 48.9 92.8 32 64 32zm0 53.3c-11.05 0-20-8.95-20-20s8.95-20 20-20 20 8.95 20 20-8.95 20-20 20z" :fill="color"/>
      <circle cx="64" cy="65.3" r="10" :fill="color"/>
      <line x1="24" y1="32" x2="104" y2="96" :stroke="color" stroke-width="8" stroke-linecap="round"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'EyeCloseIcon',
  props: {
    color: {
      type: String,
      default: 'currentColor'
    },
    size: {
      type: Number,
      default: 20
    }
  }
}
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}
</style> 