<template>
  <h1 v-if="message" class="text-h1">{{ message }}</h1>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  setup() {
    const route = useRoute();
    const message = ref<string>(
      JSON.parse(atob(route.params.base64Data as string)).message
    );
    console.log(route.params.base64Data);

    return {
      message,
    };
  },
});
</script>
