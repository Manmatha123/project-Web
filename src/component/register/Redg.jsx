import React, { useState } from 'react'
import Nav from "../narbar/Nav"
import "./Redg.css";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../Core';
const Redg = () => {

    const navigation = useNavigate("")
    const [input, setInput] = useState({ name: "", phone: "", password: "", confirmPassword: "" });
    const [eye, seteye] = useState(true);

    const handleInput = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setInput({ ...input, [name]: value });
    }

    const registerForm = async (e) => {
        e.preventDefault();
        try {
            const { name, phone, password, confirmPassword } = input;
            if (password !== confirmPassword) {
                toast.error("Password and Confirm Password should be same");
                return;
            }

            if (name === "" || password === "" || phone === "" || name.length <= 1 || phone.length < 10 || phone.length > 10) {
                toast.error("Invalid user details");
                return;
            }
            if (password.length < 5) {
                toast.error("Password length most be greater then 4");
                return;
            }


            const res = await fetch(`${api}/v1/api/user/saveorupdate`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    name, phone, password
                })
            });

            const data = await res.json();
            if (!data.status) {
                toast.error(data.message);
                return;
            }
            toast.success("Register successful");
            setInput({ name: "", phone: "", password: "", confirmPassword: "" });

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
						<h2>Sign up</h2>
					</div>
					<div class="row">
						<form control="" class="form-group" onSubmit={registerForm}>
							<div class="row">
								<input type="text" required id="name" class="form__input"  placeholder='Enter your name' name='name' onChange={(e) => handleInput(e)}/>
							</div>

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
                            {
                                        eye ? <i onClick={() => seteye(!eye)} className="fa-solid fa-eye"></i> : <i onClick={() => seteye(!eye)} class="fa-solid fa-eye-slash"></i>
                                    }
								<input type={eye ? "password" : "text"} required  name='confirmPassword' onChange={(e) => handleInput(e)}  id="confirmPassword" class="form__input" placeholder="Confirm Password"/>
							</div>
                            	
							<div class="row">
								<input type="submit" value="Submit"  class="btn"/>
							</div>
						</form>
					</div>
					<div class="row">
						<p  onClick={() => navigation("/shoping/signin")}>Don't have an account? <a href="#">Login Here  </a></p>
					</div>
				{/* </div> */}
			</div>
		</div>

                </div>
            </div>
        </>
    )
}

export default Redg