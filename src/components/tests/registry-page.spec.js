import { Selector } from "testcafe";

fixture("Registry Page").page`http://localhost:3000`;

const LinkRegistry = Selector("a[href='/registry']");
const BtnContact = Selector("[data-testid='btn-contact']");
const ContactInfo = Selector("[data-testid='contact-info']");
const RegistrySearch = Selector("[data-testid='registry-search']");
const RegistryCard = Selector("[data-testid='registry-card']");

test("Registry page's contact tab and search is working correctly", async (t) => {
  await t.click(LinkRegistry);

  await t.click(BtnContact);
  await t.expect(ContactInfo.visible).ok();

  await t.typeText(RegistrySearch, "0xa");
  await t.expect(RegistryCard.count).eql(2);
});
