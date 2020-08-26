<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      scroll-target="#scrolling-techniques-7"
      color="primary"
      elevate-on-scroll
      absolute
      dense
      dark
    >
      <v-toolbar-title>Hospital</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn :disabled="!isValidForm" @click="update()" icon>
        <v-icon small>fa-save</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet id="scrolling-techniques-7" class="overflow-y-auto">
      <v-container style="height: 100vh; padding-top: 50px;">
        <v-form @submit.prevent="update" ref="form" v-model="isValidForm" lazy-validation>
          <v-row>
            <v-col md="4"
              ><v-img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT6Fq1v5hHEFrPdZgxbd0HVcWQ7Qj2DSGYlvg&usqp=CAU"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template> </v-img
            ></v-col>
            <v-col md="8">
              <v-row>
                <v-col md="12">
                  <v-text-field
                    v-model="hospital.name"
                    :rules="rules.required"
                    autocomplete="off"
                    label="Nombre"
                    outlined
                    dense
                /></v-col>
                <v-col md="12">
                  <v-text-field
                    v-model="hospital.smallName"
                    autocomplete="off"
                    label="Nombre corto"
                    outlined
                    dense
                /></v-col>
                <v-col md="6">
                  <v-text-field
                    v-model="hospital.mobile"
                    v-mask="['### ### ####']"
                    :rules="rules.mobile"
                    autocomplete="off"
                    label="Teléfono móvile"
                    outlined
                    dense
                /></v-col>
                <v-col md="6">
                  <v-text-field
                    v-model="hospital.telephone"
                    v-mask="['# ### ###', '### ### ###']"
                    :rules="rules.telephone"
                    autocomplete="off"
                    label="Teléfono fijo"
                    outlined
                    dense
                /></v-col>
                <v-col md="12">
                  <v-text-field
                    v-model="hospital.email"
                    :rules="rules.email"
                    autocomplete="off"
                    label="Correo electrónico"
                    outlined
                    dense
                /></v-col>
                <v-col md="12">
                  <v-text-field
                    v-model="hospital.manager"
                    :rules="rules.required"
                    autocomplete="off"
                    label="Gerente"
                    outlined
                    dense
                /></v-col>
                <v-col md="12">
                  <v-text-field
                    v-model="hospital.ruc"
                    autocomplete="off"
                    label="RUC"
                    outlined
                    dense
                /></v-col>
                <v-col md="12">
                  <v-text-field
                    v-model="hospital.address"
                    :rules="rules.required"
                    autocomplete="off"
                    label="Dirección"
                    outlined
                    dense
                /></v-col>
                <v-col md="12">
                  <v-text-field
                    v-model="hospital.description"
                    autocomplete="off"
                    label="Descripción"
                    outlined
                    dense
                /></v-col>
                <v-col md="6">
                  <color-picker
                    v-model="hospital.primaryColor"
                    autocomplete="off"
                    label="Color primario"
                  />
                </v-col>
                <v-col md="6">
                  <color-picker
                    v-model="hospital.secondaryColor"
                    autocomplete="off"
                    label="Color secundario"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-sheet>
  </v-card>
</template>
<script lang="ts">
//@ts-ignore
import Controller from './HospitalController'
export default Controller
</script>
