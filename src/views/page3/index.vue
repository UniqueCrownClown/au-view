<template>
  <div id="page3"></div>
</template>
<script>
import { onMounted } from "vue";
import { onLoad } from "./dmaku.js";
export default {
  setup() {
    onMounted(() => {
      var TEXTURE_SRC_BEFORE = "2.jpg";
      var TEXTURE_SRC_AFTER = "1.jpg";
      new THREE.TextureLoader().load(TEXTURE_SRC_BEFORE, function(texture) {
        onLoad(texture, undefined);
      });
      new THREE.TextureLoader().load(TEXTURE_SRC_AFTER, function(texture) {
        onLoad(undefined, texture);
      });
    });
  }
};
</script>
<style scoped>
#page3 {
  height: calc(100vh - 46px);
}

#page3 {
  overflow: hidden;
  margin: 0;
  background-color: #000;
}

canvas {
  position: absolute;
  top: 0;
  left: 50%;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
</style>