<template>
  <div>
    <input
      type="checkbox"
      :checked="allEmailsSelected"
      :class="[someEmailsSelected ? 'partial-check' : '']"
    >
  </div>
</template>

<script>
import useEmailSelection from '@/composables/use-email-selection'

export default {
  setup(){
    return {
      emailSelection: useEmailSelection(),
      allEmailsSelected,
      someEmailsSelected
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
