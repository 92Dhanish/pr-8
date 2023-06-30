import React, { useEffect, useState } from "react"
import '../Crud/Crud.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function getItem() {
    let info = JSON.parse(localStorage.getItem("user"));

    if (info != null) {
        return info;
    }
    else {
        return [];
    }
}



function Crud() {

    const [inputValue, setInput] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        cource: ""
    });

    const [data, setData] = useState(getItem());
    const [isUpdate, setIsUpdate] = useState(false);
    const [isIndex, setIsIndex] = useState();




    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setInput({ ...inputValue, [name]: value })
    }

    // getItem();

    const handleSubmit = (e) => {
        e.preventDefault();


        if (isUpdate) {
            let newdata = [...data];
            newdata[isIndex] = inputValue;

            setData(newdata);
            setIsUpdate(false);
            setIsIndex(null);
        }
        else {
            let uid = data.length + 1;

            let newInput = { id: uid, ...inputValue }

            setData([...data, newInput]);

        }

        setInput({
            name: "",
            email: "",
            phone: "",
            password: "",
            cource: ""
        })
    }


    const handleUpdate = (id, index) => {
        let newdata = getItem();


        let newItem = newdata.filter((d) => {
            return d.id == id
        })
        setInput(newItem[0]);
        setIsUpdate(true);
        setIsIndex(index);


    }

    const handledelete = (id) => {
        let newdelete = getItem();
        let newItem = newdelete.filter((d) => {
            return d.id != id
        })

        setData(newItem);

    }





    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(data));
    }, [data])

    return (
        <>

            <body>
                {/* <div className="container"> */}
                <div className="form-main">
                    <div className="main-wrapper">
                        <h2 className="form-head">Registration From</h2>
                        <form className="form-wrapper" onSubmit={handleSubmit}>
                            <div  className="form-card">
                                <input
                                    className="form-input"
                                    type="text"
                                    name="name"
                                    value={inputValue.name}
                                    onChange={handleChange}
                                //   required="required"
                                />
                                {/* <input type="text" value={inputValue.name} onChange={handleChange} name="name"/> */}
                                <label className="form-label" for="full_name"> Name</label>
                            </div>

                            <div className="form-card">
                                <input
                                    className="form-input"
                                    type="email"
                                      name="email"
                                    value={inputValue.email}
                                    onChange={handleChange}


                                //   required="required"
                                />
                                <label className="form-label" for="email">Email</label>
                            </div>

                            <div className="form-card">
                                <input
                                    className="form-input"
                                    type="number"
                                      name="phone"
                                    value={inputValue.phone}
                                    onChange={handleChange}


                                //   required="required"
                                />
                                <label className="form-label" for="phone_number">Phone number</label>
                            </div>
                            <div className="form-card">
                                <input
                                    className="form-input"
                                    type="text"
                                    name="cource"
                                    value={inputValue.cource}
                                    onChange={handleChange}


                                //   required="required"
                                />
                                <label className="form-label" for="email">Course</label>
                            </div>
                            <div className="form-card">
                                <input
                                    className="form-input"
                                    type="password"
                                     name="password"
                                    value={inputValue.password}
                                    onChange={handleChange}


                                //   required="required"
                                />
                                <label className="form-label" for="email">Password</label>
                            </div>

                            <div className="btn-wrap">
                                <button  type="submit" > Submit </button>
                            </div>
                        </form>

                       <div className="table-container">
                       <table className=" table-1" >
                            <thead>

                                <tr>
                                    <td className="p-5">Name</td>
                                    <td className="p-5">Email</td>
                                    <td className="p-5">Phone</td>
                                    <td className="p-5">Password</td>
                                    <td className="p-5">Course</td>
                                    <td className="p-5">Action</td>

                                </tr>
                            </thead>
                            {
                                data.map((d, index) => {
                                    return (
                                        <>
                                            <tbody className="table-container">

                                                <tr>
                                                    <td className="pe-5 ps-5">{d.name}</td>
                                                    <td className="pe-5">{d.email}</td>
                                                    <td className="pe-5 ps-5">{d.phone}</td>
                                                    <td className="pe-5 ps-5">{d.password}</td>
                                                    <td className="pe-5 ps-5">{d.cource}</td>
                                                    <td>
                                                        <button type="button" value="submit" className="btn btn-success" onClick={(e) => handleUpdate(d.id, index)}>Edit</button>
                                                        <button type="button" value="submit" className="btn btn-danger ms-3"  onClick={(e) => handledelete(d.id)}>Delete</button>

                                                    </td>

                                                </tr>
                                            </tbody>

                                        </>
                                    )
                                })
                            }
                        </table>
                       </div>
                    </div>
                </div>
            </body>
        </>

    )
}

export default Crud