import React from 'react';
import axios from 'axios';
import { useAuthDispatch } from '../../context/auth';
import { useAuthState } from '../../context/auth';

export default function Login() {

	const { user } = useAuthState();

	/*if(user && window.history){
		window.history.back();
	}*/

	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	const dispatch = useAuthDispatch();

	const login = async (e) => {
		e.preventDefault();
		const data = { email, password };
		try {
			const url ='http://localhost:4000/api/v1/utilisateurs/login';
			const res = await axios({
			  method: 'post',
			  url,
			  data,
			});
	
			
		
			if (res.status === 200) {
			  
			  dispatch({ type:'LOGIN', payload: res.data.token });
			  
			  window.location.replace('/Projets');
			}
			} catch (err) {
				console.log(err);
				console.log("Alert");
			}
	}

	if(!user){
    return (
        <main className="d-flex w-100">
		<div className="container d-flex flex-column">
			<div className="row vh-100">
				<div className="col-sm-10 col-md-8 col-lg-6 mx-auto d-table h-100">
					<div className="d-table-cell align-middle">

						<div className="text-center mt-4">
							<h1 className="h2">Bienvenue</h1>
							<p className="lead">
								connecter pour acceder à votre compte
							</p>
						</div>

						<div className="card">
							<div className="card-body">
								<div className="m-sm-4">
									<div className="text-center">
										<img src="img/photos/logo.png" alt="ARRU" className="img-fluid " width="132" height="132" />
									</div>
									<form>
										<div className="mb-3">
											<label className="form-label">Email</label>
											<input className="form-control form-control-lg" type="email" onChange={(e) => setEmail(e.target.value)} name="email" placeholder="Entrer votre email" />
										</div>
										<div className="mb-3">
											<label className="form-label">Mot de passe </label>
											<input className="form-control form-control-lg" type="password" onChange={(e) => setPassword(e.target.value)} name="password" placeholder="Entrer votre mot de passe" />
											<small>
            									<a href="#">oublier mot de passe ?</a>
          									</small>
										</div>
											
										<div className="text-center mt-3">
											 <span type="submit" className="btn btn-lg btn-primary" onClick={login}>Sign in</span> 

										</div>
									</form>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</main>

    )}
	else{
		return (
			<React.Fragment></React.Fragment>
		)
	}
}
