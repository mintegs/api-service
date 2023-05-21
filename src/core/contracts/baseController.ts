import autoBind from 'auto-bind'

export default abstract class BaseController {
  constructor() {
    autoBind(this)
  }

  sayMsg() {
    return 'message'
  }
}
