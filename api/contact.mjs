import { createContactResponse } from '../scripts/contact.mjs'

export default {
  fetch(request) {
    return createContactResponse(request)
  },
}
