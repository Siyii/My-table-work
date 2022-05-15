/**
 * 跳到前一页或后一页，或者指定页数
 * * @param flag prev | next | number
 */
const jumpToPage = (flag: 'prev' | 'next' | number) => {};

/**
 * 页码发生变化时触发
 * * @param page 当前页码
 */
const handlePageChange = (page: number) => {};

export { jumpToPage, handlePageChange };
