<template>
  <div class="min-h-screen flex items-center justify-center">
    <button @click="onLogout">
      Logout
    </button>
  </div>
</template>

<script lang="ts">
import { mapActions } from 'vuex';
export default {
  methods: {
    ...mapActions({
      openModal: 'modal/openModal'
    }),
    onLogout(): void {
      this.openModal({
        type: 'confirm',
        title: 'Logout',
        message: 'Are you sure?',
        action: 'user/signout'
      }).then(() => console.log('open'));
    }
  }
};
</script>

<style scoped>

</style>