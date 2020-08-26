// Copyright Alexander Bonilla 2020. All Rights Reserved.
// Node module: sisho
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'
import deletepromt from '@/components/delete.vue'
import service from '@/services/OptionService'
import validate from '@/utils/validations'
import { createOption, Group } from '@/models'
import { Option } from '@/models'
import alert from '@/utils/alert'

@Component({ name: 'option-page', components: { deletepromt } })
export default class OptionController extends Vue {
  /********************************************************
   *                      Properties                      *
   ********************************************************/

  @Prop() group!: Group
  /********************************************************
   *                      Attributes                       *
   ********************************************************/

  // GUI
  private isValidForm = false
  private create: boolean = false

  // Element data
  private options: Option[] = []
  private optionIndex: number = -1
  private option: Option = createOption()

  // Validations
  private rules: object = {
    required: [(v: string) => validate.required(v)]
  }

  /********************************************************
   *                     Initializable                     *
   ********************************************************/
  beforeMount(): void {
    this.loadOptions()
  }

  /********************************************************
   *                    API Services                       *
   ********************************************************/

  private async loadOptions(): Promise<void> {
    service
      .find({ where: { and: [{ groupId: this.group.id }, { deleted: false }] } })
      .then(options => {
        this.options = options
      })
  }
  async createOption(): Promise<void> {
    //@ts-ignore
    await this.$refs.form.validate()
    this.option.groupId = this.group.id
    if (this.isValidForm)
      await service.create(this.option).then(element => {
        this.options.push(element)
        alert.onCreateSuccess(`${this.group.name} registrado.`)
        this.reset()
      })
  }
  async updateOption(): Promise<void> {
    const option: Option = this.option
    await service.updateById(this.option.id, option).then(() => {
      alert.onUpdateSuccess(`${this.group.name} actualizado.`)
      Object.assign(this.options[this.optionIndex], option)

      this.reset()
    })
  }
  private async removeOption(option: Option) {
    await service.delete(option.id).then(() => {
      const index = this.options.indexOf(option)
      this.options.splice(index, 1)
      alert.onDeleteSuccess(`${this.group.name} eliminado`)
    })
  }

  /********************************************************
   *                       Methods                         *
   ********************************************************/

  toEditOption(option: Option): void {
    this.optionIndex = this.options.indexOf(option)
    this.option = Object.assign({}, option)
    this.create = false
  }

  reset(): void {
    this.option = Object.assign({}, createOption())
    this.optionIndex = -1
    this.create = false
  }
}
