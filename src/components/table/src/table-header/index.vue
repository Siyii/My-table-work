<template>
  <thead>
    <tr>
      <template v-for="(child, index) in data" :key="index">
        <my-header-cell :data="child" :rootProps="rootProps" @sort="sort" />
      </template>
    </tr>
  </thead>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue';
import MyHeaderCell from './headCell.vue';

const props = {
  // 列的实例信息
  data: {
    type: Object, // TODO 此处type要定义
    default: () => ({}),
  },
  rootProps: {
    type: Object,
    default: () => ({}),
  },
};

export default defineComponent({
  name: 'MyTableHeader',
  props: props,
  emits: ['sort'],
  components: {
    MyHeaderCell,
  },
  setup(props, { emit }) {
    const { data, rootProps } = toRefs(props);

    const sort = (order: 'asc' | 'desc', key: string | undefined) => {
      emit('sort', order, key);
    };

    return {
      data,
      rootProps,
      sort,
    };
  },
});
</script>

<style lang="scss" scoped>
.table-head_sort {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  height: 14px;
  width: 24px;
  vertical-align: middle;
  cursor: pointer;
  overflow: initial;
  position: relative;

  &-caret {
    width: 0;
    height: 0;
    border: solid 5px transparent;
    position: absolute;
    left: 7px;
    cursor: pointer;
  }

  &-caret.ascending {
    border-bottom-color: #41464b;
    top: -5px;
  }

  &-caret.descending {
    border-top-color: #41464b;
    top: 10px;
  }
}
</style>
