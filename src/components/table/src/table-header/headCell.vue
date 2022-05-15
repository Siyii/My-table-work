<template>
  <th>
    <template v-if="isDefineColumn">
      {{ data.children.header() }}
    </template>
    <template v-else>
      {{ data.props.label }}
    </template>
    <template v-if="rootProps.sort && rootProps.sort.key === data.props.prop">
      <span class="table-head_sort">
        <i
          class="table-head_sort-caret ascending"
          @click="sort('asc', rootProps.sort && rootProps.sort.key)"
        ></i>
        <i
          class="table-head_sort-caret descending"
          @click="sort('desc', rootProps.sort && rootProps.sort.key)"
        ></i>
      </span>
    </template>
  </th>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed } from 'vue';
import { isFunction } from 'lodash';

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
  name: 'MyHeaderCell',
  props: props,
  emits: ['sort'],
  setup(props, { emit }) {
    const { data, rootProps } = toRefs(props);

    const isDefineColumn = computed(
      // eslint-disable-next-line
      () => (data as any).children && isFunction((data as any).children.header)
    );

    const sort = (order: 'asc' | 'desc', key: string | undefined) => {
      emit('sort', order, key);
    };

    return {
      data,
      rootProps,
      isDefineColumn,
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
