import 'react-i18next';
import common from './locales/en/common.json';
import home from './locales/en/home.json';
import forms from './locales/en/forms.json';
import tours from './locales/en/tours.json';
import modal from './locales/en/modal.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common';
    resources: {
      common: typeof common;
      home: typeof home;
      forms: typeof forms;
      tours: typeof tours;
      modal: typeof modal;
    };
  }
}
