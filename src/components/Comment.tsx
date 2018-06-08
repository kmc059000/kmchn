import * as React from 'react';

import { IComment } from '../services/HnRestApi';
import { HnService } from '../services/HnService';
import './Comment.css'

import TimeAgo from './TimeAgo';

interface IProps {
  commentId: number,
}

interface IState {
  comment: IComment | null,
  expanded: boolean,
}

class Comment extends React.Component<IProps, IState> {
  constructor(props : any) {
    super(props);
    this.state = {
      comment: null,
      expanded: true,
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
    this.setComment = this.setComment.bind(this);
  }
  public async componentDidMount() {
    HnService.subscribeToComment(this.props.commentId, this.setComment);
  }
  public componentWillUnmount() {
    HnService.unsubscribeToComment(this.props.commentId, this.setComment);
  }
  public setComment(comment : IComment) {
    this.setState({
      comment,
    });
  }
  public toggleExpanded() {
    this.setState({
      expanded: !this.state.expanded,
    });
  }
  public render() : any {
    const comment = this.state.comment;
    if(!comment) {
      return '';
    }
    
    let text = null;
    let children = null;
    if (this.state.expanded) {
      text = <div dangerouslySetInnerHTML={ { __html: comment.text } } />;
      children = (
        <div className="CommentChildren">
          {comment.kids ? comment.kids.map(x => <Comment commentId={x} key={x} />) : ''}
        </div>);
    }

    return (
      <div className="CommentDetails">
        <div className="Comment">
          <div className="CommentHeader">
            <button className="CommentToggle" onClick={this.toggleExpanded}>[{this.state.expanded ? '-' : '+'}]</button>
            {' '}
            {comment.by} said <TimeAgo unixTime={comment.time} />:
          </div>
          {text}
        </div>
        {children}
      </div>
    ); 
  }
}

export default Comment;
