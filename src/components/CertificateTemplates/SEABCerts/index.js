import SEABTranscript from "./transcript";
import SEABTranscriptExplNotesMain from "./explnotesmain";
import SEABTranscriptExplNotesDtl from "./explnotesdtl";

const templates = [
  {
    id: "transcript",
    label: "Transcript",
    template: SEABTranscript
  },
  {
    id: "explnotesmain",
    label: "Explanatory Notes - Main",
    template: SEABTranscriptExplNotesMain
  }
];

const addresses = ["0x715bf4bFabaA7027Db435d1E779C4F856d3DbB1C"];

export default { templates, addresses };
