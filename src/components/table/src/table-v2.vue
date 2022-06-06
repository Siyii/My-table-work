<template>
  <table class="table">
    <!-- 表头插槽 -->
    <slot name="header">
      <my-table-header :rootProps="props" @sort="sortColsData" />
    </slot>
    <!-- 表格空状态 -->
    <slot name="body">
      <template v-if="data.length === 0">
        <!-- 表格空状态 -->
        <slot name="empty">
          <my-table-empty
            :emptyText="props.emptyText"
            :length="columnData.length"
          />
        </slot>
      </template>
      <template v-else>
        <my-table-body :data="data"></my-table-body>
      </template>
    </slot>
  </table>
</template>

<script lang="ts">
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
  provide,
} from 'vue';
import { tableDefaultProps, DefaultRow } from './types';
import { cloneDeep } from 'lodash';
import MyTableHeader from './table-header/index.vue';
import MyTableEmpty from './table-body/empty.vue';
import MyTableBody from './table-body/index.vue';

import { useSort } from './composables/useSort';

export default defineComponent({
  name: 'MyTable',
  props: tableDefaultProps,
  components: {
    MyTableHeader,
    MyTableBody,
    MyTableEmpty,
  },
  setup(props, { emit, expose }) {
    const { tableData } = toRefs(props);
    const sort = toRef(props, 'sort');
    const data = ref<DefaultRow>([]);

    watch(tableData, () => {
      data.value = tableData.value;
    });

    const reSetData = () => {
      data.value = cloneDeep(tableData.value);
    };
    reSetData();

    let sortContext = useSort(sort.value, data.value, emit);
    if (typeof sort.value !== 'undefined') {
      data.value = sortContext.sortedData;
    }
    const sortColsData = (order: 'asc' | 'desc', key: string | undefined) => {
      data.value = sortContext.sortCb(order, key);
    };

    expose({
      sort: sortColsData,
      clearSort: () => {
        sortContext.clearCb();
        reSetData();
      },
    });

    const getChildren = () => {
      const instance = getCurrentInstance();

      const columnData = instance?.slots.default?.() || [];
      return { instance, columnData };
    };
    const { instance, columnData } = getChildren();
    provide('colsData', columnData);

    // 异常场景处理: 没有配置表格列，进行异常提示
    const expectError = () => {
      const isSlotsExist = instance?.slots.header && instance?.slots.body;
      if (
        columnData.length === 0 &&
        tableData.value.length > 0 &&
        !isSlotsExist
      ) {
        throw '没有配置表格列或插槽，数据无法正常显示';
      }
    };
    expectError();

    return {
      data,
      columnData,
      props,
      sortColsData,
    };
  },
});
</script>
