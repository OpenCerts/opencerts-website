import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import PropTypes from "prop-types";
import { isoDateToLocal, sassClassNames } from ".";
import scss from "./transcriptFramework.scss";

// constants
const MAX_PAGES = 10;
const MAX_ROWS_PER_COL = 40;
// height of transcript page content
const CONTENT_HEIGHT = 567;

// array storing page content bottom of each page
const contentBottom = [];
// global state
const onPrintRow = function(nextCol, action) {
  // nextCol defaults to false
  switch (action.type) {
    case "NO_CHANGE":
      return false;
    case "CHANGE_COLUMN":
      return true;
    default:
      return false;
  }
};
const gState = createStore(onPrintRow);

// construct class names
const cls = names => sassClassNames(names, scss);

// obtain data to be reflected in header
export const renderTranscriptHeaderData = dataSource => ({
  name: dataSource.recipient.name,
  studentId: dataSource.recipient.studentId,
  dateOfBirth: dataSource.recipient.dateOfBirth,
  issuedOn: dataSource.issuedOn
});

// render a blank table with column width information
const setColWidth = () => {
  const html = (
    <tr>
      <td className={cls("ts-col0 no-padding")} />
      <td className={cls("ts-col1 no-padding")} />
      <td className={cls("ts-col2 no-padding")} />
      <td className={cls("ts-col3 no-padding")} />
    </tr>
  );
  return html;
};

// render legend page
const renderTranscriptLegendPage = (legend, ratio) => {
  const r = ratio || 1;
  const style = {
    width: `${29.7 * r}cm`,
    height: `${21 * r}cm`
  };
  const html = (
    <div className={cls("nus-transcript")}>
      <div className={cls("a4-landscape")}>
        <img src={legend} style={style} alt="legend" />
      </div>
    </div>
  );
  return html;
};

// render a term data header
const renderTranscriptTermHeader = () => {
  const html = (
    <Fragment>
      <td className={cls("ts-title ts-highlight")}>
        <u>MODULE</u>
      </td>
      <td className={cls("ts-title ts-highlight")}>&nbsp;</td>
      <td className={cls("ts-title ts-highlight")}>
        <u>GRADE</u>
      </td>
      <td className={cls("ts-title ts-highlight")}>
        <u>CREDITS</u>
      </td>
    </Fragment>
  );
  return html;
};

// data class
export class TranscriptDataFeeder {
  constructor() {
    this.length = 0;
    this.attrs = [];
    this.termDataRange = { start: -1, end: -1 };
    this.headerData = {};
  }

  // append a row
  pushRow(type, data, cannotBeLastRow) {
    const attr = { type, data };
    if (cannotBeLastRow) attr.cannotBeLastRow = true;
    this.attrs.push(attr);
    this.length += 1;
  }

  // set term data range
  resetTermRange(termDataPrefix) {
    this.termDataRange = { start: -1, end: -1 };
    this.attrs.some((attr, i) => {
      if (attr.type.startsWith(termDataPrefix)) {
        this.termDataRange.start = i;
        return true;
      }
      return false;
    });
    if (this.termDataRange.start >= 0) {
      for (let i = this.termDataRange.start; i < this.length; i += 1) {
        if (!this.attrs[i].type.startsWith(termDataPrefix)) {
          this.termDataRange.end = i;
          break;
        }
      }
    }
    if (this.termDataRange.start >= 0 && this.termDataRange.end < 0)
      this.termDataRange.end = this.length;
  }

  // append a row or an array of rows
  push(type, data, cannotBeLastRow) {
    if (typeof data === "object" && data instanceof Array)
      data.forEach(x => {
        // attribute 'cannotBeLastRow' is not applicable to array
        this.push(type, x);
      });
    else this.pushRow(type, data, cannotBeLastRow);
  }

  // getter of row data
  data(i) {
    if (i < this.length) return this.attrs[i].data;
    return null;
  }

  // getter of data type
  type(i) {
    if (i < this.length) return this.attrs[i].type;
    return null;
  }

  // getter of attribute 'cannotBeLastRow'
  cannotBeLastRow(i) {
    if (i < this.length) if (this.attrs[i].cannotBeLastRow) return true;
    return false;
  }
}

// transcript header
class TranscriptHeader extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.headerData = this.props.headerData ? this.props.headerData : {};
  }

  // main render
  render() {
    const html = (
      <div ref={this.myRef}>
        <table className={cls("header-pers-info")} width="100%">
          <tbody key="pers-info-tbody">
            <tr key="ts-unoff-title">
              <td colSpan="8" className={cls("header-unoff")}>
                {/* unofficial transcript name */}
                &nbsp;
              </td>
            </tr>
            <tr>
              <td colSpan="8">
                <hr />
              </td>
            </tr>
            <tr key="pers-info-tr">
              {/* student's personal info */}
              <td className={cls("header-pers-info-key")}>NAME:</td>
              <td colwidth="26%">{this.headerData.name}</td>
              <td className={cls("header-pers-info-key")}>STUDENT NO:</td>
              <td colwidth="11.5%">{this.headerData.studentId}</td>
              <td className={cls("header-pers-info-key")}>DATE OF BIRTH:</td>
              <td colwidth="12.1%">
                {this.headerData.dateOfBirth
                  ? isoDateToLocal(this.headerData.dateOfBirth)
                  : ""}
              </td>
              <td className={cls("header-pers-info-key")}>DATE ISSUED:</td>
              <td colwidth="12.1%">
                {this.headerData.issuedOn
                  ? isoDateToLocal(this.headerData.issuedOn)
                  : ""}
              </td>
            </tr>
            <tr>
              <td colSpan="8">
                <hr />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
    return html;
  }
}

