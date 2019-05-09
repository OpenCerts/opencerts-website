import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

import singaporetech from "./singaporetech";
import np from "./np";
import nyp from "./nyp";
<<<<<<< HEAD

export default addDirToTemplatePath("edu", { ...singaporetech, ...np, ...nyp });
=======
import tp from "./tp";

export default addDirToTemplatePath("edu", {
  ...singaporetech,
  ...np,
  ...nyp,
  ...tp
});
>>>>>>> ecea7975d867786bb02ec96b9bef1bf8ce275aea
