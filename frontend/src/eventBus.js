import { reactive } from 'vue';

const eventBus = reactive({
  showDialog: false,
});

export default eventBus;
