import { mount } from "@vue/test-utils";
import ChartComponent from "@/components/ChartComponent.vue";
import { Chart } from "chart.js/auto";

jest.mock("chart.js/auto"); // moked to setup, just duplicate

const cfg1 = {
  type: "bar",
  data: { labels: ["A", "B"], datasets: [{ label: "m", data: [1, 2] }] },
  options: {
    responsive: true,
    plugins: { title: { display: true, text: "t1" } },
  },
};
const cfg2 = {
  type: "bar",
  data: { labels: ["X"], datasets: [{ label: "m", data: [9] }] },
  options: {
    responsive: true,
    plugins: { title: { display: true, text: "t2" } },
  },
};

describe("ChartComponent", () => {
  it("creates Chart and updates on prop change", async () => {
    const wrapper = mount(ChartComponent, {
      props: { config: cfg1, height: 300 },
      global: { stubs: { ClientOnly: { template: "<div><slot/></div>" } } },
    });

    // создан ли Chart
    expect((Chart as any).mock.calls.length).toBe(1);

    await wrapper.setProps({ config: cfg2 });
    // объект Chart, который вернул мок
    const chartInstance = (Chart as any).mock.results[0].value;
    expect(chartInstance.update).toHaveBeenCalled();
    expect(chartInstance.data.labels).toEqual(["X"]);
  });
});
