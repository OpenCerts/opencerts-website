import {
  IMG_NATIONAL_PARKS,
  IMG_SIG_TANG_KIN_FEI,
  IMG_SIG_TI_BOON_WEE,
  IMG_SIG_KENNETH_ER,
  Certificate
} from "../common";

const Template = Certificate({
  logo: IMG_NATIONAL_PARKS,
  signatories: [
    {
      signature: IMG_SIG_TI_BOON_WEE,
      name: "Ti Boon Wee",
      position: "Principal",
      organisation: "Ngee Ann Polytechnic"
    },
    {
      signature: IMG_SIG_KENNETH_ER,
      name: "Kenneth Er",
      position: "Chief Executive Officer",
      organisation: "National Parks Board"
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
