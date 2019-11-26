import React from "react";
import { useRouter } from "next/router";
import HomePage from "./index";

const SharedDocumentPage = () => {
  const router = useRouter();
  const { documentId } = router.query;

  return <HomePage documentId={documentId} />;
};
export default SharedDocumentPage;
