<template>
  <v-data-table :headers :items show-select class="border rounded-lg">
    <template #top>
      <v-tabs class="mt-5">
        <v-tab>All</v-tab>
        <v-tab>Client</v-tab>
        <v-tab>Freelancers</v-tab>
      </v-tabs>
      <v-divider />
    </template>

    <template #item.status="{ item }">
      <v-chip
        variant="text"
        :text="item.status"
        :color="item.status === 'Active' ? 'success' : 'error'"
      />
    </template>
    <template #item.actions>
      <v-menu>
        <template #activator="{ props: menuProps }">
          <div class="d-flex align-center" v-bind="menuProps">
            <v-btn
              prepend-icon="mdi-magnify"
              variant="plain"
              color=""
              text="View Chat"
            />
            <p>/</p>
            <v-btn
              prepend-icon="mdi-cog"
              variant="plain"
              text="Manage"
              color=""
            />
          </div>
        </template>

        <!-- menu content -->
        <v-list>
          <v-list-item
            title="Profile info"
            prepend-icon="mdi-account-outline"
          />
          <v-list-item
            title="View job history"
            prepend-icon="mdi-account-outline"
          />
          <v-list-item
            title="View chat thread"
            prepend-icon="mdi-message-reply-text"
            to="/admin/chat-monitoring"
          />
          <v-list-item
            title="Suspend User"
            prepend-icon="mdi-close-circle-outline"
            @click="suspendUserModal = true"
          />
          <v-list-item
            title="Reactivate User"
            prepend-icon="mdi-close-circle-outline"
            @click="reactivateUserModal = true"
          />
        </v-list>
      </v-menu>
    </template>
  </v-data-table>

  <!-- suspend user modal -->
  <AppModal
    v-model="suspendUserModal"
    color="warning"
    icon="mdi-alert"
    title="Are you sure want to suspend this user!"
    message="You won't be able to revert this!"
    action-text="Confirm"
    show-cancel
    cancel-text="Take me Back"
  />

  <!-- reactivate user modal -->
  <AppModal
    v-model="reactivateUserModal"
    color="success"
    icon="mdi-check-circle-outline"
    icon-size="80"
    title="Success"
    message="You have succesfully reactivated this user"
    action-text="Confirm"
  />
</template>

<script setup lang="ts">
const props = defineProps<{
  hideActions?: boolean;
}>();

const headers = computed(() => {
  const initialHeaders = [
    {
      title: "Job ID",
      value: "id",
    },
    {
      title: "Client Name",
      value: "client",
    },
    {
      title: "Email",
      value: "email",
    },
    {
      title: "User Type",
      value: "userType",
    },
    {
      title: "Status",
      value: "status",
    },
    {
      title: "Unread Message",
      value: "unread",
    },
    {
      title: "Last Message",
      value: "lastMessage",
    },
  ];

  if (!props.hideActions)
    initialHeaders.push({
      title: "Actions",
      value: "actions",
    });

  return [...initialHeaders];
});

const items = Array.from({ length: 5 }, (_, index) => {
  const userStatus = index % 2 === 0 ? "Active" : "Suspended";
  const userType = index % 2 === 0 ? "Client" : "Freelancer";
  return {
    id: 34234,
    client: "John Willis",
    email: "johnwillis20@gmail.com",
    userType,
    unread: Math.floor(Math.random() * 12) + 1,
    lastMessage: "Hello, I have attached the files",
    paymentStatus: index % 2 === 0 ? "Paid" : "Pending",
    status: userStatus,
  };
});

const reactivateUserModal = ref(false);
const suspendUserModal = ref(false);
</script>
