import validatePromise from "@shared/utils/validatePromise";

describe("Test validate promise", () => {
  it("Check promise", () => {
    const promise = new Promise((resolve) => resolve);

    expect(validatePromise(promise)).toBeTruthy();
  });
});
