import { useToggle } from "@vueuse/core";
import type { TablePaginationConfig } from "ant-design-vue";
import { computed, onMounted, ref, shallowRef } from "vue";

const requestParamsMap = {
  pageIndex: "pageIndex",
  pageSize: "pageSize",
};

const responseParamsMap = {
  pageIndex: "pageIndex",
  pageSize: "pageSize",
  totalCount: "totalCount",
  data: "data",
};

export const usePagination = (
  apiFn: (reqParams: any) => Promise<any>,
  pageParamsField?: any
) => {
  const innerRequestParamsMap = pageParamsField || requestParamsMap;
  const [loading, loadingToggle] = useToggle(false);
  const pageList = shallowRef<any[]>([]);
  const params = ref<Record<string, any>>({});
  const pageIndex = ref(1);
  const pageSize = ref(10);
  const totalCount = ref(0);

  const pagination = computed<TablePaginationConfig>(() => {
    return {
      position: ["bottomCenter"],
      current: pageIndex.value,
      pageSize: pageSize.value,
      total: totalCount.value,
      showQuickJumper: true,
      showSizeChanger: true,
      showTotal: (total: number) => `total of ${total} items`,
      onChange: (page: number, size: number) => {
        pageIndex.value = page;
        pageSize.value = size;
        getList();
      },
    };
  });

  async function getList() {
    loadingToggle(true);
    const fullParams = { ...params.value };
    fullParams[innerRequestParamsMap["pageIndex"]] = pageIndex.value;
    fullParams[innerRequestParamsMap["pageSize"]] = pageSize.value;
    const res = await apiFn(fullParams);
    loadingToggle(false);

    pageList.value = res.data[responseParamsMap["data"]];
    pageIndex.value = res.data[responseParamsMap["pageIndex"]];
    pageSize.value = res.data[responseParamsMap["pageSize"]];
    totalCount.value = res.data[responseParamsMap["totalCount"]];
  }

  function search() {
    pageIndex.value = 1;
    getList();
  }

  onMounted(getList);

  return {
    loading,
    pageList,
    params,
    getList,
    pageIndex,
    pageSize,
    totalCount,
    search,
    pagination,
  };
};
