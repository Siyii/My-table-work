<template>
  <table class="table">
    <thead>
      <tr>
        <th
          scope="col"
          v-for="(col, index) in columnFieldList"
          :key="`table-head-${index}`"
        >
          {{ col }}
          <template v-if="sort && sort.key === col">
            <span class="table-head_sort">
              <i
                class="table-head_sort-caret ascending"
                @click="sortColsData('asc', col)"
              ></i>
              <i
                class="table-head_sort-caret descending"
                @click="sortColsData('desc', col)"
              ></i>
            </span>
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="data.length === 0">
        <tr>
          <td :colspan="columnFieldList.length">{{ emptyText }}</td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="(row, index) in data" :key="`table-body-${index}`">
          <td
            v-for="(field, index) in columnFieldList"
            :key="`table-body-td-${index}`"
          >
            {{ row[field] }}
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script lang="ts">
/**
 * v1 2021.05.09
 */
import { defineComponent, toRefs, watch, ref, toRef } from 'vue';
import { tableDefaultProps, DefaultRow } from './types';
import { orderBy } from 'lodash';

export default defineComponent({
  name: 'MyTable',
  props: tableDefaultProps,
  setup(props) {
    const { tableData } = toRefs(props);
    const sort = toRef(props, 'sort');
    const data = ref<DefaultRow>([]);
    data.value = tableData.value;

    watch(tableData, () => {
      data.value = tableData.value;
    });

    const sortColsData = (type: 'asc' | 'desc', key: string) => {
      data.value = orderBy(tableData.value, [key], [type]);
    };

    if (typeof sort.value !== 'undefined') {
      sortColsData(sort.value.order, sort.value.key);
    }

    return {
      data,
      sortColsData,
    };
  },
});
</script>

<style lang="scss" scoped>
.table {
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
}
</style>
