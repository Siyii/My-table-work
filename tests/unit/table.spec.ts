import { shallowMount, mount } from '@vue/test-utils';
import { iteratee } from 'lodash';
import MyTable from '@/components/table/table-v2.vue';
import MyTableColumn from '@/components/table/tableColumn.vue';

const _mount = (opt: any) =>
  mount<any>(opt, {
    attachTo: 'body',
  });

const mockData = [
  {
    id: '001',
    name: 'rose',
    age: '12',
  },
  {
    id: '002',
    name: 'jack',
    age: '13',
  },
];

describe('Table.vue', () => {
  describe('rendering data is correct', () => {
    const wrapper = _mount({
      components: {
        MyTable,
        MyTableColumn,
      },
      template: `
      <my-table
        ref="table"
        :tableData="tableData"
        :sort="sort"
      >
        <my-table-column prop="name" label="名字">
          <!-- 自定义表头 -->
          <template #header><strong>Name</strong></template>
        </my-table-column>

        <my-table-colum prop="id" label="id" />

        <my-table-colum prop="age" label="年龄" />
      </my-table>
      `,
      created() {
        this.tableData = mockData;
        this.sort = {
          key: 'age',
          order: 'asc',
        };
      },
    });

    // 渲染表头
    it('head', () => {
      const cols = wrapper.findAll('thead th');
      expect(cols.map((node) => node.text()).filter((o) => o)).toEqual([
        'id',
        'name',
        'age',
      ]);
    });

    // 渲染表身
    it('row data', () => {
      const cells = wrapper.findAll('td').map((node) => node.text());
      const testDataArr = mockData.flatMap((cur) => {
        return Object.values(cur).map(String);
      });
      expect(cells).toEqual(testDataArr);
      wrapper.unmount();
    });

    // 传入排序参数进行排序
    it('sort config', () => {
      const lastCells = wrapper.findAll('tbody tr td:last-child');
      expect(lastCells.map((node) => node.text())).toEqual(['12', '13']);
      const vm = wrapper.vm;
      // console.log(vm);
      // vm.$refs.table.sortColsData('desc', 'age');
      // expect(lastCells.map((node) => node.text())).toEqual(['13', '12']);
      // wrapper.unmount();
    });

    // 手动进行排序
    it('sort data', () => {});

    // 排序触发事件
    it('sort change', () => {});

    // 重置排序
    it('clear sort', () => {});
  });
});
