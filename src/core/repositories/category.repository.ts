import Category from '../../models/category.model'
import {
  CategoryDocument,
  CategoryFilter,
  CategoryModel,
} from '../contracts/models'

export class CategoryRepository {
  private categoryModel: CategoryModel

  constructor() {
    this.categoryModel = Category
  }

  async findAll(filter?: CategoryFilter): Promise<CategoryDocument[]> {
    return await this.categoryModel.find({ ...filter }).lean()
  }

  async findOne(filter: CategoryFilter): Promise<CategoryDocument> {
    return await this.categoryModel.findOne({ ...filter }).lean()
  }

  async create(title: string, user: string): Promise<void> {
    await new this.categoryModel({
      title,
      user,
    }).save()
  }

  async update(id: string, title: string): Promise<void> {
    await this.categoryModel.findByIdAndUpdate(id, { title }).lean()
  }

  async delete(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id).lean()
  }
}

export default new CategoryRepository()
