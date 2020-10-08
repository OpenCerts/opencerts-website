// Action Creators
import { VerificationFragment } from "@govtechsg/oa-verify";
import { v2, WrappedDocument } from "@govtechsg/open-attestation";

// Actions
export const RESET_CERTIFICATE = "RESET_CERTIFICATE";
export const UPDATE_CERTIFICATE = "UPDATE_CERTIFICATE";
export const VERIFYING_CERTIFICATE = "VERIFYING_CERTIFICATE";
export const VERIFYING_CERTIFICATE_COMPLETED = "VERIFYING_CERTIFICATE_COMPLETED"; // completed
export const VERIFYING_CERTIFICATE_ERRORED = "VERIFYING_CERTIFICATE_ERRORED"; // errored
export const SENDING_CERTIFICATE = "SENDING_CERTIFICATE";
export const SENDING_CERTIFICATE_SUCCESS = "SENDING_CERTIFICATE_SUCCESS";
export const SENDING_CERTIFICATE_FAILURE = "SENDING_CERTIFICATE_FAILURE";
export const SENDING_CERTIFICATE_RESET = "SENDING_CERTIFICATE_RESET";
export const GENERATE_SHARE_LINK = "GENERATE_SHARE_LINK";
export const GENERATE_SHARE_LINK_SUCCESS = "GENERATE_SHARE_LINK_SUCCESS";
export const GENERATE_SHARE_LINK_FAILURE = "GENERATE_SHARE_LINK_FAILURE";
export const GENERATE_SHARE_LINK_RESET = "GENERATE_SHARE_LINK_RESET";
export const RETRIEVE_CERTIFICATE_BY_ACTION = "RETRIEVE_CERTIFICATE_BY_ACTION";
export const RETRIEVE_CERTIFICATE_BY_ACTION_PENDING = "RETRIEVE_CERTIFICATE_BY_ACTION_PENDING";
export const RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS = "RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS";
export const RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE = "RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE";
export const CERTIFICATE_OBFUSCATE_UPDATE = "CERTIFICATE_OBFUSCATE_UPDATE";

interface ResetCertificateAction {
  type: typeof RESET_CERTIFICATE;
}
export function resetCertificateState(): ResetCertificateAction {
  return {
    type: RESET_CERTIFICATE,
  };
}

interface UpdateCertificateAction {
  type: typeof UPDATE_CERTIFICATE;
  payload: WrappedDocument<v2.OpenAttestationDocument>;
}
export function updateCertificate(payload: WrappedDocument<v2.OpenAttestationDocument>): UpdateCertificateAction {
  return {
    type: UPDATE_CERTIFICATE,
    payload,
  };
}

interface VerifyingCertificateAction {
  type: typeof VERIFYING_CERTIFICATE;
}
export const verifyingCertificate = (): VerifyingCertificateAction => ({
  type: VERIFYING_CERTIFICATE,
});

interface VerifyingCertificateCompletedAction {
  type: typeof VERIFYING_CERTIFICATE_COMPLETED;
  payload: VerificationFragment[];
}
export const verifyingCertificateCompleted = (
  payload: VerificationFragment[]
): VerifyingCertificateCompletedAction => ({
  type: VERIFYING_CERTIFICATE_COMPLETED,
  payload,
});

interface VerifyingCertificateErroredAction {
  type: typeof VERIFYING_CERTIFICATE_ERRORED;
  payload: string;
}
export const verifyingCertificateErrored = (payload: string): VerifyingCertificateErroredAction => ({
  type: VERIFYING_CERTIFICATE_ERRORED,
  payload,
});

interface SendCertificateAction {
  type: typeof SENDING_CERTIFICATE;
  payload: { email: string; captcha: string };
}
export function sendCertificate(payload: { email: string; captcha: string }): SendCertificateAction {
  return {
    type: SENDING_CERTIFICATE,
    payload,
  };
}
interface SendCertificateSuccessAction {
  type: typeof SENDING_CERTIFICATE_SUCCESS;
}
export function sendCertificateSuccess(): SendCertificateSuccessAction {
  return {
    type: SENDING_CERTIFICATE_SUCCESS,
  };
}
interface SendCertificateFailureAction {
  type: typeof SENDING_CERTIFICATE_FAILURE;
  payload: string;
}
export function sendCertificateFailure(payload: string): SendCertificateFailureAction {
  return {
    type: SENDING_CERTIFICATE_FAILURE,
    payload,
  };
}

