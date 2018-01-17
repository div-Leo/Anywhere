import React from 'react';
import './Bookmarks.css';
import _ from 'lodash';

const Bookmarks = (props) => {
    return (
       <div className="bookmarks">
          {_.range(5).map((el, i) => <div key={i} className={el === props.page ? 'bookmarks_line bookmarks_line--current' : 'bookmarks_line'}></div>)}
          <div className="pageName" style={{left: props.page *17.5 + 'vw'}}>{props.pageName}</div>
          {/* <div className="pageName" style={{left: props.page *17.5 + 'vw'}}>{props.details[this.props.page]}</div> */}
       </div>
    );
}

export default Bookmarks;
