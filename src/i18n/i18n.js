import lang from './zh-hk.json';

const i18n = (src, params) => {
  const result = lang[src];

  if (result) {
    if (params) {
      return Object.keys(params).reduce((acc, key) => acc.replace(`{{${key}}}`, params[key]), lang[src]);
    }

    return result;
  }

  return '';
};

export default i18n;
