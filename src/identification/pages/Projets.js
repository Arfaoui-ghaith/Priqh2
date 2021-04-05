import React from 'react';
import Carte from '../components/Carte';
import Form from '../components/FormProjet'
import FeatherIcon from 'feather-icons-react';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Row, Col, Modal, Card, Button } from 'react-bootstrap';

export default function Projets() {

	const [projets, setProjets] = React.useState([]);
	const [show, setShow] = React.useState(false);
	const [projet, setProjet] = React.useState({});

	const fetchProjets = async () => {
		try {
			const url ='http://localhost:4000/api/v1/projets/';
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'get',
			  	url,
			});

			if (res.status === 200) {
				setProjets(res.data.projets);
			}

			} catch (err) {
				console.log(err.response.data.message);
			}
	}

	const deleteProjet = async () => {
		try {
			const url =`http://localhost:4000/api/v1/projets/${projet.id}`;
			const res = await axios({
				headers: {'Authorization': `Bearer ${localStorage.getItem('tokenARRU')}`},
			  	method: 'delete',
			  	url,
			});

			if (res.status === 203) {
				toast.success('Success', {
					position: 'top-right',
					autoClose: 5000,
					draggable: false
				});
				window.location.replace('/Projets');
			}

			} catch (err) {
				toast.error(err.response.data.message, {
					position: 'top-right',
					autoClose: 5000,
					draggable: true
				});
				setShow(false);
			}
	}

	React.useEffect(() => {
		fetchProjets();
	},[])

    return (
        <main class="content">
				<div class="container-fluid p-0">

					<h1 class="h3 mb-3">Gestion des projets</h1>

					<div class="row">

						<div class="col-6">
							<Carte />
						</div>
					
						<div class="col-6">
							<div class="card">
								<div class="card-header">
									<h5 class="card-title">Liste des projets</h5>
									</div>
								<div class="table-responsive">
									<table class="table mb-0">
										<thead>
											<tr>
												<th scope="col">#</th>
												<th scope="col">Nom</th>
												<th scope="col">Municipalité</th>
												<th scope="col">Nombre de quartier</th>
												<th scope="col">Nombre de maison</th>
												<th scope="col">Nombre d'habitants</th>
												<th scope="col"><span data-toggle="modal" data-target="#defaultModalPrimary" style={{ "cursor": "pointer" }}><FeatherIcon icon="plus"/></span></th>
											</tr>
										</thead>
										<tbody>
											{ projets.map((projet,index) => (
											<tr key={index}>
												<td>{index+1}</td>
												<td>{projet.nom}</td>
												<td></td>
												<td>Cell</td>
												<td>Cell</td>
												<td>Cell</td>
												<td><span style={{ "cursor": "pointer" }} data-toggle="modal" data-target="#ModalMod" ><FeatherIcon icon="edit-2" /></span>
														<span style={{ "cursor": "pointer" }} onClick={() => { setProjet(projet); setShow(true); }}><FeatherIcon icon="trash" /></span>
											</td>
											</tr>
											))}
										</tbody>
									</table>

								</div>
							</div>
						
					</div>
					</div>

					<div className="modal fade" id="defaultModalPrimary" tabIndex="-1" role="dialog" aria-hidden="true">
										<div className="modal-dialog" role="document">
											<div className="modal-content">
												<div className="modal-header">
													<div className="col-12 col-xl-12">
														<div className="card">
															<div className="modal-header">
																<h5 className="modal-title">Ajouter projet</h5>
																<button type="button" className="btn-close" data-dismiss="modal" aria-label="Close"></button>
															</div>
															<div className="card-body">
																<Form   />
															</div>
														</div>
													</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

				</div>
				<Modal show={show} onHide={() => setShow(false)}>
					<Modal.Header closeButton>
					<Modal.Title>Confirmation</Modal.Title>
					</Modal.Header>
					<Modal.Body>Are you sure you want delete {projet.nom}!</Modal.Body>
					<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						Close
					</Button>
					<Button variant="primary" onClick={() => { deleteProjet() }}>
						Save Changes
					</Button>
					</Modal.Footer>
				</Modal>
			</main>
    )
}
