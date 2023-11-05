<template>
  <v-dialog v-model="isShowQRCode" max-width="600">
    <v-card>
      <div id="qr-code__wrapper">
        <h5>
          {{ name }}
        </h5>
        <qrcode-vue
          class="qr-code"
          :value="serializedResult"
          :level="level"
          :render-as="renderAs"
        />
      </div>
      <v-card-actions class="d-flex flex-column">
        <v-btn block @click="onPrint" variant="tonal" color="warning"
          >печать</v-btn
        >
        <v-btn block @click="isShowQRCode = false" variant="tonal"
          >закрыть</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-form @submit.prevent="onQRCodeCreate">
    <v-text-field v-model="name" label="Название"></v-text-field>
    <v-text-field v-model="header" label="Заголовок"></v-text-field>
    <v-text-field v-model="subheader" label="Подзаголовок"></v-text-field>
    <v-textarea v-model="message" clearable label="Сообщене"></v-textarea>
    <v-text-field v-model="mapObjectLink" label="Место на карте"></v-text-field>
    <h5 class="text-h5">Цвет фона</h5>
    <v-color-picker v-model="bgColor"></v-color-picker>
    <h5 class="text-h5">Цвет шрифта</h5>
    <v-color-picker v-model="fontColor"></v-color-picker>
    <v-btn type="submit" block class="mt-2" variant="tonal"
      >Создать куркод</v-btn
    >
  </v-form>
</template>

<script lang="ts">
declare const html2pdf: (el: HTMLElement, opt: { filename: string }) => void;

import { defineComponent, ref } from "vue";
import QrcodeVue, { Level, RenderAs } from "qrcode.vue";
import { CreatedData } from "@/types";
import { base64url_encode } from "@/utils/base64";

export default defineComponent({
  components: { QrcodeVue },
  setup() {
    const name = ref<string>("");
    const header = ref<string>("");
    const subheader = ref<string>("");
    const message = ref<string>("");
    const mapObjectLink = ref<string>("");
    const bgColor = ref<string>("#FFFFFF");
    const fontColor = ref<string>("#000000");
    const level = ref<Level>("M");
    const renderAs = ref<RenderAs>("svg");
    const isShowQRCode = ref<boolean>(false);
    const serializedResult = ref<string>("");

    const onQRCodeCreate = () => {
      const createdData: CreatedData = {
        header: header.value,
        subheader: subheader.value,
        message: message.value,
        bgColor: bgColor.value,
        fontColor: fontColor.value,
        mapObjectLink: mapObjectLink.value,
      };
      serializedResult.value = `${
        location.hostname
      }/#/stickers/${base64url_encode(JSON.stringify(createdData))}`;
      console.log(serializedResult.value);
      isShowQRCode.value = true;
    };

    const onPrint = () => {
      let el = document.getElementById("qr-code__wrapper");
      if (el) {
        html2pdf(el, { filename: `${name.value}.pdf` });
      }
    };

    return {
      name,
      header,
      subheader,
      message,
      mapObjectLink,
      bgColor,
      fontColor,
      level,
      renderAs,
      isShowQRCode,
      serializedResult,
      onQRCodeCreate,
      onPrint,
    };
  },
});
</script>
<style>
#qr-code__wrapper {
  padding: 7vw;
  aspect-ratio: 2/1;
}
#qr-code__wrapper h5 {
  padding: 0;
  height: 20vw;
  font-size: 6vw !important;
  line-height: 20vw;
  font-weight: 400;
  letter-spacing: normal !important;
  font-family: "Roboto", sans-serif !important;
  text-transform: none !important;
  color: #fff;
  background-color: #000;
  text-align: center;
  margin-bottom: 10vw;
  border-radius: 10vw;
}
.qr-code {
  width: 100%;
  height: auto;
}
</style>
