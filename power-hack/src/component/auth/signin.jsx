import { Formik, ErrorMessage, Field, Form } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import '../../style/style.css'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/es/exports';
import { signin } from '../../redux/slice/auth.slice';
const Signin = () => {
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector((state) => state.messages);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const { from } = location.state || {
        from: { pathname: '/billings' },
    };
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),

        password: Yup.string().required("password is required"),
    });
    const handleLogin = (formValue) => {
        setSuccessful(false);
    
        dispatch(signin(formValue))
          .then(() => {
            setSuccessful(true);
            setTimeout(() => {
                
                navigate(from, { replace: true });
            }, 1000);
          })
          .catch(() => {
            setSuccessful(false);
            <Navigate to="/login" state={{ from: location }} replace />;
          });
      };
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
                        email: '', password: ''
                    }}
                    onSubmit={handleLogin}
                    validationSchema={validationSchema}
                >
                    <Form>

                        <h6 class="h3 mb-3 fw-normal">Sign in</h6>

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
                        <div class="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" /> Remember me
                            </label>
                        </div>
                        <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                        <p>Alrady have an account? sign up <Link to='/signup'> here</Link></p>
                        <p class="mt-5 mb-3 text-muted">&copy;Power Hack 2023</p>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default Signin;