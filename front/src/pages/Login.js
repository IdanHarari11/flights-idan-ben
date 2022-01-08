import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setItemToLocalStorage } from "../helpers/localStorageFunc";
import { doFetch } from "../helpers/useFetch";
import useInput from "../hooks/use-input";
import { favoriteActions } from "../store/favoriteSlice";
import { userActions } from "../store/userSlice";
import "./Login.css";

const isNotEmpty = (value) => value.trim() !== "";
const isMoreThenSeven = (value) => value.length > 6;
const isEmail = (value) => value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

const Login = () => {
  const isEqualToPassword = (value) =>
    value === signUpPasswordValue && value.length > 6;

  //! Login inputsd
  const {
    value: loginUsernameValue,
    isValid: loginUsernameIsValid,
    hasError: loginUsernameHasError,
    valueChangeHandler: loginUsernameChangeHandler,
    inputBlurHandler: loginUsernameBlurHandler,
    reset: resetLoginUsername,
  } = useInput(isNotEmpty);
  const {
    value: loginPasswordValue,
    isValid: loginPasswordIsValid,
    hasError: loginPasswordHasError,
    valueChangeHandler: loginPasswordChangeHandler,
    inputBlurHandler: loginPasswordBlurHandler,
  } = useInput(isMoreThenSeven);

  //! Sign Up inputs
  const {
    value: signUpUsernameValue,
    isValid: signUpUsernameIsValid,
    hasError: signUpUsernameHasError,
    valueChangeHandler: signUpUsernameChangeHandler,
    inputBlurHandler: signUpUsernameBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: signUpEmailValue,
    isValid: signUpEmailIsValid,
    hasError: signUpEmailHasError,
    valueChangeHandler: signUpEmailChangeHandler,
    inputBlurHandler: signUpEmailBlurHandler,
  } = useInput(isEmail);
  const {
    value: signUpPasswordValue,
    isValid: signUpPasswordIsValid,
    hasError: signUpPasswordHasError,
    valueChangeHandler: signUpPasswordChangeHandler,
    inputBlurHandler: signUpPasswordBlurHandler,
  } = useInput(isMoreThenSeven);
  const {
    value: signUpConfirmPasswordValue,
    isValid: signUpConfirmPasswordIsValid,
    hasError: signUpConfirmPasswordHasError,
    valueChangeHandler: signUpConfirmPasswordChangeHandler,
    inputBlurHandler: signUpConfirmPasswordBlurHandler,
  } = useInput(isEqualToPassword);

  const [flag, setFlag] = useState(false);
  const [signUpErrorMsg, setSignUpErrorMsg] = useState();
  const [loginErrorMsg, setLoginErrorMsg] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const username = loginUsernameValue;
    const password = loginPasswordValue;

    if (!loginUsernameIsValid && !loginPasswordIsValid) {
      return;
    }
    const res = await doFetch(
      "http://localhost:5000/users/login",
      { username, password },
      "POST"
    );
    const result = await res.json();

    if (result.message) {
      return setLoginErrorMsg(await result.message);
    }

    dispatch(userActions.saveUser(result));

    dispatch(favoriteActions.newFavorites(result.favorites));
    setItemToLocalStorage(
      "favorites",
      result.favorites.map((favorite) => favorite)
    );

    if (res.status === 404 || res.status === 400) {
      return setLoginErrorMsg(await result.message);
    }

    if (res.status === 200) {
      history.replace("/home");
    }
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    const username = signUpUsernameValue;
    const email = signUpEmailValue;
    const password = signUpPasswordValue;

    if (
      !signUpUsernameIsValid &&
      !signUpEmailIsValid &&
      !signUpPasswordIsValid &&
      !signUpConfirmPasswordIsValid
    ) {
      return;
    }

    const res = await doFetch(
      "http://localhost:5000/users",
      { username, email, password },
      "POST"
    );
    const result = await res.json();

    if(result.message){
      return setSignUpErrorMsg(await result.message);
    }

    if (res.status === 500) {
      return setSignUpErrorMsg(await result.message);
    }

    if (res.status !== 201) {
      return;
    }

    const ress = await doFetch(
      "http://localhost:5000/users/login",
      {
        username,
        password,
      },
      "POST"
    );

    const resultt = await ress.json();

    if(resultt.message){
      return setSignUpErrorMsg(await resultt.message);
    }
    
    if (ress.status === 404 || ress.status === 400) {
      return setSignUpErrorMsg(await resultt.message);
    }

    dispatch(userActions.saveUser(resultt));

    if (res.status === 201) {
      history.replace("/home");
    }
  };

  const loginUsernameClasses = loginUsernameHasError
    ? "form-control invalid"
    : "form-control";
  const loginPasswordClasses = loginPasswordHasError
    ? "form-control invalid"
    : "form-control";
  const signUpUsernameClasses = signUpUsernameHasError
    ? "form-control invalid"
    : "form-control";
  const signUpEmailClasses = signUpEmailHasError
    ? "form-control invalid"
    : "form-control";
  const signUpPasswordClasses = signUpPasswordHasError
    ? "form-control invalid"
    : "form-control";
  const signUpConfirmPasswordClasses = signUpConfirmPasswordHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <div
      className={flag ? "wrapper__area sign-up__Mode-active" : "wrapper__area"}
      id="wrapper_Area"
    >
      <div className="forms__area">
        {/* Login Form  */}
        <form className="login__form" id="loginForm">
          <h1 className="form__title">Sign In!</h1>
          <div className="input__group">
            <label className="field">
              <input
                value={loginUsernameValue}
                onChange={loginUsernameChangeHandler}
                onBlur={loginUsernameBlurHandler}
                className={loginUsernameClasses}
                type="text"
                name="username"
                placeholder="Username"
                id="loginUsername"
                required
              />
              {loginUsernameHasError ? (
                <p className="errorMsg">Username can't be empty!</p>
              ) : null}
            </label>
          </div>
          <div className="input__group">
            <label className="field">
              <input
                value={loginPasswordValue}
                onChange={loginPasswordChangeHandler}
                onBlur={loginPasswordBlurHandler}
                className={loginPasswordClasses}
                type="password"
                name="password"
                placeholder="Password"
                id="loginPassword"
                required
              />
              {loginPasswordHasError ? (
                <p className="errorMsg">
                  Password must contain at least 7 characters!
                </p>
              ) : null}
            </label>
            {loginErrorMsg ? (
              <div className="errorMsg">{loginErrorMsg}</div>
            ) : null}
          </div>
          <button
            onClick={(e) => onLogin(e)}
            className={["submit-button"]}
            id="loginSubmitBtn"
          >
            Sign in
          </button>
        </form>

        {/* Sign Up Form  */}
        <form className="sign-up__form" id="signUpForm">
          <h1 className="form__title">Sign Up!</h1>
          <div className="input__group">
            <label className="field">
              <input
                value={signUpUsernameValue}
                onChange={signUpUsernameChangeHandler}
                onBlur={signUpUsernameBlurHandler}
                className={signUpUsernameClasses}
                type="text"
                name="username"
                placeholder="Username123..."
                id="signUpUsername"
                required
              />
              {signUpUsernameHasError ? (
                <p className="errorMsg">Username can't be empty!</p>
              ) : null}
            </label>
          </div>
          <div className="input__group">
            <label className="field">
              <input
                value={signUpEmailValue}
                onChange={signUpEmailChangeHandler}
                onBlur={signUpEmailBlurHandler}
                className={signUpEmailClasses}
                type="text"
                name="email"
                placeholder="Email@example.com"
                id="signUpEmail"
                required
              />
              {signUpEmailHasError ? (
                <p className="errorMsg">Please write real email!</p>
              ) : null}
            </label>
          </div>
          <div className="input__group">
            <label className="field">
              <input
                value={signUpPasswordValue}
                onChange={signUpPasswordChangeHandler}
                onBlur={signUpPasswordBlurHandler}
                className={signUpPasswordClasses}
                type="password"
                name="password"
                placeholder="Password..."
                id="signUpPassword"
                required
              />
              {signUpPasswordHasError ? (
                <p className="errorMsg">
                  Password must contain at least 7 characters!
                </p>
              ) : null}
            </label>
          </div>
          <div className="input__group confirm__group">
            <label className="field">
              <input
                value={signUpConfirmPasswordValue}
                onChange={signUpConfirmPasswordChangeHandler}
                onBlur={signUpConfirmPasswordBlurHandler}
                className={signUpConfirmPasswordClasses}
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                id="signUpConfirmPassword"
                required
              />
              {signUpConfirmPasswordHasError ? (
                <p className="errorMsg">
                  Please make sure your passwords match!
                </p>
              ) : null}
            </label>
            {signUpErrorMsg ? (
              <div className="errorMsg">{signUpErrorMsg}</div>
            ) : null}
          </div>
          <button
            onClick={(e) => onSignUp(e)}
            className="submit-button"
            id="signUpSubmitBtn"
          >
            Sign Up
          </button>
        </form>
      </div>

      <div className="aside__area" id="aside_Area">
        <div className="login__aside-info">
          <h4>Hello</h4>
          <img src="https://d.top4top.io/p_1945xjz2y1.png" alt="Image" />
          <p>Enter your personal details and start journey with us</p>
          <button id="aside_signUp_Btn" onClick={() => setFlag(true)}>
            Sign Up
          </button>
        </div>
        <div className="sign-up__aside-info">
          <h4>Welcome</h4>
          <img src="https://e.top4top.io/p_1945sidbp2.png" alt="Image" />
          <p>To Keep connected with us please login with your personal info</p>
          <button id="aside_signIn_Btn" onClick={() => setFlag(false)}>
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
