import React, {Fragment, useState} from "react";

const InputUser = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState(0);

    const onSubmitForm = async e => {
        e.preventDefault();
        try {
            const body = {name, age, email, mobile};
            const response = await fetch("/userpage", {
                method:"POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })

           // window.location = "/";
        } catch (err) {
            console.error(err.message);
        }
    }
    return (
    <Fragment>
        <h1 className="text-center mt-5">Input User</h1>
        <form className="mt-5" onSubmit={onSubmitForm}>
            Name: <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} />
            Age: <input type="number" className="form-control" value={age} onChange={e => setAge(e.target.value)} />
            Email: <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
            Mobile No:<input type="number" className="form-control" value={mobile} onChange={e => setMobile(e.target.value)} /><br></br>
            <button className="btn btn-success">Submit</button>
        </form>
    </Fragment>
    );
}

export default InputUser;