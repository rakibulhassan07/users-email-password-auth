import React, { useRef, useState } from "react";
import auth from "../../firebase/firbase.cofig";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginError, setLoginError] = useState("");
  const [success, setSucess] = useState("");
  const emailRef = useRef("");

  const hendleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    //reset error
    setLoginError("");
    setSucess("");

    if (password.length < 6) {
      setLoginError("Enter longer then 6 characters");
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        if (result.user.emailVerified) {
          setSucess("Login Sucessfully");
        } else {
          alert("Please verify your email");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginError("invalid password");
      });
  };
  //forget pass
  const handleForgetpass = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log("Please put your email");
      return;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.log("Please put valid email");
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Please check Your email");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6 text-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              exercitationem omnis possimus, iure accusamus recusandae maxime
              placeat? Eaque ad quidem voluptatem nesciunt repellendus voluptate
              fugiat, amet, et modi delectus unde.
            </p>
          </div>
          <div className="card p-5 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={hendleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  ref={emailRef}
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a
                    onClick={handleForgetpass}
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {loginError && <p className="text-red-700 ">{loginError}</p>}
            {success && <p className="text-green-600 ">{success}</p>}
            <p>
              If you are new hare please{" "}
              <Link className="btn" to="/register">
                register
              </Link>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
