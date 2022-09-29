<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- <van-icon
      name="wap-nav"
      @click="showPopup"
      :style="{
        position: 'fixed',
        top: '1rem',
        left: '1rem',
        'font-size': '1.5rem',
        'z-index': '9999',
      }"
    />
    <van-popup v-model:show="show" position="top" :style="{ height: '30%' }">
      <van-button @click="go(item.path)" v-for="item in allLink"
        >路由{{ item.path }}</van-button
      >
    </van-popup> -->
    <router-view></router-view>
    <!-- <van-pagination v-model="currentPage" :total-items="24" :items-per-page="5" /> -->
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
export default {
  name: "Main",
  setup(props, ctx) {
    const router = useRouter();
    const route = useRoute();
    const currentPage = ref(1);
    const show = ref(false);
    const allLink = computed(() =>
      router
        .getRoutes()
        .filter((item) => !["/404", "/:catchAll(.*)"].includes(item.path))
    );
    function pushWithQuery(query) {
      router.push({
        name: "search",
        query: {
          ...route.query,
        },
      });
    }
    function showPopup() {
      show.value = true;
      // internalInstance.ctx.$toast("提示内容");
    }
    function go(path) {
      router.push(path);
      show.value = false;
    }
    const onClickLeft = () => history.back();
    return { show, currentPage, showPopup, go, allLink, onClickLeft };
  },
};
</script>
