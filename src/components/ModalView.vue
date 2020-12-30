<template>
  <div class="modal">
    <div class="overlay" @click="emit('closeModal')"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount } from 'vue'

let useKeydown = (keyPress, fn) => {
  let onKeydown = (event) => {
    console.log(event.key)

    if (event.key === keyPress){
      fn()
    }
  }
  window.addEventListener('keydown', onKeydown)

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
  })
}
export default {
  setup(props, {emit}) {
    useKeydown( 'Escape', () => { emit('closeModal') })
    useKeydown('Enter', () => { console.log('A second function')} )

    return {
      emit
    }
  }
}
</script>

<style scoped>

</style>
