<template>
  <div class="product-list">
    <!-- 搜索 -->
    <search-box @submit="searchSubmit" :data="categoryList"></search-box>
    <a-button class="product-add-btn">
      <router-link :to="{name: 'ProductAdd'}">添加商品</router-link>
    </a-button>
    <!-- 表格 -->
    <product-table
      :data="tableData"
      :page="page"
      @change="changePage"
      :categoryList="categoryList"
      @edit="editProduct"
      @remove="removeProduct"
    ></product-table>
  </div>
</template>

<script>
import searchBox from '@/components/search.vue';
import api from '@/api/product';
import productTable from '@/components/productsTable.vue';
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      searchForm: {},
      tableData: [],
      categoryList: [],
      page: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1,
      },
      categoryObj: {},
    };
  },
  components: {
    searchBox,
    productTable,
  },
  async created() {
    await categoryApi.list().then((res) => {
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item;
      });
    });
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      this.searchForm = form;
    },
    getTableData() {
      api
        .list({
          page: this.page.current,
          size: this.page.pageSize,
          ...this.searchForm,
        })
        .then((res) => {
          this.page.total = res.total;
          this.tableData = res.data.map((item) => ({
            ...item,
            categoryName: this.categoryObj[item.category].name,
          }));
        });
    },
    changePage(page) {
      this.page = page;
      this.getTableData();
    },
    editProduct(record) {
      this.$router.push({
        name: 'ProductEdit',
        params: {
          id: record.id,
        },
      });
    },
    removeProduct(record) {
      this.$confirm({
        title: '确认删除',
        content: () => <div style="color:red;">{`确认删除标题为:${record.title}的商品吗`}</div>,
        onOk: () => {
          api.remove({
            id: record.id,
          }).then(() => {
            this.getTableData();
          });
        },
        onCancel() {

        },
        class: 'confirm-box',
      });
    },
  },
};
</script>

<style scoped lang="less">
.product-list{
  position: relative;
  .product-add-btn{
    position: absolute;
    right: 10px;
    top: 14px;
  }
}
</style>
