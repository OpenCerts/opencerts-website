import reducer, { initialState, resetCertificateState } from "./certificate";

describe("reducers", () => {
  describe("Reset certificate", () => {
    it("should reset the state to initial state", () => {
      const prevState = { foo: "bar" };
      expect(reducer(prevState, resetCertificateState())).toEqual(initialState);
    });
  });
});
