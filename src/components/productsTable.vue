<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :pagination="page"
    @change="changePage"
  >
    <div slot="operation" slot-scope="text,record">
      <a-button @click="editProduct(record)">编辑</a-button>
      <a-button @click="removeProduct(record)">删除</a-button>
    </div>
  </a-table>
</template>

<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'categoryName',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价格',
    dataIndex: 'price',
    key: 'price',
  }, {
    title: '折扣价格',
    dataIndex: 'price_off',
    key: 'price_off',
  }, {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
  }, {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
  }, {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    customRender(text, record) {
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    width: 200,
    scopedSlots: { customRender: 'operation' },
  },
];

export default {
  data() {
    return {
      columns,
    };
  },
  props: ['data', 'page'],
  computed: {
    tableData() {
      return this.data.map((item) => ({
        ...item,
        key: item.id,
      }));
    },
  },
  methods: {
    changePage(page) {
      this.$emit('change', page);
    },
    editProduct(record) {
      this.$emit('edit', record);
    },
    removeProduct(record) {
      this.$emit('remove', record);
    },
  },
};
</script>
