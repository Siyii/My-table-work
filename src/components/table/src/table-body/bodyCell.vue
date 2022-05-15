<template>
  <td v-for="(col, index) in cols" :key="index">
    {{ data[col.props.prop] }}
  </td>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// TODO type 定义
const props = {
  data: {},
  cols: [],
};

export default defineComponent({
  name: 'MyTableBodyCell',
  props: props,
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
