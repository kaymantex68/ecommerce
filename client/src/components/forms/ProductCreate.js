import React from "react";
import { Select } from 'antd'
const { Option } = Select

const ProductCreateForm = ({ handleSubmit, handleChange, values, handleCategoryChange, subOptions, showSub, setValues }) => {

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


    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="form-group">
                <label>Description</label>
                <input
                    type="text"
                    name="description"
                    className="form-control"
                    value={description}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="form-group">
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    className="form-control"
                    value={price}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="form-group">
                <label>Shipping</label>
                <select
                    name="shipping"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                >
                    <option value="">please select</option>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                </select>
            </div>
            <div className="form-group">
                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => handleChange(e)}
                />
            </div>
            <div className="form-group">
                <label>Color</label>
                <select
                    name="color"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                >
                    <option>select one please</option>
                    {colors.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-group">
                <label>Brands</label>
                <select
                    name="brand"
                    className="form-control"
                    onChange={(e) => handleChange(e)}
                >
                    <option>select one please</option>
                    {brands.map((b) => (
                        <option key={b} value={b}>
                            {b}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Category</label>
                <select
                    name="category"
                    className="form-control"
                    onChange={handleCategoryChange}
                >
                    <option>Please select</option>
                    {categories.length > 0 && categories.map((cat) => (
                        <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {showSub && <div>
                <label>Sub Categories</label>
                <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="select sub"
                    value={subs}
                    onChange={value => setValues({ ...values, subs: value })}
                >
                    {console.log('values', values)}
                    {console.log('subOptions.length', subOptions.length)}
                    {subOptions && subOptions.map(sub => (
                        <Option key={sub._id} value={sub._id}>{sub.name}</Option>
                    ))}
                </Select>
            </div>}
            <br />
            <button className="btn btn-outline-info">Save</button>
        </form>
    )
};

export default ProductCreateForm;
