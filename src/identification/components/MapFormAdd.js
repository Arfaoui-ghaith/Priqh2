import React from 'react'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import { Container, Card, Button, Modal } from 'react-bootstrap';
import { MapContainer , TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw"
import axios from 'axios'

export default function MapFormAdd() {
    const animatedComponents = makeAnimated();
    
    const [show, setShow] = React.useState(false);
    const [projet, setProjet] = React.useState(null);
    const [nom, setNom] = React.useState("");

    const handleProjetsChange = (e) => {
        console.log(e.value)
		setProjet(e.value);
	}

    const [projets, setProjets] = React.useState([]);

    const [mapLayers, setMapLayers] = React.useState([]);

    const mapRef = React.useRef();

    const fetchProjets = async () => {
		try {
			const url ='http://localhost:4000/api/v1/projets/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});
	
			console.log(res.data.projets);

			if (res.status === 200) {
				let projets_options = [];
				for(const projet of res.data.projets){
					let obj = { value: projet.id, label: projet.nom }
					projets_options.push(obj);
				}
				setProjets(projets_options);
			}

			} catch (err) {
				console.log(err);
			}
	}

    const addQuartier = async () => {
		try {
			const url =`http://localhost:4000/api/v1/quartiers/${projet}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
                data:{ quartiers: mapLayers }
			});

			if (res.status === 201) {
				console.log(res.data);
                window.location.replace('/Quartiers');
			}

			} catch (err) {
				console.log(err);
			}
	}

    React.useEffect(() => {
        fetchProjets()
    },[]);

    const _onCreate = (e) => {
        console.log(e);
    
        const { layerType, layer } = e;
        if (layerType === "polygon") {
            
          const { _leaflet_id } = layer;
          
          mapLayers.push({ id: _leaflet_id, nom: "", center: layer.getCenter(), latlngs: layer.getLatLngs()[0] });
        }
        setShow(true);
        console.log(mapLayers);
    };
    
    const _onEdited = (e) => {
        //console.log(e);
    const {
        layers: { _layers },
    } = e;
    
    for(let i=0; i<mapLayers.length; i++){
        for(const layer of Object.values(_layers)){
            
            if(mapLayers[i].id === layer._leaflet_id){
                mapLayers.splice(i,1,{ id: layer._leaflet_id, nom: mapLayers[i].nom, center: layer.getCenter(), latlngs: layer.getLatLngs()[0] });
            }
        }
    }

        console.log(mapLayers);
    };
    
    const _onDeleted = (e) => {
        //console.log(e);
    const {
        layers: { _layers },
    } = e;
    
        
    console.log(Object.values(_layers));

        
    for(let i=0; i<mapLayers.length; i++){
        for(const layer of Object.values(_layers)){
            
            if(mapLayers[i].id === layer._leaflet_id){
                mapLayers.splice(i,1);
            }
        }
    }
        console.log("delete",mapLayers);
    };

    return (
        <React.Fragment>
        <Container>
                { projet ?
                    <Card>
                        <Card.Header>
            
                        </Card.Header>
                        <Card.Body>
                            <MapContainer  center={[34.886917, 9.537499]} zoom={7} ref={mapRef}>
                            <TileLayer
                                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            
                            <FeatureGroup>
                                <EditControl
                                position='topright'
                                onCreated={_onCreate}
                                onEdited={_onEdited}
                                onDeleted={_onDeleted}
                                click={(e) => console.log(e)}
                                draw={{
                                    rectangle: false,
                                    circle: false,
                                    circlemarker: false,
                                    marker: false,
                                    polyline: false
                                }}
                                />
                                
                            </FeatureGroup>
                                
                            </MapContainer >
                        </Card.Body>
                    </Card> : ""
                }
                    <Card>
                        <Card.Header>
                        <Select className="py-2"
                            placeholder="Select Projet ..."
							closeMenuOnSelect={false}
							components={animatedComponents}
							options={projets}
                            onChange={handleProjetsChange}
						/>	
                        </Card.Header>
                        <Card.Body>	  
                            
                            <Button variant="primary" size="lg" onClick={addQuartier} block>
                                Enregistrer
                            </Button> 
                        </Card.Body>
                    </Card>

        </Container>

        <Modal show={show} onHide={() => setShow(false)}>
            <Modal.Header closeButton>
            <Modal.Title>Nom quartier</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="row">
                <label className="col-form-label col-sm-1 text-sm-left">nom: </label>
                <div className="col-sm-11">
                    <input type="text" className="form-control" onChange={(e) => setNom(e.target.value)} />
                </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
           
            <Button variant="primary" onClick={() => { mapLayers[mapLayers.length - 1].nom = nom; setNom(""); setShow(false); }}>
                Save
            </Button>
            </Modal.Footer>
        </Modal>
        </React.Fragment>
    )
}
