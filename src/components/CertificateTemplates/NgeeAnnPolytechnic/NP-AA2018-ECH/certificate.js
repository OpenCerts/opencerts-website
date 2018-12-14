import { IMG_LOGO_SEED, Certificate } from "../common";

const Template = Certificate({
  logo: IMG_LOGO_SEED
})
console.log(Template.toSource())
export default Template;
