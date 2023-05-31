import Category from '../../models/category.model'
import { CategoryDocument, CategoryModel } from '../contracts/models'

export class CategoryRepository {
  private categoryModel: CategoryModel

  constructor() {
    this.categoryModel = Category
  }

  async findAll(): Promise<CategoryDocument[]> {
    return await this.categoryModel.find()
  }

  async findById(id: string): Promise<CategoryDocument> {
    return await this.categoryModel.findById(id)
  }

  async create(data): Promise<void> {
    await new this.categoryModel({
      ...data,
    })
  }

  async update(id: string, data): Promise<void> {
    await this.categoryModel.findByIdAndUpdate(id, { ...data })
  }

  async delete(id: string): Promise<void> {
    await this.categoryModel.findByIdAndDelete(id)
  }
}

export default new CategoryRepository()
