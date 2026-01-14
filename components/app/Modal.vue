<template>
  <v-dialog v-model="showDialog" @update:model-value="handleDialogToggle">
    <v-card append-icon="mdi-close" width="450" rounded="lg" class="mx-auto">
      <template #append>
        <v-icon icon="mdi-close" @click="showDialog = false" />
      </template>
      <template #text>
        <div class="d-flex flex-column align-center justify-center">
          <v-icon :icon :size="iconSize" :color />

          <p v-if="title" class="text-h6 text-center" :class="`text-${color}`">
            {{ title }}
          </p>
          <p class="text-center text-subtitle-1 w-75">
            {{ message ?? "No message provided testing this thing" }}
          </p>

          <!-- actions -->
          <div class="d-flex justify-center ga-2 mt-5">
            <v-btn
            v-if="showCancel"
              variant="outlined"
              :text="cancelText"
              min-width="150"
              @click="showDialog = false"
            />
            <v-btn
              :text="actionText ?? 'Okay'"
              min-width="150"
              @click="$emit('actionClick')"
            />
          </div>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const showDialog = defineModel<boolean>("modelValue", {
  required: true,
});
withDefaults(
  defineProps<{
    icon?: string;
    iconSize?: number | string;
    color?: string;
    title?: string;
    message?: string;
    actionText?: string;
    showCancel?: boolean;
    cancelText?: string;
  }>(),
  {
    icon: "mdi-check-decagram",
    iconSize: 100,
    color: "green",
    title: "",
    message: "No message provided testing this thing",
    actionText: "Okay",
    cancelText: "Cancel",
  }
);
const emit = defineEmits<{
  opened: [];
  closed: [];
  actionClick: [];
}>();

function handleDialogToggle(value: boolean) {
  if (value) emit("opened");
  else emit("closed");
}
</script>
