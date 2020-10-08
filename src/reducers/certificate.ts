import { VerificationFragment } from "@govtechsg/oa-verify";
import { v2, WrappedDocument } from "@govtechsg/open-attestation";
import {
  CERTIFICATE_OBFUSCATE_UPDATE,
  CertificateActionTypes,
  GENERATE_SHARE_LINK_FAILURE,
  GENERATE_SHARE_LINK_RESET,
  GENERATE_SHARE_LINK_SUCCESS,
  RESET_CERTIFICATE,
  RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE,
  RETRIEVE_CERTIFICATE_BY_ACTION_PENDING,
  RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS,
  SENDING_CERTIFICATE,
  SENDING_CERTIFICATE_FAILURE,
  SENDING_CERTIFICATE_RESET,
  SENDING_CERTIFICATE_SUCCESS,
  UPDATE_CERTIFICATE,
  VERIFYING_CERTIFICATE,
  VERIFYING_CERTIFICATE_COMPLETED,
  VERIFYING_CERTIFICATE_ERRORED,
} from "./certificate.actions";
import { states } from "./shared";

export interface CertificateState {
  raw: null | WrappedDocument<v2.OpenAttestationDocument>;
  rawModified: null | WrappedDocument<v2.OpenAttestationDocument>;

  verificationPending: boolean;
  verificationStatus: null | VerificationFragment[];
  verificationError: null | string;

  emailState: states;
  emailError: null | string;

  shareLink: { id?: string; key?: string };
  shareLinkState: states;
  shareLinkError: null;

  retrieveCertificateByActionState: states;
  retrieveCertificateByActionError: null | string;
}

export const initialState: CertificateState = {
  raw: null,
  rawModified: null,

  verificationPending: false,
  verificationStatus: null,
  verificationError: null,

  emailState: states.INITIAL,
  emailError: null,

  shareLink: {},
  shareLinkState: states.INITIAL,
  shareLinkError: null,

  retrieveCertificateByActionState: states.INITIAL,
  retrieveCertificateByActionError: null,
};

// Reducers
export function reducer(state = initialState, action: CertificateActionTypes): CertificateState {
  switch (action.type) {
    case RESET_CERTIFICATE:
      return {
        ...initialState,
      };
    case UPDATE_CERTIFICATE:
      return {
        ...initialState,
        raw: action.payload,
        rawModified: action.payload,
      };
    case VERIFYING_CERTIFICATE:
      return {
        ...state,
        verificationPending: true,
        verificationStatus: null,
      };
    case VERIFYING_CERTIFICATE_COMPLETED:
      return {
        ...state,
        verificationPending: false,
        verificationStatus: action.payload,
      };
    case VERIFYING_CERTIFICATE_ERRORED:
      return {
        ...state,
        verificationPending: false,
        verificationError: action.payload,
      };
    case SENDING_CERTIFICATE:
      return {
        ...state,
        emailState: states.PENDING,
        emailError: null,
      };
    case SENDING_CERTIFICATE_RESET:
      return {
        ...state,
        emailState: states.INITIAL,
        emailError: null,
      };
    case SENDING_CERTIFICATE_SUCCESS:
      return {
        ...state,
        emailState: states.SUCCESS,
        emailError: null,
      };
    case SENDING_CERTIFICATE_FAILURE:
      return {
        ...state,
        emailState: states.FAILURE,
        emailError: action.payload,
      };
    case GENERATE_SHARE_LINK_SUCCESS:
      return {
        ...state,
        shareLink: action.payload,
        shareLinkState: states.SUCCESS,
      };
    case GENERATE_SHARE_LINK_FAILURE:
      return {
        ...state,
        shareLink: {},
        shareLinkState: states.FAILURE,
      };
    case GENERATE_SHARE_LINK_RESET:
      return {
        ...state,
        shareLink: {},
        shareLinkState: states.INITIAL,
      };
    case RETRIEVE_CERTIFICATE_BY_ACTION_PENDING:
      return {
        ...state,
        retrieveCertificateByActionState: states.PENDING,
      };
    case RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS:
      return {
        ...state,
        retrieveCertificateByActionState: states.SUCCESS,
      };
    case RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE:
      return {
        ...state,
        retrieveCertificateByActionState: states.FAILURE,
        retrieveCertificateByActionError: action.payload,
      };
    case CERTIFICATE_OBFUSCATE_UPDATE:
      return {
        ...state,
        rawModified: action.payload,
      };
    default:
      return state;
  }
}
