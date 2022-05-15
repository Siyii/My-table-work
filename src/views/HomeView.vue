<template>
  <div class="container">
    <my-table
      ref="table"
      :tableData="realTableData"
      :sort="sortConfig"
      @handleSortChange="onSortChange"
    >
      <my-table-column prop="name" label="名字">
        <!-- 自定义某一列的表头 -->
        <template #header><strong>Name</strong></template>
      </my-table-column>

      <my-table-colum prop="city" label="城市" />

      <my-table-colum prop="age" label="年龄" />

      <my-table-colum prop="email" label="电子邮箱" />

      <my-table-colum prop="ip" label="ip" />
    </my-table>

    <!-- 提供的表格插槽 -->
    <!-- 表头插槽 -->
    <!-- <template #header>111</template> -->
    <!-- 表格空状态 -->
    <!-- <template #empty></template> -->
    <!-- 表身插槽 -->
    <!-- <template #body>222</template> -->

    <my-pagination
      ref="pagination"
      :size="size"
      :total="tableData.length"
      :currentPage="currentPage"
      @handlePageChange="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { ref, computed } from 'vue';
import { MyTable } from '@/components/table';
import { MyTableColumn } from '@/components/table';
import { MyPagination } from '@/components/pagination';
import Mock from 'mockjs';
import { TableSortConf } from '@/components/table';

interface User {
  name: string;
  city: string;
  url: string;
  email: string;
  ip: string;
}

const size = 10;
const currentPage = ref(1);
const tableData = ref<User[]>([]);
const sortConfig = {
  key: 'age',
  order: 'desc',
} as TableSortConf;

const getUserInfo = () => {
  let { array } = Mock.mock({
    'array|50': [
      {
        'name|+1': ['@name(true)'],
        'city|+1': ['@city(true)'],
        'age|+1': ['@natural(60, 100)'],
        'email|+1': ['@email()'],
        'ip|+1': ['@ip(true)'],
      },
    ],
  });
  tableData.value = array;
};
getUserInfo();

const realTableData = computed(() => {
  let startIndex = (currentPage.value - 1) * size;
  let endIndex = startIndex + size;
  return tableData.value.slice(startIndex, endIndex);
});

/**
 * table 对外暴露 api 使用 demo
 */
const tableRef = ref(null);

// 对某一列进行降序
const sortCols = (order: TableSortConf['order'], key: string) => {
  tableRef.value!.sort(order, key);
};

// 清除排序状态恢复无序
const clearSort = () => {
  tableRef.value!.clearSort();
};

// 排序数据改变触发事件
const onSortChange = (order: TableSortConf['order'], key: string, data: []) => {
  // 获取当前数据
};

/**
 * pagination 对外暴露 api 使用 demo
 */
const paginationRef = ref(null);

// 跳到前一页/后一页/某一页
const jumpPage = (data: 'prev' | 'next' | number) => {
  if (typeof data === 'string') {
    paginationRef.value!.jumpToPage(data);
    return;
  }

  paginationRef.value!.jumpToPage(data);
};

// 页码改变触发事件
const onPageChange = (page: number) => {
  // 获取当前页码
  currentPage.value = page;
};
</script>

<style lang="scss">
@import 'bootstrap/scss/bootstrap';
</style>
