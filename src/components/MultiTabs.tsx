import React, { useState } from "react";
import { Drawer } from "./UI/Drawer";
import { ViewAnotherButtonContainer } from "./ViewAnotherButton";

interface MultiTabsProps {
  templates: { id: string; label: string }[];
  onSelectTemplate: (label: string) => void;
  /**
   * A presentation's own tab strip carries the button already, one strip above this one —
   * rendering it again here would duplicate both the action and its id.
   */
  showViewAnother?: boolean;
}
const MultiTabs: React.FunctionComponent<MultiTabsProps> = ({
  templates,
  onSelectTemplate,
  showViewAnother = true,
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  return (
    <div className={`bg-blue-100 pt-4 border-b-4 mb-4${!templates || templates.length === 0 ? " pb-4" : ""}`}>
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
            {showViewAnother && (
              <div className="w-full ml-auto mb-8 lg:mb-0 lg:w-auto lg:order-2">
                <ViewAnotherButtonContainer />
              </div>
            )}
            <div className="w-full lg:flex-1 lg:order-1">
              <ul id="template-tabs-list" className="flex flex-wrap -mx-4">
                {templates && templates.length > 0
                  ? templates.map((template, idx) => (
                      <li key={idx} className="w-auto mr-2 max-w-xs">
                        <a
                          className={`p-4 border-b-4 uppercase text-black hover:text-black hover:text-opacity-75 hover:border-black block overflow-x-auto whitespace-nowrap ${
                            idx === selectedTemplate ? "font-semi border-black" : "border-neutral-400 text-neutral-500"
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
    </div>
  );
};

// Exported under the name the renderer imports. The strip no longer needs the store: the
// button connects itself.
export const MutiTabsContainer = MultiTabs;
