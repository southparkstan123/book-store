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
import { mapGetters } from 'vuex';
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
    onConfirm(refreshPage: boolean): void{
      this.$store.dispatch(this.modal.action, this.modal.payload);
      if(refreshPage){
        this.$router.go(); 
      }
    }
  }
};
</script>

<style scoped>
</style>

