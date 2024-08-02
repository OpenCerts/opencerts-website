import { VerificationFragment } from "@govtechsg/oa-verify";
import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WrappedOrSignedOpenCertsDocument } from "../shared";

import { states } from "./shared";

export interface CertificateState {
  raw: null | WrappedOrSignedOpenCertsDocument;
  rawModified: null | WrappedOrSignedOpenCertsDocument;

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

export const certificateSlice = createSlice({
  name: "certificate",
  initialState,
  reducers: {
    resetCertificateState: () => ({
      ...initialState,
    }),
    updateCertificate: (_, { payload }: PayloadAction<WrappedOrSignedOpenCertsDocument>) => ({
      ...initialState,
      raw: payload,
      rawModified: payload,
    }),
    verifyingCertificate: (state) => ({
      ...state,
      verificationPending: true,
      verificationStatus: null,
    }),
    verifyingCertificateCompleted: (state, { payload }: PayloadAction<VerificationFragment[]>) => ({
      ...state,
      verificationPending: false,
      verificationStatus: payload,
    }),
    verifyingCertificateErrored: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      verificationPending: false,
      verificationError: payload,
    }),
    sendCertificate: (state, _: PayloadAction<{ email: string; captcha: string }>) => ({
      ...state,
      emailState: states.PENDING,
      emailError: null,
    }),
    sendCertificateReset: (state) => ({
      ...state,
      emailState: states.INITIAL,
      emailError: null,
    }),
    sendCertificateSuccess: (state) => ({
      ...state,
      emailState: states.SUCCESS,
      emailError: null,
    }),
    sendCertificateFailure: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      emailState: states.FAILURE,
      emailError: payload,
    }),
    // triggers generateShareLinkSaga
    generateShareLink: (state) => state,
    generateShareLinkSuccess: (state, { payload }: PayloadAction<{ id: string; key: string }>) => ({
      ...state,
      shareLink: payload,
      shareLinkState: states.SUCCESS,
    }),
    generateShareLinkFailure: (state, _: PayloadAction<string>) => ({
      ...state,
      shareLink: {},
      shareLinkState: states.FAILURE,
    }),
    generateShareLinkReset: (state) => ({
      ...state,
      shareLink: {},
      shareLinkState: states.INITIAL,
    }),
    // triggers retrieveCertificateByActionSaga
    retrieveCertificateByAction: (
      state,
      _: PayloadAction<{
        uri: string;
        key?: string;
        anchorKey?: string;
      }>
    ) => state,
    retrieveCertificateByActionPending: (state) => ({
      ...state,
      retrieveCertificateByActionState: states.PENDING,
    }),
    retrieveCertificateByActionSuccess: (state) => ({
      ...state,
      retrieveCertificateByActionState: states.SUCCESS,
    }),
    retrieveCertificateByActionFailure: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      retrieveCertificateByActionState: states.FAILURE,
      retrieveCertificateByActionError: payload,
    }),
    updateObfuscatedCertificate: (state, { payload }: PayloadAction<WrappedOrSignedOpenCertsDocument>) => ({
      ...state,
      rawModified: payload,
    }),
  },
});

export const {
  resetCertificateState,
  updateCertificate,
  verifyingCertificate,
  verifyingCertificateCompleted,
  verifyingCertificateErrored,
  sendCertificate,
  sendCertificateReset,
  sendCertificateSuccess,
  sendCertificateFailure,
  generateShareLink,
  generateShareLinkSuccess,
  generateShareLinkFailure,
  generateShareLinkReset,
  retrieveCertificateByAction,
  retrieveCertificateByActionPending,
  retrieveCertificateByActionSuccess,
  retrieveCertificateByActionFailure,
  updateObfuscatedCertificate,
} = certificateSlice.actions;

export const certificateReducer = certificateSlice.reducer;
