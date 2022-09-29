<template>
  <div>
    <van-cell
      v-for="item in allLink"
      :title="item.path"
      is-link
      :to="item.path"
    />
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
const router = useRouter();
const allLink = computed(() =>
  router
    .getRoutes()
    .filter((item) => !["/", "/404", "/:catchAll(.*)"].includes(item.path))
);
</script>
