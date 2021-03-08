type ErrorState = {
  errors: Array<string>
}

export default {
  data(): ErrorState {
    return {
      errors: []
    };
  },
  methods: {
    onHandleError(error: any): void {
      const { status }  = error.response;
      const { message, errors } = error.response.data;

      this.openModal({
        type: 'alert',
        message,
        title: `${status} Error`,
      });

      if(errors){
        this.errors = errors;
      }

    }
  },
};