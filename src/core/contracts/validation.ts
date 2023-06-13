const roles = ['ADMIN'] as const
type Roles = (typeof roles)[number]
export const existingRole = (value: any): value is Roles =>
  roles.includes(value)

const userStatus = ['INACTIVE', 'ACTIVE', 'SUSPENDED'] as const
type UserStatus = (typeof userStatus)[number]
export const existingUserStatus = (value: any): value is UserStatus =>
  userStatus.includes(value)

const articleStatus = ['INACTIVE', 'ACTIVE'] as const
type ArticleStatus = (typeof articleStatus)[number]
export const existingArticleStatus = (value: any): value is ArticleStatus =>
  articleStatus.includes(value)
