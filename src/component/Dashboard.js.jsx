import React, {useCallback, useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../global/AuthContext";

const Dashboard = () => {
    const { token,currentUser } = useContext(AuthContext);
    console.log(token);
    const [file, setFile] = useState(null);

    const handleFileChange = useCallback((e) => {
        setFile(e.target.files[0]);
    }, []);

    const handleFileUpload = useCallback(() => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const headers = {
                Authorization: `Basic ${token}`, // Include the token in the Authorization header
            };

            axios.post("http://localhost:9001/api_fe/post_data", formData, { headers })
                .then((response) => {
                    console.log("CSV Data uploaded successfully:", response.data);
                })
                .catch((error) => {
                    console.error("Error uploading CSV:", error.message);
                });
        }
    }, [file, token]);

    return (
        <div className="SignIn">
            <div className="row justify-content-center">
                <div style={{backgroundColor: "white", color: "black",height:"5rem", alignContent:"center",marginBottom:"3rem",fontSize:"1.2rem"}}>
                    <div style={{"display": "inline-block",float:"right",paddingRight:"4rem"}}><a href={""} className={"text-decoration-none text-black"}>{currentUser}</a></div>
                    <div style={{"display": "inline-block",float:"right",paddingRight:"4rem"}}><a href={""} className={"text-decoration-none text-black"}>Logout</a></div>
                </div>
                <div className="col-md-6">
                <h1 className="text-center">Welcome To Dashboard</h1>

                    <input type="file" accept=".csv" onChange={handleFileChange} className="form-control"/>
                    <button onClick={handleFileUpload} className="btn btn-primary mt-3 w-100">Upload CSV</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
