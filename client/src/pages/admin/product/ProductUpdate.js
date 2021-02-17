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
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

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
    const [values, setValues] = useState(initialState);
    const [subOptions, setSubOptions] = useState([]);
    const [categories, setCategories] = useState([]);
    const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
    const [selectedCategory ,setSelectedCategory]=useState('')
    const { user } = useSelector((state) => ({ ...state }));
    // router
    const { slug } = match.params;

    useEffect(() => {
        loadProduct();
        loadCategories();
    }, []);

    const loadProduct = () => {
        getProduct(slug).then((p) => {
            // console.log('single product',p)
            // 1 load single product
            setValues({ ...values, ...p.data });
            // 2 load single product category subs
            getCategorySubs(p.data.category._id).then((res) => {
                setSubOptions(res.data); //on first load default subs
            });
            // 3 prepare array of sub ids
            let arr = [];
            p.data.subs.map((s) => {
                arr.push(s._id);
            });
            setArrayOfSubIds((prev) => arr);
        });
    };

    const loadCategories = () => {
        getCategories().then((c) => {
            setCategories(c.data);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        console.log("CLICKED CATEGORY", e.target.value);
        setValues({ ...values, subs: []});

        setSelectedCategory(e.target.value)

        getCategorySubs(e.target.value).then((res) => {
            console.log("SUB CATEGORY OPTIONS WHEN CATEGORY CLICK", res.data);
            setSubOptions(res.data);
        });

        console.log("EXISTIN CATEGORY values.category", values.category);

        // if user click back to the original category
        // show its subs categories in default
        if(values.category._id === e.target.value) {
            loadProduct()
        }
        // clear old sub category ids
        setArrayOfSubIds([])
    };

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
                        arrayOfSubIds={arrayOfSubIds}
                        setArrayOfSubIds={setArrayOfSubIds}
                        selectedCategory={selectedCategory}
                    />
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
