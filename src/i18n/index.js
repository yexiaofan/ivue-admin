import iviewLangs from './config/iview.lang.config'
import zhLang from './config/zh_CN'
import enLang from './config/en_US'
import jaLang from './config/ja_JP'
import koLang from './config/ko_KR'

const messages = {
  zh_CN: Object.assign(zhLang, iviewLangs['zh_CN']),
  en_US: Object.assign(enLang, iviewLangs['en_US']),
  ja_JP: Object.assign(jaLang, iviewLangs['ja_JP']),
  ko_KR: Object.assign(koLang, iviewLangs['ko_KR'])
}

const localeI18n = {
  locale: 'zh_CN', // set locale
  fallbackLocale: 'zh_CN',
  messages // set locale messages
}

export default localeI18n
