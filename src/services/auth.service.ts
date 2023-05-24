import BaseService from '../core/contracts/baseService'
import { ErrorMessage } from '../core/lib/errorMessage'
import { UserRepository } from '../core/repositories/user.repository'
import { VerificationRepository } from '../core/repositories/verification.repository'

export default class AuthService extends BaseService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly verificationRepository: VerificationRepository
  ) {
    super()
  }

  async signUp({
    email,
    username,
  }: {
    email: string
    username: string
  }): Promise<void> {
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
      const newUser = await this.userRepository.create({
        email,
        username,
      })

      // Create a verification code for account activation
      const newVerification = await this.verificationRepository.create({
        user: newUser.id,
        expiryDate: new Date(new Date().setHours(new Date().getHours() + 2)),
      })
      // Send verification code to email of user
      // return 'create new user'
    } catch (error) {
      throw error
    }
  }

  async signIn(email: string): Promise<void> {
    try {
      // Find user
      const user = await this.userRepository.findByEmailOrUsername(email)
      // If find user, handle it
      if (user) {
        // If the user's status was suspended, handle it
        if (user.status === 'SUSPENDED') {
          throw ErrorMessage.setter(
            'Account status',
            'Your account is suspended see support for reviewing your account',
            403
          )
        }

        // Create a verification code for generate jwt
        const newVerification = await this.verificationRepository.create({
          user: user.id,
          // 10 minute
          expiryDate: new Date(
            new Date().setMinutes(new Date().getMinutes() + 10)
          ),
        })

        // Send verification code to email of user
      }
    } catch (error) {
      throw error
    }
  }
}
