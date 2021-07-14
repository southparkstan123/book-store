export default {
  props: {
    selectedItems: {
      type: Array
    },
  },
  methods: {
    onChange(event: any): void {
      let ids: Array<number> = [];
      const options: any = event.target.options;

      for (let index = 0; index < options.length; index++) {
        if(options[index].selected === true){
          ids.push(parseInt(options[index].value, 10));
        } 
      }
      this.$emit('selectedItems', ids);
    },
  },
};