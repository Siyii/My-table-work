<template>
  <tbody>
    <tr>
      <td :colspan="length">{rootProps.emptyText}</td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import type { TableProps, DefaultRow } from '../types';

const prop = {
  rootProps: {
    type: Object as PropType<TableProps<DefaultRow>>,
    default: () => ({}),
  },
  length: {
    type: Number,
    default: 0,
  },
};

export default defineComponent({
  name: 'MyTableEmpty',
  props: prop,
});
</script>

<style scoped></style>
