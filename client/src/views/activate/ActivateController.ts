import Vue from 'vue'
import Component from 'vue-class-component'
import Password from '@/components/password.vue'

interface Query {
  username: string
  image?: string
  email: string
  verificationToken: string
}

@Component({ name: 'activate-page', components: { Password } })
export default class ActivateController extends Vue {
  private password = ''
  private confirmation = ''
  private isValidForm = false
  public alert = false
  public error = ''
  private query: Query = { username: '', email: '', verificationToken: '' }

  // Validations
  private rules: object = {}

  beforeMount() {
    if (this.$route.query.query) {
      // eslint-disable-next-line
      // @ts-ignore
      this.query = JSON.parse(this.$route.query.query)
    }
  }

  public async activate(): Promise<void> {}
}
