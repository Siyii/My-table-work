<template>
  <tbody>
    <tr v-for="(row, index) in data" :key="index">
      <my-table-body-cell :data="row" :cols="cols" />
    </tr>
  </tbody>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MyTableBodyCell from './bodyCell.vue';

// TODO type 定义
const props = {
  data: [],
  cols: [],
};

export default defineComponent({
  name: 'MyTableBody',
  props: props,
  components: {
    MyTableBodyCell,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
