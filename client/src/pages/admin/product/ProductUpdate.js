import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";

import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";
import FileUpload from '../../../components/forms/FileUpload'
import { LoadingOutlined } from '@ant-design/icons'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'


const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "Asus"],
    color: "",
    brand: "",
};

const ProductUpdate = ({ match }) => {
    // state
    const [values, setValues] = useState(initialState)
    const [subOptions, setSubOptions] = useState([])
    const [categories, setCategories]=useState([])
    const { user } = useSelector(state => ({ ...state }))
    // router
    const { slug } = match.params

    useEffect(() => {
        loadProduct()
        loadCategories()
    }, [])

    const loadProduct = () => {
        getProduct(slug)
            .then(p => {
                // console.log('single product',p)
                setValues({...values, ...p.data})
            })
    }

    const loadCategories = () => {
        getCategories().then((c) => {
            setCategories(c.data )
        })
    };


    const handleSubmit = (e) => {
        e.preventDefault()

    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }


    const handleCategoryChange = (e) => {
        e.preventDefault()
        console.log('CLICKED CATEGORY', e.target.value)
        setValues({ ...values, subs: [], category: e.target.value })
        getCategorySubs(e.target.value)
            .then(res => {
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
                    <h4>Product Update</h4>
                    {JSON.stringify(values)}
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        values={values}
                        setValues={setValues}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                    />
                    <hr />

                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
