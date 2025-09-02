test("jsdom is available", () => {
  document.body.innerHTML = '<div id="a"></div>';
  expect(document.getElementById("a")).toBeTruthy();
});
