import autoBind from 'auto-bind'
import models from '../../models'
import { Models } from './models'

export default abstract class BaseController {
  protected models: Models
  constructor() {
    autoBind(this)

    this.models = { ...models }
  }

  sayMsg() {
    return 'message'
  }
}
