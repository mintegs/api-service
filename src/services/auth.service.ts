import BaseService from '../core/contracts/baseService'
import { ErrorMessage } from '../core/lib/errorMessage'
import { UserRepository } from '../core/repositories/user.repository'

export default class AuthService extends BaseService {
  constructor(private readonly userRepository: UserRepository) {
    super()
  }

  async signUp({ email, username }: { email: string; username: string }) {
    try {
      // Find user
      const existingUser = await this.userRepository.findByEmailOrUsername(
        email,
        username
      )

      // If existing user, handle it
      if (existingUser) {
        throw ErrorMessage.setter(
          'Exists Data',
          `${
            existingUser.username === username ? 'Username' : 'Email'
          } is already`,
          400
        )
      }

      // Create new user
      const newUser = await this.userRepository.createNewUser({
        email,
        username,
      })

      // Create a verification code for account activation

      // Send verification code to email of user
      return 'create new user'
    } catch (error) {
      throw error
    }
  }
}
