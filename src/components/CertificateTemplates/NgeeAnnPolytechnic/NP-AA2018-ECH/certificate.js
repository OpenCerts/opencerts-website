import {
  IMG_LOGO_SEED,
  IMG_SIG_TANG_KIN_FEI,
  IMG_SIG_TI_BOON_WEE,
  IMG_SIG_CHAN_TEE_SENG,
  Certificate
} from "../common";

const Template = Certificate({
  logo: IMG_LOGO_SEED,
  signatories: [
    {
      signature: IMG_SIG_TI_BOON_WEE,
      name: "Ti Boon Wee",
      position: "Principal",
      organisation: "Ngee Ann Polytechnic"
    },
    {
      signature: IMG_SIG_CHAN_TEE_SENG,
      name: "Chan Tee Seng",
      position: "Chief Executive Officer",
      organisation:
        "NTUC First Campus Co-operative Ltd & Director, SEED Institute Pte Ltd"
    },
    {
      signature: IMG_SIG_TANG_KIN_FEI,
      name: "Tang Kin Fei",
      position: "Council Chairman",
      organisation: "Ngee Ann Polytechnic"
    }
  ]
});

export default Template;
