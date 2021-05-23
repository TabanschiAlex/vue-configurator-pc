<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-btn
        v-for="link in links"
        :key="link"
        color="white"
        text
        rounded
        class="my-2"
        v-bind:href="link.href"
      >
        {{ link.name }}
      </v-btn>

      <v-spacer></v-spacer>

      <auth-modal/>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <v-footer
      color="primary lighten-1"
      padless
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-btn
          v-if="isAdmin"
          color="white"
          text
          rounded
          class="my-2"
          href="/admin"
        >
          Admin panel
        </v-btn>
        <v-col
          class="primary lighten-2 py-4 text-center white--text"
          cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>PC Configurator</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import AuthModal from '@/components/AuthModal'

export default {
  name: 'App',
  components: {
    AuthModal
  },
  data: () => ({
    isAdmin: false,
    links: [
      {
        name: 'Home',
        href: '/'
      },
      {
        name: 'Components',
        href: '/components'
      }
    ]
  })
}
</script>
