import { mapActions } from "vuex";

type FormState = {
  errors: Array<string>;
  isFormChanged: boolean;
}

export default {
  data(): FormState {
    return {
      errors: [],
      isFormChanged: false
    };
  },
  methods: {
    openSuccessModal(message: string, title: string): void {
      this.openModal({
        type: 'alert',
        message,
        title
      });
    },
    openErrorModal(message: string, title: string): void {
      this.openModal({
        type: 'alert',
        message,
        title: `${status} Error`
      });
    },
    async openConfirmModal(message: string, title: string): Promise<boolean> {
      return await this.openModal({
        type: 'confirm',
        message,
        title
      });
    },
    onHandleError(error: any): void {
      const { status }  = error.response;
      const { message, errors } = error.response.data;

      this.openErrorModal(message, `${status} Error`);

      if(errors){
        this.errors = errors;
      }
    },
    onChangeForm(): void {
      this.isFormChanged = true;
    },
    async beforeLeave (to: any, from: any, next: any): Promise<any> {
      if(to.matched.some(record => record.meta.forVisitorOnly) && this.isFormChanged === true) {
        const isLeave = await this.openConfirmModal('Do you really want to leave?', 'Unsaved changes');
        if (isLeave) {
          const isLogout = await this.openConfirmModal('Are you sure?', 'Logout')

          if(isLogout) {
            this.$store.dispatch('user/signout').then(() => {
              next();
            });
          } else {
            next({ path: '/'});
          }
        }
      } else if (this.isFormChanged === true) {
        const isLeave = await this.openConfirmModal('Do you really want to leave?', 'Unsaved changes');
        if (isLeave) {
          next();
        }
      } else if(to.matched.some(record => record.meta.forVisitorOnly)) {
        const isLogout = await this.openConfirmModal('Are you sure?', 'Logout')
        if(isLogout) {
          this.$store.dispatch('user/signout').then(() => {
            next();
          });
        }
      } else {
        next();
      }
    }
  },
};