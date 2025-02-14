<template>
  <div class="icon-wrapper" :style="{ width: size + 'px', height: size + 'px' }">
    <svg width="100%" height="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0L40 0L40 40L0 0Z" 
            :fill="color"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'TopIcon',
  props: {
    color: {
      type: String,
      default: 'currentColor'
    },
    size: {
      type: Number,
      default: 40
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