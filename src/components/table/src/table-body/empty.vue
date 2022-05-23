<template>
  <tbody>
    <tr>
      <td :colspan="length" class="text-center">{{ emptyText }}</td>
    </tr>
  </tbody>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MyTableEmpty',
  props: {
    emptyText: {
      type: String,
      default: '暂无数据',
    },
    length: {
      type: Number,
      default: 0,
    },
  },
});
</script>

<style scoped></style>
