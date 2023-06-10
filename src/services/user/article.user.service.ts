import BaseService from '../../core/contracts/baseService'
import { ArticleDocument } from '../../core/contracts/models'
import { ArticleRepository } from '../../core/repositories/article.repository'

export default class ArticleUserService extends BaseService {
  constructor(private readonly articleRepository: ArticleRepository) {
    super()
  }

  async findAll(user: string): Promise<ArticleDocument[]> {
    try {
      return await this.articleRepository.findAll({ user })
    } catch (error) {
      throw error
    }
  }

  async create(data: any, user: string): Promise<void> {
    try {
      await this.articleRepository.create({
        ...data,
        user,
      })
    } catch (error) {
      throw error
    }
  }

  async update(id: string, data: any): Promise<void> {
    try {
      await this.articleRepository.update(id, data)
    } catch (error) {
      throw error
    }
  }

  async delete(id: string, user: string): Promise<void> {
    try {
      await this.articleRepository.delete(id, user)
    } catch (error) {
      throw error
    }
  }
}
