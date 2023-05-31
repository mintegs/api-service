import BaseController from '../core/contracts/baseController'

class CategoryAdminController extends BaseController {
  constructor() {
    super()
  }

  findAll() {
    return 'findAll categories'
  }

  findOne() {
    return 'getOne categories'
  }

  create() {
    return 'create categories'
  }

  update() {
    return 'update categories'
  }

  delete() {
    return 'delete categories'
  }
}

export default new CategoryAdminController()
