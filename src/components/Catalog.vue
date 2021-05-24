<script>
export default {
  name: "Catalog",
  data: () => ({
    componentsExpansion: [
      'CPU',
      'Motherboard' ,
      'GPU' ,
      'RAM',
      'ROM',
      'PSU',
      'Case',
      'Monitor',
      'Keyboard',
      'Mouse'
    ],
    length: 15,
    tab: null,
  }),
  methods: {
    async loadData() {
      try {
        this.selects.configs = await this.$api.config.getConfigsList();
      } catch (e) {
        console.log(e)
      }
    }
  },
  watch: {
    length (val) {
      this.tab = val - 1
    },
  },
  async mounted() {
    await this.loadData();
  }
}
</script>

<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" style="font-size: 28px">
        Components
      </v-col>

      <v-col cols="12">
        <v-card>
          <v-tabs
            width="100%"
            v-model="tab"
            background-color="blue"
            dark
          >
            <v-tab
              v-for="n in componentsExpansion"
              :key="n"
            >
              {{ n }}
            </v-tab>
          </v-tabs>
          <v-card-text class="text-center">

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
