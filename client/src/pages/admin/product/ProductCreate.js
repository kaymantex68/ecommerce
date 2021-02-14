import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import ProductCreateForm from '../../../components/forms/ProductCreate'


const initialState = {
    title: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    color: "",
    brand: "",
};

const ProductCreate = () => {
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions]=useState([])
    const { user } = useSelector(state => ({ ...state }))
    useEffect(() => {
        loadCategories()
    }, [])

    const loadCategories = () => {
        getCategories().then((c) => {
            setValues({...values, categories: c.data})
        });
        
    };
    // destruction
    const {
        title,
        description,
        price,
        categories,
        category,
        subs,
        shipping,
        quantity,
        images,
        colors,
        brands,
        color,
        brand,
    } = values;

    
    const handleSubmit = (e) => {
        e.preventDefault()
        createProduct(values, user.token)
            .then(res => {
                console.log(res)
                window.alert(`"${res.data.title}" is created`)
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
                // if (err.response.status === 400) toast.error(err.response.data)
                toast.error(err.response.data.err)
            })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        console.log(values)
    }

    const handleCategoryChange = (e)=>{
        e.preventDefault()
        console.log('CLICKED CATEGORY', e.target.value)
        setValues({ ...values, category: e.target.value })
        getCategorySubs(e.target.value )
        .then(res=>{
            console.log('SUB CATEGORY OPTIONS WHEN CATEGORY CLICK', res.data)
            setSubOptions(res.data)
        })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col-md-10">
                    <h4>Product create</h4>
                    <hr />
                    {/* {JSON.stringify(values)} */}
                    <ProductCreateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCreate;