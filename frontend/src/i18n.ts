import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enJSON from './locales/en.json'
import hiJSON from './locales/hi.json'
import bnJSON from './locales/bn.json'
import taJSON from './locales/ta.json'
import teJSON from './locales/te.json'
import mrJSON from './locales/mr.json'
import guJSON from './locales/gu.json'
import knJSON from './locales/kn.json'
import mlJSON from './locales/ml.json'
import paJSON from './locales/pa.json'

const resources = {
  en: { translation: enJSON },
  hi: { translation: hiJSON },
  bn: { translation: bnJSON },
  ta: { translation: taJSON },
  te: { translation: teJSON },
  mr: { translation: mrJSON },
  gu: { translation: guJSON },
  kn: { translation: knJSON },
  ml: { translation: mlJSON },
  pa: { translation: paJSON }
}

const savedLanguage = localStorage.getItem('language') || 'en'

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
