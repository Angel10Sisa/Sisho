<template>
  <v-app class="primary">
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <v-progress-circular :size="125" color="#00bcd4" indeterminate>
              <img src="/logo.svg" alt="Sisho" width="60" />
            </v-progress-circular>
            <h1 style="margin-top: 50px; color: #00bcd4;">Sisho</h1>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
//@ts-ignore
import Controller from './RootPageCtrl'
export default Controller
</script>
