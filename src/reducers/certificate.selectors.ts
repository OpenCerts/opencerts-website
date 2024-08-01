import { VerificationFragment } from "@govtechsg/oa-verify";
import { WrappedOrSignedOpenCertsDocument } from "../shared";
import { RootState } from "../store";
import { states } from "./shared";

export function getCertificate(store: RootState): WrappedOrSignedOpenCertsDocument | null {
  return store.certificate.rawModified;
}

export function getVerifying(store: RootState): boolean {
  return store.certificate.verificationPending || store.certificate.retrieveCertificateByActionState === states.PENDING;
}

export function getVerificationStatus(store: RootState): VerificationFragment[] | null {
  return store.certificate.verificationStatus;
}

export function getEmailSendingState(store: RootState): states {
  return store.certificate.emailState;
}

export function getShareLink(store: RootState): { id?: string; key?: string } {
  return store.certificate.shareLink;
}

export function getShareLinkState(store: RootState): states {
  return store.certificate.shareLinkState;
}

export function getCertificateByActionError(store: RootState): string | null {
  return store.certificate.retrieveCertificateByActionError;
}
