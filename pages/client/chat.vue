<template>
  <v-row class="chat">
    <v-col cols="12" md="4">
      <div class="border">
        <div class="d-flex justify-space-between px-4">
          <p class="text-subtitle-1 mt-3 font-weight-medium">Messages</p>
          <!-- <v-btn icon="mdi-pencil-outline" variant="text" /> -->
        </div>
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
            :items="chatStore.chats"
            item-height="50"
            height="100%"
          >
            <template #default="{ item: chat }">
              <v-list-item
                link
                class="py-3 mx-0"
                :active="chat.slug === selectedChat?.slug"
                @click="selectChat(chat.slug)"
              >
                <template #title>
                  <p class="text-subtitle-2 font-weight-medium">
                    {{ chat.freelancer }}
                  </p>
                </template>
                <template #subtitle>
                  <p class="text-caption text-truncate">
                    {{
                      getLatestMessage(chat)?.content?.substring(0, 30) ??
                      "Click to start a conversation"
                    }}
                  </p>
                </template>
                <template #prepend>
                  <v-badge
                    :model-value="chat.active"
                    dot
                    location="bottom end"
                    color="success"
                    offset-x="2"
                    offset-y="4"
                    bordered
                  >
                    <v-avatar :image="profileImage(chat.freelancer, '')" />
                  </v-badge>
                </template>
                <template #append>
                  <div class="d-flex flex-column ga-1">
                    <p v-if="chat.messages?.length" class="text-caption">
                      {{ getLatestMessageTime(chat) }}
                    </p>
                    <v-icon
                      v-if="false"
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

         <v-pagination
          v-model="page"
          :length="Math.ceil(chatStore.totalChatsCount / 10)"
          color="primary"
        />
      </div>
    </v-col>

    <!-- active chat -->
    <v-col cols="12" md="8">
      <div v-if="selectedChat" class="border h-100">
        <!-- chat header -->
        <div class="d-flex">
          <v-list-item class="my-2 py-2">
            <template #title>
              <p class="text-subtitle-2 font-weight-medium">
                {{ selectedChat.freelancer }}
              </p>
            </template>
            <template v-if="selectedChat.active" #subtitle>
              <p class="text-caption text-truncate">Active Now</p>
            </template>
            <template #prepend>
              <v-badge
                :model-value="selectedChat.active"
                dot
                location="bottom end"
                color="success"
                offset-x="2"
                offset-y="10"
                bordered
              >
                <v-avatar
                  :image="profileImage(selectedChat.freelancer, '')"
                  size="x-large"
                />
              </v-badge>
            </template>
          </v-list-item>
        </div>

        <v-divider />

        <!-- messages -->

        <v-infinite-scroll
          :items="selectedChat.messages"
          side="start"
          mode="manual"
          :height="$vuetify.display.xlAndUp ? 650 : 350"
        >
          <template #load-more>
            <div />
          </template>
          <template v-for="message in selectedChat.messages" :key="message.id">
            <div
              class="d-flex align-end pa-1"
              :class="{
                'justify-end': message.sender === selectedChat.client,
              }"
            >
              <v-card
                flat
                class="mt-1 w-75"
                :prepend-avatar="profileImage(selectedChat.freelancer, '')"
                :variant="
                  message.sender === selectedChat.client ? 'tonal' : 'flat'
                "
                :color="message.sender === selectedChat.client ? '' : 'primary'"
                :text="message.content"
              >
                <template #prepend>
                  <v-avatar
                    v-if="message.sender === selectedChat.client"
                    :image="profileImage(selectedChat.client, '')"
                    size="x-small"
                  />
                </template>

                <template v-if="message.attachments?.length" #actions>
                  <!-- File in chat start -->
                  <v-chip
                    v-for="attachment in message.attachments"
                    :key="attachment.id"
                    class="mt-2 rounded"
                    size="small"
                    link
                    :href="attachment.file_url"
                    target="_blank"
                  >
                    <div class="d-flex">
                      <v-icon icon="mdi-attachment" />
                      <span class="ml-2 text-truncate">{{ attachment.filename }}</span>
                    </div>
                  </v-chip>
                  <!-- File in chat end -->
                </template>
              </v-card>
            </div>
          </template>
        </v-infinite-scroll>

        <v-divider />

        <!-- send message -->
        <div class="ma-1">
          <v-textarea
            v-model="form.content"
            prepend-inner-icon="mdi-paperclip"
            placeholder="Type Something"
            append-inner-icon="mdi-send"
            variant="solo-filled"
            flat
            auto-grow
            rows="1"
            max-rows="2"
            hide-details="auto"
            :loading="chatStore.isLoading"
            :error-messages="errors.content || errors.attachments"
            @click:prepend-inner="selectAttachFile"
            @click:append-inner="sendMessage"
          />

          <div v-if="form.attachments.length" class="d-flex mb-3">
            <v-chip
              v-for="(attachment, index) in form.attachments"
              :key="index"
              class="mt-2 rounded"
              size="small"
              color="primary"
              link
              closable
              @click:close="removeAttachedFile(index)"
            >
              <div class="d-flex">
                <v-icon icon="mdi-attachment" />
                <span class="ml-2">{{ attachment.name.substring(0, 20) }}</span>
              </div>
            </v-chip>
          </div>
          <v-file-input
            ref="fileInput"
            v-model="form.attachments"
            class="d-none"
            multiple
          />
        </div>
      </div>
      <!-- no chat selected -->
      <div v-else class="border h-100 d-flex align-center justify-center">
        <v-empty-state
          title="No Chat Selected"
          text="Please select a chat to view messages."
          icon="mdi-message-off-outline"
          color="primary"
          size="70"
        />
      </div>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import moment from "moment";
