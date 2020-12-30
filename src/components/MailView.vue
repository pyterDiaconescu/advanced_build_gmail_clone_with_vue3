<template>
  <div class="email-display">
    <h2 class="mb-0">Subject: <strong>{{ email.subject }}</strong></h2>
    <div><em>From {{ email.from }} on {{ email.sentAt }}</em></div>
    <div>{{ email.body }}</div>
  </div>
</template>

<script>
export default {
  props: {
    email: {
      type: Object,
      required: true
    },
  },
}
</script>

<style scoped>

</style>
