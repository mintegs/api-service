import Article from '../../models/article.model'
import {
  ArticleDocument,
  ArticleFilter,
  ArticleModel,
  CategoryDocument,
  UserDocument,
} from '../contracts/models'

export class ArticleRepository {
  private articleModel: ArticleModel

  constructor() {
    this.articleModel = Article
  }

  async findAll(filter?: ArticleFilter): Promise<ArticleDocument[]> {
    return await this.articleModel
      .find({ ...filter })
      .populate<{ user: UserDocument; category: CategoryDocument }>([
        { path: 'user', select: 'username -_id' },
        { path: 'category', select: 'title -_id' },
      ])
      .select('title')
      .sort('-createdAt')
      .lean()
  }

  async findOne(filter: ArticleFilter): Promise<ArticleDocument> {
    return await this.articleModel
      .findOne({ ...filter })
      .populate<{ user: UserDocument; category: CategoryDocument }>([
        { path: 'user', select: 'username -_id' },
        { path: 'category', select: 'title -_id' },
      ])
      .lean()
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
