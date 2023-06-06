import BaseService from '../../core/contracts/baseService'
import { CategoryDocument } from '../../core/contracts/models'
import { CategoryRepository } from '../../core/repositories/category.repository'

export default class CategoryAdminService extends BaseService {
  constructor(private readonly categoryRepository: CategoryRepository) {
    super()
  }

  async findAll(): Promise<CategoryDocument[]> {
    try {
      return await this.categoryRepository.findAll()
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string): Promise<CategoryDocument> {
    try {
      return await this.categoryRepository.findById(id)
    } catch (error) {
      throw error
    }
  }

  async create(title: string, user: string): Promise<void> {
    try {
      await this.categoryRepository.create(title, user)
    } catch (error) {
      throw error
    }
  }

  async update(id: string, title: string): Promise<void> {
    try {
      await this.categoryRepository.update(id, title)
    } catch (error) {
      throw error
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.categoryRepository.delete(id)
    } catch (error) {
      throw error
    }
  }
}
