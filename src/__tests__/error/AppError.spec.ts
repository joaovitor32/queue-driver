import AppError from "@shared/error/AppError";

describe("App error", () => {
  it("Test app error", () => {
    const t = () => {
      throw new AppError("Error");
    };
    expect(t).toThrow(AppError);
  });
});
