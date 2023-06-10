import BaseService from '../../core/contracts/baseService'
import { ArticleDocument } from '../../core/contracts/models'
import { ArticleRepository } from '../../core/repositories/article.repository'

export default class ArticleAdminService extends BaseService {
  constructor(private readonly articleRepository: ArticleRepository) {
    super()
  }

  async findAll(): Promise<ArticleDocument[]> {
    try {
      return await this.articleRepository.findAll()
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string): Promise<ArticleDocument> {
    try {
      return await this.articleRepository.findById(id)
    } catch (error) {
      throw error
    }
  }
}
