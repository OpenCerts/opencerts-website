import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { resetCertificateState } from "../reducers/certificate.slice";

interface ViewAnotherButtonProps {
  resetData: () => void;
}

/**
 * Extracted from MultiTabs so the tab strip of a presentation can carry the same button in the
 * same place a single certificate's tab strip does. Only one may be rendered at a time — the id
 * is what the integration specs click.
 */
const ViewAnotherButton: React.FunctionComponent<ViewAnotherButtonProps> = ({ resetData }) => (
  <Link legacyBehavior href="/">
    <a
      className="button border border-navy text-navy bg-white hover:bg-navy"
      id="btn-view-another"
      onClick={() => resetData()}
    >
      View another
    </a>
  </Link>
);

export const ViewAnotherButtonContainer = connect(null, (dispatch) => ({
  resetData: () => dispatch(resetCertificateState()),
}))(ViewAnotherButton);
