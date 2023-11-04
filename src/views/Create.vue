<template>
  <v-dialog v-model="isShowQRCode" max-width="400">
    <v-card>
      <div id="qr-code__wrapper" style="padding: 1.5rem">
        <h5
          style="
            font-size: 1.5rem !important;
            font-weight: 400;
            line-height: 2rem;
            letter-spacing: normal !important;
            font-family: 'Roboto', sans-serif !important;
            text-transform: none !important;
            color: #fff;
            background-color: #000;
            padding: 1rem;
            text-align: center;
            margin-bottom: 1.5rem;
            border-radius: 32px;
          "
        >
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
    <v-text-field v-model="message" label="Ваше сообщение"></v-text-field>
    <v-btn type="submit" block class="mt-2" variant="tonal"
      >Создать куркод</v-btn
    >
  </v-form>
</template>

<script lang="ts">
declare const html2pdf: (el: HTMLElement, opt: { filename: string }) => void;

import { defineComponent, ref } from "vue";
import QrcodeVue, { Level, RenderAs } from "qrcode.vue";

interface CreatedData {
  message: string;
}

export default defineComponent({
  components: { QrcodeVue },
  setup() {
    const name = ref<string>("");
    const message = ref<string>("");
    const level = ref<Level>("M");
    const renderAs = ref<RenderAs>("svg");
    const isShowQRCode = ref<boolean>(false);
    const serializedResult = ref<string>("");

    const onQRCodeCreate = () => {
      const createdData: CreatedData = {
        message: message.value,
      };
      serializedResult.value = `${location.hostname}/stickers/${btoa(
        JSON.stringify(createdData)
      )}`;
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
      message,
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
.qr-code__wrapper {
  padding: 1.5rem;
}
.qr-code__wrapper h5 {
  color: #fff;
  background-color: #000;
  padding: 1rem;
  text-align: center;
  margin-bottom: 1.5rem;
  border-radius: 32px;
}
.qr-code {
  width: 100%;
  height: auto;
}
</style>
