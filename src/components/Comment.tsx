import * as React from 'react';

import { HnRestApi, IComment } from '../services/HnRestApi';
import './Comment.css'

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
        <div className="Comment" dangerouslySetInnerHTML={ { __html: comment.text } } />
        <div className="CommentChildren">
          {comment.kids ? comment.kids.map(x => <Comment commentId={x} key={x} />) : ''}
        </div>
      </div>
    ); 
  }
}

export default Comment;
