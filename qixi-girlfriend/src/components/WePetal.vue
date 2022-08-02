<template>
  <img :id="petal.id" class="petal" :src="petal.url" :style="petal.style" />
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";

const props = defineProps({
  petal: {
    type: Object,
    default() {
      return {};
    },
  },
});
const emit = defineEmits(['remove'])
onMounted(() => {
  const { id, end } = props.petal;
  // console.log(end);
  gsap.to(`#${id}`, {
    ...end,
    onComplete: () => {
      // console.log(`${id} gsap onComplete.`);
      emit('remove', id)
    }
  });
});
</script>

<style lang="scss" scoped>
.petal {
  width: 24px;
  height: 24px;
  position: absolute;
  top: -40px;
  left: 0;
  opacity: 1;
  z-index: 99;
}
</style>
