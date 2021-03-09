import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DataPicker from "react-datepicker";
import {
    getCoupons,
    removeCoupon,
    createCoupon,
} from "../../../functions/coupon";
import { DeleteOutlined } from "@ant-design/icons";
import "react-datepicker/dist/react-datepicker.css";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCouponPage = () => {
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [discount, setDiscount] = useState("");
    const [coupons, setCoupons] = useState([])
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        setLoading(true)
        getCoupons()
            .then(res => {
                setCoupons(res.data)
                setLoading(false)
            })
            .catch(err => {
                console.log('coupons', err)
                setLoading(false)
            })
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        console.table(name, expiry, discount);
        createCoupon({ name, expiry, discount }, user.token)
            .then((res) => {
                setName("");
                setDiscount("");
                setExpiry("");
                getCoupons()
                    .then(res => {
                        setCoupons(res.data)
                        setLoading(false)
                    })
                    .catch(err => {
                        console.log('coupons', err)
                        setLoading(false)
                    })
                   
                toast.success(`"${res.data.name}" is created`);
            })
            .catch((err) => console.log("created coupon err", err));
    };

    const handleRemove = (id) => {
        if (window.confirm('Delete?')) {
            setLoading(true)
            removeCoupon(id, user.token)
                .then(res => {
                    toast.error(`${res.data.name} was deleted!`)
                    getCoupons()
                        .then(res => {
                            
                            setCoupons(res.data)
                            setLoading(false)
                           
                        })
                        .catch(err => {
                            console.log('coupons', err)
                            setLoading(false)
                        })
                })
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    <h4>Coupon</h4>
                    <form onSubmit={handleSubmit}>
                        <div slassName="form-group">
                            <label className="text-muted">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <br />
                        <div slassName="form-group">
                            <label className="text-muted">Discount %</label>
                            <input
                                type="text"
                                className="form-control"
                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                required
                            />
                        </div>
                        <br />
                        <div slassName="form-group">
                            <label className="text-muted">Expiry</label>
                            <br />
                            <DataPicker
                                className="form-control"
                                selected={new Date()}
                                value={expiry}
                                onChange={(date) => setExpiry(date)}
                                required
                            />
                        </div>
                        <br />
                        <button className="btn btn-outline-primary">Save</button>
                    </form>
                    <br />
                    {coupons.length ? <h4>Coupons count: {coupons.length}</h4> : null}
                    <table className="table table-bordered">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Expiry</th>
                                <th scope="col">Discount</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map(c => {
                                return (
                                    <tr key={c._id}>
                                        <td>{c.name}</td>
                                        <td>{new Date(c.expiry).toLocaleDateString()}</td>
                                        <td>{c.discount}</td>
                                        <td><DeleteOutlined onClick={() => handleRemove(c._id)} className="text-danger pointer" /></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CreateCouponPage;
