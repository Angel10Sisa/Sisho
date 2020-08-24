// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Vue from 'vue'
import Component from 'vue-class-component'
import Password from '@/components/password.vue'

@Component({ name: 'login-page', components: { Password } })
export default class LoginController extends Vue {
  public email = ''
  public password = ''
  public alert = false
  public error = ''

  public login(): void {}
}
