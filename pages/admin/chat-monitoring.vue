<template>
  <v-row>
    <v-col cols="4">
      <div class="border">
        <p class="text-subtitle-1 mt-3 font-weight-medium text-center">
          Messages
        </p>
        <v-text-field
          label="Search"
          prepend-inner-icon="mdi-magnify"
          density="comfortable"
          variant="solo-filled"
          class="mx-3 mt-3 rounded-lg"
          flat
        />

        <!-- chat items -->
        <div class="d-flex">
          <v-virtual-scroll
            :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
            item-height="50"
          >
            <template #default="{ item: n }">
              <v-list-item link class="py-3 mx-0" :active="n == 1">
                <template #title>
                  <p class="text-subtitle-2 font-weight-medium">Jenny Wilson</p>
                </template>
                <template #subtitle>
                  <p class="text-caption text-truncate">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Pariatur delectus vel ducimus dolores perferendis, aliquid
                    voluptates fugit voluptate facilis quia libero laudantium
                    nisi labore dolorem sunt qui rem amet soluta.
                  </p>
                </template>
                <template #prepend>
                  <div class="d-flex ga-2">
                    <v-badge
                      dot
                      location="bottom end"
                      color="success"
                      offset-x="2"
                      offset-y="4"
                      bordered
                    >
                      <v-avatar
                        :image="`https://i.pravatar.cc?img=${n + 10}`"
                      />
                    </v-badge>
                    <v-badge
                      dot
                      location="bottom end"
                      color="success"
                      offset-x="2"
                      offset-y="4"
                      bordered
                    >
                      <v-avatar
                        :image="`https://i.pravatar.cc?img=${n + 12}`"
                      />
                    </v-badge>
                  </div>
                </template>
                <template #append>
                  <div class="d-flex flex-column ga-1">
                    <p class="text-caption">
                      {{
                        n == 1
                          ? "just now"
                          : [2, 3, 4].includes(n)
                          ? "1h"
                          : "2d"
                      }}
                    </p>
                    <v-icon
                      v-if="[2, 3].includes(n)"
                      icon="mdi-circle-medium"
                      size="20"
                      color="primary"
                      class="justify-end w-100"
                    />
                  </div>
                </template>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </div>
      </div>
    </v-col>

    <!-- active chat -->
    <v-col cols="8">
      <div class="border h-100">
        <div class="d-flex">
          <v-list-item class="my-2 py-2">
            <template #title>
              <p class="text-subtitle-2 font-weight-medium">Jenny Wilson & John Doe</p>
            </template>
            <template #subtitle>
              <p class="text-caption text-truncate ml-1">Both Active</p>
            </template>
            <template #prepend>
              <div class="d-flex ga-2">
                <v-badge
                  dot
                  location="bottom end"
                  color="success"
                  offset-x="2"
                  offset-y="10"
                  bordered
                >
                  <v-avatar
                    :image="`https://i.pravatar.cc?img=${11}`"
                    size="x-large"
                  />
                </v-badge>
                <v-badge
                  dot
                  location="bottom end"
                  color="success"
                  offset-x="2"
                  offset-y="10"
                  bordered
                >
                  <v-avatar
                    :image="`https://i.pravatar.cc?img=${13}`"
                    size="x-large"
                  />
                </v-badge>
              </div>
            </template>
          </v-list-item>
        </div>

        <v-divider />

        <div class="h-75">
          <v-infinite-scroll :items="[1, 2, 3, 4]" side="start" height="560">
            <template v-for="item in 4" :key="item">
              <v-row :justify="item % 2 === 0 ? 'start' : 'end'" class="mx-2">
                <v-col cols="10">
                  <v-avatar
                    v-if="item % 2 == 0"
                    :image="`https://i.pravatar.cc?img=${32}`"
                    size="x-small"
                  />
                  <v-card
                    flat
                    :variant="item % 2 == 0 ? 'tonal' : 'flat'"
                    class="mt-1"
                    :color="item % 2 == 0 ? '' : 'primary'"
                  >
                    <template #text>
                      Hello and thanks for signing up to the course. If you have
                      any questions about the course or Adobe XD, feel free to
                      get in touch and I'll be happy to help 😀
                    </template>
                  </v-card>
                  <!-- File in chat start -->
                  <v-chip
                    class="mt-2 rounded"
                    size="small"
                    color="primary"
                    link
                  >
                    <div class="d-flex">
                      <v-icon icon="mdi-attachment" />
                      <span class="ml-2">file.pdf</span>
                    </div>
                  </v-chip>
                  <!-- File in chat end -->
                </v-col>
              </v-row>
            </template>
          </v-infinite-scroll>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
</script>