interface SendCertificateResetAction {
  type: typeof SENDING_CERTIFICATE_RESET;
}
export function sendCertificateReset(): SendCertificateResetAction {
  return {
    type: SENDING_CERTIFICATE_RESET,
  };
}

interface GenerateShareLinkAction {
  type: typeof GENERATE_SHARE_LINK;
}
export function generateShareLink(): GenerateShareLinkAction {
  return {
    type: GENERATE_SHARE_LINK,
  };
}
interface GenerateShareLinkResetAction {
  type: typeof GENERATE_SHARE_LINK_RESET;
}
export function generateShareLinkReset(): GenerateShareLinkResetAction {
  return {
    type: GENERATE_SHARE_LINK_RESET,
  };
}
interface GenerateShareLinkSuccessAction {
  type: typeof GENERATE_SHARE_LINK_SUCCESS;
  payload: { id: string; key: string };
}
export function generateShareLinkSuccess(payload: { id: string; key: string }): GenerateShareLinkSuccessAction {
  return {
    type: GENERATE_SHARE_LINK_SUCCESS,
    payload,
  };
}
interface GenerateShareLinkFailureAction {
  type: typeof GENERATE_SHARE_LINK_FAILURE;
  payload: string;
}
export function generateShareLinkFailure(payload: string): GenerateShareLinkFailureAction {
  return {
    type: GENERATE_SHARE_LINK_FAILURE,
    payload,
  };
}

interface RetrieveCertificateAction {
  type: typeof RETRIEVE_CERTIFICATE_BY_ACTION;
  payload: { uri: string; key?: string };
}
export function retrieveCertificateByAction(payload: { uri: string; key?: string }): RetrieveCertificateAction {
  return {
    type: RETRIEVE_CERTIFICATE_BY_ACTION,
    payload,
  };
}
interface RetrieveCertificatePendingAction {
  type: typeof RETRIEVE_CERTIFICATE_BY_ACTION_PENDING;
}
export function retrieveCertificateByActionPending(): RetrieveCertificatePendingAction {
  return {
    type: RETRIEVE_CERTIFICATE_BY_ACTION_PENDING,
  };
}
interface RetrieveCertificateSuccessAction {
  type: typeof RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS;
}
export function retrieveCertificateByActionSuccess(): RetrieveCertificateSuccessAction {
  return {
    type: RETRIEVE_CERTIFICATE_BY_ACTION_SUCCESS,
  };
}

interface RetrieveCertificateErrorAction {
  type: typeof RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE;
  payload: string;
}
export function retrieveCertificateByActionFailure(payload: string): RetrieveCertificateErrorAction {
  return {
    type: RETRIEVE_CERTIFICATE_BY_ACTION_FAILURE,
    payload,
  };
}

interface UpdateObfuscatedDocumentAction {
  type: typeof CERTIFICATE_OBFUSCATE_UPDATE;
  payload: WrappedDocument<v2.OpenAttestationDocument>;
}
export function updateObfuscatedCertificate(
  payload: WrappedDocument<v2.OpenAttestationDocument>
): UpdateObfuscatedDocumentAction {
  return {
    type: CERTIFICATE_OBFUSCATE_UPDATE,
    payload,
  };
}

export type CertificateActionTypes =
  | ResetCertificateAction
  | UpdateCertificateAction
  | VerifyingCertificateAction
  | VerifyingCertificateErroredAction
  | VerifyingCertificateCompletedAction
  | SendCertificateAction
  | SendCertificateSuccessAction
  | SendCertificateFailureAction
  | SendCertificateResetAction
  | GenerateShareLinkAction
  | GenerateShareLinkResetAction
  | GenerateShareLinkFailureAction
  | GenerateShareLinkSuccessAction
  | RetrieveCertificatePendingAction
  | RetrieveCertificateSuccessAction
  | RetrieveCertificateErrorAction
  | UpdateObfuscatedDocumentAction;
