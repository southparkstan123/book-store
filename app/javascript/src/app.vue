<template>
  <div>
    <modal
      v-if="modal.visible"
      :type="modal.type"
      @confirm="onConfirm"
    >
      <h4
        slot="header"
        class="modal-title"
      >
        {{ modal.title }}
      </h4>
      <p slot="message-body">
        {{ modal.message }}
      </p>
      <div slot="form-body">
        <component :is="modal.component" />
      </div>
    </modal>
    <router-view />
  </div>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex';
import Modal from '@/components/Modal.vue';

export default {
  components: {
    'modal': Modal,
  },
  computed: {
    ...mapGetters({
      modal: 'modal/getModalObject',
    })
  },
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
      });
    },
    changeWindowWidth(payload: string): void {
      this.windowWidth = payload + 'px';
    },
    onConfirm(): void {
      this.$store.dispatch(this.modal.action, this.modal.payload).then(() => {
        this.$router.go();
      });
    },
    toPage(path: string): void {
      if (this.$router.currentRoute.path !== path) {
        this.$router.push(path);
      }
    }
  }
};
</script>

<style scoped>
</style>

