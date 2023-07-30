import {Link} from "react-router-dom";
import '../css/Auth.css';
import {useState} from "react";
import axios from "axios";

export default function Register(){
    const [name,setName] = useState("");
    const [password,setPassword] = useState("");

    const handleSubmit = async (e)=>{
        e.preventDefault();

        await axios.post("/api/auth/registration",{name,password})
            .then(response => alert(response.data.message))
            .catch(err =>alert(err));
    }
    return(
        <div className="container">
            <h1 className="container-title">BLUE Bank</h1>
            <div className="container-form">
                <form className="form-style" onSubmit={handleSubmit}>
                    <h2 className="form-title">Register</h2>
                    <div>
                        <input placeholder="Username" onChange={e => setName(e.target.value)} value={name} className="form-input" type="name" name="name"/>
                    </div>
                    <div>
                        <input placeholder="Password" onChange={e=>setPassword(e.target.value)} value={password} className="form-input" type="password" name="password"/>
                    </div>
                    <button className="form-btn" type="submit">Register</button>
                    <Link className="form-link" to="/login">Sign In</Link>
                </form>
            </div>
        </div>
    );
}