<template>
  <div>
    <h1>{{ emails.length }}</h1>
    <h1>{{ emailSelection.emails.size }}</h1>
  </div>
</template>

<script>
import useEmailSelection from '@/composables/use-email-selection'

export default {
  setup(){
    return {
      emailSelection: useEmailSelection()
    }
  },
  props: {
    emails: {
      type: Array,
      required: true
    },
  },
}
</script>

<style scoped>

</style>
