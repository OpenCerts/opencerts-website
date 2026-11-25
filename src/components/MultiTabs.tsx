import React, { useRef, useState } from "react";
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
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (idx: number): void => {
    setSelectedTemplate(idx);
    onSelectTemplate(templates[idx].id);
  };

  // Arrow/Home/End move between tabs (ARIA tabs pattern, as in CredentialTabs): with the
  // roving tabIndex below, the strip is a single Tab stop.
  const onTabKeyDown = (event: React.KeyboardEvent<HTMLUListElement>): void => {
    const last = templates.length - 1;
    let next: number;
    switch (event.key) {
      case "ArrowRight":
        next = selectedTemplate === last ? 0 : selectedTemplate + 1;
        break;
      case "ArrowLeft":
        next = selectedTemplate === 0 ? last : selectedTemplate - 1;
        break;
      case "Home":
        next = 0;
        break;
      case "End":
        next = last;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

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
              <ul
                id="template-tabs-list"
                className="flex flex-wrap -mx-4"
                role="tablist"
                aria-label="Certificate views"
                onKeyDown={onTabKeyDown}
              >
                {templates && templates.length > 0
                  ? templates.map((template, idx) => (
                      <li key={idx} className="w-auto mr-2 max-w-xs">
                        <button
                          type="button"
                          ref={(element) => {
                            tabRefs.current[idx] = element;
                          }}
                          role="tab"
                          aria-selected={idx === selectedTemplate}
                          tabIndex={idx === selectedTemplate ? 0 : -1}
                          className={`p-4 border-b-4 uppercase text-black hover:text-black hover:text-opacity-75 hover:border-black block overflow-x-auto whitespace-nowrap ${
                            idx === selectedTemplate ? "font-semi border-black" : "border-neutral-400 text-neutral-500"
                          }`}
                          data-testid={template.id}
                          onClick={() => select(idx)}
                        >
                          {template.label}
                        </button>
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
