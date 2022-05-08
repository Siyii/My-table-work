# my-table-work

## Table

| 属性            | 说明             | 类型   | 默认值            |
| --------------- | ---------------- | ------ | ----------------- |
| tableData       | 显示的数据       | array  | []                |
| columnFieldList | 表头数据         | array  | []                |
| emptyText       | 数据为空时提示语 | string | 暂无数据          |
| sort            | 配置列的排序     | Object | order: asc / desc |

## Pagination

| 属性        | 说明     | 类型   | 默认值 |
| ----------- | -------- | ------ | ------ |
| size        | 页码条数 | number | 10     |
| total       | 总条数   | number | -      |
| currentPage | 当前页码 | number | 1      |
