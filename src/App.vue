<script setup lang="ts">
import { Pagination, Table } from "ant-design-vue";
import { onMounted } from "vue";
import { catsApi } from "./api/catsApi";
import { usePagination } from "./composables/usePagination";

const { pagination, query, records } = usePagination(catsApi.query);

onMounted(query);
</script>

<template>
  <div>
    <Table
      :columns="[
        { title: 'ID', dataIndex: 'id' },
        { title: 'name', dataIndex: 'name' },
      ]"
      :dataSource="records"
      :pagination="pagination"
    ></Table>

    <Pagination :="pagination"></Pagination>
  </div>
</template>

<style scoped></style>
