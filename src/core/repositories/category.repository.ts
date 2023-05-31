import Category from '../../models/category.model'
import { CategoryDocument, CategoryModel } from '../contracts/models'

export class CategoryRepository {
  private categoryModel: CategoryModel

  constructor() {
    this.categoryModel = Category
  }

  async findAll(): Promise<CategoryDocument[]> {
    return await this.categoryModel.find().lean()
  }

  async findById(id: string): Promise<CategoryDocument> {
    return await this.categoryModel.findById(id).lean()
  }

  async create(title: string, user: string): Promise<void> {
    await new this.categoryModel({
      title,
      user,
    })
  }

  async update(id: string, title: string): Promise<void> {
    await this.categoryModel.findByIdAndUpdate(id, { title })
  }

  async delete(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id)
  }
}

export default new CategoryRepository()
