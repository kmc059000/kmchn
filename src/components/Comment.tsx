import * as React from 'react';

import { HnRestApi, IComment } from '../services/HnRestApi';
import './Comment.css'

import TimeAgo from './TimeAgo';

interface IProps {
  commentId: number,
}

interface IState {
  comment: IComment | null,
}

const api = new HnRestApi();

class Comment extends React.Component<IProps, IState> {
  constructor(props : any) {
    super(props);
    this.state = {
      comment: null,
    };
  }
  public async componentDidMount() {
    const comment = await api.fetchComment(this.props.commentId);
    this.setState({
      comment,
    });
  }
  public render() : any {
    const comment = this.state.comment;
    if(!comment) {
      return '';
    }
    
    return (
      <div className="CommentDetails">
        <div className="Comment">
          <div className="CommentHeader">{comment.by} said <TimeAgo unixTime={comment.time} />:</div>
          <div dangerouslySetInnerHTML={ { __html: comment.text } } />        
        </div>
        <div className="CommentChildren">
          {comment.kids ? comment.kids.map(x => <Comment commentId={x} key={x} />) : ''}
        </div>
      </div>
    ); 
  }
}

export default Comment;
