/**
 * 跳到前一页或后一页，或者指定页数
 * * @param flag prev | next | number
 */

import { SetupContext, toRefs } from 'vue';

// eslint-disable-next-line
import { PaginationProps } from '../types';
// export type PaginationProps = typeof defaultProps; 此处无法兼容，暂时无法解决

// eslint-disable-next-line
export const usePage = (props: any, emit: SetupContext['emit']) => {
  const { total, size } = toRefs(props);

  // 处理总页数
  const getTotalPage = (total: number, size: number) => {
    return Math.ceil(total / size);
  };
  const totalPage = getTotalPage(total.value, size.value);

  // 前一页/后一页/选择页数
  const jumpNewPage = (
    flag: 'prev' | 'next' | number,
    curPage: number | undefined
  ) => {
    if (typeof curPage === 'undefined') {
      throw '无法获取当前页码，排序出错';
    }
    let newPage = flag;
    if (typeof flag === 'string') {
      newPage = flag === 'next' ? curPage + 1 : curPage - 1;
    }
    emit('onPageChange', newPage);
  };

  // 输入页数进行跳转
  const inputJumpPage = (inputVal: number) => {
    // 对输入的数字向上取整，以防输入小数
    let page = Math.floor(inputVal);

    // 大于最大页数时，取最大页数
    page = page > totalPage ? totalPage : page;
    // 小于1时，取1
    page = page < 1 ? 1 : page;
    emit('onPageChange', page);
    return page;
  };

  return {
    totalPage,
    getTotalPage,
    jumpNewPage,
    inputJumpPage,
  };
};
