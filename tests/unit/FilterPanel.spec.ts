import { mount } from "@vue/test-utils";
import FilterPanel from "@/components/FilterPanel.vue";

describe("FilterPanel", () => {
  it("emits update:modelValue when checkbox changes", async () => {
    const wrapper = mount(FilterPanel, {
      props: {
        modelValue: { companySize: [], industry: [], quarter: [] },
        uniqueValues: {
          companySize: ["розница", "опт"],
          industry: ["частные покупатели"],
          quarter: ["2024-Q1"],
        },
      },
    });
    const first = wrapper.find('input[type="checkbox"]');
    await first.setValue(true);
    const emitted = wrapper.emitted("update:modelValue")!.at(-1)![0];
    expect(emitted.companySize).toContain("розница");
  });

  it("selects all in a group", async () => {
    const wrapper = mount(FilterPanel, {
      props: {
        modelValue: { companySize: [], industry: [], quarter: [] },
        uniqueValues: { companySize: ["a", "b"], industry: [], quarter: [] },
      },
    });
    await wrapper.get("button").trigger("click"); // первая кнопка All
    const emitted = wrapper.emitted("update:modelValue")!.at(-1)![0];
    expect(emitted.companySize).toEqual(["a", "b"]);
  });
});
