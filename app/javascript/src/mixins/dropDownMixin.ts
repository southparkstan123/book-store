export default {
  props: {
    selectedItem: {
      type: Number
    },
  },
  methods: {
    onSelectItem(event: { target: { value: string }}): void {
      this.$emit('selectItem', parseInt(event.target.value, 10));
    },
  },
};