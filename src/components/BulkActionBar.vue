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
  setup(props){
    let emailSelection = useEmailSelection()
    let numberSelected = emailSelection.emails.size
    let numberEmails = props.emails.length
    return {
      allEmailsSelected: numberSelected === numberEmails,
      someEmailsSelected: numberSelected > 0 && numberSelected < numberEmails
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
