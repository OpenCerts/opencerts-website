import { Selector } from "testcafe";
import { waitForReact } from "testcafe-react-selectors";

fixture("Registry Page").page`http://localhost:3000`.beforeEach(async () => {
  await waitForReact();
});

const RegistrySearch = Selector("[data-testid='registry-search']");
const SMU = Selector("[data-testid='registry-card']").withText("Singapore Management University");

test("Registry page's contact tab and search is working correctly", async (t) => {
  await t.navigateTo("/registry");

  // panel should work with 4 contact infos
  await t.click(SMU.find("[data-testid='btn-contact']"));
  await t.expect(SMU.find("[data-testid='contact-info']").visible).ok();
  await t.expect(SMU.find("[data-testid='info']").count).eql(8);

  // search should return 1 result even though there are 4 contact infos
  await t.typeText(RegistrySearch, "0x3");
  await t.expect(SMU.find("[data-testid='info']").count).eql(1);

  // double check if items are still 4 contact infos
  await t.selectText(RegistrySearch).pressKey("delete");
  await t.click(SMU.find("[data-testid='btn-contact']"));
  await t.expect(SMU.find("[data-testid='info']").count).eql(8);

  // should return nothing if no match
  await t.typeText(RegistrySearch, "000");
  await t.expect(Selector("*").withText("No results found.").exists).ok();
});
