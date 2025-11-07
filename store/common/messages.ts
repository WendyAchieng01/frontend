import type { IChat, IMessage, IMessageCreatePayload } from "~/types/common.d";
import { useAppStore } from "~/store/app";

export const useMessagesStore = defineStore("messages", () => {
  // State
  const chats = ref<IChat[]>([]);
  const currentChatMessages = ref<IMessage[]>([]);
  const isLoading = ref<boolean>(false);
  const totalChatsCount = ref<number>(0);
  const totalMessagesCount = ref<number>(0);
  const currentChatSlug = ref<string | null>(null);

  // Getters
  const hasChats = computed(() => chats.value.length > 0);
  const hasCurrentChatMessages = computed(
    () => currentChatMessages.value.length > 0
  );

  const { $apiClient } = useNuxtApp();
  const appStore = useAppStore();

  // Actions

  /**
   * Fetches a paginated list of all chats for the authenticated user.
   * @param params Optional query parameters for filtering/pagination.
   */
  async function fetchChats(params?: {
    page?: number;
    pageSize?: number;
    search?: string;
    ordering?: string;
  }) {
    isLoading.value = true;
    try {
      const response = await $apiClient<PaginatedResponse<IChat>>(
        "/messages/chats/",
        {
          method: "GET",
          query: params,
        }
      );
      chats.value = response.results;
      totalChatsCount.value = response.count;
      return response.results;
    } catch (error: any) {
      console.error("Failed to fetch chats:", error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load chats.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Fetches a paginated list of messages within a specific chat.
   * @param chatSlug The slug of the chat to fetch messages from.
   * @param params Optional query parameters for pagination.
   */
  async function fetchMessages(
    chatSlug: string,
    params?: { page?: number; pageSize?: number; ordering?: string }
  ) {
    isLoading.value = true;
    try {
      const response = await $apiClient<PaginatedResponse<IMessage>>(
        `/messages/chats/${chatSlug}/message/`,
        {
          method: "GET",
          query: params,
        }
      );
      currentChatMessages.value = response.results;
      totalMessagesCount.value = response.count;
      currentChatSlug.value = chatSlug;
      return response.results;
    } catch (error: any) {
      console.error(`Failed to fetch messages for chat ${chatSlug}:`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to load messages.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Sends a new message to a specific chat.
   * @param chatSlug The slug of the chat to send the message to.
   * @param payload The message content.
   */
  async function sendMessage(
    chatSlug: string,
    payload: IMessageCreatePayload | FormData
  ) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IMessage>(
        `/messages/chats/${chatSlug}/`,
        {
          method: "POST",
          body: payload,
        }
      );
      await fetchChats();
      appStore.showSnackBar({
        type: "success",
        message: "Message sent successfully!",
      });
      return response;
    } catch (error: any) {
      console.error(`Failed to send message to chat ${chatSlug}:`, error);
      appStore.showSnackBar({
        type: "error",
        message: "Failed to send message.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Updates an existing message in a chat.
   * @param chatSlug The slug of the chat where the message is located.
   * @param messageId The ID of the message to update.
   * @param payload The partial message content to update.
   */
  async function updateMessage(
    chatSlug: string,
    messageId: number,
    payload: Partial<IMessageCreatePayload>
  ) {
    isLoading.value = true;
    try {
      const response = await $apiClient<IMessage>(
        `/messages/chats/${chatSlug}/message/${messageId}/`,
        {
          method: "PATCH",
          body: payload,
        }
      );
      // Update the message in the local array if it exists
      const index = currentChatMessages.value.findIndex(
        (msg) => msg.id === messageId
      );
      if (index !== -1) {
        currentChatMessages.value[index] = {
          ...currentChatMessages.value[index],
          ...response,
        };
      }
      appStore.showSnackBar({
        type: "success",
        message: "Message updated successfully!",
      });
      return response;
    } catch (error: any) {
      console.error(
        `Failed to update message ID ${messageId} in chat ${chatSlug}:`,
        error
      );
      appStore.showSnackBar({
        type: "error",
        message: "Failed to update message.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Deletes a message from a chat.
   * @param chatSlug The slug of the chat where the message is located.
   * @param messageId The ID of the message to delete.
   */
  async function deleteMessage(chatSlug: string, messageId: number) {
    isLoading.value = true;
    try {
      await $apiClient<any>(
        `/messages/chats/${chatSlug}/message/${messageId}/`,
        {
          method: "DELETE",
        }
      );
      currentChatMessages.value = currentChatMessages.value.filter(
        (msg) => msg.id !== messageId
      );
      appStore.showSnackBar({
        type: "success",
        message: "Message deleted successfully!",
      });
    } catch (error: any) {
      console.error(
        `Failed to delete message ID ${messageId} from chat ${chatSlug}:`,
        error
      );
      appStore.showSnackBar({
        type: "error",
        message: "Failed to delete message.",
      });
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  }

  return {
    chats,
    currentChatMessages,
    isLoading,
    totalChatsCount,
    totalMessagesCount,
    currentChatSlug,
    hasChats,
    hasCurrentChatMessages,
    fetchChats,
    fetchMessages,
    sendMessage,
    updateMessage,
    deleteMessage,
  };
});
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
