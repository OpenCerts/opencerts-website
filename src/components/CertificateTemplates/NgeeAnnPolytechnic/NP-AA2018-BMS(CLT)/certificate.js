import {
  IMG_LOGO_NUH,
  IMG_SIG_TANG_KIN_FEI,
  IMG_SIG_TI_BOON_WEE,
  IMG_SIG_LIU_HERN_CHOON_EUGENE,
  Certificate
} from "../common";

const Template = Certificate({
  logo: IMG_LOGO_NUH,
  signatories: [
    {
      signature: IMG_SIG_TI_BOON_WEE,
      name: "Ti Boon Wee",
      position: "Principal",
      organisation: "Ngee Ann Polytechnic"
    },
    {
      signature: IMG_SIG_LIU_HERN_CHOON_EUGENE,
      name: "A/Prof. Liu Hern Choon Eugene",
      position: "Chief Executive Officer",
      organisation: "National University Hospital"
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
