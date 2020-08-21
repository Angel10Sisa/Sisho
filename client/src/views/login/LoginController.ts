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
