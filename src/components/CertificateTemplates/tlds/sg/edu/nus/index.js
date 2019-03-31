import dynamic from "next/dynamic";
import addDirToTemplatePath from "../../../../utils/addDirToTemplatePath";

const NUSK12019 = dynamic(import("./NUS-K1-2019"));

const NUSTSUGGD2019 = dynamic(import("./NUSTS-UGGD-2019"));

const templates = {
  "NUS-K1-2019": NUSK12019,
  "NUSTS-UGGD-2019": NUSTSUGGD2019
};

export default addDirToTemplatePath("nus", templates);
