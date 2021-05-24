<script>
export default {
  name: "Config",
  data() {
    return {
      componentsExpansion: {
        CPU: 'cpu_config',
        Motherboard: 'motherboard',
        GPU: 'gpu_config',
        RAM: 'ram_config',
        ROM: 'rom_config',
        PSU: 'psu',
        Case: 'case',
        Monitor: 'monitor',
        Keyboard: 'keyboard',
        Mouse: 'mouse'
      },
      configId: undefined,
      selects: {
        configs: []
      },
      selectedConfig: {},
      compatible: false
    };
  },
  methods: {
    deleteComponent(component) {
      console.log(component)
      component = [];
    },
    async createConfig() {
      this.selects.configs = await this.$api.config.createConfig();
    },
    async changeConfig() {
      try {
        const elementsName = ['case', 'mouse', 'keyboard', 'monitor', 'motherboard', 'psu'];
        const config = await this.$api.config.getConfigById(this.configId);

        for (const elem of elementsName) {
          if (config[elem] == null) {
            config[elem] = [];
            continue;
          }

          config[elem] = [config[elem]];
        }

        console.log(config)
        this.selectedConfig = config;
      } catch (e) {
        console.log(e)
      }
    },
    async loadData() {
      try {
        this.selects.configs = await this.$api.config.getConfigsList();
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    await this.loadData();
  }
};
</script>

<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12" style="font-size: 28px">
        Configurator
      </v-col>

      <v-col cols="12" md="4" lg="3">
        <v-select
          :items="selects.configs"
          item-text="id"
          item-value="id"
          v-model="configId"
          filled
          label="Select config"
          dense
          @change="changeConfig"
        >
        </v-select>

        <v-btn width="100%" @click="createConfig">
          Add Config
        </v-btn>

        <br />
        <br />

        <v-alert v-if="compatible === 'true'" text type="success">
          All right, all components compatible!
        </v-alert>
        <v-alert v-else-if="!compatible" text type="error">
          Components are not compatible, check socket or format compatibles!
        </v-alert>
        <v-alert v-else text type="warning">
          Not enough components for PC.
        </v-alert>
      </v-col>

      <v-col>
        <div>
          <v-expansion-panels class="mb-6">
            <v-expansion-panel
              v-for="(item, index) in Object.keys(componentsExpansion)"
              :key="index"
            >
              <v-expansion-panel-header expand-icon="mdi-menu-down">
                {{ item }}
                <template v-slot:actions>
                  <v-icon color="primary">
                    $expand
                  </v-icon>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-card v-for="(component, index) of selectedConfig[componentsExpansion[item]]"
                        :key="`index_${index}`">
                  <v-card-text
                    class="text--primary d-flex justify-space-around"
                  >
                    <div>
                      <img
                        :src="component.photo"
                        width="150"
                        height="150"
                        alt=""
                      />
                    </div>
                    <div style="text-align: left">
                      <p>{{ component.manufacturer }} {{ component.model }}</p>
                      Category:
                      <a href="#" class="text-muted" data-abc="true">
                        {{ item }}
                      </a>
                      <br />
                      <p class="mb-3">{{ component.description }}</p>
                    </div>
                    <div>
                      <h3 class="mb-0 font-weight-semibold">
                        ${{ component.price }}
                      </h3>
                      <v-btn
                        @click="deleteComponent(selectedConfig[componentsExpansion[item]])"
                        color="red"
                        text
                      >
                        Delete
                      </v-btn>
                    </div>
                  </v-card-text>
                </v-card>
                <br>
                <v-btn
                  color="blue"
                  text
                >
                  Select {{ item }}
                </v-btn>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
