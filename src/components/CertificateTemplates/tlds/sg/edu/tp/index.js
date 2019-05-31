import dynamic from "template-utils/dynamic";
import { addDirToTemplatePath } from "template-utils/addDirToTemplatePath";

const ftdip = dynamic(() =>
  import("./ftdip" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ftdipniec = dynamic(() =>
  import("./ftdipniec" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ftdipplus = dynamic(() =>
  import("./ftdipplus" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ftpfp = dynamic(() =>
  import("./ftpfp" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptdip = dynamic(() =>
  import("./ptdip" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptpostdip = dynamic(() =>
  import("./ptpostdip" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptmc = dynamic(() =>
  import("./ptmc" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptpdc = dynamic(() =>
  import("./ptpdc" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptmcModularCourse = dynamic(() =>
  import("./ptmc_mod" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptpdcModularCourse = dynamic(() =>
  import("./ptpdc_mod" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptdipdpss = dynamic(() =>
  import("./ptdipdpss" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptdipCertis = dynamic(() =>
  import("./ptdip_certis" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptsdSmu = dynamic(() =>
  import("./ptsd_smu" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptsdSuss = dynamic(() =>
  import("./ptsd_suss" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptsdBcaa = dynamic(() =>
  import("./ptsd_bcaa" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptsdoh = dynamic(() =>
  import("./ptsdoh" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptsdSit = dynamic(() =>
  import("./ptsd_sit" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptsdMha = dynamic(() =>
  import("./ptsd_mha" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptsdNp = dynamic(() =>
  import("./ptsd_np" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

const ptfsm = dynamic(() =>
  import("./ptfsm" /* webpackChunkName: "TemasekPolytechnicTemplates" */)
);

// keep it simple and stupid.
// we will have to add/configure new mapping every year.
// a bit tedious, but we have full control over which year use what template.
const templates = {
  "ftdip-1990": ftdip,
  "ftdip-1991": ftdip,
  "ftdip-1992": ftdip,
  "ftdip-1993": ftdip,
  "ftdip-1994": ftdip,
  "ftdip-1995": ftdip,
  "ftdip-1996": ftdip,
  "ftdip-1997": ftdip,
  "ftdip-1998": ftdip,
  "ftdip-1999": ftdip,
  "ftdip-2000": ftdip,
  "ftdip-2001": ftdip,
  "ftdip-2002": ftdip,
  "ftdip-2003": ftdip,
  "ftdip-2004": ftdip,
  "ftdip-2005": ftdip,
  "ftdip-2006": ftdip,
  "ftdip-2007": ftdip,
  "ftdip-2008": ftdip,
  "ftdip-2009": ftdip,
  "ftdip-2010": ftdip,
  "ftdip-2011": ftdip,
  "ftdip-2012": ftdip,
  "ftdip-2013": ftdip,
  "ftdip-2014": ftdip,
  "ftdip-2015": ftdip,
  "ftdip-2016": ftdip,
  "ftdip-2017": ftdip,
  "ftdip-2018": ftdip,
  "ftdip-2019": ftdip,
  "ftdip-2020": ftdip,
  "ftdip-2021": ftdip,
  "ftdip-2022": ftdip,
  "ftdip-2023": ftdip,
  "ftdip-2024": ftdip,
  "ftdip-2025": ftdip,
  "ftdip-2026": ftdip,
  "ftdip-2027": ftdip,
  "ftdip-2028": ftdip,
  "ftdip-2029": ftdip,

  "ftdipniec-2005": ftdipniec,
  "ftdipniec-2006": ftdipniec,
  "ftdipniec-2007": ftdipniec,
  "ftdipniec-2008": ftdipniec,
  "ftdipniec-2009": ftdipniec,
  "ftdipniec-2010": ftdipniec,
  "ftdipniec-2011": ftdipniec,
  "ftdipniec-2012": ftdipniec,
  "ftdipniec-2013": ftdipniec,
  "ftdipniec-2014": ftdipniec,
  "ftdipniec-2015": ftdipniec,
  "ftdipniec-2016": ftdipniec,
  "ftdipniec-2017": ftdipniec,
  "ftdipniec-2018": ftdipniec,
  "ftdipniec-2019": ftdipniec,
  "ftdipniec-2020": ftdipniec,
  "ftdipniec-2021": ftdipniec,
  "ftdipniec-2022": ftdipniec,
  "ftdipniec-2023": ftdipniec,
  "ftdipniec-2024": ftdipniec,
  "ftdipniec-2025": ftdipniec,
  "ftdipniec-2026": ftdipniec,
  "ftdipniec-2027": ftdipniec,
  "ftdipniec-2028": ftdipniec,
  "ftdipniec-2029": ftdipniec,

  "ftdipplus-2005": ftdipplus,
  "ftdipplus-2006": ftdipplus,
  "ftdipplus-2007": ftdipplus,
  "ftdipplus-2008": ftdipplus,
  "ftdipplus-2009": ftdipplus,
  "ftdipplus-2010": ftdipplus,
  "ftdipplus-2011": ftdipplus,
  "ftdipplus-2012": ftdipplus,
  "ftdipplus-2013": ftdipplus,
  "ftdipplus-2014": ftdipplus,
  "ftdipplus-2015": ftdipplus,
  "ftdipplus-2016": ftdipplus,
  "ftdipplus-2017": ftdipplus,
  "ftdipplus-2018": ftdipplus,
  "ftdipplus-2019": ftdipplus,
  "ftdipplus-2020": ftdipplus,
  "ftdipplus-2021": ftdipplus,
  "ftdipplus-2022": ftdipplus,
  "ftdipplus-2023": ftdipplus,
  "ftdipplus-2024": ftdipplus,
  "ftdipplus-2025": ftdipplus,
  "ftdipplus-2026": ftdipplus,
  "ftdipplus-2027": ftdipplus,
  "ftdipplus-2028": ftdipplus,
  "ftdipplus-2029": ftdipplus,

  "ftpfp-2005": ftpfp,
  "ftpfp-2006": ftpfp,
  "ftpfp-2007": ftpfp,
  "ftpfp-2008": ftpfp,
  "ftpfp-2009": ftpfp,
  "ftpfp-2010": ftpfp,
  "ftpfp-2011": ftpfp,
  "ftpfp-2012": ftpfp,
  "ftpfp-2013": ftpfp,
  "ftpfp-2014": ftpfp,
  "ftpfp-2015": ftpfp,
  "ftpfp-2016": ftpfp,
  "ftpfp-2017": ftpfp,
  "ftpfp-2018": ftpfp,
  "ftpfp-2019": ftpfp,
  "ftpfp-2020": ftpfp,
  "ftpfp-2021": ftpfp,
  "ftpfp-2022": ftpfp,
  "ftpfp-2023": ftpfp,
  "ftpfp-2024": ftpfp,
  "ftpfp-2025": ftpfp,
  "ftpfp-2026": ftpfp,
  "ftpfp-2027": ftpfp,
  "ftpfp-2028": ftpfp,
  "ftpfp-2029": ftpfp,

  "ptdip-1990": ptdip,
  "ptdip-1991": ptdip,
  "ptdip-1992": ptdip,
  "ptdip-1993": ptdip,
  "ptdip-1994": ptdip,
  "ptdip-1995": ptdip,
  "ptdip-1996": ptdip,
  "ptdip-1997": ptdip,
  "ptdip-1998": ptdip,
  "ptdip-1999": ptdip,
  "ptdip-2000": ptdip,
  "ptdip-2001": ptdip,
  "ptdip-2002": ptdip,
  "ptdip-2003": ptdip,
  "ptdip-2004": ptdip,
  "ptdip-2005": ptdip,
  "ptdip-2006": ptdip,
  "ptdip-2007": ptdip,
  "ptdip-2008": ptdip,
  "ptdip-2009": ptdip,
  "ptdip-2010": ptdip,
  "ptdip-2011": ptdip,
  "ptdip-2012": ptdip,
  "ptdip-2013": ptdip,
  "ptdip-2014": ptdip,
  "ptdip-2015": ptdip,
  "ptdip-2016": ptdip,
  "ptdip-2017": ptdip,
  "ptdip-2018": ptdip,
  "ptdip-2019": ptdip,
  "ptdip-2020": ptdip,
  "ptdip-2021": ptdip,
  "ptdip-2022": ptdip,
  "ptdip-2023": ptdip,
  "ptdip-2024": ptdip,
  "ptdip-2025": ptdip,
  "ptdip-2026": ptdip,
  "ptdip-2027": ptdip,
  "ptdip-2028": ptdip,
  "ptdip-2029": ptdip,

  "ptpostdip-1990": ptpostdip,
  "ptpostdip-1991": ptpostdip,
  "ptpostdip-1992": ptpostdip,
  "ptpostdip-1993": ptpostdip,
  "ptpostdip-1994": ptpostdip,
  "ptpostdip-1995": ptpostdip,
  "ptpostdip-1996": ptpostdip,
  "ptpostdip-1997": ptpostdip,
  "ptpostdip-1998": ptpostdip,
  "ptpostdip-1999": ptpostdip,
  "ptpostdip-2000": ptpostdip,
  "ptpostdip-2001": ptpostdip,
  "ptpostdip-2002": ptpostdip,
  "ptpostdip-2003": ptpostdip,
  "ptpostdip-2004": ptpostdip,
  "ptpostdip-2005": ptpostdip,
  "ptpostdip-2006": ptpostdip,
  "ptpostdip-2007": ptpostdip,
  "ptpostdip-2008": ptpostdip,
  "ptpostdip-2009": ptpostdip,
  "ptpostdip-2010": ptpostdip,
  "ptpostdip-2011": ptpostdip,
  "ptpostdip-2012": ptpostdip,
  "ptpostdip-2013": ptpostdip,
  "ptpostdip-2014": ptpostdip,
  "ptpostdip-2015": ptpostdip,
  "ptpostdip-2016": ptpostdip,
  "ptpostdip-2017": ptpostdip,
  "ptpostdip-2018": ptpostdip,
  "ptpostdip-2019": ptpostdip,
  "ptpostdip-2020": ptpostdip,
  "ptpostdip-2021": ptpostdip,
  "ptpostdip-2022": ptpostdip,
  "ptpostdip-2023": ptpostdip,
  "ptpostdip-2024": ptpostdip,
  "ptpostdip-2025": ptpostdip,
  "ptpostdip-2026": ptpostdip,
  "ptpostdip-2027": ptpostdip,
  "ptpostdip-2028": ptpostdip,
  "ptpostdip-2029": ptpostdip,

  "ptmc-2010": ptmc,
  "ptmc-2011": ptmc,
  "ptmc-2012": ptmc,
  "ptmc-2013": ptmc,
  "ptmc-2014": ptmc,
  "ptmc-2015": ptmc,
  "ptmc-2016": ptmc,
  "ptmc-2017": ptmc,
  "ptmc-2018": ptmc,
  "ptmc-2019": ptmc,
  "ptmc-2020": ptmc,
  "ptmc-2021": ptmc,
  "ptmc-2022": ptmc,
  "ptmc-2023": ptmc,
  "ptmc-2024": ptmc,
  "ptmc-2025": ptmc,
  "ptmc-2026": ptmc,
  "ptmc-2027": ptmc,
  "ptmc-2028": ptmc,
  "ptmc-2029": ptmc,

  "ptmc-mod-2010": ptmcModularCourse,
  "ptmc-mod-2011": ptmcModularCourse,
  "ptmc-mod-2012": ptmcModularCourse,
  "ptmc-mod-2013": ptmcModularCourse,
  "ptmc-mod-2014": ptmcModularCourse,
  "ptmc-mod-2015": ptmcModularCourse,
  "ptmc-mod-2016": ptmcModularCourse,
  "ptmc-mod-2017": ptmcModularCourse,
  "ptmc-mod-2018": ptmcModularCourse,
  "ptmc-mod-2019": ptmcModularCourse,
  "ptmc-mod-2020": ptmcModularCourse,
  "ptmc-mod-2021": ptmcModularCourse,
  "ptmc-mod-2022": ptmcModularCourse,
  "ptmc-mod-2023": ptmcModularCourse,
  "ptmc-mod-2024": ptmcModularCourse,
  "ptmc-mod-2025": ptmcModularCourse,
  "ptmc-mod-2026": ptmcModularCourse,
  "ptmc-mod-2027": ptmcModularCourse,
  "ptmc-mod-2028": ptmcModularCourse,
  "ptmc-mod-2029": ptmcModularCourse,

  "ptpdc-mod-2010": ptpdcModularCourse,
  "ptpdc-mod-2011": ptpdcModularCourse,
  "ptpdc-mod-2012": ptpdcModularCourse,
  "ptpdc-mod-2013": ptpdcModularCourse,
  "ptpdc-mod-2014": ptpdcModularCourse,
  "ptpdc-mod-2015": ptpdcModularCourse,
  "ptpdc-mod-2016": ptpdcModularCourse,
  "ptpdc-mod-2017": ptpdcModularCourse,
  "ptpdc-mod-2018": ptpdcModularCourse,
  "ptpdc-mod-2019": ptpdcModularCourse,
  "ptpdc-mod-2020": ptpdcModularCourse,
  "ptpdc-mod-2021": ptpdcModularCourse,
  "ptpdc-mod-2022": ptpdcModularCourse,
  "ptpdc-mod-2023": ptpdcModularCourse,
  "ptpdc-mod-2024": ptpdcModularCourse,
  "ptpdc-mod-2025": ptpdcModularCourse,
  "ptpdc-mod-2026": ptpdcModularCourse,
  "ptpdc-mod-2027": ptpdcModularCourse,
  "ptpdc-mod-2028": ptpdcModularCourse,
  "ptpdc-mod-2029": ptpdcModularCourse,

  "ptpdc-2010": ptpdc,
  "ptpdc-2011": ptpdc,
  "ptpdc-2012": ptpdc,
  "ptpdc-2013": ptpdc,
  "ptpdc-2014": ptpdc,
  "ptpdc-2015": ptpdc,
  "ptpdc-2016": ptpdc,
  "ptpdc-2017": ptpdc,
  "ptpdc-2018": ptpdc,
  "ptpdc-2019": ptpdc,
  "ptpdc-2020": ptpdc,
  "ptpdc-2021": ptpdc,
  "ptpdc-2022": ptpdc,
  "ptpdc-2023": ptpdc,
  "ptpdc-2024": ptpdc,
  "ptpdc-2025": ptpdc,
  "ptpdc-2026": ptpdc,
  "ptpdc-2027": ptpdc,
  "ptpdc-2028": ptpdc,
  "ptpdc-2029": ptpdc,

  "ptdipdpss-2010": ptdipdpss,
  "ptdipdpss-2011": ptdipdpss,
  "ptdipdpss-2012": ptdipdpss,
  "ptdipdpss-2013": ptdipdpss,
  "ptdipdpss-2014": ptdipdpss,
  "ptdipdpss-2015": ptdipdpss,
  "ptdipdpss-2016": ptdipdpss,
  "ptdipdpss-2017": ptdipdpss,
  "ptdipdpss-2018": ptdipdpss,
  "ptdipdpss-2019": ptdipdpss,
  "ptdipdpss-2020": ptdipdpss,
  "ptdipdpss-2021": ptdipdpss,
  "ptdipdpss-2022": ptdipdpss,
  "ptdipdpss-2023": ptdipdpss,
  "ptdipdpss-2024": ptdipdpss,
  "ptdipdpss-2025": ptdipdpss,
  "ptdipdpss-2026": ptdipdpss,
  "ptdipdpss-2027": ptdipdpss,
  "ptdipdpss-2028": ptdipdpss,
  "ptdipdpss-2029": ptdipdpss,

  "ptdip_certis-2010": ptdipCertis,
  "ptdip_certis-2011": ptdipCertis,
  "ptdip_certis-2012": ptdipCertis,
  "ptdip_certis-2013": ptdipCertis,
  "ptdip_certis-2014": ptdipCertis,
  "ptdip_certis-2015": ptdipCertis,
  "ptdip_certis-2016": ptdipCertis,
  "ptdip_certis-2017": ptdipCertis,
  "ptdip_certis-2018": ptdipCertis,
  "ptdip_certis-2019": ptdipCertis,
  "ptdip_certis-2020": ptdipCertis,
  "ptdip_certis-2021": ptdipCertis,
  "ptdip_certis-2022": ptdipCertis,
  "ptdip_certis-2023": ptdipCertis,
  "ptdip_certis-2024": ptdipCertis,
  "ptdip_certis-2025": ptdipCertis,
  "ptdip_certis-2026": ptdipCertis,
  "ptdip_certis-2027": ptdipCertis,
  "ptdip_certis-2028": ptdipCertis,
  "ptdip_certis-2029": ptdipCertis,

  "ptsd_smu-2010": ptsdSmu,
  "ptsd_smu-2011": ptsdSmu,
  "ptsd_smu-2012": ptsdSmu,
  "ptsd_smu-2013": ptsdSmu,
  "ptsd_smu-2014": ptsdSmu,
  "ptsd_smu-2015": ptsdSmu,
  "ptsd_smu-2016": ptsdSmu,
  "ptsd_smu-2017": ptsdSmu,
  "ptsd_smu-2018": ptsdSmu,
  "ptsd_smu-2019": ptsdSmu,
  "ptsd_smu-2020": ptsdSmu,
  "ptsd_smu-2021": ptsdSmu,
  "ptsd_smu-2022": ptsdSmu,
  "ptsd_smu-2023": ptsdSmu,
  "ptsd_smu-2024": ptsdSmu,
  "ptsd_smu-2025": ptsdSmu,
  "ptsd_smu-2026": ptsdSmu,
  "ptsd_smu-2027": ptsdSmu,
  "ptsd_smu-2028": ptsdSmu,
  "ptsd_smu-2029": ptsdSmu,

  "ptsd_suss-2010": ptsdSuss,
  "ptsd_suss-2011": ptsdSuss,
  "ptsd_suss-2012": ptsdSuss,
  "ptsd_suss-2013": ptsdSuss,
  "ptsd_suss-2014": ptsdSuss,
  "ptsd_suss-2015": ptsdSuss,
  "ptsd_suss-2016": ptsdSuss,
  "ptsd_suss-2017": ptsdSuss,
  "ptsd_suss-2018": ptsdSuss,
  "ptsd_suss-2019": ptsdSuss,
  "ptsd_suss-2020": ptsdSuss,
  "ptsd_suss-2021": ptsdSuss,
  "ptsd_suss-2022": ptsdSuss,
  "ptsd_suss-2023": ptsdSuss,
  "ptsd_suss-2024": ptsdSuss,
  "ptsd_suss-2025": ptsdSuss,
  "ptsd_suss-2026": ptsdSuss,
  "ptsd_suss-2027": ptsdSuss,
  "ptsd_suss-2028": ptsdSuss,
  "ptsd_suss-2029": ptsdSuss,

  "ptsd_bcaa-2010": ptsdBcaa,
  "ptsd_bcaa-2011": ptsdBcaa,
  "ptsd_bcaa-2012": ptsdBcaa,
  "ptsd_bcaa-2013": ptsdBcaa,
  "ptsd_bcaa-2014": ptsdBcaa,
  "ptsd_bcaa-2015": ptsdBcaa,
  "ptsd_bcaa-2016": ptsdBcaa,
  "ptsd_bcaa-2017": ptsdBcaa,
  "ptsd_bcaa-2018": ptsdBcaa,
  "ptsd_bcaa-2019": ptsdBcaa,
  "ptsd_bcaa-2020": ptsdBcaa,
  "ptsd_bcaa-2021": ptsdBcaa,
  "ptsd_bcaa-2022": ptsdBcaa,
  "ptsd_bcaa-2023": ptsdBcaa,
  "ptsd_bcaa-2024": ptsdBcaa,
  "ptsd_bcaa-2025": ptsdBcaa,
  "ptsd_bcaa-2026": ptsdBcaa,
  "ptsd_bcaa-2027": ptsdBcaa,
  "ptsd_bcaa-2028": ptsdBcaa,
  "ptsd_bcaa-2029": ptsdBcaa,

  "ptsdoh-2010": ptsdoh,
  "ptsdoh-2011": ptsdoh,
  "ptsdoh-2012": ptsdoh,
  "ptsdoh-2013": ptsdoh,
  "ptsdoh-2014": ptsdoh,
  "ptsdoh-2015": ptsdoh,
  "ptsdoh-2016": ptsdoh,
  "ptsdoh-2017": ptsdoh,
  "ptsdoh-2018": ptsdoh,
  "ptsdoh-2019": ptsdoh,
  "ptsdoh-2020": ptsdoh,
  "ptsdoh-2021": ptsdoh,
  "ptsdoh-2022": ptsdoh,
  "ptsdoh-2023": ptsdoh,
  "ptsdoh-2024": ptsdoh,
  "ptsdoh-2025": ptsdoh,
  "ptsdoh-2026": ptsdoh,
  "ptsdoh-2027": ptsdoh,
  "ptsdoh-2028": ptsdoh,
  "ptsdoh-2029": ptsdoh,

  "ptsd_sit-2010": ptsdSit,
  "ptsd_sit-2011": ptsdSit,
  "ptsd_sit-2012": ptsdSit,
  "ptsd_sit-2013": ptsdSit,
  "ptsd_sit-2014": ptsdSit,
  "ptsd_sit-2015": ptsdSit,
  "ptsd_sit-2016": ptsdSit,
  "ptsd_sit-2017": ptsdSit,
  "ptsd_sit-2018": ptsdSit,
  "ptsd_sit-2019": ptsdSit,
  "ptsd_sit-2020": ptsdSit,
  "ptsd_sit-2021": ptsdSit,
  "ptsd_sit-2022": ptsdSit,
  "ptsd_sit-2023": ptsdSit,
  "ptsd_sit-2024": ptsdSit,
  "ptsd_sit-2025": ptsdSit,
  "ptsd_sit-2026": ptsdSit,
  "ptsd_sit-2027": ptsdSit,
  "ptsd_sit-2028": ptsdSit,
  "ptsd_sit-2029": ptsdSit,

  "ptsd_mha-2010": ptsdMha,
  "ptsd_mha-2011": ptsdMha,
  "ptsd_mha-2012": ptsdMha,
  "ptsd_mha-2013": ptsdMha,
  "ptsd_mha-2014": ptsdMha,
  "ptsd_mha-2015": ptsdMha,
  "ptsd_mha-2016": ptsdMha,
  "ptsd_mha-2017": ptsdMha,
  "ptsd_mha-2018": ptsdMha,
  "ptsd_mha-2019": ptsdMha,
  "ptsd_mha-2020": ptsdMha,
  "ptsd_mha-2021": ptsdMha,
  "ptsd_mha-2022": ptsdMha,
  "ptsd_mha-2023": ptsdMha,
  "ptsd_mha-2024": ptsdMha,
  "ptsd_mha-2025": ptsdMha,
  "ptsd_mha-2026": ptsdMha,
  "ptsd_mha-2027": ptsdMha,
  "ptsd_mha-2028": ptsdMha,
  "ptsd_mha-2029": ptsdMha,

  "ptsd_np-2010": ptsdNp,
  "ptsd_np-2011": ptsdNp,
  "ptsd_np-2012": ptsdNp,
  "ptsd_np-2013": ptsdNp,
  "ptsd_np-2014": ptsdNp,
  "ptsd_np-2015": ptsdNp,
  "ptsd_np-2016": ptsdNp,
  "ptsd_np-2017": ptsdNp,
  "ptsd_np-2018": ptsdNp,
  "ptsd_np-2019": ptsdNp,
  "ptsd_np-2020": ptsdNp,
  "ptsd_np-2021": ptsdNp,
  "ptsd_np-2022": ptsdNp,
  "ptsd_np-2023": ptsdNp,
  "ptsd_np-2024": ptsdNp,
  "ptsd_np-2025": ptsdNp,
  "ptsd_np-2026": ptsdNp,
  "ptsd_np-2027": ptsdNp,
  "ptsd_np-2028": ptsdNp,
  "ptsd_np-2029": ptsdNp,

  "ptfsm-2010": ptfsm,
  "ptfsm-2011": ptfsm,
  "ptfsm-2012": ptfsm,
  "ptfsm-2013": ptfsm,
  "ptfsm-2014": ptfsm,
  "ptfsm-2015": ptfsm,
  "ptfsm-2016": ptfsm,
  "ptfsm-2017": ptfsm,
  "ptfsm-2018": ptfsm,
  "ptfsm-2019": ptfsm,
  "ptfsm-2020": ptfsm,
  "ptfsm-2021": ptfsm,
  "ptfsm-2022": ptfsm,
  "ptfsm-2023": ptfsm,
  "ptfsm-2024": ptfsm,
  "ptfsm-2025": ptfsm,
  "ptfsm-2026": ptfsm,
  "ptfsm-2027": ptfsm,
  "ptfsm-2028": ptfsm,
  "ptfsm-2029": ptfsm
};

export default addDirToTemplatePath("tp", templates);
