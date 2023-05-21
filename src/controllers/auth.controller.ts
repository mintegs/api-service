import BaseController from '../core/contracts/baseController'
import AuthService from '../services/auth.service'

class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super()
  }

  register() {
    return this.authService.signupUser()
  }
}

export default new AuthController(new AuthService())
