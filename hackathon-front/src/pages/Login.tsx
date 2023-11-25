import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {SubmitHandler, useForm} from "react-hook-form";
import {ERROR_MESSAGES, VALIDATION_RULES} from "../common/constants";
import authService from "../services/auth.service";


interface LoginFormValues {
    email: string;
    password: string;

}

const LoginPage = () => {
    const {
        handleSubmit,
        formState: {errors},
        register,
        reset,
    } = useForm<LoginFormValues>();
    const [loginError, setLoginError] = useState<string | null>(null); // Add state for login error message


    const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
        const loginDto = {
            email: data.email,
            password: data.password,
        };

        try {
            // Make the API call to authenticate the user
            const response = await authService.login(loginDto);

            // Handle successful login
            console.log('Login successful', response);

            // Store the access token in local storage
            localStorage.setItem('accessToken', response.accessToken.token);

            // Reset the form
            reset();
        } catch (error) {
            // Handle login error
            console.error('Login failed', error);
            setLoginError('Invalid username or password'); // You can customize this message based on the error response from the server
        }
    };


    return (
        <main>
            <div className="container">
                <section className="section register  align-items-center justify-content-center py-4">
                    <div className="row justify-content-center">
                        <div
                            className="col-lg-6 col-md-6 d-flex flex-column align-items-center justify-content-center">
                            <div className="d-flex justify-content-center py-4">
                                <Link to="/" className="logo d-flex align-items-center w-auto">
                                    <img
                                        src="https://karizma-group.com/wp-content/uploads/2023/01/nos-clients-karizma-group-1.png"
                                        alt=""/>

                                    <span className="d-none d-lg-block">Karizma</span>
                                </Link>
                            </div>
                            {/* End Logo */}

                            <div className="card">
                                <div className="card-body">
                                    <div className="pt-4 pb-2">
                                        <h5 className="card-title text-center pb-0 fs-4">Login to your account</h5>
                                        <p className="text-center small">Enter your details </p>
                                    </div>

                                    <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                        <div className="col-12">


                                            <label htmlFor="your email" className="form-label">
                                                User name
                                            </label>
                                            <input
                                                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                placeholder="User name"
                                                {...register('email', {
                                                    required: {
                                                        value: true,
                                                        message: ERROR_MESSAGES.required,
                                                    },
                                                    validate: {
                                                        minLength: (v) =>
                                                            VALIDATION_RULES.minLength(5)(v) ||
                                                            ERROR_MESSAGES.minLength.replace('{min}', '5'),
                                                        pattern: (v) =>
                                                            VALIDATION_RULES.emailPattern.test(v) || ERROR_MESSAGES.email,
                                                    },
                                                })}
                                            />
                                            {errors.email?.type === "required" &&
                                                <p className="error-message">{ERROR_MESSAGES.required}</p>}
                                            {errors.email?.type === "minLength" &&
                                                <p className="error-message">{ERROR_MESSAGES.minLength.replace('{min}', '5')}</p>}
                                            {errors.email?.type === "pattern" &&
                                                <p className="error-message">{ERROR_MESSAGES.username}</p>}

                                            <label htmlFor="your email" className="form-label">
                                                Password
                                            </label>
                                            <input
                                                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                placeholder="Password "
                                                type="password"
                                                {...register('password', {
                                                    required: {
                                                        value: true,
                                                        message: ERROR_MESSAGES.required,
                                                    },
                                                    validate: {
                                                        minLength: (v) =>
                                                            VALIDATION_RULES.minLength(5)(v) ||
                                                            ERROR_MESSAGES.minLength.replace('{min}', '5'),
                                                        pattern: (v) =>
                                                            VALIDATION_RULES.passwordPattern.test(v) || ERROR_MESSAGES.password,
                                                    },
                                                })}
                                            />
                                            {errors.password?.type === "required" &&
                                                <p className="error-message">{ERROR_MESSAGES.required}</p>}
                                            {errors.password?.type === "pattern" &&
                                                <p className="error-message">{ERROR_MESSAGES.password}</p>}


                                        </div>
                                        <div className="col-12">
                                            <div className="form-check">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    name="remember"
                                                    defaultValue="true"
                                                    id="rememberMe"
                                                />
                                                <label className="form-check-label" htmlFor="rememberMe">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            {loginError &&
                                                <p className="error-message">{loginError}</p>} {/* Display error message */}
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-primary w-100" type="submit">
                                                Login
                                            </button>
                                        </div>
                                        <div className="col-12">
                                            <p className="small mb-0  text-center">
                                                Don't have account?{" "}
                                                <Link to="/register">Create an account</Link>
                                            </p>
                                            <p className="small mb-0  text-center">
                                                Forget your Password?{" "}
                                                <Link to="/register">Reset Password</Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default LoginPage;
