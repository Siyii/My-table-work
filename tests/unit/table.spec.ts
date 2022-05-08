import { shallowMount, mount } from '@vue/test-utils';
import Table from '../../src/components/table/index.vue';

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
        Table,
      },
      template: `
      <Table
        ref="table"
        :columnFieldList="columnFieldList"
        :tableData="tableData"
        :sort="sort"
      ></Table>
      `,
      created() {
        this.columnFieldList = ['id', 'name', 'age'];
        this.tableData = mockData;
        this.sort = {
          key: 'age',
          order: 'asc',
        };
      },
    });

    it('head', () => {
      const cols = wrapper.findAll('thead th');
      expect(cols.map((node) => node.text()).filter((o) => o)).toEqual([
        'id',
        'name',
        'age',
      ]);
    });

    it('row data', () => {
      const cells = wrapper.findAll('td').map((node) => node.text());
      const testDataArr = mockData.flatMap((cur) => {
        return Object.values(cur).map(String);
      });
      expect(cells).toEqual(testDataArr);
      wrapper.unmount();
    });

    it('sort data', () => {
      const lastCells = wrapper.findAll('tbody tr td:last-child');
      expect(lastCells.map((node) => node.text())).toEqual(['12', '13']);
      const vm = wrapper.vm;
      // console.log(vm);
      // vm.$refs.table.sortColsData('desc', 'age');
      // expect(lastCells.map((node) => node.text())).toEqual(['13', '12']);
      // wrapper.unmount();
    });
  });
});
