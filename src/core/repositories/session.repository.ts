import Session from '../../models/session.model'
import { SessionDocument, SessionDto, SessionModel } from '../contracts/models'

export class SessionRepository {
  private sessionModel: SessionModel

  constructor() {
    this.sessionModel = Session
  }

  async create(data: SessionDto): Promise<void> {
    await new this.sessionModel({
      ...data,
    }).save()
  }

  async findWithPopulate(
    user: string,
    token: string
  ): Promise<SessionDocument> {
    return await this.sessionModel
      .findOne({
        expiryDate: { $gt: new Date() },
        token,
        user,
      })
      .populate({
        path: 'user',
        select: '-status',
      })
  }
}

export default new SessionRepository()
