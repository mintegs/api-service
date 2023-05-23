import User from '../../models/user.model'
import { UserDocument, UserDto, UserModel } from '../contracts/models'

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

  async create(data: UserDto): Promise<UserDocument> {
    return await new this.userModel({
      ...data,
    }).save()
  }
}

export default new UserRepository()
