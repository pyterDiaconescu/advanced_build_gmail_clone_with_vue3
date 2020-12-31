import {reactive} from "vue";

export const useEmailSelection = function() {
  let emails = reactive(new Set())

  let toggle = (email) => {
    if (emails.has(email)) {
      emails.delete(email)
    } else {
      emails.add(email)
    }
  }

  return {
    emails,
    toggle
  }
}

export default useEmailSelection
