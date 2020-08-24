// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Vue from 'vue'
import Vuex from 'vuex'
import app from '@/store/AppStorage'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { app }
})
