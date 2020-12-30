<template>
  <table class="mail-table">
    <tbody>
    <tr
      v-for="email in unarchivedEmails"
      :key="email.id"
      :class="['clickable', email.read ? 'read' : '']"
      @click="email.read = true"
    >
      <td><input type="checkbox"></td>
      <td>{{ email.from }}</td>
      <td>
        <p><strong>{{ email.subject}}</strong> - {{ email.body }}</p>
      </td>
      <td>{{ format(new Date(email.sentAt), 'MMM do yyyy') }}</td>
      <td>
        <button @click="email.archived = true">Archive</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import {format} from "date-fns"
import axios from 'axios'

export default {
  name: "MailTable",
  async setup(){
    let { data: emails } = await axios.get('http://localhost:3000/emails')

    return {
      format,
      emails
    }
  },
  computed: {
    sortedEmails() {
      return this.emails.sort((e1, e2) => {
        return e1.sentAt < e2.sentAt
      })
    },
    unarchivedEmails() {
      return this.sortedEmails.filter(e => !e.archived)
    }
  }
}
</script>

<style scoped>

</style>
