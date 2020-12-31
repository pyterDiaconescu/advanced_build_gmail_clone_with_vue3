<template>
  <div class="email-display">
    <div>
      <button>Archive</button>
      <button @click="toggleRead">{{ email.read ? 'Mark Unread' : 'Mark Read' }}</button>
      <button>Newer</button>
      <button>Older</button>
    </div>
    <h2 class="mb-0">Subject: <strong>{{ email.subject }}</strong></h2>
    <div><em>From {{ email.from }} on {{ format(new Date(email.sentAt), 'MMM do yyyy') }}</em></div>
    <div v-html="marked(email.body)" />
  </div>
</template>

<script>
import { format } from 'date-fns'
import marked from 'marked'
import axios from "axios"

export default {
  setup(props){
    let email = props.email
    let toggleRead = () => {
      email.read = !email.read
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    }
    return {
      format,
      marked,
      toggleRead
    }
  },
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
