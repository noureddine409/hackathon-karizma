import React from 'react';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import {ERROR_MESSAGES, VALIDATION_RULES} from "../common/constants";

interface RegisterFormValues {
    fullname: string;
    email: string;
    username:string;
    password:string;
    confirmPassword: string;

}
const RegisterPage = () => {
    const {
        handleSubmit,
        formState: { errors },
        register,
        getValues,
        reset,

    } = useForm<RegisterFormValues>();


    const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
        // Handle form submission logic here
        console.log(data);
        reset();
    };



    return (
        <main>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-7 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-4">
                                    <Link to="/" className="logo d-flex align-items-center w-auto">
                                        <img src= "https://karizma-group.com/wp-content/uploads/2023/01/nos-clients-karizma-group-1.png" alt="" />
                                        <span className="d-none d-lg-block">Karizma</span>
                                    </Link>
                                </div>
                                {/* End Logo */}

                                <div className="card">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                                            <p className="text-center small">Enter your details to create an account</p>
                                        </div>

                                        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="col-12">
                                                <label htmlFor="yourName" className="form-label">
                                                    Full Name
                                                </label>
                                                <input
                                                    className={`form-control ${errors.fullname ? 'is-invalid' : ''}`}
                                                    placeholder="Full name"
                                                    {...register('fullname', {required: {value: true,
                                                            message: ERROR_MESSAGES.required,
                                                        },
                                                        validate: {
                                                            minLength: (v) =>
                                                                VALIDATION_RULES.minLength(5)(v) ||
                                                                ERROR_MESSAGES.minLength.replace('{min}', '5'),
                                                            pattern: (v) =>
                                                                VALIDATION_RULES.namePattern.test(v) || ERROR_MESSAGES.name,
                                                        },
                                                    })}
                                                />
                                                {errors.fullname?.type === "required" && <p className="error-message">{ERROR_MESSAGES.required}</p>}
                                                {errors.fullname?.type === "minLength" && <p className="error-message">{ERROR_MESSAGES.minLength.replace('{min}', '5')}</p>}
                                                {errors.fullname?.type === "pattern" && <p className="error-message">{ERROR_MESSAGES.name}</p>}

                                                <label htmlFor="your email" className="form-label">
                                                    Email Address
                                                </label>
                                                <input

                                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                                    placeholder="Email"
                                                    {...register('email', {required: {value: true,
                                                            message: ERROR_MESSAGES.required,
                                                        },
                                                        validate: {
                                                            maxLength: (v) =>
                                                                VALIDATION_RULES.maxLength(50)(v) ||
                                                                ERROR_MESSAGES.maxLength.replace('{max}', '50'),
                                                            pattern: (v) =>
                                                                VALIDATION_RULES.emailPattern.test(v) || ERROR_MESSAGES.email,
                                                        },
                                                    })}
                                                />
                                                {errors.email?.type === "required" && <p className="error-message">{ERROR_MESSAGES.required}</p>}
                                                {errors.email?.type === "maxLength" && <p className="error-message">{ERROR_MESSAGES.maxLength.replace('{max}', '50')}</p>}
                                                {errors.email?.type === "pattern" && <p className="error-message">{ERROR_MESSAGES.email}</p>}

                                                <label htmlFor="your email" className="form-label">
                                                    User Name
                                                </label>
                                                <input
                                                    className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                                    placeholder="User name"
                                                    {...register('username', {required: {value: true,
                                                            message: ERROR_MESSAGES.required,
                                                        },
                                                        validate: {
                                                            minLength: (v) =>
                                                                VALIDATION_RULES.minLength(5)(v) ||
                                                                ERROR_MESSAGES.minLength.replace('{min}', '5'),
                                                            pattern: (v) =>
                                                                VALIDATION_RULES.namePattern.test(v) || ERROR_MESSAGES.username,
                                                        },
                                                    })}
                                                />
                                                {errors.username?.type === "required" && <p className="error-message">{ERROR_MESSAGES.required}</p>}
                                                {errors.username?.type === "minLength" && <p className="error-message">{ERROR_MESSAGES.minLength.replace('{min}', '5')}</p>}
                                                {errors.username?.type === "pattern" && <p className="error-message">{ERROR_MESSAGES.username}</p>}

                                                <label htmlFor="your email" className="form-label">
                                                    Password
                                                </label>
                                                <input
                                                    className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                                    placeholder="Password "
                                                    type="password"
                                                    {...register('password', {required: {value: true,
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
                                                {errors.password?.type === "required" && <p className="error-message">{ERROR_MESSAGES.required}</p>}
                                                {errors.password?.type === "pattern" && <p className="error-message">{ERROR_MESSAGES.password}</p>}

                                                <label htmlFor="yourConfirmPassword" className="form-label">
                                                    Confirm Password
                                                </label>
                                                <input
                                                    type="password"
                                                    className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                                    placeholder="Confirm Password"
                                                    {...register('confirmPassword', {required: {value: true,
                                                            message: ERROR_MESSAGES.required,
                                                        },
                                                        validate: (value) =>
                                                            value === getValues('password') || ERROR_MESSAGES.passwordMatch,
                                                    })}
                                                />
                                                {errors.confirmPassword?.type === 'required' && <p className="error-message">{ERROR_MESSAGES.required}</p>}
                                                {errors.confirmPassword?.type === 'validate' && (
                                                    <p className="error-message">{ERROR_MESSAGES.passwordMatch}</p>
                                                )}
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit">
                                                    Create Account
                                                </button>
                                            </div>

                                            <div className="col-12">
                                                <p className="small mb-0  text-center ">
                                                    Already have an account? <Link to="/login">Log in</Link>
                                                </p>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default RegisterPage;
