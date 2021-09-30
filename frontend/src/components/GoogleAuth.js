import React, { useEffect, useState } from "react";
import GoogleServices from "../services/GoogleServices";
import FacebookServices from "../services/FacebookServices";
import { Redirect } from "react-router-dom";
import {Button} from 'reactstrap';
import {Grid, Paper} from '@material-ui/core';

// Import style sheet
import "./css_files/homePage.css";

export default function Googleauth() {
  const [tokenReqCode, settokenReqCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    setAccessToken(localStorage.getItem("token"));
  }, []);

  useEffect(() => {
    if (accessToken !== null) {
      console.log(accessToken);
      FacebookServices.getUserDetails(accessToken).then((data) => {
        console.log("UserName= "+data.name);
        localStorage.setItem("name", data.name);
      });
    }
  }, [accessToken]);

  // Get code param from the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log(code);
    settokenReqCode(code);
  }, []);

  // Request access token & direct to upload page
  useEffect(() => {
    if (tokenReqCode !== null) {
      console.log(tokenReqCode);
      GoogleServices.getToken(tokenReqCode).then((data) => {
        console.log(data);
        localStorage.setItem("token", JSON.stringify(data));
      });
    }
  }, [tokenReqCode]);

  // Redirect to Google Auth Page
  const GoogleLoginFunc = (e) => {
    e.preventDefault();
    GoogleServices.getAuth().then((data) => {
      console.log(data.url);
      window.location.href = data.url;
    });
  };

  const paperStyle={padding: 10, height: '60vh', width: 700, margin: '130px auto'}

  return (
    <>
      {tokenReqCode !== null ? <Redirect to="/upload" /> : null}   
          <div className={"container mt-3"} style={{backgroundColor: '#FDFEFD'}}>
                    <Grid> 
                      <Paper elevation={10} style={paperStyle}>
                        <div className={"row"}>
                            <div className={"col-md-12 text-center"}>
                                <h1 className={"mt-3"}>hi {localStorage.getItem("name")}</h1>
                                <div className={"d-flex justify-content-center mt-4"}>
                                    <p style={{ maxWidth: "600px"}}>
                                        <i>
                                          Welcome to Eazy Uploads! We offer free file upload, file sharing and file transfer service without any need for registration. Upload your files and share them with your friends.
                                        </i>
                                    </p>
                                </div>
                                <hr style={{ background: "#333547", width: 600}}/>
                            </div>
                        </div>

                        <br/>
                        <div className={"row mt-4 homePageOptionWrapper"}>
                          <div className={"column mr-5 ml-5"}>
                          <Button color={"success"} style={{width:'10rem' , height:'10rem'}}>
                                <div className="p-3">
                                    <h3><i className="fab fa-facebook"/></h3>
                                    Upload files to <div><b>Facebook</b></div>
                                </div>
                          </Button>
                          </div>
                          <div className={"column mr-5"}>
                          <Button color={"warning"} style={{width:'10rem' , height:'10rem'}}
                                    onClick={GoogleLoginFunc}>
                                <div className="p-3">
                                    <h3><i className="fab fa-google-drive"></i></h3>
                                    Upload files to <div><b>Google Drive</b></div>
                                </div>
                          </Button>
                          </div>
                          <div>
                          <Button color={"primary"} style={{width:'10rem' , height:'10rem'}}>
                                <div className="p-3">
                                    <h3><i className="fab fa-linkedin"></i></h3>
                                    Upload files to <div><b>Linked In</b></div>
                                </div>
                          </Button>
                          </div>
                          </div>
                        </Paper>
                    </Grid>
                </div>
            {/* <button onClick={GoogleLoginFunc}>Login Button</button> */}
    </>
  );
}
