import React from 'react';
import ReactDOM from 'react-dom';

import './World.css';
import animation from '../animation'
import CitiesSearch from '../presentational/CitiesSearch.js';
import _ from 'lodash' ;
import cloudImg from '../images/cloud.png';
import TransitionGroup from 'react-transition-group/TransitionGroup'

class World extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      z:0,
      scrollZ: 0,
      clouds: _.range(25).map(this.createCloud.bind(this, this.props.zState)),
    };
    this.dom = {};
  }

  createCloud(i) {
    const layers = [];
    let worldW = window.innerWidth;
    let worldH = window.innerHeight;
    let random_x = (Math.random() * ((worldW+100) - 200));
    let random_y = (Math.random() * ((worldH+300) + 200));
    let random_z = -(Math.random() * (arguments[0] + 2000 - arguments[0]) + arguments[0]);
    let t = 'translateX(' + random_x + 'px) \
             translateY(' + random_y + 'px) \
             translateZ(' + random_z + 'px)';
    for (let j = 0; j < 5 + Math.round(Math.random() * 5); j++) {
      let random_x = 600 - (Math.random() * 1200);
      let random_y = 500 - (Math.random() * 1000);
      let random_z = 200 - (Math.random() * 300);
      let random_a = Math.random() * 360;
      let random_s = 1 + Math.random() *2;
      random_x *= .5;
      random_y *= .2;
      let t = 'translateX(' + random_x + 'px) \
               translateY(' + random_y + 'px) \
               translateZ(' + random_z + 'px) \
               rotateZ(' + random_a + 'deg) \
               scale(' + random_s + ')';

      layers.push(t);
    }
    return {base: t, layers: layers}
  }

  updateView() {
    if(this.state.scrollZ > 0 && this.state.scrollZ < 6500){
      this.setState({
        z:'translateZ(' + (this.state.scrollZ) + 'px)',
        // \translateY(' +  (this.state.scrollZ/3) + 'px),
        change: true
      })
    } else if (this.state.scrollZ > 6500) {
      this.state.scrollZ = 6500;
    } else {
      this.state.scrollZ = 0;
    }

    const levels = new Map([
      [0, 1800],
      [1, 3300],
      [2, 4800],
      [3, 6300],
      [4, 7800],
    ]);

    for (let [key, max] of levels) {
      const min = key - 1 >= 0
        ? levels.get(key-1)
        : 0;

      if(this.state.scrollZ >= min && this.state.scrollZ < max) {
        this.props.updateWorld(key);
        this.setState({
          change: false
        });
        break;
      }
    }
  }

  onContainerMouseWheel(event) {
    event = event ? event : window.event;
    this.state.scrollZ = this.state.scrollZ - (event.detail ? event.detail * -5 : event.wheelDelta / 8);
    this.updateView();
  }

  componentDidMount () {
    this.dom.root = ReactDOM.findDOMNode(this);
    const cl = this.cloudEl;
    const mt = this.mainTitle;
    animation.titleTransition(mt);
    animation.fadeInClouds(cl);
    console.log('mounted');
    window.addEventListener('DOMMouseScroll', this.onContainerMouseWheel.bind(this));
    window.addEventListener('mousewheel', this.onContainerMouseWheel.bind(this));
  }

  componentWillUnmount () {
    const cl = this.cloudEl;
    animation.fadeOutClouds(cl);
    window.removeEventListener('DOMMouseScroll', this.onContainerMouseWheel.bind(this));
    window.removeEventListener('mousewheel', this.onContainerMouseWheel.bind(this));
  }

  componentWillReceiveProps (nextProps) {
   if (this.props.zState !== nextProps.zState) {
     this.setState({
      clouds: _.range(25).map(this.createCloud.bind(this, nextProps.zState)),
     })
     const cl = this.cloudEl;
     const mt = this.mainTitle;
     animation.titleTransition(mt);
     animation.fadeInClouds(cl);
   }
  }

  render() {
    const clouds = this.state.clouds.map((cloudData, i) => {
      const layers = this.state.clouds[i].layers.map((layerData, j) => {
          return <img key= {j} className = 'cloudLayer' style={{transform: layerData, opacity:.6}} src={cloudImg}></img>;
      })
       return <div ref={c => this.cloudEl = c} key={i} className = 'cloudBase' style={{transform: cloudData.base}}>{layers}</div>
    });
    return (
        <div id="world" style={{transform: this.state.z}}>
          { clouds }
          <div className="mainTitle" style={{transform: `translateZ(-${(this.props.zState + 300 )}px)`}}>
            <h1 ref={el => this.mainTitle = el} >{this.props.title}</h1>
          </div>
        </div>
    );
  }
}

export default World;
