import i18n from 'i18n'
import path from 'path'

/**
 * configure shared state
 */
i18n.configure({
  locales: ['fa'],
  directory: path.join(__dirname, '../../locales'),
  defaultLocale: 'fa',
})

export default i18n
