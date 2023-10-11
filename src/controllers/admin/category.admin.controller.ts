import { NextFunction, Response } from 'express'
import BaseController from '../../core/contracts/baseController'
import { CustomRequest } from '../../core/contracts/http'
import { CategoryRepository } from '../../core/repositories/category.repository'
import CategoryAdminService from '../../services/admin/category.admin.service'

class CategoryAdminController extends BaseController {
  constructor(private readonly categoryAdminService: CategoryAdminService) {
    super()
  }

  async findAll(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const categories = await this.categoryAdminService.findAll()
      return this.sendResponse(res, 200, {
        categories,
      })
    } catch (error) {
      next(error)
    }
  }

  async findOne(
    { params: { id } }: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const category = await this.categoryAdminService.findOne({ _id: id })
      return this.sendResponse(res, 200, {
        category,
      })
    } catch (error) {
      next(error)
    }
  }

  async create(
    { body: { title }, session }: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const newCategory = await this.categoryAdminService.create(
        title,
        session.user.id
      )
      return this.sendResponse(res, 201, newCategory)
    } catch (error) {
      next(error)
    }
  }

  async update(
    { params: { id }, body: { title } }: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const updateCategory = await this.categoryAdminService.update(id, title)
      return this.sendResponse(res, 200, updateCategory)
    } catch (error) {
      next(error)
    }
  }

  async delete(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      await this.categoryAdminService.delete(req.params.id)
      return this.sendResponse(res, 200)
    } catch (error) {
      next(error)
    }
  }
}

export default new CategoryAdminController(
  new CategoryAdminService(new CategoryRepository())
)
