import BaseService from '../../core/contracts/baseService'
import { ArticleDocument, ArticleFilter } from '../../core/contracts/models'
import { ArticleRepository } from '../../core/repositories/article.repository'

export default class ArticleAdminService extends BaseService {
  constructor(private readonly articleRepository: ArticleRepository) {
    super()
  }

  async findAll(filter?: ArticleFilter): Promise<ArticleDocument[]> {
    try {
      return await this.articleRepository.findAll(filter)
    } catch (error) {
      throw error
    }
  }

  async findOne(filter: ArticleFilter): Promise<ArticleDocument> {
    try {
      return await this.articleRepository.findOne(filter)
    } catch (error) {
      throw error
    }
  }
}
