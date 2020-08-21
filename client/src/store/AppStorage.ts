import { VuexModule, Mutation, Module } from 'vuex-module-decorators'
import App from '@/utils/AppInfo'

@Module
export default class SessionStore extends VuexModule {
  public info: App = { name: '', version: '', company: { name: '', logo: '' } }

  @Mutation
  setApp(app: App) {
    app.name = app.name.charAt(0).toUpperCase() + app.name.slice(1)
    this.info = app
  }
}
