import Article from '../../models/article.model'
import { ArticleDocument, ArticleModel } from '../contracts/models'

export class ArticleRepository {
  private articleModel: ArticleModel

  constructor() {
    this.articleModel = Article
  }

  async findAll(filter?: any): Promise<ArticleDocument[]> {
    return await this.articleModel.find({ ...filter }).lean()
  }

  async findById(id: string): Promise<ArticleDocument> {
    return await this.articleModel.findById(id).lean()
  }

  async create(data: any): Promise<void> {
    await new this.articleModel({
      ...data,
    }).save()
  }

  async update(id: string, data: any): Promise<void> {
    await this.articleModel.findByIdAndUpdate(id, { ...data }).lean()
  }

  async delete(id: string, user: string): Promise<void> {
    await this.articleModel
      .findOneAndDelete({
        _id: id,
        user,
      })
      .lean()
  }
}

export default new ArticleRepository()
