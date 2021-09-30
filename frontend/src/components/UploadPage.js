import React, { useState } from "react";
import GoogleServices from "../services/GoogleServices";
import {Grid, Paper, Button} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Uploadpage(props) {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("token", localStorage.getItem("token"));

    try {
      GoogleServices.uploadToDrive(formData).then((data) => {
        toast.success("Successfully uploaded!", {
          position: "top-center"
        });
        console.log("Success!");
        const formData = new FormData();
        setFile("");
        setFilename("Choose File");
      });
    } catch (e) {
      alert("Upload failed!");
      console.log(e);
    }
  };

  const paperStyle={padding: 40, height: '70vh', width: 400, margin: '110px auto'}

  return (
    <>
    <Grid> 
      <Paper elevation={10} style={paperStyle}>
        <div className={"row mt-3"}>
          <div className={"col-md-12 text-center"}>
            <img src={"./gd.png"} height="200px"  alt="logo" />    
          </div>
        </div>
        <div className={"row mt-5"}>
          
        </div>

        <form onSubmit={onSubmit}>
          <div className="custom-file mt-4">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={onChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {filename}
            </label>
          </div>
          <input
            type="submit"
            value="Upload"
            className="btn btn-danger btn-block mt-4"
          />
        </form>
      </Paper>
    </Grid>
    <ToastContainer />
    </>
  );
}
