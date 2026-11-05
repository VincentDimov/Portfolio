import { createActivityResponse } from '../scripts/github-activity.mjs'

export default {
  fetch(request) {
    return createActivityResponse(request)
  },
}
