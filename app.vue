<script setup lang="ts">
const layout = "default";
import { ConfigProvider } from 'radix-vue';
const useIdFunction = () => useId();
</script>

<template>
  <ConfigProvider :use-id="useIdFunction">
    <NuxtLayout :name="layout">
      <NuxtPage />
    </NuxtLayout>
  </ConfigProvider>
</template>
