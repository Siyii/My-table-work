import { mount } from '@vue/test-utils';
import { MyTable, MyTableColumn } from '@/components/table';
import { orderBy } from 'lodash';

const _mount = (opt: any) =>
  mount<any>(opt, {
    attachTo: 'body',
  });

const mockData = [
  {
    id: '001',
    name: 'beauty',
    age: '12',
  },
  {
    id: '002',
    name: 'and',
    age: '11',
  },
  {
    id: '003',
    name: 'beast',
    age: '13',
  },
];

describe('表格组件', () => {
  describe('rendering data is correct', () => {
    const wrapper = _mount({
      components: {
        MyTable,
        MyTableColumn,
      },
      template: `
      <MyTable
        ref="tableRef"
        :tableData="tableData"
        :sort="sort"
      >
        <MyTableColumn prop="id" label="序号">
          <template #header><strong>Name</strong></template>
        </MyTableColumn>
        <MyTableColumn prop="name" label="名字"/>
        <MyTableColumn prop="age" label="年龄" />
      </MyTable>
      `,
      data() {
        return {
          tableData: mockData,
          sort: {
            key: 'age',
            order: 'asc',
          },
        };
      },
    });

    // 渲染表头
    it('head', () => {
      const cols = wrapper.findAll('thead th');
      expect(cols.map((node) => node.text()).filter((o) => o)).toEqual([
        'Name',
        '名字',
        '年龄',
      ]);
    });

    // 渲染表身
    it('row data', () => {
      const cells = wrapper.findAll('td').map((node) => node.text());

      // 因为渲染的数据是被排序过了的
      const sortedMockData = orderBy(mockData, ['age'], ['asc']);
      const testDataArr = sortedMockData.flatMap((cur) => {
        return Object.values(cur).map(String);
      });
      expect(cells).toEqual(testDataArr);
    });

    // 根据传入排序参数进行排序
    it('given sort config to sort and emits an event', () => {
      const lastCells = wrapper.findAll('tbody tr td:last-child');
      expect(lastCells.map((node) => node.text())).toEqual(['11', '12', '13']);

      expect(wrapper.getComponent(MyTable).emitted('onSortChange')).toEqual([
        [
          {
            order: 'asc',
            key: 'age',
          },
        ],
      ]);
    });

    // 手动进行排序
    it('sort data manually', async () => {
      await wrapper.vm.$refs.tableRef.sort('desc', 'age');
      const lastCells = wrapper.findAll('tbody tr td:last-child');
      expect(lastCells.map((node) => node.text())).toEqual(['13', '12', '11']);
    });

    // 点击表头排序按钮触发排序
    it('click sort in header icon', () => {
      wrapper.find('i.ascending').trigger('click');
      const sortChange =
        wrapper.getComponent(MyTable).emitted('onSortChange') || [];
      const lastCells = wrapper.findAll('tbody tr td:last-child');
      expect(sortChange[2]).toEqual([
        {
          order: 'asc',
          key: 'age',
        },
      ]);
      // expect(lastCells.map((node) => node.text())).toEqual(['11', '12', '13']);

      wrapper.find('i.descending').trigger('click');
      expect(sortChange[3]).toEqual([
        {
          order: 'desc',
          key: 'age',
        },
      ]);
      expect(lastCells.map((node) => node.text())).toEqual(['13', '12', '11']);
    });

    // 重置排序，恢复无序
    it('clear sort', async () => {
      await wrapper.vm.$refs.tableRef.clearSort();
      const lastCells = wrapper.findAll('tbody tr td:last-child');
      expect(lastCells.map((node) => node.text())).toEqual(['12', '11', '13']);
    });

    it('render empty table', async () => {
      await wrapper.setData({
        tableData: [],
      });
      const firstCell = wrapper.findAll('tbody tr td');
      expect(firstCell.map((node) => node.text())).toEqual(['暂无数据']);
    });
  });

  // 插槽类
  describe('render table slots', () => {
    it('render table layout', () => {
      const wrapper = mount(MyTable, {
        props: {
          tableData: mockData,
        },
        slots: {
          header: '<div>Header</div>',
          body: '<div>Main Content</div>',
          empty: '<div>empty</div>',
        },
      });

      expect(wrapper.html()).toContain('<div>Header</div>');
      expect(wrapper.html()).toContain('<div>Main Content</div>');
      expect(wrapper.text()).not.toBe('<div>empty</div>');
    });
  });

  describe('render table', () => {
    it('expect erroe when no column component and slots', () => {
      try {
        mount(MyTable, {
          props: {
            tableData: mockData,
          },
          slots: {},
        });
      } catch (error) {
        expect(error).toBe('没有配置表格列或插槽，数据无法正常显示');
      }
    });
  });
});
