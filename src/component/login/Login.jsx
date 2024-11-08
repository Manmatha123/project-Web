import React, { useState } from 'react'
import "./Login.css";
import Nav from '../narbar/Nav';
import { replace, useNavigate } from 'react-router-dom';
import { api } from '../Core';
import { toast } from 'react-toastify';

const Login = () => {
    const navigation = useNavigate("");

    const [input, setInput] = useState({ phone: "", password: "" });
    const [eye, seteye] = useState(true);

    const handleInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value });
    }

    const loginform = async (e) => {
        e.preventDefault();
        try {
            const { phone, password } = input;
            const res = await fetch(`${api}/v1/api/user/signin`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    phone, password
                })
            });

            const data = await res.json();
            if (!data.status) {
                toast.error("Invalid login details");
                return;
            }

            localStorage.setItem("token", data.message);
            toast.success("Login successful");
            navigation("/shop/dashboard",{replace:true});
        } catch (e) {
            toast.error("something went wrong");
        }
    }

    return (
        <>

            <div className="container">
                <Nav />
                <div className="loginBody">

		<div class="row main-content bg-success text-center">
			<div class="col-md-4 text-center company__info">
             <lottie-player src="https://lottie.host/f6584c2b-6f1f-48a6-a30d-9fedd307a977/yyaEg3cAjH.json" background="transparentf" speed="1" style={{ width: "500px", height: "70%" }} loop autoplay direction="1" mode="normal"></lottie-player>
			</div>
			<div class="login_form ">
				{/* <div class="container-fluid"> */}
					<div class="row">
						<h2>Sign In</h2>
					</div>
					<div class="row">
						<form control="" class="form-group" onSubmit={loginform}>
							<div class="row">
								<input type="text" required id="username" class="form__input" placeholder='Enter phone number' name='phone' onChange={(e) => handleInput(e)}/>
							</div>
							<div class="row">
                            {
                                        eye ? <i onClick={() => seteye(!eye)} className="fa-solid fa-eye"></i> : <i onClick={() => seteye(!eye)} class="fa-solid fa-eye-slash"></i>
                                    }
								<input type={eye ? "password" : "text"} required  name='password' onChange={(e) => handleInput(e)}  id="password" class="form__input" placeholder="Password"/>
							</div>
				
							<div class="row">
								<input type="submit" value="Submit"  class="btn"/>
							</div>
						</form>
					</div>
					<div class="row">
						<p  onClick={() => navigation("/shoping/signup")} >Don't have an account? <a href="#">Register Here  </a></p>
					</div>
				{/* </div> */}
			</div>
		</div>

                </div>
            </div>
        </>
    )
}

export default Login;

