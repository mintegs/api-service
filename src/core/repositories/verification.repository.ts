import Verification from '../../models/verification.model'
import {
  UserDocument,
  VerificationDocument,
  VerificationDto,
  VerificationModel,
} from '../contracts/models'
import { hash } from '../utilities/bcrypt'

export class VerificationRepository {
  private verificationModel: VerificationModel

  constructor() {
    this.verificationModel = Verification
  }

  private async generateCode(): Promise<string> {
    return await hash(
      Math.floor(123456789 + Math.random() * 987654321).toString()
    )
  }

  async create(data: VerificationDto): Promise<VerificationDocument> {
    const code = await this.generateCode()

    return await await new this.verificationModel({
      ...data,
      code,
    }).save()
  }

  async find(code: string): Promise<VerificationDocument | null> {
    return await this.verificationModel
      .findOne({
        code,
        expiryDate: { $gt: new Date() },
        used: false,
      })
      .populate<{ user: UserDocument }>('user')
  }
}

export default new VerificationRepository()
