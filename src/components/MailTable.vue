<template>
  <button
      @click="selectScreen('inbox')"
      :disabled="selectedScreen == 'inbox'"
  >
    Inbox
  </button>
  <button
      @click="selectScreen('archive')"
      :disabled="selectedScreen == 'archive'"
  >
    Archived
  </button>
  <BulkActionBar :emails="filteredEmails"/>
  <table class="mail-table">
    <tbody>
    <tr
      v-for="email in filteredEmails"
      :key="email.id"
      :class="['clickable', email.read ? 'read' : '']"
    >
      <td>
        <input
          type="checkbox"
          :checked="emailSelection.emails.has(email)"
          @click="emailSelection.toggle(email)"
        >
      </td>
      <td @click="openEmail(email)">{{ email.from }}</td>
      <td @click="openEmail(email)">
        <p><strong>{{ email.subject}}</strong> - {{ email.body }}</p>
      </td>
      <td @click="openEmail(email)">{{ format(new Date(email.sentAt), 'MMM do yyyy') }}</td>
      <td>
        <button @click="archiveEmail(email)">Archive</button>
      </td>
    </tr>
    </tbody>
  </table>
  <ModalView v-if="openedEmail" @closeModal="openedEmail=null">
    <MailView :email="openedEmail" @changeEmail="changeEmail"/>
  </ModalView>
</template>

<script>
import {format} from "date-fns"
import axios from 'axios'

import MailView from '@/components/MailView'
import ModalView from '@/components/ModalView'
import { ref } from 'vue'
import useEmailSelection from '@/composables/use-email-selection'
import BulkActionBar from '@/components/BulkActionBar'

export default {
  name: "MailTable",
  components: {
    MailView,
    ModalView,
    BulkActionBar
  },
  async setup(){
    let { data: emails } = await axios.get('http://localhost:3000/emails')

    return {
      format,
      emailSelection: useEmailSelection(),
      emails: ref(emails),
      openedEmail: ref(null),
      selectedScreen: ref('inbox')
    }
  },
  computed: {
    sortedEmails() {
      return this.emails.sort((e1, e2) => {
        return e1.sentAt < e2.sentAt
      })
    },
    filteredEmails() {
      if (this.selectedScreen == 'inbox'){
        return this.sortedEmails.filter(e => !e.archived)
      } else {
        return this.sortedEmails.filter(e => e.archived)
      }
    }
  },
  methods: {
    selectScreen(newScreen){
      this.selectedScreen = newScreen;
      this.emailSelection.clear()
    },
    openEmail(email) {
      this.openedEmail = email
      if(email) {
        email.read = true;
        this.updateEmail(email)
      }
    },
    archiveEmail(email) {
      email.archived = true
      this.updateEmail(email)
    },
    changeEmail({toggleRead, toggleArchive, save, closeModal, changeIndex}){

      let email = this.openedEmail
      if(toggleRead) { email.read = !email.read }
      if(toggleArchive) { email.archived = !email.archived }
      if(save) { this.updateEmail(email) }
      if(closeModal) { this.openedEmail = null }

      if(changeIndex) {
        let emails = this.filteredEmails
        let currentIndex = emails.indexOf(this.openedEmail)
        let newEmail = emails[currentIndex+changeIndex];
        this.openEmail(newEmail);
      }
    },
    updateEmail(email){
      axios.put(`http://localhost:3000/emails/${email.id}`, email)
    }
  },
}
</script>

<style scoped>

</style>
