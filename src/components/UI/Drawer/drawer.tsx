import React, { Component, ReactNode } from "react";
import css from "./drawer.module.scss";

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
      <a
        href=""
        className={`${css.tabs} ${activeIdx === index ? css.active : ""} `}
        key={index}
        onClick={(e) => {
          e.preventDefault();
          this.renderContent(index, tab.id);
        }}
      >
        {tab.label}
      </a>
    ));
  }

  renderContent(index: number, id: string): void {
    this.props.toggle(index, id);
    this.toggleDrawer();
  }

  render(): ReactNode {
    const { tabs, children } = this.props;
    const { visible, showAbsHeader } = this.state;

    return (
      <>
        {visible ? (
          <div id="mySidenav" className={css.sidenav}>
            <a
              href=""
              className={css.closebtn}
              onClick={(e) => {
                e.preventDefault();
                this.toggleDrawer();
              }}
            >
              &times;
            </a>
            {this.createTabs(tabs)}
          </div>
        ) : null}
        <div className={`${css.gray} ${showAbsHeader ? "" : css["mb-sidenav"]} container-fluid`}>
          <div className={css.togglebtn} onClick={() => this.toggleDrawer()}>
            &#9776;
          </div>
        </div>

        <div id="main">{children}</div>
      </>
    );
  }
}
