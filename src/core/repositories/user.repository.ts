import User from '../../models/user.model'
import { Status, UserDocument, UserModel } from '../contracts/models'

export class UserRepository {
  private userModel: UserModel

  constructor() {
    this.userModel = User
  }

  async findByEmailOrUsername(
    email: string,
    username?: string
  ): Promise<UserDocument | null> {
    return await this.userModel.findOne({
      $or: [{ email }, { username: username ?? email }],
    })
  }

  async generateNewUser({
    email,
    username,
    status,
  }: {
    email: string
    username?: string
    status?: Status
  }): Promise<UserDocument> {
    return await new this.userModel({
      email,
      username:
        username ??
        'user' + Math.floor(123456789 + Math.random() * 987654321).toString(),
      status,
    }).save()
  }

  async createNewUser({
    email,
    username,
    status,
  }: {
    email: string
    username: string
    status?: Status
  }): Promise<UserDocument> {
    return await new this.userModel({
      email,
      username,
      status,
    }).save()
  }
}

export default new UserRepository()
