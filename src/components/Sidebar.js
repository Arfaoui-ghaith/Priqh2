import React, { Profiler } from 'react';
import SidebarItem from './SidebarItem';
import { useAuthState } from './../context/auth';

export default function Sidebar(props) {

	const { user } = useAuthState();
	
	const [selectedItem, setSelectedItem]=React.useState(window.location.href.slice(22,window.location.href.length));

	console.log(user);
	if(user !== null && user !== undefined){
    return (
        <nav id="sidebar" className="sidebar">
			<div className="sidebar-content js-simplebar">
				<span className="sidebar-brand" href="index.html">
                    <span className="align-middle px-6">
                        <img className=" text-center " src="img/photos/arru.png" alt="arru" style={{ "height": "50px" }}/>
                    </span>
                </span>

				<ul className="sidebar-nav">

					<li className="sidebar-header">
						Identification des projets
					</li>
					<SidebarItem title="Projets" icon="clipboard" l="/Projets" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					<SidebarItem title="Quartiers" icon="map" l="/Quartiers" selecteditem={selectedItem} setselecteditem={setSelectedItem} />
					
					
					
				</ul>

				
			</div>
		</nav>
    ) } else {
		return(
			<React.Fragment></React.Fragment>
		);
	}
}
