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

let useKeydown = (keyCombos) => {
  let onKeydown = (event) => {
    console.log(event.key)
    let kc = keyCombos.find(kc => kc.key == event.key)
    if (kc){
      kc.fn()
    }
  }
  window.addEventListener('keydown', onKeydown)

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
  })
}
export default {
  setup(props, {emit}) {
    useKeydown( [
      { key: 'Escape', fn: () => { emit('closeModal') }},
      { key: 'Enter', fn: () => { console.log('A second function')} }
    ])

    return {
      emit
    }
  }
}
</script>

<style scoped>

</style>
