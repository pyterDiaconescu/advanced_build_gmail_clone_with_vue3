import {onBeforeUnmount} from "@vue/runtime-dom";

let useKeydown = (keyCombos) => {
  let onKeydown = (event) => {
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

export default useKeydown;
