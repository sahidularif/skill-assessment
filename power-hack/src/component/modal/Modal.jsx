import React from "react";
import "./modal.css";
import { Link } from "react-router-dom";
import { ErrorMessage, Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import img from '../../assets/bill.jpg'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from "g:/roommate-app/room-mate/src/redux/slice/messages";
import { clearMessage } from "../../redux/slice/messages";

const Modal = ({ setIsSuccess, setPending, setFormData, open, onClose, data, }) => {

  const [success, setSuccess] = React.useState(false)
  const API_URL = 'http://localhost:4000/api/'
  const dispatch = useDispatch()
  const {message} = useSelector((state) => state.messages)

  if (!open) return null;

  const initialValue = {
    name: data.name ? data.name : '',
    email: data.email ? data.email : '',
    phone: data.phone ? data.phone : '',
    payableAmunt: data.paid ? data.paid : '',
  }
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    // phone: Yup.string().matches(/(^(\+8801|8801|01|008801))[1-9]{1}(\d){8}$/, {
    //   message: "Invalid Bangladeshi number",
    //   excludeEmptyString: false,
    // }).required('Phone number is required'),
    payableAmunt: Yup.number().required("Amount is required"),
  });

  const addBill = async (formValue) => {
    setPending(true)
    setSuccess(false)
    setFormData(formValue)

    try {

      if (data && data._id) {
        console.log('edit')
        const res = await axios.put(API_URL + `update-billing/${data._id}`, formValue)
        setIsSuccess(true)
        setPending(false)
        setFormData(res.data)
      } else {
        console.log('insert')
        const res = await axios.post('http://localhost:4000/api/add-billing', {
          name, email, phone
        })
        setIsSuccess(true)
        setPending(false)
        setFormData(res.data)
      }

    } catch (e) {
      setSuccess(false)
      setTimeout(() => {
        setPending(false)
      }, 1000);
      const message =
        (e.response &&
          e.response.data &&
          e.response.data.message) ||
        e.message ||
        e.toString();
      dispatch(setMessage(message))
      setTimeout(() => {
        dispatch(clearMessage())
      }, 1000);
      console.log(e)
    }
  }
  return (
    <div onClick={onClose} className="overlay">
      <div className="modalContainer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-body">
          <div className="row d-flex align-items-center add-bills justify-content-between">
            <div className="col-md-6">
              <div class="text-bg-light p-3"><h3>PAY BILL</h3></div>
              {message && (
                    <div className="form-group">
                        <div
                            className={
                                success ? "alert alert-success" : "alert alert-danger"
                            }
                            role="alert"
                        >
                            {message}
                        </div>
                    </div>
                )}
              <Formik
                initialValues={initialValue}
                onSubmit={addBill}
                validationSchema={validationSchema}
              >
                <Form>
                  <div className="col">
                    <div class="form-floating mb-2">
                      <Field type="text" class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name='name'
                      />
                      <label for="floatingInput">Full Name</label>
                    </div>
                    <ErrorMessage
                      name="name"
                      component="span"
                      className="alert text-danger wrap-msg"
                    />
                  </div>
                  <div className="col">
                    <div class="form-floating mb-2">
                      <Field type="email" class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name='email'
                      />
                      <label for="floatingInput">Email</label>
                    </div>
                    <ErrorMessage
                      name="email"
                      component="span"
                      className="alert text-danger wrap-msg"
                    />
                  </div>
                  <div className="col">
                    <div class="form-floating mb-2">
                      <Field type="number" class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name='phone'
                      />
                      <label for="floatingInput">Phone number</label>
                    </div>
                    <ErrorMessage
                      name="phone"
                      component="span"
                      className="alert text-danger wrap-msg"
                    />
                  </div>
                  <div className="col">
                    <div class="form-floating mb-2">
                      <Field type="number" class="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        name='payableAmunt'
                      />
                      <label for="floatingInput">Payable Amount</label>
                    </div>
                    <ErrorMessage
                      name="payableAmunt"
                      component="span"
                      className="alert text-danger wrap-msg"
                    />
                  </div>
                  <button class="w-100 btn btn-lg btn-dark" type="submit">Pay</button>
                </Form>
              </Formik>
            </div>
            <div className="col-md-6 form-flat">
              <div className="form-flat">
                <img src={img} class="img-fluid" alt="flate" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
