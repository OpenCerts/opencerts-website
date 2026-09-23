import Link from "next/link";
import React from "react";
import { connect } from "react-redux";
import { resetCertificateState } from "../reducers/certificate.slice";

interface ViewAnotherButtonProps {
  resetData: () => void;
}

/**
 * Extracted from MultiTabs so a presentation's tab strip can carry the same button, in the same
 * place, as the template strip below it — rather than two copies of this markup drifting apart.
 * Both strips can render it, but never at once: MultiTabs is told to omit it inside a
 * presentation, because the id has to stay unique.
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
