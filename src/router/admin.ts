import * as express from 'express'
import { Router } from 'express'
const adminRouter: Router = express.Router()

// validation schema
import { categoryDtoSchema } from '../core/lib/validation.schema'

// middleware
import validator from '../core/middleware/validator'

// controller
import articleAdminController from '../controllers/admin/article.admin.controller'
import categoryAdminController from '../controllers/admin/category.admin.controller'

// routes
adminRouter.get('/categories', categoryAdminController.findAll)
adminRouter.get('/categories/:id', categoryAdminController.findOne)
adminRouter.post(
  '/categories',
  validator(categoryDtoSchema),
  categoryAdminController.create
)
adminRouter.put(
  '/categories/:id',
  validator(categoryDtoSchema),
  categoryAdminController.update
)
adminRouter.delete('/categories/:id', categoryAdminController.delete)
adminRouter.get('/articles', articleAdminController.findAll)
adminRouter.get('/articles/:id', articleAdminController.findOne)

export default adminRouter
