import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormProjet() {

	const animatedComponents = makeAnimated();
	const [show, setShow] = React.useState(false);
	const [projet, setProjet] = React.useState({});
	const [error, setError] = React.useState("");
	const [municipalites, setMunicipalites] = React.useState([]);
	const [selected, setSelected] = React.useState([]);


	const fetchMunicipalites = async () => {
		try {
			const url ='http://localhost:4000/api/v1/municipalites/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

			if (res.status === 200) {
				
				let municipalites_options = [];
				for(const municipalite of res.data.municipalites){
					let obj = { value: municipalite.id, label: municipalite.nom+" "+municipalite.nom_ar }
					municipalites_options.push(obj);
				}
				setMunicipalites(municipalites_options);
			}

			} catch (err) {
				console.log(err.response.data.message);
			}
	}


	const addProjet = async() => {
		try{
			const url ='http://localhost:4000/api/v1/projets/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'post',
			  	url,
				data: projet
			});

			toast.success('Success', {
				position: 'top-right',
				autoClose: 5000,
				draggable: false
			});

			window.location.replace('/Projets');

		}catch(err){
			console.log(err.response.data.message);
			
			toast.error(err.response.data.message, {
				position: 'top-right',
				autoClose: 5000,
				draggable: true
			});
		}
	}

	const handleMunicipalitesDefault = (e) => {
		setSelected(e.map( x => x.value ));
  	}

	React.useEffect(() => {
		fetchMunicipalites();
	},[])

    return (
        <div>
			<ToastContainer/>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nom :</label>
                <div className="col-sm-9">
					<input type="text" className="form-control"
                      placeholder= "Nom" onChange={(e) => setProjet({...projet, nom: e.target.value})}/>
				</div>
			</div>
          
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Municipalité</label>
				<div className="col-sm-9">
					<div className="boxes" >
						<Select
							defaultValue="options"
							components={animatedComponents}
							options={municipalites}
							onChange={(e) => { setProjet({...projet, municipalite_id: e.value})}}
						/>							
					</div>
				</div>
			</div>
			
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nombre quartiers :</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Nombre quartiers"
					onChange={(e) => setProjet({...projet, nbr_qaurtier: e.target.value})}/>
				</div>
			</div>
			<div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nombre maisons :</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Nombre maisons"
					onChange={(e) => setProjet({...projet, nbr_maison: e.target.value})}/>
				</div>
			</div>
            <div className="mb-3 row">
                <label className="col-form-label col-sm-3 text-sm-left">Nombre habitants :</label>
                <div className="col-sm-9">
					<input type="number" className="form-control" placeholder="Nombre habitants"
					onChange={(e) => setProjet({...projet, nbr_habitant: e.target.value})}/>
				</div>
			</div>

			
			<div className="mb-3 row">
				<div className="col-sm-9">
					<span  className="btn btn-primary" onClick={() => addProjet()}>Submit</span>
				</div>
			</div>

			
		</div>
    );
}
