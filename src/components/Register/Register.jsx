import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";
import auth from "../../firebase/firbase.cofig";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
//  name ,email,pass

const Register = () => {
  //  this is for react hook form
  const [registerError, setRegisterError] = useState("");
  const [success, setSucess] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    console.log(email, password, name);

    //reset error
    setRegisterError("");
    setSucess("");

    //password longer
    if (password.length < 6) {
      setRegisterError("Enter longer then 6 characters");
      return;
    }

    // creat user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSucess("Register Sucessfully");

        //update profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            const saveUser = {
                username: name,
                email: email,
                password: password,
              };
              console.log('this is saveuser',saveUser)
            
            //  use the post method here

            fetch("http://localhost/phpt/index.php/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data) {
                  alert("User Created Successfully");
                  
                }
              });
          })

          .catch((error) => {
            console.log(error)
          });

        //send verification email
        sendEmailVerification(result.user).then(() => {
          alert("Please verify your email");
        });
      })
      .catch((error) => {
        console.log(error);
        setRegisterError("Already in this system");
      });
  };
  return (
    <div>
      <div className="mx-auto md:w-1/2">
        <h2 className="text-3xl">this is register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="bg-slate-500 rounded-lg mb-4 w-3/4 py-2 px-4"
            required
            placeholder="your name"
            type="text"
            name="name"
            id=""
          />
          <br />
          <input
            className="bg-slate-500 rounded-lg mb-4 w-3/4 py-2 px-4"
            required
            placeholder="Email"
            type="email"
            name="email"
            id=""
          />
          <br />

          <input
            className="bg-slate-500 rounded-lg mb-4 w-3/4 py-2 px-4"
            required
            placeholder="Password"
            type={showPass ? "text" : "password"}
            name="password"
            id=""
          />
          <span
            className="btn btn-square"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
          </span>
          <br />

          <input className="btn btn-secondary" type="submit" value="Register" />
        </form>
        {registerError && (
          <p className="text-red-700 text-3xl ">{registerError}</p>
        )}
        {success && <p className="text-green-600 text-3xl ">{success}</p>}
        <p>
          you have already an account please go to
          <Link className="btn" to="/login">
            login
          </Link>{" "}
        </p>
      </div>
    </div>
  );
};

export default Register;
