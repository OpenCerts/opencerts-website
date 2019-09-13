import { getDocumentStore, getDocumentIssuerStores } from "./certificate";

test("getDocumentStore should return the store address if it's using certificateStore or documentStore", () => {
  expect(getDocumentStore({ certificateStore: "store" })).toBe("store");
  expect(getDocumentStore({ documentStore: "store" })).toBe("store");
});

test("getDocumentIssuerStores should return a string of all issuers' stores", () => {
  expect(
    getDocumentIssuerStores({
      issuers: [{ certificateStore: "0xStoreA" }, { documentStore: "0xStoreB" }]
    })
  ).toBe("0xStoreA,0xStoreB");
});
