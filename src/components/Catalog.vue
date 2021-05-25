<script>
export default {
  name: "Catalog",
  data: () => ({
    selects: {
      components: {}
    },
    componentsExpansion: [
      ['CPU', 'cpu'],
      ['Motherboard', 'motherboard'],
      ['GPU', 'gpu'],
      ['RAM', 'ram'],
      ['ROM', 'rom'],
      ['PSU', 'psu'],
      ['Case', 'case'],
      ['Monitor', 'monitor'],
      ['Keyboard', 'keyboard'],
      ['Mouse', 'mouse']
    ],
    tab: undefined,
    category: undefined
  }),
  methods: {
    async changeTab() {
      await this.$store.dispatch("loadComponentList", this.componentsExpansion[this.tab][1]);
      this.category = this.componentsExpansion[this.tab][1];
    },
    async addToConfig(id) {
      return await this.$api.config.addComponent(
        {
          id: localStorage.getItem('configId'),
          category: this.category,
          component: id
        });
    }
  },
  computed: {
    components() {
      console.log(this.$store.getters.getComponentList)
      return this.$store.getters.getComponentList;
    }
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
            background-color="blue"
            v-model="tab"
            @change="changeTab"
            dark
          >
            <v-tab
              v-for="component in componentsExpansion"
              :key="component[0]"
            >
              {{ component[0] }}
            </v-tab>
          </v-tabs>
          <v-card-text class="text-center">
            <v-card v-for="(component, index) of components"
                    :key="index">
              <v-card-text
                class="text--primary d-flex justify-space-around"
              >
                <div>
                  <img
                    :src="component.photo"
                    width="150"
                    alt=""
                  />
                </div>
                <div style="text-align: left">
                  <p>{{ component.manufacturer }} {{ component.model }}</p>
                  Category:
                  <a href="#" class="text-muted" data-abc="true">
                    {{ category }}
                  </a>
                  <br />
                  <p class="mb-3">{{ component.description }}</p>
                </div>
                <div>
                  <h3 class="mb-0 font-weight-semibold">
                    ${{ component.price }}
                  </h3>
                  <v-btn
                    color="blue"
                    dark
                    href="/"
                    @click="addToConfig(component.id)"
                  >
                    Select
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
