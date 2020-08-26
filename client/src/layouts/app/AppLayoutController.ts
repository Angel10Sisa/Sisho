import Vue from 'vue'
import Component from 'vue-class-component'
import { hasValidToken } from '@/utils/auth'

@Component({ name: 'app-yalout' })
export default class AppLayoutController extends Vue {
  mini: boolean = false
  public items: Item[] = [
    { title: 'Hospital', icon: 'fa-hospital', routerName: 'Hospital' },
    { title: 'Usuarios', icon: 'fa-user' },
    { title: 'Pacientes', icon: 'fa-user-injured' }
  ]

  public optionItems: Item[] = [
    { icon: 'fa-user-cog', title: 'Configuraciones' },
    { icon: 'fa-sign-out-alt', title: 'Salir', routerName: 'Logout' }
  ]

  async beforeMount(): Promise<void> {
    if (hasValidToken()) {
      await this.$store.dispatch('loadProfile')
    } else {
      this.$router.push({ name: 'Root' })
    }
  }

  private changeRoute(item: Item) {
    if (item.routerName === 'Logout') {
      sessionStorage.removeItem('token')
      sessionStorage.removeItem('expiresAt')
      // eslint-disable-next-line
      // @ts-ignore
      Vue.http.headers.common['Authorization'] = undefined
      this.$router.push({ name: 'Root' })
    } else {
      this.$router.push({ name: item.routerName })
    }
  }
}

interface Route {
  icon?: string
  title: string
  routerName?: string
}

interface Item {
  icon: string
  title: string
  routerName?: string
  children?: Route[]
}
