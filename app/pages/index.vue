<script setup lang="ts">
import { reactive, computed } from "vue";
import { defineNuxtLink } from "../../node_modules/nuxt/app";
import hubspotData from "../../server/api/data.json";

const questionNumber = 3; // selected question

const filters = reactive<FilterState>({
  companySize: ["Large (201-1000)"],
  industry: ["Media & Marketing"],
  quarter: ["2024-Q3"],
});
// const filters = {
//   companySize: ["Large (201-1000)"],
//   industry: ["Media & Marketing"],
//   quarter: ["2024-Q3"],
// };

const chartConfig = computed(() => {
  if (!hubspotData) return null;
  return useHubspotData(hubspotData, questionNumber, filters);
});

function onUpdateFilters(next: FilterState) {
  filters.companySize = next.companySize;
  filters.industry = next.industry;
  filters.quarter = next.quarter;
}
</script>

<template>
  <main class="p-6">
    <ChartComponent :config="chartConfig" :height="420" />
    <FilterPanel
      v-model="filters"
      :unique-values="hubspotData.uniqueValues"
      @update:modelValue="onUpdateFilters"
    />
    <NuxtLink to="about" />
  </main>
</template>

<style>
:root {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
</style>
