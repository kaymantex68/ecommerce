import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createSub, getSub, removeSub, getSubs } from "../../../functions/sub";
import { getCategories } from "../../../functions/category";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
    const { user } = useSelector((state) => ({ ...state }));

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('')
    const [subs, setSubs]=useState([])
    // search/filtering
    // step 1
    const [keyword, setKeyword] = useState("");

    useEffect(() => {
        loadCategories();
        loadSubs();
    }, []);

    const loadCategories = () => {
        getCategories().then((cat) => setCategories(cat.data));
    };

    const loadSubs = () => {
        getSubs().then((sub) => setSubs(sub.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        createSub({ name, parent: category }, user.token)
            .then((res) => {
                setLoading(false);
                setName("");
                toast.success(`"${res.data.name}" is create`);
                loadSubs();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error(`${err.message}`);
            });
    };

    const handleRemove = async (slug) => {
        if (window.confirm("Delete?")) {
            setLoading(true);
            removeSub(slug, user.token)
                .then((res) => {
                    setLoading(false);
                    toast.error(`${res.data.name} deleted`);
                    loadSubs();
                })
                .catch((err) => {
                    if (err.response.status === 400) {
                        setLoading(false);
                        toast.error(err.response.data);
                    }
                });
        }
    };

    //step 4
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>
                <div className="col">
                    {loading ? (
                        <h4 className="text-danger">Loading...</h4>
                    ) : (
                            <h4>Create Sub category</h4>
                        )}
                    <div className="form-group">
                        <label>Parrent category</label>
                        <select name="category" className="form-control" onChange={e => setCategory(e.target.value)}>
                            <option>Please select</option>
                            {categories.length > 0 && categories.map((cat) => (
                                <option key={cat._id}  value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <CategoryForm
                        handleSubmit={handleSubmit}
                        name={name}
                        setName={setName}
                    />
                    
                    {/* step 2 and step 3*/}
                    <LocalSearch keyword={keyword} setKeyword={setKeyword} />
                    <hr />
                    {/* step 5 */}

                    {subs.filter(searched(keyword)).map((sub) => (
                        <div className="alert alert-secondary" key={sub._id}>
                            {sub.name}
                            <span
                                onClick={() => handleRemove(sub.slug)}
                                className="btn btn-sm float-right"
                            >
                                <DeleteOutlined className="text-danger" />
                            </span>

                            <Link to={`/admin/sub/${sub.slug}`}>
                                <span className="btn btn-sm float-right">
                                    <EditOutlined className="text-warning" />
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubCreate;
