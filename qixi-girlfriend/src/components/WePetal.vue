<template>
  <img :id="petal.id" class="petal" :src="petal.url" :style="petal.style" />
</template>

<script setup>
import { onMounted } from 'vue'
const props = defineProps({
  petal: {
    type: Object,
    default() {
      return {};
    },
  },
});
onMounted(() => {

})
</script>

<style lang="scss" scoped>
.petal {
  width: 24px;
  height: 24px;
  position: absolute;
  top: -40px;
  left: 0;
  opacity: 1;
  z-index: 9999;
}
</style>
