import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const NUSK12019 = dynamic(() =>
  import("./NUS-K1-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSK1NOTS2019 = dynamic(() =>
  import("./NUS-K1NOTS-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSK3MBBS2019 = dynamic(() =>
  import("./NUS-K3MBBS-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSDUKENUS2019 = dynamic(() =>
  import("./NUS-DUKENUS-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSDUKEPHD2019 = dynamic(() =>
  import("./NUS-DUKEPHD-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSYALE2019 = dynamic(() =>
  import("./NUS-YALE-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSANUJDPBA2019 = dynamic(() =>
  import("./NUS-ANUJDP-BA-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSICLJDP2019 = dynamic(() =>
  import("./NUS-ICLJDP-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSMUSIC2019 = dynamic(() =>
  import("./NUS-MUSIC-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSJHUJDPMUSIC2019 = dynamic(() =>
  import("./NUS-JHUJDP-MUSIC-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSUNCJDP2019 = dynamic(() =>
  import("./NUS-UNCJDP-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSUBASJDP2019 = dynamic(() =>
  import("./NUS-UBASJDP-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSUMJDP2019 = dynamic(() =>
  import("./NUS-UMJDP-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSDTUJDP2019 = dynamic(() =>
  import("./NUS-DTUJDP-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSK2SMA2019 = dynamic(() =>
  import("./NUS-K2SMA-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSK4MBACN2019 = dynamic(() =>
  import("./NUS-K4MBACN-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSK6CAAS2019 = dynamic(() =>
  import("./NUS-K6CAAS-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSK7MPAS2019 = dynamic(() =>
  import("./NUS-K7MPAS-2019" /* webpackChunkName: "NUSTemplates" */)
);
const NUSTSGENERAL2019 = dynamic(() =>
  import("./NUSTS-GENERAL-2019" /* webpackChunkName: "NUSTemplates" */)
);

const templates = {
  "NUS-K1-2019": NUSK12019,
  "NUS-K1NOTS-2019": NUSK1NOTS2019,
  "NUS-K3MBBS-2019": NUSK3MBBS2019,
  "NUS-DUKEPHD-2019": NUSDUKEPHD2019,
  "NUS-MUSIC-2019": NUSMUSIC2019,
  "NUS-ICLJDP-2019": NUSICLJDP2019,
  "NUS-JHUJDP-MUSIC-2019": NUSJHUJDPMUSIC2019,
  "NUS-ANUJDP-BA-2019": NUSANUJDPBA2019,
  "NUS-DUKENUS-2019": NUSDUKENUS2019,
  "NUS-UNCJDP-2019": NUSUNCJDP2019,
  "NUS-UBASJDP-2019": NUSUBASJDP2019,
  "NUS-YALE-2019": NUSYALE2019,
  "NUS-UMJDP-2019": NUSUMJDP2019,
  "NUS-DTUJDP-2019": NUSDTUJDP2019,
  "NUS-K2SMA-2019": NUSK2SMA2019,
  "NUS-K4MBACN-2019": NUSK4MBACN2019,
  "NUS-K6CAAS-2019": NUSK6CAAS2019,
  "NUS-K7MPAS-2019": NUSK7MPAS2019,
  "NUSTS-GENERAL-2019": NUSTSGENERAL2019
};

export default addDirToTemplatePath("nus", templates);
