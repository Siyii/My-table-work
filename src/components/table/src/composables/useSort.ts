/**
 * 对表格进行排序，可指定两种排序方式
 * @param order
 * @param prop
 */
const sort = (prop: string, order: 'asc' | 'desc') => {};

/**
 * 排序改变后触发该事件，抛出当前数据，排序列，排序方式
 */
const handleSortChange = () => {};

/**
 * 清除排序，恢复无序
 */
const clearSort = () => {};

export { sort, handleSortChange, clearSort };
