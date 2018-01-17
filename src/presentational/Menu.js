import React from 'react';
import './Menu.css';
import _ from 'lodash';
import fbIcon from '../icons/facebook.svg';
import beIcon from '../icons/behance.svg';
import inIcon from '../icons/linkedin.svg';
import ghIcon from '../icons/github.svg';

const Menu = (props) => {
  const toggleAnimMenu = (e) => {
    if (!props.open) {
      e.target.className = 'menu_open'
      setTimeout(() => props.toggleMenu(), 500);
    } else {
      props.toggleMenu()
    }
  }

  const updatePage = (page) => {
    props.toggleMenu()
    props.updateWorld(page)
  }

  const renderMenu = (open) => {
    return open === true
    ? (
      <div className='menu_open'>
        <div className='hamburger_x' onClick={toggleAnimMenu}>
          <div id="hamburger_1" className='hamburger'></div>
          <div id="hamburger_2" className='hamburger'></div>
          <div id="hamburger_3" className='hamburger'></div>
        </div>
        <div className='menu_container'>
          <div className='menu_heading'>
            <div className='menu_heading_title'>Wherever</div>
            <div className='menu_heading_descr'>This is a place where you do don’t need to know
              where you want to go, but you just have
              to want to leave.</div>
          </div>
          <div className='menu_trip'>
            <div className='menu_trip_line'>
              {_.range(5).map((el, i) => <div key={i} className={el <= props.page ? 'menu_trip_dot' : 'menu_trip_dot menu_trip_dot--unvisited'}></div>)}
            </div>
            <div className='menu_trip_details'>


              {Object.keys(props.details).map((key, i) => props.details[key]  !== null ?
              <div key={i}>
                <span key={key} className='menu_trip_detail_name'>{key + ': '}</span>
                <span onClick={() => updatePage(i)} key={i} className='menu_trip_detail_state'>{props.details[key]}</span>
              </div> :
              <div key={i}>
                <span key={key} className='menu_trip_detail_name'>{key + ': '}</span>
                <span key={i} className='menu_trip_detail_state'>...</span>
              </div>
              )}


            </div>
          </div>
          <div className='menu_footer'>
            <div className='menu_footer_social'>
                <a className="socialBtn" href="https://www.facebook.com/leonardo.divittorio" rel="noopener noreferrer" target="_blank">
                  <img className="menu_footer_icons" id="fbIcon" src={fbIcon} alt="icona facebook"/>
                </a>
                <a className="socialBtn" href="https://www.behance.net/leonardodid6d0" rel="noopener noreferrer" target="_blank">
                  <img className="menu_footer_icons" id="beIcon" src={beIcon}  alt="icona instagram"/>
                </a>
                <a className="socialBtn" href="https://www.linkedin.com/in/leonardo-di-vittorio-092679a6/gi" rel="noopener noreferrer" target="_blank">
                  <img className="menu_footer_icons" id="inIcon" src={inIcon}  alt="icona linkedin"/>
                </a>
                <a className="socialBtn" href="https://github.com/Leon31" rel="noopener noreferrer" target="_blank">
                  <img className="menu_footer_icons" id="ghIcon" src={ghIcon}  alt="icona github"/>
                </a>
            </div>
            <span >Pesonal website: <span className="menu_footer_webSite"> www.dvtlrd.com</span></span>
            <span className="menu_footer_rights">all rights reserved © 2018, Barcellona Leonardo Di Vittorio</span>
          </div>
        </div>

      </div>
    ) : (
      <div onClick={toggleAnimMenu} className={'menu_close'}>
        <div id="hamburger_1" className='hamburger'></div>
        <div id="hamburger_2" className='hamburger'></div>
        <div id="hamburger_3" className='hamburger'></div>
      </div>
    )

  }

  return <div> {renderMenu(props.open)}</div>

};

export default Menu;
