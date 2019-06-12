import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

// templates for degree scroll
const NUSK12019 = dynamic(() => import("./NUS-K1-2019"));
const NUSK3MBBS2019 = dynamic(() => import("./NUS-K3MBBS-2019"));
const NUSDUKENUS2019 = dynamic(() => import("./NUS-DUKENUS-2019"));
const NUSDUKEPHD2019 = dynamic(() => import("./NUS-DUKEPHD-2019"));
const NUSYALE2019 = dynamic(() => import("./NUS-YALE-2019"));
const ANUNUSJDPBSOCSC2019 = dynamic(() => import("./ANU-NUSJDP-BSOCSC-2019"));
const NUSANUJDPBA2019 = dynamic(() => import("./NUS-ANUJDP-BA-2019"));
const NUSICLJDP2019 = dynamic(() => import("./NUS-ICLJDP-2019"));
const NUSMUSIC2019 = dynamic(() => import("./NUS-MUSIC-2019"));
const NUSJHUJDPMUSIC2019 = dynamic(() => import("./NUS-JHUJDP-MUSIC-2019"));
const JHUNUSJDPMUSIC2019 = dynamic(() => import("./JHU-NUSJDP-MUSIC-2019"));
const NUSUNCJDP2019 = dynamic(() => import("./NUS-UNCJDP-2019"));

// templates for transcript
const NUSTSUGGD2019 = dynamic(() => import("./NUSTS-UGGD-2019"));

const templates = {
  "NUS-K1-2019": NUSK12019,
  "NUS-K3MBBS-2019": NUSK3MBBS2019,
  "NUS-DUKENUS-2019": NUSDUKENUS2019,
  "NUS-DUKEPHD-2019": NUSDUKEPHD2019,
  "NUS-YALE-2019": NUSYALE2019,
  "ANU-NUSJDP-BSOCSC-2019": ANUNUSJDPBSOCSC2019,
  "NUS-ANUJDP-BA-2019": NUSANUJDPBA2019,
  "NUS-ICLJDP-2019": NUSICLJDP2019,
  "NUS-MUSIC-2019": NUSMUSIC2019,
  "NUS-JHUJDP-MUSIC-2019": NUSJHUJDPMUSIC2019,
  "JHU-NUSJDP-MUSIC-2019": JHUNUSJDPMUSIC2019,
  "NUSTS-UGGD-2019": NUSTSUGGD2019,
  "NUS-UNCJDP-2019": NUSUNCJDP2019
};

export default addDirToTemplatePath("nus", templates);
