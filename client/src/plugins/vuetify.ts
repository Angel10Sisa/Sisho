// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import es from 'vuetify/src/locale/es'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: sessionStorage.getItem('primary') || '#fff',
        secondary: sessionStorage.getItem('secondary') || '#fff',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
      }
    }
  },
  lang: {
    locales: { es },
    current: 'es'
  },
  icons: {
    iconfont: 'fa'
  }
})
