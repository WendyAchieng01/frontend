<template>
  <div id="faq">
    <p class="text-h4 text-center">Frequently Asked Questions</p>
    <v-expansion-panels
      class="mt-10"
      rounded="lg"
      expand-icon="mdi-chevron-right"
      collapse-icon="mdi-chevron-down-circle"
      mandatory="force"
      flat
    >
      <v-expansion-panel v-for="n in 5" :key="n" class="mt-3 pa-3 elevation-1">
        <v-expansion-panel-title>
          <p class="text-subtitle-1 font-weight-medium">
            What is Webflow and why is it the best website builder?
          </p>

          <template #actions="{ expanded }">
            <div
              class="neumorphic-icon-wrapper rounded-circle pa-2"
              :class="{
                'neumorphic-outset': !expanded,
                'bg-secondary': expanded,
              }"
            >
              <v-icon
                :icon="expanded ? 'mdi-chevron-down' : 'mdi-chevron-right'"
                size="25"
                :color="expanded ? 'white' : 'secondary'"
              />
            </div>
          </template>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <p class="text-body-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped>
.neumorphic-icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
}

.neumorphic-outset {
  background-color: #ffffff;
  box-shadow: 4px 4px 8px #cecece, -4px -4px 8px #ffffff;
}
</style>
