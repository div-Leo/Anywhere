import React from 'react';
import './World.css';
import cloud from '../images/cloud.png'
import CitiesSearch from '../presentational/CitiesSearch.js';
import _ from 'lodash' ;

class World extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false,
      z:0,
      scrollZ: 0,
      clouds: _.range(25).map(this.createCloud.bind(this, this.props.zState)),
    };
  }

  createCloud(i) {
    const layers = [];
    let worldW = window.innerWidth;
    let worldH = window.innerHeight;
    let random_x = (Math.random() * ((worldW+100) - 200));
    let random_y = (Math.random() * ((worldH+300) + 200));
    let random_z = -(arguments[0]) - (Math.random() * (arguments[0] + 2000));
    let t = 'translateX(' + random_x + 'px) \
             translateY(' + random_y + 'px) \
             translateZ(' + random_z + 'px)';
    console.log(t);
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
    if(this.state.scrollZ > 0){
      this.setState({
        z:'translateZ(' + (this.state.scrollZ) + 'px) '
        // \translateY(' +  (this.state.scrollZ/3) + 'px)
      })
      this.state.change=  true;
    } else {
      this.state.scrollZ = 0;
    }


    if (this.state.scrollZ >= 0 && this.state.scrollZ < 1200) {
      if (this.state.change) {
        this.props.updateWorld(0)
      }
      this.state.change=  false;
    } else if (this.state.scrollZ >= 1800 && this.state.scrollZ < 3200) {
      if (this.state.change) {
        this.props.updateWorld(1)
      }
      this.state.change=  false;
    } else if (this.state.scrollZ >= 3200 && this.state.scrollZ < 5200) {
      if (this.state.change) {
        this.props.updateWorld(2)
      }
      this.state.change=  false;
    } else if (this.state.scrollZ >= 5200 && this.state.scrollZ < 7200) {
      if (this.state.change) {
        this.props.updateWorld(3)
      }
      this.state.change=  false;
    } else if (this.state.scrollZ >= 7200 && this.state.scrollZ < 9200) {
      if (this.state.change) {
        this.props.updateWorld(4)
      }
      this.state.change=  false;
    }
  }

  onContainerMouseWheel(event) {
    event = event ? event : window.event;
    this.state.scrollZ = this.state.scrollZ - (event.detail ? event.detail * -5 : event.wheelDelta / 8);
    this.updateView();
  }

  componentDidMount () {
    window.addEventListener('DOMMouseScroll', this.onContainerMouseWheel.bind(this));
    window.addEventListener('mousewheel', this.onContainerMouseWheel.bind(this));
  }

  componentWillUnmount () {
    window.removeEventListener('DOMMouseScroll', this.onContainerMouseWheel.bind(this));
    window.removeEventListener('mousewheel', this.onContainerMouseWheel.bind(this));
  }


  componentWillReceiveProps (nextProps) {
   if (this.props.zState !== nextProps.zState) {
     this.setState({
      clouds: _.range(25).map(this.createCloud.bind(this, nextProps.zState)),
     })
   }
}

  render() {
    const clouds = this.state.clouds.map((cloudData, i) => {
      const layers = this.state.clouds[i].layers.map((layerData, j) => {
          return <img key= {j} className = 'cloudLayer' style={{transform: layerData, opacity:.6}} src='https://img00.deviantart.net/4a93/i/2014/285/8/8/white_clouds_png_image_by_alwa3d-d82mcfo.png'></img>;
      })
       return <div key={i} className = 'cloudBase' style={{transform: cloudData.base}}>{layers}</div>
    });

    return (
        <div id="world" style={{transform: this.state.z}}>
          { clouds }
          <div className="mainTitle" style={{transform: `translateZ(-${(this.props.zState)}px)`}}>
            <h1 >{this.props.title}</h1>
          </div>
        </div>
    );
  }
}

export default World;
