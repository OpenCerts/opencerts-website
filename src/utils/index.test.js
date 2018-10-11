import { combinedHash } from "./index";

test("utils", () => {
  expect(combinedHash("foo", "bar").hexSlice()).toBe(
    "24e03926e272d3112eace88e8d04303e287d51571475e2334346dcc69f21041f"
  );
});
