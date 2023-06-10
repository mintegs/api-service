import { NextFunction, Response } from 'express'
import BaseController from '../../core/contracts/baseController'
import { CustomRequest } from '../../core/contracts/http'
import { ArticleRepository } from '../../core/repositories/article.repository'
import ArticleAdminService from '../../services/admin/article.admin.service'

class ArticleAdminController extends BaseController {
  constructor(private readonly articleAdminService: ArticleAdminService) {
    super()
  }

  async findAll(req: CustomRequest, res: Response, next: NextFunction) {
    try {
      const articles = await this.articleAdminService.findAll()
      return this.sendResponse(res, 200, {
        articles,
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
      const article = await this.articleAdminService.findOne({ _id: id })
      return this.sendResponse(res, 200, {
        article,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default new ArticleAdminController(
  new ArticleAdminService(new ArticleRepository())
)
