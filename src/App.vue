<script setup lang="ts">
import { Pagination, Table } from "ant-design-vue";
import { onMounted } from "vue";
import { catsApi } from "./api/catsApi";
import { useQuery } from "./composables/useQuery";

const query = useQuery(catsApi.query);

onMounted(query.query);
</script>

<template>
  <div>
    <Table
      :columns="[
        { title: 'ID', dataIndex: 'id' },
        { title: 'name', dataIndex: 'name' },
      ]"
      :dataSource="query.records"
      :pagination="query.pagination"
    ></Table>

    <Pagination :="query.pagination"></Pagination>
  </div>
</template>

<style scoped></style>
