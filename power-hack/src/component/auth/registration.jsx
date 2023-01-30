import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import '../../style/style.css'
import { register } from '../../redux/slice/auth.slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/exports';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Registration = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { message } = useSelector((state) => state.messages)
    const [successful, setSuccessful] = useState(false);
    const validationSchema = Yup.object({
        name: Yup.string()
            .min(2, "Minimum 2 characters or more")
            .max(15, "Must be 15 characters or less")
            .required("Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
        cPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
    });
    const handleRegister = (values) => {
        console.log(values);
        dispatch(register(values))
            .unwrap()
            .then(() => {
                setSuccessful(true);
                navigate('/login')

            })
            .catch(() => {
                setSuccessful(false);
                setTimeout(() => {
                    dispatch(clearMessage())
                }, 1000);
            });

    }
    return (
        <div className=' auth-wrapper'>
            <div class="form-signin w-100 m-auto">
                <h3>POWER HACK</h3>
                {message && (
                    <div className="form-group">
                        <div
                            className={
                                successful ? "alert alert-success" : "alert alert-danger"
                            }
                            role="alert"
                        >
                            {message}
                        </div>
                    </div>
                )}
                <Formik
                    initialValues={{
                        name: '', email: '', password: '', cPassword: ''
                    }}
                    onSubmit={handleRegister}
                    validationSchema={validationSchema}
                >
                    <Form>

                        <h6 class="h3 mb-3 fw-normal">Sign in</h6>

                        <div class="form-floating mb-2">
                            <Field type="text" class="form-control"
                                id="floatingInput"
                                placeholder="Your name here"
                                name='name'
                            />
                            <label for="floatingInput">Full Name</label>
                        </div>
                        <ErrorMessage
                            name="name"
                            component="span"
                            className="alert text-danger wrap-msg"
                        />
                        <div class="form-floating mb-2">
                            <Field type="email" class="form-control"
                                id="floatingInput"
                                placeholder="name@example.com"
                                name='email'
                            />
                            <label for="floatingInput">Email Address</label>
                        </div>
                        <ErrorMessage
                            name="email"
                            component="span"
                            className="alert text-danger wrap-msg"
                        />
                        <div class="form-floating">
                            <Field type="password"
                                class="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                name='password'
                            />
                            <label for="floatingPassword">Password</label>
                        </div>
                        <ErrorMessage
                            name="password"
                            component="span"
                            className="alert text-danger wrap-msg"
                        />
                        <div class="form-floating">
                            <Field type="password"
                                class="form-control"
                                id="floatingPassword"
                                placeholder="Password"
                                name='cPassword'
                            />
                            <label for="floatingPassword">Confirm Password</label>
                        </div>
                        <ErrorMessage
                            name="cPassword"
                            component="span"
                            className="alert text-danger wrap-msg"
                        />
                        <div class="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" /> Remember me
                            </label>
                        </div>
                        <button class="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>                        
                        <p>Alrady have an account? login <Link to='/login'> here</Link></p>
                        <p class="mt-5 mb-3 text-muted">&copy;Power Hack 2023</p>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Registration;