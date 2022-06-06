<template>
  <td v-for="(col, index) in colsData" :key="index">
    {{ data[col.props.prop] }}
  </td>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue';

const props = {
  data: {
    type: Object, // TODO 此处type要定义
    required: true,
  },
};

export default defineComponent({
  name: 'MyTableBodyCell',
  props: props,
  setup() {
    const colsData = inject('colsData');
    return {
      colsData,
    };
  },
});
</script>

<style scoped></style>
