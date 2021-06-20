export default {
  props: {
    inputId: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    inputName: {
      type: String,
      default: ''
    },
    isRequired: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: 'Placeholder'
    },
    inputValue: {
      type: String,
      default: ''
    },
    inputFieldClass: {
      type: String,
      default: 'form-control'
    }
  },
  methods: {
    changeValue(event: { target: { value: string }}): void {
      this.$emit('changeValue', event.target.value);
    }
  }
}