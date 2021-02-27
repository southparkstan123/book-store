import isValidColorValue from '@/utils/isValidColorValue';
import Vue from 'vue';

export default Vue.extend({
  props: {
    strokeColor: { 
      type: String,
      default: '#000', 
      validator: (value: string) => isValidColorValue(value) || value === ''
    },
    strokeWidth: { 
      type: String,
      default: '1'
    }
  }
});