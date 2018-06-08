import * as React from 'react';

import './Pager.css';

function range(size : number, startAt = 0) {
  const arr = Array(size);
  return [...arr.keys()].map((_, i) => i + startAt);
}

interface IProps {
  page: number,
  count: number,
  pageSize: number,
  setPage: (page: number) => void,
}

class PagerLink extends React.Component<any, any> {
  constructor(props : IProps) {
    super(props);
    this.setPage = this.setPage.bind(this);
  }
  public setPage() {
    this.props.setPage(this.props.page);
  }
  public render() {
    return <a className={this.props.current ? 'current' : ''} onClick={this.setPage}>[{this.props.page}]</a>
  }
}

/* tslint:disable:max-classes-per-file */
class Pager extends React.Component<IProps, any> {
  constructor(props : IProps) {
    super(props);
  }
  public render() {
    const pageCount = Math.ceil(this.props.count / this.props.pageSize);
    const pages = range(pageCount, 1);

    return (
      <div className="Pager">
        {pages.map(x => <PagerLink key={x} page={x} setPage={this.props.setPage} current={this.props.page === x} />)}
      </div>
    );
  }
}

export default Pager;
