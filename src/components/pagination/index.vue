<template>
  <nav class="container">
    <div class="row justify-content-end">
      <ul class="pagination justify-content-end col-8">
        <li :class="`page-item ${getPageStatus('prev')}`">
          <a class="page-link btn-next" @click="jumpToPage('prev')">
            <span aria-hidden="true">&laquo; Previous</span>
          </a>
        </li>
        <li
          v-for="item in totalPage"
          :key="item"
          :class="`number page-item ${getPageStatus(item)}`"
        >
          <a class="page-link" @click="jumpToPage(item)">{{ item }}</a>
        </li>
        <li :class="`page-item ${getPageStatus('next')}`">
          <a class="page-link btn-next" @click="jumpToPage('next')">
            <span aria-hidden="true">&raquo; Next</span>
          </a>
        </li>
      </ul>
      <div class="pagination_jump col-2">
        <div class="mb-3 row">
          <label for="staticEmail" class="col-sm-4 col-form-label">Go to</label>
          <div class="col-sm-8">
            <input
              class="form-control"
              type="number"
              :controls="false"
              placeholder="1"
              v-model="jumpInputValue"
              @keyup.enter="goToPage"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  toRefs,
  watch,
  computed,
  toRef,
} from 'vue';
import defaultProps from './defaults';

export default defineComponent({
  name: 'RosePagination',
  props: defaultProps,
  setup(props, { emit }) {
    const jumpInputValue = ref(1);
    const { total, currentPage } = toRefs(props);
    const size = toRef(props, 'size');

    if (!size.value) {
      size.value = 10;
    }

    // 处理页数
    const totalPage = computed(() => {
      if (total.value) {
        return Math.ceil(total.value / size.value);
      }
      return 0;
    });

    // 计算当前按钮的样式状态
    const getPageStatus = (page: string | number) => {
      if (!currentPage.value) {
        return '';
      }
      if (typeof page === 'number') {
        return currentPage.value === page ? 'active' : '';
      }
      if (page === 'next') {
        // 当前页数为页数时不能下一页
        return currentPage.value === totalPage.value ? 'disabled' : '';
      }
      // 当前页数是第一页时不能前一页
      return currentPage.value === 1 ? 'disabled' : '';
    };

    const jumpToPage = (page: string | number) => {
      if (!currentPage.value) {
        return;
      }
      let newPage = page;
      if (typeof page === 'string') {
        newPage =
          page === 'next' ? currentPage.value + 1 : currentPage.value - 1;
      }
      emit('onPageChange', newPage);
    };

    const goToPage = () => {
      // 对输入的数字向上取整，以防输入小数
      let page = Math.floor(jumpInputValue.value);

      // 大于最大页数时，取最大页数
      page = page > totalPage.value ? totalPage.value : page;
      // 小于1时，取1
      page = page < 1 ? 1 : page;
      emit('onPageChange', page);
    };

    return {
      totalPage,
      currentPage,
      jumpInputValue,
      getPageStatus,
      jumpToPage,
      goToPage,
    };
  },
});
</script>

<style lang="scss" scoped>
.pagination_jump {
  span {
    line-height: 38px;
  }
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
