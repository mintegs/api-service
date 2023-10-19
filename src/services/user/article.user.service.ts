import BaseService from '../../core/contracts/baseService'
import { ArticleDocument, ArticleFilter } from '../../core/contracts/models'
import { ArticleRepository } from '../../core/repositories/article.repository'

export default class ArticleUserService extends BaseService {
  constructor(private readonly articleRepository: ArticleRepository) {
    super()
  }

  async findAll(filter: ArticleFilter): Promise<ArticleDocument[]> {
    try {
      return await this.articleRepository.findAll(filter)
    } catch (error) {
      throw error
    }
  }

  async create(data: any, user: string): Promise<ArticleDocument> {
    try {
      return await this.articleRepository.create({
        ...data,
        user,
      })
    } catch (error) {
      throw error
    }
  }

  async update(
    query: { title: string; user: string },
    data: any
  ): Promise<void> {
    try {
      await this.articleRepository.update(query, data)
    } catch (error) {
      throw error
    }
  }

  async delete(title: string, user: string): Promise<void> {
    try {
      await this.articleRepository.delete(title, user)
    } catch (error) {
      throw error
    }
  }
}
