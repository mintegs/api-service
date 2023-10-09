import BaseService from '../../core/contracts/baseService'
import { CategoryDocument, CategoryFilter } from '../../core/contracts/models'
import { CategoryRepository } from '../../core/repositories/category.repository'

export default class CategoryAdminService extends BaseService {
  constructor(private readonly categoryRepository: CategoryRepository) {
    super()
  }

  async findAll(filter?: CategoryFilter): Promise<CategoryDocument[]> {
    try {
      return await this.categoryRepository.findAll(filter)
    } catch (error) {
      throw error
    }
  }

  async findOne(filter: CategoryFilter): Promise<CategoryDocument> {
    try {
      return await this.categoryRepository.findOne(filter)
    } catch (error) {
      throw error
    }
  }

  async create(title: string, user: string): Promise<CategoryDocument> {
    try {
      return await this.categoryRepository.create(title, user)
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
