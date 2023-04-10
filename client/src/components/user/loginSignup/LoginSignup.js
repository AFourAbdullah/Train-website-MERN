import React, { useEffect, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Loading from "../../loading/Loading";
import { clearErrors, login, registeUser } from "../../../actions/userActions";

const LoginSignup = ({ history, location }) => {
  // const loginTab=useRef(null)
  // const registerTab=useRef(null)
  // const switcherTab=useRef(null)
  const dispatch = useDispatch();
  // const selector = useSelector();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const [loginShow, setLoginShow] = useState(true);
  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const loginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      return toast.error("All field are mandatory");
    }
    dispatch(login(loginEmail, loginPassword));
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setuser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const [avatar, setAvatar] = useState("/Profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const { name, email, password } = user;
  const registerSubmit = (e) => {
    e.preventDefault();
    if (!name || !password || !email || !avatar) {
      return toast.error("All field are mandatory");
    }

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(registeUser(myForm));
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [dispatch, error, isAuthenticated, toast]);
  //   const redirect = location.search ? location.search.split("=")[1] : "/account";
  //   useEffect(() => {}, [dispatch, error, history, isAuthenticated, redirect]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="LoginSignupContainer">
          <div className="LoginSignupBox">
            <div>
              <div className="LoginSignupToggle">
                <p
                  onClick={() => setLoginShow(true)}
                  className={loginShow ? "redUnderline" : ""}
                >
                  Login
                </p>
                <p
                  onClick={() => setLoginShow(false)}
                  className={!loginShow ? "redUnderline" : ""}
                >
                  Register
                </p>
              </div>
              {/*<button ref={switcherTab}></button>*/}
            </div>
            {loginShow ? (
              <form
                className="loginForm"
                // ref={loginTab}
                onSubmit={loginSubmit}
              >
                <div className="loginEmail">
                  <MailOutlineIcon />

                  <input
                    type="email"
                    placeholder="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
            ) : (
              <form
                className="signUpForm"
                // ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginSignup;