TranscriptHeader.propTypes = {
  headerData: PropTypes.object.isRequired
};

// transcript footer
class TranscriptFooter extends Component {
  // main render
  render() {
    const html = (
      <table width="100%">
        <tbody>
          <tr>
            <td className={cls("footer-text")}>
              <div id={`footer-${this.props.page}`} />
            </td>
          </tr>
        </tbody>
      </table>
    );
    return html;
  }
}

TranscriptFooter.propTypes = {
  page: PropTypes.number.isRequired
};

// blank transcript page
class TranscriptPage extends Component {
  // render a column in a table with rows
  renderColumn(pageIdx, colIdx) {
    const html = [];
    html.push(setColWidth());
    for (let i = 0; i < this.props.rowsPerCol; i += 1) {
      html.push(
        <tr id={`row-${pageIdx}-${colIdx}-${i}`}>
          <td />
        </tr>
      );
    }
    return (
      <table width="100%">
        <tbody>{html}</tbody>
      </table>
    );
  }

  // main render
  render() {
    // cannot put background image into css file because loading image may fail
    const backgroundImg = this.props.backImgUrl
      ? { backgroundImage: this.props.backImgUrl }
      : {};
    const idx = this.props.pageIdx;
    const html = (
      <div className={cls("a4-landscape ts-background")} style={backgroundImg}>
        <header key="ts-header">
          <TranscriptHeader headerData={this.props.headerData} />
        </header>
        <article key="ts-content">
          <div
            className={cls("table ts-text")}
            id={`canvas-${idx}`}
            style={{ height: CONTENT_HEIGHT }}
          >
            <table width="100%">
              <tbody>
                <tr>
                  <td
                    id={`col-${idx}0`}
                    width="49.5%"
                    valign="top"
                    className={cls("no-padding")}
                  >
                    {this.renderColumn(idx, 0)}
                  </td>
                  <td width="1%" />
                  <td
                    id={`col-${idx}1`}
                    width="49.5%"
                    valign="top"
                    className={cls("no-padding")}
                  >
                    {this.renderColumn(idx, 1)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </article>
        <footer key="ts-footer">
          <TranscriptFooter page={idx} />
        </footer>
      </div>
    );
    return html;
  }
}

TranscriptPage.propTypes = {
  rowsPerCol: PropTypes.number.isRequired,
  pageIdx: PropTypes.number.isRequired,
  headerData: PropTypes.object.isRequired,
  backImgUrl: PropTypes.string
};

// transcript data row
export class TranscriptDataRow extends Component {
  componentDidMount() {
    const rect = this.props.parent.getBoundingClientRect();
    const watermark = rect.top + rect.height + window.scrollY;
    const pageIdx = parseInt(this.props.parent.id.split("-")[1], 10);
    const cap = contentBottom[pageIdx];
    if (watermark > cap) gState.dispatch({ type: "CHANGE_COLUMN" });
    else gState.dispatch({ type: "NO_CHANGE" });
  }

  render() {
    this.props.parent.filled = "true";
    return this.props.data;
  }
}

TranscriptDataRow.propTypes = {
  data: PropTypes.object, // <td/>[<td/>*]
  parent: PropTypes.object // <tr/>
};

// transcript root class
export class Transcript extends Component {
  constructor(props) {
    super(props);
    this.dataIdx = 0;
    this.maxPages = this.props.maxPages
      ? parseInt(this.props.maxPages, 10)
      : MAX_PAGES;
    this.maxRows = this.props.maxRows
      ? parseInt(this.props.maxRows, 10)
      : MAX_ROWS_PER_COL;
    this.page = 0;
    this.col = 0;
    this.row = 0;
    this.firstHeaderPrinted = false;
    this.redundant = [];
    this.feeder = this.props.dataFeeder;
    if (!this.feeder) this.feeder = new TranscriptDataFeeder();
  }

  // get table row by id
  rowEl = (page, col, row) =>
    document.getElementById(`row-${page}-${col}-${row}`);

  // get canvas by id
  canvasEl = page => document.getElementById(`canvas-${page}`);

  // get page by id
  pageEl = page => document.getElementById(`page-${page}`);

  // get <p> by id
  paraEl = page => document.getElementById(`para-${page}`);

  // get footer by id
  footerEl = page => document.getElementById(`footer-${page}`);

  // keep redundant lines
  keepRedundant = (page, col, row) => {
    this.redundant.push({ page, col, row });
  };

