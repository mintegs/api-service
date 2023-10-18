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
      .populate<{ user: UserDocument }>({
        path: 'user',
        select: 'username -_id',
      })
      .populate<{ category: CategoryDocument }>({
        path: 'category',
        select: 'title -_id',
      })
      .select('title status createdAt updatedAt -_id')
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

  async update(
    query: { title: string; user: string },
    data: any
  ): Promise<void> {
    await this.articleModel.findOneAndUpdate({ ...query }, { ...data }).lean()
  }

  async delete(title: string, user: string): Promise<void> {
    await this.articleModel
      .findOneAndDelete({
        title,
        user,
      })
      .lean()
  }
}

export default new ArticleRepository()
