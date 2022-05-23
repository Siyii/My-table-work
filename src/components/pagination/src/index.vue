<template>
  <nav class="container">
    <div class="row justify-content-end">
      <ul class="pagination justify-content-end col-8">
        <li :class="`page-item ${getPageStatus('prev')}`">
          <a class="page-link btn-prev" @click="jumpToPage('prev')">
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
import { defineComponent, ref, toRef } from 'vue';
import { defaultProps } from './types';
import { usePage } from './composables/usePage';

export default defineComponent({
  name: 'RosePagination',
  props: defaultProps,
  setup(props, { emit, expose }) {
    const jumpInputValue = ref(1);
    const currentPage = toRef(props, 'currentPage');

    const pageContext = usePage(props, emit);
    const totalPage = pageContext.totalPage;

    // 计算当前按钮的样式状态
    const getPageStatus = (page: string | number) => {
      if (typeof page === 'number') {
        return currentPage.value === page ? 'active' : '';
      }
      if (page === 'next') {
        // 当前页数为页数时不能下一页
        return currentPage.value === totalPage ? 'disabled' : '';
      }
      // 当前页数是第一页时不能前一页
      return currentPage.value === 1 ? 'disabled' : '';
    };

    const jumpToPage = (page: 'prev' | 'next' | number) => {
      pageContext.jumpNewPage(page, currentPage.value);
    };

    const goToPage = () => {
      let page = pageContext.inputJumpPage(jumpInputValue.value);
      jumpInputValue.value = page;
    };

    expose({
      jumpToPage: jumpToPage,
    });

    return {
      totalPage,
      currentPage,
      jumpInputValue,
      getPageStatus,
      goToPage,
      jumpToPage,
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
