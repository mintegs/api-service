import BaseService from '../../core/contracts/baseService'
import { SessionDocument } from '../../core/contracts/models'
import { SessionRepository } from '../../core/repositories/session.repository'

export default class SessionUserService extends BaseService {
  constructor(private readonly sessionRepository: SessionRepository) {
    super()
  }

  async findAll(userId: string): Promise<SessionDocument[]> {
    try {
      return await this.sessionRepository.findAll(userId)
    } catch (error) {
      throw error
    }
  }

  async delete(id: string, userId): Promise<void> {
    try {
      await this.sessionRepository.delete(id, userId)
    } catch (error) {
      throw error
    }
  }
}
