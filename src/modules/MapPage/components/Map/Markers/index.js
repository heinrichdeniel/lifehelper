import React, {Component} from "react";
import css from "./style.scss";
import {Marker, InfoWindow} from "react-google-maps";
import moment from "moment";

class Markers extends Component{
  constructor(props) {
    super(props);

    this.onMouseOver = this.onMouseOver.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);

    this.state={
      showingInfoWindow: false,
      activeMarker: null,
      selectedPlace: null,
      markers: [],
      tasks: []
    }
  }

  componentWillMount(){
    let markers = [];
    if (this.props.tasks!= this.state.tasks){     //ha változott a feladatok lisája
      this.props.tasks.map((task,index) => {              //minden feladatot hozzáadunk a markers tömbhöz, amelyik helyszínhez kötött
        if (task.location){
          markers.push({...task,index: index+1});
        }
      });

      this.setState({
        ...this.state,
        markers: markers,
        tasks: this.props.tasks
      })
    }
  }

  componentDidUpdate(){
    let markers = [];
    if (this.props.tasks!= this.state.tasks){     //ha változott a feladatok lisája
      this.props.tasks.map((task,index) => {              //minden feladatot hozzáadunk a markers tömbhöz, amelyik helyszínhez kötött
        if (task.location){
          markers.push({...task,index: index+1});
        }
      });

      this.setState({
        ...this.state,
        markers: markers,
        tasks: this.props.tasks
      })
    }
  }

  onMouseOver(marker, e) {
    if (marker != this.state.activeMarker || !this.state.showingInfoWindow){
      this.setState({
        selectedPlace: marker,
        activeMarker: marker,
        showingInfoWindow: true
      });
    }
  }

  onMouseOut(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  renderMarker(marker) {
    let project = marker.ProjectId ? <p className={css.project}><i className="fa fa-chain"/>{marker.Project.name}</p> : null;
    let date = moment(marker.date).format(this.props.dateFormat);
    if (marker.time){
      date += ", "+ moment(marker.time,"hh:m").format(this.props.timeFormat)
    }
    let info = null;
    if (this.state.activeMarker == marker && this.state.showingInfoWindow){
      info = (
        <InfoWindow
          visible={false}>
          <div className={css.infoWindow}>
            <h1>{marker.name}</h1>
            {project}
            <p className={css.date}><i className="fa fa-calendar"/>{date}</p>
            <p className={css.location}><i className="fa fa-map-marker"/>{marker.location}</p>
          </div>
        </InfoWindow>

      )
    }
    return (
      <div key={marker.id}>
        <Marker position={new google.maps.LatLng(marker.lat, marker.lng)}
                title={marker.location}
                icon={'https://raw.githubusercontent.com/Concept211/Google-Maps-Markers/master/images/marker_green' + marker.index + '.png'}
                onMouseOver={this.onMouseOver.bind(this, marker)}
                onMouseOut={this.onMouseOut}>
          {info}
        </Marker>
      </div>
    );
  }


  render(){
    return(
      <div className={css.base}>
        {
          this.state.markers.map((marker) => this.renderMarker(marker))
        }
      </div>
    )
  }
}

export default Markers
