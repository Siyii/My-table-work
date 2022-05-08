<template>
  <div class="container">
    <RTable
      :columnFieldList="columnFieldList"
      :tableData="realTableData"
      :sort="sortConfig"
    ></RTable>
    <RPagination
      :size="size"
      :total="tableData.length"
      :currentPage="currentPage"
      @onPageChange="onPageChange"
    ></RPagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted, computed } from 'vue';
import RTable from '@/components/table/index.vue';
import RPagination from '@/components/pagination/index.vue';
import Mock from 'mockjs';

interface User {
  name: string;
  city: string;
  url: string;
  email: string;
  ip: string;
}

export default defineComponent({
  name: 'UserDemo',
  components: {
    RTable,
    RPagination,
  },
  setup(props) {
    const size = 10;
    const currentPage = ref(1);
    const tableData = ref<User[]>([]);
    const columnFieldList = ['name', 'city', 'age', 'email', 'ip'];
    const sortConfig = {
      key: 'age',
      order: 'desc',
    };

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

    const onPageChange = (page: number) => {
      currentPage.value = page;
    };

    return {
      size,
      sortConfig,
      tableData,
      realTableData,
      currentPage,
      columnFieldList,
      onPageChange,
    };
  },
});
</script>
