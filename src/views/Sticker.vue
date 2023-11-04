<template>
  <div
    class="sticker__wrapper"
    :style="{ backgroundColor: stickerData.bgColor }"
  >
    <h2
      v-if="stickerData.header"
      class="text-h2"
      :style="{ color: stickerData.fontColor }"
    >
      {{ stickerData.header }}
    </h2>
    <h4
      v-if="stickerData.subheader"
      class="text-h4"
      :style="{ color: stickerData.fontColor }"
    >
      {{ stickerData.subheader }}
    </h4>
    <p v-if="stickerData.message" :style="{ color: stickerData.fontColor }">
      {{ stickerData.message }}
    </p>
    <iframe
      v-if="stickerData.mapObjectLink"
      :src="stickerData.mapObjectLink"
      style="border: 0"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template>

<script lang="ts">
import { CreatedData } from "@/types";
import { base64_decode } from "@/utils/base64";
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const stickerData = ref<CreatedData>(
      JSON.parse(base64_decode(route.params.base64Data as string))
    );
    console.log(route.params.base64Data);

    return {
      stickerData,
    };
  },
});
</script>
<style>
.sticker__wrapper {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 7vh;
  padding: 10vw;
}
h2,
h4,
p {
  text-align: center;
}
iframe {
  width: 100%;
  height: 450px;
}
</style>
