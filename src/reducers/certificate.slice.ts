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
    updateCertificate: (_, { payload }) => ({
      ...initialState,
      raw: payload,
      rawModified: payload,
    }),
    verifyingCertificate: (state) => ({
      ...state,
      verificationPending: true,
      verificationStatus: null,
    }),
    verifyingCertificateCompleted: (state, { payload }) => ({
      ...state,
      verificationPending: false,
      verificationStatus: payload,
    }),
    verifyingCertificateErrored: (state, { payload }) => ({
      ...state,
      verificationPending: false,
      verificationError: payload,
    }),
    sendingCertificate: (state) => ({
      ...state,
      emailState: states.PENDING,
      emailError: null,
    }),
    resetSendingCertificate: (state) => ({
      ...state,
      emailState: states.INITIAL,
      emailError: null,
    }),
    sendingCertificateSuccess: (state) => ({
      ...state,
      emailState: states.SUCCESS,
      emailError: null,
    }),
    sendingCertificateFailure: (state, { payload }) => ({
      ...state,
      emailState: states.FAILURE,
      emailError: payload,
    }),
    generateShareLinkSucess: (state, { payload }) => ({
      ...state,
      shareLink: payload,
      shareLinkState: states.SUCCESS,
    }),
    generateShareLinkFailure: (state) => ({
      ...state,
      shareLink: {},
      shareLinkState: states.FAILURE,
    }),
    resetGenerateShareLink: (state) => ({
      ...state,
      shareLink: {},
      shareLinkState: states.INITIAL,
    }),
    retreiveCertifcateByActionPending: (state) => ({
      ...state,
      retrieveCertificateByActionState: states.PENDING,
    }),
    retreiveCertifcateByActionSuccess: (state) => ({
      ...state,
      retrieveCertificateByActionState: states.SUCCESS,
    }),
    retreiveCertifcateByActionFailure: (state, { payload }) => ({
      ...state,
      retrieveCertificateByActionState: states.FAILURE,
      retrieveCertificateByActionError: payload,
    }),
    updateObfuscatedCertificate: (state, { payload }) => ({
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
  sendingCertificate,
  resetSendingCertificate,
  sendingCertificateSuccess,
  sendingCertificateFailure,
  generateShareLinkSucess,
  generateShareLinkFailure,
  resetGenerateShareLink,
  retreiveCertifcateByActionPending,
  retreiveCertifcateByActionSuccess,
  retreiveCertifcateByActionFailure,
  updateObfuscatedCertificate,
} = certificateSlice.actions;

export const sendCertificate = createAction<{ email: string; captcha: string }>("certificate/sendCertificate");
export const retrieveCertificateByAction = createAction<{
  uri: string;
  key?: string;
  anchorKey?: string;
}>("certificate/retrieveCertificateByAction");
export const verifyCertificate = createAction<WrappedOrSignedOpenCertsDocument>("certificate/verifyCertificate");
export const generateShareLink = createAction("certificate/generateShareLink");

export const certificateReducer = certificateSlice.reducer;
