<template>
  <v-dialog v-model="showDialog">
    <v-card
      :title
      :subtitle
      :prepend-avatar="avatar"
      class="mx-auto rounded"
      :width="width ?? $vuetify.display.mobile ? '100%' : '50%'"
    >
      <template #append>
        <slot name="append" />
      </template>
      <template #text>
        <slot />
      </template>
      <template v-if="!hideActions" #actions>
        <slot name="actions">
          <div class="d-flex w-100 justify-end">
            <v-btn
              variant="text"
              text="Cancel"
              size="large"
              width="150"
              :disabled="loading"
              @click="closeDialog"
            />
            <v-btn
              variant="elevated"
              size="large"
              width="150"
              :color="actionButtonColor ?? 'primary'"
              :text="actionButtonText ?? 'Ok'"
              :loading
              @click="$emit('actionButtonClick')"
            />
          </div>
        </slot>
      </template>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const showDialog = defineModel<boolean>("modelValue", {
  default: false,
});
defineProps<{
  title: string;
  subtitle: string;
  actionButtonText?: string;
  actionButtonColor?: string;
  width?: "25%" | "50%" | "75%" | "100%";
  avatar?: string;
  hideActions?: boolean;
  loading?: boolean;
}>();
const emit = defineEmits<{
  actionButtonClick: [];
  cancelButtonClick: [];
}>();

function closeDialog() {
  showDialog.value = false;
  emit("cancelButtonClick");
}
</script>
