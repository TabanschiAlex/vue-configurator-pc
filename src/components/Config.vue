<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" style="font-size: 28px">
        Configurator
      </v-col>

      <v-col
        cols="12"
        md="4"
        lg="3"
      >
        <v-select
          :items="selectorConfig"
          v-model="configNum"
          filled
          label="Select config"
          dense
          @change="changeConfig"
        >
        </v-select>

        <v-btn
          width="100%"
          @click="createConfig"
        >
          Add Config
        </v-btn>

        <br>
        <br>

        <v-alert v-if="compatible === 'true'"
                 text
                 type="success"
        >
          All right, all components compatible!
        </v-alert>
        <v-alert v-else-if="!compatible"
                 text
                 type="error"
        >
          Components are not compatible, check socket or format compatibles!
        </v-alert>
        <v-alert
          v-else
          text
          type="warning"
        >
          Not enough components for PC.
        </v-alert>
      </v-col>

      <v-col>
        <div>
        <v-expansion-panels class="mb-6">
          <v-expansion-panel
            v-for="(item, i) in componentsExpansion"
            :key="i"
          >
            <v-expansion-panel-header expand-icon="mdi-menu-down">
              {{ item }}
              <template v-slot:actions>
                <v-icon color="primary">
                  $expand
                </v-icon>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content v-if="!selectedList[item]">
              There is nothing here yet.
            </v-expansion-panel-content>
            <v-expansion-panel-content
              v-for="(component, i) in selectedList[item]"
              :key="i"
            >
              <v-card>
                <v-card-text class="text--primary d-flex justify-space-around">
                  <div>
                    <img src="https://i.imgur.com/5Aqgz7o.jpg" width="150" height="150" alt="">
                  </div>
                  <div style="text-align: left">
                    <p>{{ component[i].manufacturer }} {{ component[i].model }}</p>
                    Category: <a href="#" class="text-muted" data-abc="true">{{ component.category }}</a>
                    <br>
                    <p class="mb-3">{{ component[i].description }}</p></div>
                  <div>
                    <h3 class="mb-0 font-weight-semibold">${{ component[i].price }}</h3>
                    <v-btn
                      @click="deleteComponent(component)"
                      color="red"
                      text
                    >
                      Delete
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'Config',
  data () {
    return {
      componentsExpansion: [
        'cpu', 'motherboard',
        'gpu', 'ram', 'rom',
        'psu', 'case', 'monitor',
        'keyboard', 'mouse'
      ],
      configNum: undefined,
      configList: this.loadConfigs(),
      selectorConfig: [],
      selectedList: {},
      compatible: false
    }
  },
  methods: {
    deleteComponent (component) {
      console.log(component)
      component = ''
    },
    async createConfig () {
      console.log(await this.$api.config.createConfig())
    },
    async loadConfigs () {
      const configs = await this.$api.config.getConfigs()

      for (const config of configs) {
        this.selectorConfig.push(config.id)
      }

      this.configList = configs
    },
    changeConfig () {
      console.log(this.configNum)
      console.log(this.configList)
      this.selectedList = this.configList[this.configList.map((o) => o.id).indexOf(this.configNum)]
      console.log(this.selectedList)
    }
  },
  beforeRouteEnter: {

  }
}
</script>
