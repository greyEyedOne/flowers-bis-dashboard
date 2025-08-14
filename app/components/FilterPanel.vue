<script setup lang="ts">
import { computed } from "vue";

type FilterState = {
  companySize: string[];
  industry: string[];
  quarter: string[];
};
type UniqueValues = {
  companySize: string[];
  industry: string[];
  quarter: string[];
};

// v-model + опции
const props = defineProps<{
  modelValue: FilterState;
  uniqueValues: UniqueValues;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: FilterState): void;
  (e: "reset"): void;
}>();

// прокси для v-model по группам
const selCompany = computed<string[]>({
  get: () => props.modelValue.companySize,
  set: (val) =>
    emit("update:modelValue", { ...props.modelValue, companySize: val }),
});
const selIndustry = computed<string[]>({
  get: () => props.modelValue.industry,
  set: (val) =>
    emit("update:modelValue", { ...props.modelValue, industry: val }),
});
const selQuarter = computed<string[]>({
  get: () => props.modelValue.quarter,
  set: (val) =>
    emit("update:modelValue", { ...props.modelValue, quarter: val }),
});

// утилиты
function selectAll(group: keyof FilterState) {
  const next = { ...props.modelValue };
  next[group] = [...props.uniqueValues[group]];
  emit("update:modelValue", next);
}
function clearGroup(group: keyof FilterState) {
  const next = { ...props.modelValue };
  next[group] = [];
  emit("update:modelValue", next);
}
function resetAll() {
  emit("update:modelValue", { companySize: [], industry: [], quarter: [] });
  emit("reset");
}
</script>

<template>
  <section class="filters flex gap-4">
    <!-- Company size -->
    <fieldset class="p-4 border rounded-xl">
      <legend class="font-semibold mb-2">Company size</legend>
      <div class="flex gap-2 mb-3 text-sm">
        <button
          type="button"
          class="px-2 py-1 border rounded"
          @click="selectAll('companySize')"
          :disabled="disabled"
        >
          All
        </button>
        <button
          type="button"
          class="px-2 py-1 border rounded"
          @click="clearGroup('companySize')"
          :disabled="disabled || !selCompany.length"
        >
          None
        </button>
      </div>
      <label
        v-for="opt in uniqueValues.companySize"
        :key="opt"
        class="block leading-7"
      >
        <input
          type="checkbox"
          :value="opt"
          v-model="selCompany"
          :disabled="disabled"
        />
        <span class="ml-2">{{ opt }}</span>
      </label>
    </fieldset>

    <!-- Industry -->
    <fieldset class="p-4 border rounded-xl">
      <legend class="font-semibold mb-2">Industry</legend>
      <div class="flex gap-2 mb-3 text-sm">
        <button
          type="button"
          class="px-2 py-1 border rounded"
          @click="selectAll('industry')"
          :disabled="disabled"
        >
          All
        </button>
        <button
          type="button"
          class="px-2 py-1 border rounded"
          @click="clearGroup('industry')"
          :disabled="disabled || !selIndustry.length"
        >
          None
        </button>
      </div>
      <label
        v-for="opt in uniqueValues.industry"
        :key="opt"
        class="block leading-7"
      >
        <input
          type="checkbox"
          :value="opt"
          v-model="selIndustry"
          :disabled="disabled"
        />
        <span class="ml-2">{{ opt }}</span>
      </label>
    </fieldset>

    <!-- Quarter 
    <fieldset class="p-4 border rounded-xl">
      <legend class="font-semibold mb-2">Quarter</legend>
      <div class="flex gap-2 mb-3 text-sm">
        <button
          type="button"
          class="px-2 py-1 border rounded"
          @click="selectAll('quarter')"
          :disabled="disabled"
        >
          All
        </button>
        <button
          type="button"
          class="px-2 py-1 border rounded"
          @click="clearGroup('quarter')"
          :disabled="disabled || !selQuarter.length"
        >
          None
        </button>
      </div>
      <label
        v-for="opt in uniqueValues.quarter"
        :key="opt"
        class="block leading-7"
      >
        <input
          type="checkbox"
          :value="opt"
          v-model="selQuarter"
          :disabled="disabled"
        />
        <span class="ml-2">{{ opt }}</span>
      </label>
    </fieldset>-->
  </section>

  <div class="mt-4">
    <button
      type="button"
      class="px-3 py-1.5 border rounded"
      @click="resetAll"
      :disabled="disabled"
    >
      Reset all
    </button>
  </div>
</template>
<style>
.filters {
  display: flex;
}

.filters fieldset {
  display: flex;
  flex-direction: column;
}
</style>
