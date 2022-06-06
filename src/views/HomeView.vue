<template>
  <div class="container">
    <my-table
      ref="tableRef"
      :tableData="realTableData"
      :sort="sortConfig"
      @onSortChange="onSortChange"
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
      ref="paginationRef"
      :size="size"
      :total="tableData.length"
      :currentPage="currentPage"
      @onPageChange="onPageChange"
    />
  </div>
</template>

<script setup lang="ts">
// /* eslint-disable */
import { ref, computed, onMounted } from 'vue';
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
 * table、pagination 对外暴露 api 使用 demo
 */
const tableRef = ref<InstanceType<typeof MyTable>>();
const paginationRef = ref<InstanceType<typeof MyPagination>>();

onMounted(() => {
  // 指定年龄进行升序
  tableRef.value.sort('asc', 'age');
  // 清除排序状态恢复无序,
  tableRef.value.clearSort();
  // // 跳到第五页
  paginationRef.value.jumpToPage(5);
});

// 排序数据改变触发事件
const onSortChange = (data: TableSortConf) => {
  let { order, key } = data;
  // 用法：向接口请求排序后的表格数据(这样可以对所有数据进行排序)
  console.log('onSortChange', order, key);
};

// 页码改变触发事件，用于监听当前页数，处理分页数据
const onPageChange = (page: number) => {
  // 获取当前页码
  currentPage.value = page;
  console.log('onPageChange', page);
};
</script>

<style lang="scss">
@import 'bootstrap/scss/bootstrap';
</style>
