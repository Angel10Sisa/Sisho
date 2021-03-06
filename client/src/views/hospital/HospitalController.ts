// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Vue from 'vue'
import Component from 'vue-class-component'
import color from '@/components/color.picker.vue'
import service from '@/services/HospitalService'
import { createHospital } from '@/models'
import { Hospital } from '@/models'
import alert from '@/utils/alert'
import validate from '@/utils/validations'

@Component({ name: 'hospital-page', components: { 'color-picker': color } })
export default class HospitalController extends Vue {
  /********************************************************
   *                      Attributes                       *
   ********************************************************/

  // GUI
  private isValidForm = false

  // Element data
  private hospital: Hospital = createHospital()

  // Validations
  private rules: object = {
    required: [(v: string) => validate.required(v)],
    email: [(v: string) => validate.required(v), (v: string) => validate.isEmail(v)],
    telephone: [(v: string) => validate.isTelephone(v)],
    mobile: [(v: string) => validate.isMobile(v)]
  }

  /********************************************************
   *                     Initializable                     *
   ********************************************************/
  beforeMount(): void {
    this.loadInfo()
  }

  /********************************************************
   *                    API Services                       *
   ********************************************************/
  private async loadInfo(): Promise<void> {
    await service.findDefault().then(hospital => {
      this.hospital = hospital
    })
  }

  private async update(): Promise<void> {
    //@ts-ignore
    await this.$refs.form.validate()
    service.updateDefault(this.hospital).then(() => {
      alert.onUpdateSuccess()
      // Change Theme in local
      // @ts-ignore
      this.$vuetify.theme.themes.light.primary = this.hospital.primaryColor
      // @ts-ignore
      this.$vuetify.theme.themes.light.secondary = this.hospital.secondaryColor

      sessionStorage.setItem('primary', this.hospital.primaryColor)
      sessionStorage.setItem('secondary', this.hospital.secondaryColor)
    })
  }
}
