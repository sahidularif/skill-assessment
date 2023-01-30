import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Modal from '../modal/Modal';
import GeneratinTable from './generatinTable';
import Search from './search';
import Table from './table';
const Bill = () => {
    const {user} = useSelector((state)=>state.auth)
    const [success, setSuccess] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [formData, setFormData] = React.useState({});
    const [modalData, setModalData] = React.useState({});
    const [resData, setResData] = React.useState({});
    const [pending, setPending] = React.useState(false);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [data, setData] = React.useState([])
	const [page, setPage] = React.useState(1);
	const [search, setSearch] = React.useState("");

    const API_URL = 'http://localhost:5000/api/'
    const url = `${API_URL + "billing-list"}?page=${page}&search=${search}`;

    React.useEffect(() => {
    
        axios.get(API_URL + `billing-list/${user.id}`)
            .then((res) => {
                console.log(res.data)
                // setData(res.data.billings)
            })
            .catch((e) => {
                console.log(e)

            })
    }, [formData, success])

    React.useEffect(() => {
		const getAllBillings = async () => {
			try {
							
				const { data } = await axios.get(url);
                console.log(data)
				setData(data);
			} catch (err) {
				console.log(err);
			}
		};

		getAllBillings();
	}, [formData, success, page, search]);

    // console.log(data)
    const newFormData = () => {
        if (pending && formData) {
            return <GeneratinTable data={formData} />
        }
        else if (!pending && isSuccess && resData) {
            return <GeneratinTable data={formData} />
        }
        else {
            return
        }
    }
    const handleDelete = (id) => {
        setSuccess(false)
        axios.delete(API_URL + `delete-billing/${id}`)
            .then((res) => {
                console.log(res)
                setSuccess(true)
            })
            .catch((e) => {
                setSuccess(false)
                console.log(e)
            })
    }
    const handleUpdate = (id) => {
        setSuccess(false)
        axios.put(API_URL + `update-billing/${id}`)
            .then((res) => {
                console.log(res)
                setSuccess(true)
            })
            .catch((e) => {
                setSuccess(false)
                console.log(e)
            })
    }
    console.log(formData)
    return (
        <div>
            <div className="container text-center shadow">
                <div className="row mt-5 p-3 bg-white dashboard-header">
                    <div className="col-9 col-sm-6">
                        <div class="mb-3 row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Billings</label>
                            <div class="col-sm-10">
                            <Search setSearch={(search) => setSearch(search)} />
                            </div>
                        </div>
                    </div>

                    <div className="col-3 col-sm-6">
                        <div className="p-1">
                            <button
                                className="btn btn-main text-bg-dark"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setOpenModal(true)
                                }}
                            >
                                <b>+</b> Add New Bill
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container billing-table shadow mt-2'>
                <div className='row'>
                    <Table 
                    billings={data.billings ? data.billings : []} 
                    newFormData={newFormData}
                    setModalData={setModalData} 
                    setOpenModal={setOpenModal}
                    handleDelete={handleDelete}
                    />
                    <Modal
                        data={modalData}
                        setResData={setResData}
                        setIsSuccess={setIsSuccess}
                        setPending={setPending}
                        setFormData={setFormData}
                        onClose={() => setOpenModal(false)} open={openModal} />
                </div>
            </div>
        </div>
    );
};

export default Bill;