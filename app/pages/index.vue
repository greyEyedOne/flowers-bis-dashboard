<script setup lang="ts">
import { reactive, computed } from "vue";
import hubspotData from "../../server/api/flower-feedback-data.en.json";

const questionNumber = 1;

const filters = reactive<FilterState>({
  companySize: [],
  industry: [],
  quarter: [],
});

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
    <NuxtLink class="about-page" to="/about">About</NuxtLink>
  </main>
</template>

<style>
:root {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}

main {
  display: flex;
  flex-direction: column;
}

.about-page {
  margin-top: auto;
  margin-left: auto;
  margin-right: auto;
}
</style>
