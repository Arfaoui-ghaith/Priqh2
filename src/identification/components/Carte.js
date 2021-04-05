import React from 'react';
import "react-svg-map/lib/index.css";
import Tunisia from '@svg-maps/tunisia';
//import Beja from './Beja';
//import Gabes from './Gabes';
//import Bizerte from './Bizerte'

import { CheckboxSVGMap } from "react-svg-map";
import { getLocationName } from './Utils';
import ReactTooltip from 'react-tooltip';

class Carte extends React.Component {
	constructor(props) {
		super(props);
//tunisia 
		this.state = {
			pointedLocation: null,
			focusedLocation: null,
			selectedLocations: []
		};

		this.handleLocationMouseOver = this.handleLocationMouseOver.bind(this);
		this.handleLocationMouseOut = this.handleLocationMouseOut.bind(this);
		this.handleLocationFocus = this.handleLocationFocus.bind(this);
		this.handleLocationBlur = this.handleLocationBlur.bind(this);
		this.handleOnChange = this.handleOnChange.bind(this);
	}

	handleLocationMouseOver(event) {
		const pointedLocation = getLocationName(event);
		this.setState({ pointedLocation: pointedLocation});
   
	}

	handleLocationMouseOut() {
		this.setState({ pointedLocation: null });
	}

	handleLocationFocus(event) {
		const focusedLocation = getLocationName(event);
		this.setState({ focusedLocation: focusedLocation });
	}

	handleLocationBlur() {
		this.setState({ focusedLocation: null });
	}

	handleOnChange(selectedNodes) {
		this.setState(prevState => {
      this.state.selectedLocations=[];

      selectedNodes.splice(0,selectedNodes.length-1)
			return {
				...prevState,
				selectedLocations: selectedNodes.map(node => node.attributes.name.value),
       
			};
      
		});
	}
  

	render() {
		return (
			<article className="examples__block">
				<div class="row">
        <div class="col-6">
				<div className="examples__block__map">
					<CheckboxSVGMap
          data-for='test'
						map={Tunisia}
						onLocationMouseOver={this.handleLocationMouseOver}
						onLocationMouseOut={this.handleLocationMouseOut}
						onLocationFocus={this.handleLocationFocus}
						onLocationBlur={this.handleLocationBlur}
						onChange={this.handleOnChange} />
				</div>
        </div>
        { this.state.selectedLocations[0]==="Beja" ?
        <div class="col-6">
        
        </div>: ''}
		{ this.state.selectedLocations[0]==="Bizerte" ?
        <div class="col-6">
        
        </div>: ''}
		{ this.state.selectedLocations[0]==="Gabes" ?
        <div class="col-6">
        
        </div>: ''}
        </div>
        <ReactTooltip id='test'>{this.state.pointedLocation}</ReactTooltip>
			</article>
		);
	}
}

export default Carte;
