import { NextFunction, Response } from 'express'
import BaseController from '../../core/contracts/baseController'
import { CustomRequest } from '../../core/contracts/http'
import { ArticleRepository } from '../../core/repositories/article.repository'
import ArticleUserService from '../../services/user/article.user.service'

class ArticleUserController extends BaseController {
  constructor(private readonly articleUserService: ArticleUserService) {
    super()
  }

  async findAll(
    { session: { user } }: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const articles = await this.articleUserService.findAll({
        user: user.id,
      })
      return this.sendResponse(res, 200, { articles })
    } catch (error) {
      next(error)
    }
  }

  async create(
    { body, session: { user } }: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      await this.articleUserService.create(body, user.id)
      return this.sendResponse(res, 201)
    } catch (error) {
      next(error)
    }
  }

  async update(
    { body, params: { title }, session: { user } }: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      await this.articleUserService.update({ title, user: user.id }, body)
      return this.sendResponse(res, 200)
    } catch (error) {
      next(error)
    }
  }

  async delete(
    { params: { title }, session: { user } }: CustomRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      await this.articleUserService.delete(title, user.id)
      return this.sendResponse(res, 200)
    } catch (error) {
      next(error)
    }
  }
}

export default new ArticleUserController(
  new ArticleUserService(new ArticleRepository())
)
