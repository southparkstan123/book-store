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
    <nav-bar 
      :backgroundColor="backgroundColor" 
      @changeWindowWidth="changeWindowWidth"
      v-if="isAuthenticated"
    >
      <template slot="body-content">
        <div>
          <a class="cursor-pointer link text-red-400 mx-2" @click="toPage('/')">
            Main Page
          </a>
          <a class="cursor-pointer link text-red-400 mx-2" @click="toPage('/books')">
            Books
          </a>
          <a class="cursor-pointer link text-red-400 mx-2" @click="toPage('/authors')">
            Authors
          </a>
          <a class="cursor-pointer link text-red-400 mx-2" @click="toPage('/publishers')">
            Publishers
          </a>
        </div>
      </template>
      <template slot="footer-content">
        <a class="cursor-pointer link text-red-400 mx-2" @click="onLogout">
          Logout
        </a>
      </template>
      <menu-icon slot="open-button" :strokeColor="'black'" :strokeWidth="'3'"/>
      <close-icon slot="close-button" :strokeColor="'black'" :strokeWidth="'3'"/>
    </nav-bar>
    <slide-transition>
      <router-view></router-view>
    </slide-transition>
  </div>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
// Modal
import Modal from '@/components/Modal.vue';

// Icons
import MenuIcon from '@/components/icons/MenuIcon.vue';
import CloseIcon from '@/components/icons/CloseIcon.vue';
import MyVueNavBar from '@/components/menu/MyVueNavBar.vue';
import SlideTransition from '@/components/SlideTransition.vue';

export default {
  components: {
    'modal': Modal,
    'menu-icon': MenuIcon,
    'close-icon': CloseIcon,
    'nav-bar': MyVueNavBar,
    'slide-transition': SlideTransition

  },
  computed: {
    ...mapGetters({
      modal: 'modal/getModalObject',
      isAuthenticated: 'user/isAuthenticated'
    })
  },
  data(): { backgroundColor: string, windowWidth: string } {
    return {
      backgroundColor: 'gray',
      windowWidth: '100%'
    };
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
    onConfirm(refreshPage: boolean): void {
      this.$store.dispatch(this.modal.action, this.modal.payload);
      if(refreshPage){
        this.$router.go(); 
      }
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

