import React from 'react';
import './Bookmarks.css';
import _ from 'lodash';

class Bookmarks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    return (
       <div className="bookmarks">
          {_.range(5).map((el, i) => <div key={i} className={el === this.props.page ? 'bookmarks_line bookmarks_line--current' : 'bookmarks_line'}></div>)}
          <div className="pageName" style={{left: this.props.page *17.5 + 'vw'}}>{this.props.pageName}</div>
       </div>
    );
  }
}

export default Bookmarks;
