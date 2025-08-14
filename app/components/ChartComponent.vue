<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, unref } from "vue";

const props = defineProps<{ config: any; height?: number }>();
const canvasEl = ref<HTMLCanvasElement | null>(null);
let chart: any = null;

onMounted(async () => {
  const { Chart } = await import("chart.js/auto");
  chart = new Chart(canvasEl.value!.getContext("2d")!, unref(props.config));
});

watch(
  () => props.config,
  (cfg) => {
    if (!chart || !cfg) return;
    chart.data = cfg.data;
    chart.options = cfg.options;
    chart.update();
    console.log("cfg", cfg);
  },
  { deep: true }
);
onBeforeUnmount(() => chart?.destroy());
</script>

<template>
  <ClientOnly>
    <div class="canvas-container" style="position: relative; height: 420px">
      <canvas ref="canvasEl" />
    </div>
  </ClientOnly>
</template>

<style>
.canvas-container {
  display: flex;
  justify-content: center;
}
</style>
