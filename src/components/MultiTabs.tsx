import Link from "next/link";
import React, { useState } from "react";
import { connect } from "react-redux";
import { resetCertificateState } from "../reducers/certificate.actions";
import { Drawer } from "./UI/Drawer";

interface MultiTabsProps {
  resetData: () => void;
  templates: { id: string; label: string }[];
  onSelectTemplate: (label: string) => void;
}
const MultiTabs: React.FunctionComponent<MultiTabsProps> = ({ resetData, templates, onSelectTemplate }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  return (
    <nav className="bg-blue-100 py-4 border-b-4 mb-4">
      <div className="block md:hidden">
        <Drawer
          tabs={templates}
          activeIdx={selectedTemplate}
          toggle={(index, id) => {
            setSelectedTemplate(index);
            onSelectTemplate(id);
          }}
        />
      </div>
      <div className="hidden md:block">
        <div className="container">
          <div className="flex flex-wrap">
            <div className="w-full ml-auto mb-8 lg:mb-0 lg:w-auto lg:order-2">
              <Link href="/">
                <a
                  className="button border border-navy text-navy bg-white hover:bg-navy"
                  id="btn-view-another"
                  onClick={() => resetData()}
                >
                  View another
                </a>
              </Link>
            </div>
            <div className="w-full lg:flex-1 lg:order-1">
              <ul id="template-tabs-list" className="flex flex-wrap -mx-4">
                {templates && templates.length > 0
                  ? templates.map((template, idx) => (
                      <li key={idx} className="w-auto mr-2">
                        <a
                          className={`p-4 border-b-4 uppercase text-black hover:text-black hover:text-opacity-75 hover:border-black ${
                            idx === selectedTemplate ? "font-semi border-black" : "border-grey text-opacity-50"
                          }`}
                          data-testid={template.id}
                          onClick={() => {
                            setSelectedTemplate(idx);
                            onSelectTemplate(template.id);
                          }}
                        >
                          {template.label}
                        </a>
                      </li>
                    ))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const MutiTabsContainer = connect(null, (dispatch) => ({
  resetData: () => dispatch(resetCertificateState()),
}))(MultiTabs);
