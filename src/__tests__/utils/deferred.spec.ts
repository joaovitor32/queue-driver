import deferred from "@shared/utils/deferred";

describe("Test deferred", () => {
  it("Check deferred", () => {
    const { resolve, reject, promise } = deferred();

    expect(
      Object.prototype.toString.call(resolve) === "[object Function]"
    ).toBeTruthy();
    expect(
      Object.prototype.toString.call(reject) === "[object Function]"
    ).toBeTruthy();
    expect(
      Object.prototype.toString.call(promise) === "[object Promise]"
    ).toBeTruthy();
  });
});
