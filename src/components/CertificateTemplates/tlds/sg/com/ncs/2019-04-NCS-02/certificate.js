import { Certificate } from "../root";
import { newBackgroundImg, stampImg, ncsLogo } from "./resources";

const Template = Certificate({
  backgroundImg: newBackgroundImg,
  stamp: stampImg,
  logo: ncsLogo
});

export default Template;
// end of file
