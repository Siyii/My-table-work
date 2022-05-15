<template>
  <table class="table">
    <!-- 表头插槽 -->
    <slot name="header">
      <my-table-header
        :data="columnData"
        :rootProps="props"
        @sort="sortColsData"
      />
    </slot>

    <!-- 表格空状态 -->
    <slot name="body">
      <template v-if="data.length === 0">
        <!-- 表格空状态 -->
        <slot name="empty">
          <my-table-empty :rootProps="props" :length="columnData.length" />
        </slot>
      </template>
      <template v-else>
        <my-table-body :data="data" :cols="columnData"></my-table-body>
      </template>
    </slot>
  </table>
</template>
<script lang="tsx">
/**
 * v2 2021.05.15
 */

import {
  defineComponent,
  getCurrentInstance,
  toRef,
  toRefs,
  ref,
  watch,
} from 'vue';
import { tableDefaultProps, DefaultRow } from './types';
import { orderBy, cloneDeep } from 'lodash';
import MyTableHeader from './table-header/index.vue';
import MyTableEmpty from './table-body/empty.vue';
import MyTableBody from './table-body/index.vue';

export default defineComponent({
  name: 'MyTable',
  props: tableDefaultProps,
  components: {
    MyTableHeader,
    MyTableBody,
    MyTableEmpty,
  },
  emits: ['handleSortChange'],
  setup(props, { emit }) {
    const { tableData } = toRefs(props);
    const sort = toRef(props, 'sort');
    const data = ref<DefaultRow>([]);
    data.value = cloneDeep(tableData.value);

    watch(tableData, () => {
      data.value = tableData.value;
    });

    // 排序
    // 分页

    const sortColsData = (order: 'asc' | 'desc', key: string | undefined) => {
      if (!key) {
        return;
      }
      data.value = orderBy(tableData.value, [key], [order]);
      emit('handleSortChange', order, key, data);
    };

    if (typeof sort.value !== 'undefined') {
      sortColsData(sort.value.order, sort.value.key);
    }

    const getChildren = () => {
      const instance = getCurrentInstance();
      console.log('object :>> instance', instance);
      const columnData = instance?.slots.default?.() || [];
      return columnData;
    };
    const columnData = getChildren();
    console.log('object :>> columnData', columnData);

    // 异常场景处理

    return {
      data,
      columnData,
      props,
      sortColsData,
    };
  },
});
</script>
