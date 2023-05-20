import autoBind from 'auto-bind'

export default abstract class BaseService {
  protected models: any

  constructor() {
    this.models = {}
    autoBind(this)
  }
}
