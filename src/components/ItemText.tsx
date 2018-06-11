import * as React from 'react';
import './ItemText.css';

interface IProps {
  text: string,
}

class ItemText extends React.Component<IProps, any> {
  constructor(props : any) {
    super(props);
  }

  public render() : any {
    return <div className="ItemText" dangerouslySetInnerHTML={ { __html: this.props.text } } />;
  }
}

export default ItemText;