  // clean up after rendering
  cleanup() {
    // clean up pages
    for (let i = this.maxPages - 1; i > this.page; i -= 1) {
      let el = this.pageEl(i);
      if (el) el.remove();
      el = this.paraEl(i);
      if (el) el.remove();
    }
    // delete content in the redundant rows
    this.redundant.forEach(x => {
      const node = this.rowEl(x.page, x.col, x.row);
      if (!node) return;
      let child = node.lastElementChild;
      while (child) {
        node.removeChild(child);
        child = node.lastElementChild;
      }
    });
  }

  // render data into transcript pages
  componentDidMount() {
    let dataRow;
    let node;
    // print subsequenct rows
    gState.subscribe(() => {
      if (this.dataIdx >= this.feeder.length) {
        // all data has been rendered
        this.cleanup();
        this.renderFooters();
        return;
      }
      if (gState.getState()) {
        // state is {nextCol: true}, change column (and page when necessary)
        if (this.feeder.cannotBeLastRow(this.dataIdx - 1)) {
          // check for orphan acad year line
          this.dataIdx -= 1; // need to re-render acad year line
          this.keepRedundant(this.page, this.col, this.row - 1);
        }
        // current row to be removed later as it will be rendered in next row
        this.keepRedundant(this.page, this.col, this.row);
        if (this.col === 0) {
          this.col = 1;
          this.row = 0;
        } else {
          this.page += 1;
          if (this.page >= this.maxPages) {
            /* for debug
            // error prompted, must be fixed
            window.alert(
              "Error: Max pages reached. Some data cannot be rendered."
            );
            */
            return;
          }
          this.col = 0;
          this.row = 0;
        }
        node = this.rowEl(this.page, this.col, this.row);
        if (this.dataIdx > this.feeder.termDataRange.end) {
          // term data complete
          dataRow = (
            <TranscriptDataRow
              data={this.feeder.data(this.dataIdx)}
              parent={node}
            />
          );
        } else {
          // term data ongoing
          dataRow = (
            <TranscriptDataRow
              data={renderTranscriptTermHeader()}
              parent={node}
            />
          );
          this.dataIdx -= 1; // re-render the row
        }
        ReactDOM.render(dataRow, node);
      } else {
        // state is {nextCol: false}, continue to render to current column
        this.dataIdx += 1;
        this.row += 1;
        if (this.row >= this.maxRows) {
          // max rows reached, force change of column
          gState.dispatch({ type: "CHANGE_COLUMN" });
          return;
        }
        node = this.rowEl(this.page, this.col, this.row);
        if (
          this.dataIdx === this.feeder.termDataRange.start &&
          !this.firstHeaderPrinted
        ) {
          // print header when term data begins
          dataRow = (
            <TranscriptDataRow
              data={renderTranscriptTermHeader()}
              parent={node}
            />
          );
          this.firstHeaderPrinted = true;
          this.dataIdx -= 1; // re-render the row
        } else {
          dataRow = (
            <TranscriptDataRow
              data={this.feeder.data(this.dataIdx)}
              parent={node}
            />
          );
        }
        ReactDOM.render(dataRow, node);
      }
    });
    // record content bottom for each page
    for (let i = 0; i < this.maxPages; i += 1) {
      const rect = this.canvasEl(i).getBoundingClientRect();
      contentBottom.push(rect.top + rect.height + window.scrollY);
    }
    // print first row
    node = this.rowEl(0, 0, 0);
    dataRow = <TranscriptDataRow data={this.feeder.data(0)} parent={node} />;
    ReactDOM.render(dataRow, node);
  }

  // render footer content
  renderFooters() {
    const totalPages = this.page + 1;
    for (let i = 0; i < totalPages; i += 1) {
      const footer = this.footerEl(i);
      if (footer) ReactDOM.render(`PAGE ${i + 1} OF ${totalPages}`, footer);
    }
  }

  // render a page
  renderPage(idx) {
    const html = (
      <TranscriptPage
        pageIdx={idx}
        rowsPerCol={this.maxRows}
        headerData={this.feeder.headerData}
        backImgUrl={this.props.backImgUrl}
      />
    );
    return html;
  }

  // main render
  render() {
    const html = [];
    // render blank pages
    for (let i = 0; i < this.maxPages; i += 1) {
      html.push(
        <div id={`page-${i}`} filled="false" className={cls("nus-transcript")}>
          {this.renderPage(i)}
        </div>
      );
      html.push(<p id={`para-${i}`} />);
    }
    if (this.props.legendPage)
      html.push(
        renderTranscriptLegendPage(
          this.props.legendPage,
          this.props.legendRatio ? Number(this.props.legendRatio, 10) : 1
        )
      );
    return html;
  }
}

Transcript.propTypes = {
  maxPages: PropTypes.string,
  maxRows: PropTypes.string,
  dataFeeder: PropTypes.object,
  backImgUrl: PropTypes.string,
  legendPage: PropTypes.string,
  legendRatio: PropTypes.string
};
