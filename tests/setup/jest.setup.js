jest.mock("chart.js/auto", () => {
  const ChartMock = jest.fn().mockImplementation(() => ({
    update: jest.fn(),
    destroy: jest.fn(),
    config: {},
    data: {},
    options: {},
  }));
  return { Chart: ChartMock };
});
