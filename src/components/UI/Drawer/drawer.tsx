import React, { Component, ReactNode } from "react";

interface Tab {
  id: string;
  label: string;
}
interface DrawerProps {
  toggle: (index: number, id: string) => void;
  tabs: Tab[];
  activeIdx: number;
}
interface DrawerState {
  visible: boolean;
  showAbsHeader: boolean;
}

export class Drawer extends Component<DrawerProps, DrawerState> {
  constructor(props: DrawerProps) {
    super(props);
    this.state = {
      visible: false,
      showAbsHeader: false,
    };
  }

  toggleDrawer(): void {
    this.setState({ visible: !this.state.visible });
  }

  createTabs(tabs: Tab[]): ReactNode {
    const { activeIdx } = this.props;
    return tabs.map((tab, index) => (
      <div
        className={`cursor-pointer w-full text-white border-b py-4 hover:text-opacity-100 ${
          activeIdx === index ? "" : "text-opacity-50"
        }`}
        key={index}
        onClick={(e) => {
          e.preventDefault();
          this.renderContent(index, tab.id);
        }}
      >
        {tab.label}
      </div>
    ));
  }

  renderContent(index: number, id: string): void {
    this.props.toggle(index, id);
    this.toggleDrawer();
  }

  render(): ReactNode {
    const { tabs } = this.props;
    const { visible, showAbsHeader } = this.state;

    return (
      <>
        <div
          className={`cursor-pointer text-lg text-white ${showAbsHeader ? "" : "absolute top-0 right-0 mt-4 mr-4"}`}
          onClick={() => this.toggleDrawer()}
        >
          &#9776;
        </div>
        {visible ? (
          <aside className="bg-navy text-lg fixed top-0 right-0 h-screen p-4">
            <div
              className="cursor-pointer text-white"
              onClick={(e) => {
                e.preventDefault();
                this.toggleDrawer();
              }}
            >
              &times;
            </div>
            <div className="flex flex-wrap">{this.createTabs(tabs)}</div>
          </aside>
        ) : null}
      </>
    );
  }
}
