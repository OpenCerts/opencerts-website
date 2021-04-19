import { v2, WrappedDocument } from "@govtechsg/open-attestation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Wrapper, Main } from "../src/components/Layout/Body";
import { FooterBar } from "../src/components/Layout/FooterBar";
import { NavigationBar } from "../src/components/Layout/NavigationBar";
import { MainPageContainer } from "../src/components/MainPageContainer";
import {
  resetCertificateState,
  retrieveCertificateByActionFailure,
  retrieveCertificateByAction,
  updateCertificate,
} from "../src/reducers/certificate.actions";

interface HomePageProps {
  resetCertificateState: () => void;
  retrieveCertificateByAction: (payload: { uri: string; key?: string }) => void;
  retrieveCertificateByActionFailure: (message: string) => void;
  updateCertificate: (payload: WrappedDocument<v2.OpenAttestationDocument>) => void;
}
const HomePage: React.FunctionComponent<HomePageProps> = (props) => {
  const router = useRouter();
  useEffect(() => {
    props.resetCertificateState();
    if (router.query.q) {
      const action = JSON.parse(window.decodeURI(router.query.q as string));
      if (action.type === "DOCUMENT") {
        props.retrieveCertificateByAction(action.payload);
      } else {
        props.retrieveCertificateByActionFailure(`The type ${action.type} provided from the action is not supported`);
      }
    }
  }, [props, router]);
  useEffect(() => {
    // https://web.dev/file-handling/
    // https://web.dev/deprecating-excalidraw-electron/
    // https://developer.mozilla.org/en-US/docs/Web/API/FileSystemFileHandle
    // https://developer.mozilla.org/en-US/docs/Web/API/Blob/text
    if ("launchQueue" in window) {
      window.launchQueue.setConsumer(async (launchParams) => {
        // Nothing to do when the queue is empty.
        if (!launchParams.files.length) {
          return;
        }
        for (const fileHandle of launchParams.files) {
          try {
            const fileData = await fileHandle.getFile();
            const text = await fileData.text();
            props.updateCertificate(JSON.parse(text));
          } catch (e) {
            console.error(e);
          }
        }
      });
    }
  }, [props]);
  return (
    <Wrapper>
      <NavigationBar />
      <Main>
        <MainPageContainer />
      </Main>
      <FooterBar />
    </Wrapper>
  );
};

export default connect(null, {
  resetCertificateState,
  retrieveCertificateByAction,
  retrieveCertificateByActionFailure,
  updateCertificate,
})(HomePage);
