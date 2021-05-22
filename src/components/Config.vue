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
          :items="configList"
          filled
          label="Select config"
          dense
        ></v-select>

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
        <v-alert v-else
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
              v-for="(component) in selectedList[item]"
              :key="component"
            >
              <v-card>
                <v-card-text class="text--primary d-flex justify-space-around">
                  <div>
                    <img src="https://i.imgur.com/5Aqgz7o.jpg" width="150" height="150" alt="">
                  </div>
                  <div style="text-align: left">
                    <p>{{ component.manufacturer }} {{ component.model }}</p>
                    Category: <a href="#" class="text-muted" data-abc="true">{{ component.category }}</a>
                    <br>
                    <p class="mb-3">{{ component.description }}</p></div>
                  <div>
                    <h3 class="mb-0 font-weight-semibold">${{ component.price }}</h3>
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
      cpu: undefined,
      motherboard: undefined,
      gpu: undefined,
      ram: undefined,
      rom: undefined,
      psu: undefined,
      case: undefined,
      monitor: undefined,
      keyboard: undefined,
      mouse: undefined,
      configList: [1, 2, 3],
      selectedList: {
        cpu: [{
          manufacturer: 'intel',
          model: 'core i3 10300',
          category: 'cpu',
          description: 'osdfgdsoghsoldgojsdgsgdods',
          price: 200
        }]
      },
      compatible: false
    }
  },
  methods: {
    deleteComponent (component) {
      console.log(component)
      component = ''
    }
  }
}
</script>
