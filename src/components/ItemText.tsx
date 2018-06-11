import * as React from 'react';

interface IProps {
  text: string,
}

class ItemText extends React.Component<IProps, any> {
  constructor(props : any) {
    super(props);
  }

  public render() : any {
    return <div dangerouslySetInnerHTML={ { __html: this.props.text } } />;
  }
}

export default ItemText;
