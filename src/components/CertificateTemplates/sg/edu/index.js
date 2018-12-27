import mapDir from "../../mapDir";

import SITCerts from "./singaporetech";
import NPCerts from "./np";

export default mapDir("edu", { ...SITCerts, ...NPCerts });
