// vuetify.config.ts
import { defineVuetifyConfiguration } from "vuetify-nuxt-module/custom-configuration";

const formFieldsDefaults = {
  color: "primary",
  variant: "outlined",
  class: "rounded",
};

export default defineVuetifyConfiguration({
  defaults: {
    VTextField: formFieldsDefaults,
    VAutocomplete: formFieldsDefaults,
    VTextarea: formFieldsDefaults,
    VSelect: formFieldsDefaults,
    VFileInput: {
      ...formFieldsDefaults,
      prependIcon: "",
    },
    VBtn: {
      variant: "elevated",
      color: "primary",
      class: "text-capitalize rounded",
    },
  },
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#5853E0F5",
          secondary: "#0594d9",
        },
      },
    },
  },
});