import { useMessagesStore } from "~/store/common/messages";
import type { IChat } from "~/types/common";

definePageMeta({
  layout: "client",
});

const chatStore = useMessagesStore();
const page = ref(1);
const route = useRoute();
const freelancerUsername = route.query?.freelancer;
onMounted(async () => {
  await chatStore.fetchChats({ page: page.value }).then((chats) => {
    if (freelancerUsername) {
      const freelancerChat = chats.find((chat) => chat.freelancer == freelancerUsername);
      if (freelancerChat) selectedChatSlug.value = freelancerChat.slug;
    }
  })
});

watch(page, async () => await chatStore.fetchChats({ page: page.value }));

const selectedChatSlug = ref<string>("");
const selectedChat = computed(() => {
  const selectedChatIndex = chatStore.chats.findIndex(
    (chat) => chat.slug === selectedChatSlug.value
  );
  if (selectedChatIndex !== -1) return chatStore.chats[selectedChatIndex];
  else return null;
});
function selectChat(slug: string) {
  selectedChatSlug.value = slug;
  // chatStore.fetchMessages(chat.slug);
}

// send message
const { form, errors, setErrors, clearErrors, isDirty, reset } = useForm({
  content: "",
  attachments: [] as File[],
});

// file attachment
const attachmentInput = useTemplateRef("fileInput");
function selectAttachFile() {
  attachmentInput.value?.click();
}
function removeAttachedFile(index: number) {
  form.attachments.splice(index, 1);
}

async function sendMessage() {
  if (!isDirty.value) return;

  clearErrors();
  try {
    if (!selectedChat.value) {
      throw new Error("No chat selected");
    }
    await chatStore.sendMessage(
      selectedChat.value?.chat_uuid,
      toFormData(form as Record<string, any>)
    );
    reset();
    clearErrors();
  } catch (errors: any) {
    setErrors(errors.response?._data);
  }
}

function getLatestMessageTime(chat: IChat) {
  const latestMessage = getLatestMessage(chat);
  if (latestMessage) return moment(latestMessage.timestamp).fromNow();
  else return null;
}

function getLatestMessage(chat: IChat) {
  return chat.messages[chat.messages.length - 1];
}
</script>

<style scoped>
/* .chat {
  height: 85vh;
} */
</style>
