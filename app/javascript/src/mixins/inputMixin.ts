export default {
  methods: {
    changeValue(event: { target: { value: string }}): void {
      this.$emit('changeValue', event.target.value);
    }
  }
}