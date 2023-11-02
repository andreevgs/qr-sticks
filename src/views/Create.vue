<template>
  <v-form @submit.prevent="isSubmitted = true">
    <v-text-field v-model="message" label="Ваше сообщение"></v-text-field>
    <v-btn type="submit" block class="mt-2" variant="tonal"
      >Создать куркод</v-btn
    >
    <qrcode-vue
      v-if="isSubmitted"
      :value="message"
      :level="level"
      :render-as="renderAs"
    />
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import QrcodeVue, { Level, RenderAs } from "qrcode.vue";

export default defineComponent({
  components: { QrcodeVue },
  setup() {
    const message = ref("");
    const level = ref<Level>("M");
    const renderAs = ref<RenderAs>("svg");
    const isSubmitted = ref<boolean>(false);

    return {
      message,
      level,
      renderAs,
      isSubmitted,
    };
  },
});
</script>
