import React, {Fragment, useState, useEffect} from 'react';
import FacebookServices from '../services/FacebookServices';
import { Redirect } from "react-router-dom";
import {Grid, Paper, Button} from '@material-ui/core';

// Import style sheet
import "./css_files/login.css";

export default function Login(props) {
    const [fbTokenReqCode, setfbTokenReqCode] = useState(null);

  // Get code param from the URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    console.log("code= "+code);
    setfbTokenReqCode(code);
  }, []);

  // Request access token & direct to upload page
  useEffect(() => {
    if (fbTokenReqCode !== null) {
      console.log(fbTokenReqCode);
      FacebookServices.getToken(fbTokenReqCode).then((data) => {
        console.log("Token= "+data.access_token);
        localStorage.setItem("token", data.access_token);
      });
    }
  }, [fbTokenReqCode]);

  const FacebookLoginFunc = (e) => {
    e.preventDefault();
    FacebookServices.getAuth().then((data) => {
      console.log(data.url);
      window.location.href = data.url;
    });
  };

  const paperStyle={padding: 20, height: '40vh', width: 600, margin: '200px auto'}
  const buttonStyle={width: 350, backgroundColor: '#4267B2', color: '#ffffff'}
  const hrStyle={width: 400, height:"0.1vh", color:'#808080', backgroundColor: '#808080'}

  return (
    <>
    {fbTokenReqCode !== null ? <Redirect to="/upload/auth" /> : null}

    <Grid> 
      <Paper elevation={10} style={paperStyle}>
        <div className={"row"}>
          <div className={"column ml-4 mt-1"}>
            <h2>EZY Share</h2>
            <hr style={hrStyle}/>
            <div className={"row ml-1"}>
              <p>EZY Share is a free and easy way to share your data.</p>
            </div>
          </div>
          <div className={"column ml-4"}>
          <img src={"./net.png"} height="130px"  alt="logo" />
          </div>
        </div>
        <Grid align='center'>
          <br/>
          
          <br/><br/>
          <Button type='submit' variant='contained' style={buttonStyle} onClick={FacebookLoginFunc}>
            <i className="fab fa-facebook-f fa-x mr-3"/>
            <span>Sign in with facebook</span>
          </Button>
        </Grid>
        </Paper>
    </Grid>

      {/* <Fragment>
                <div className={"container-fluid"} style={{backgroundColor: '#FDFEFD', height: '640px'}}>
                    <div className={"loginComponentWrapper"}>
                        <Card body outline color="info" className={"overflow-hidden"}>
                            <div className={"bg-info"}>
                                <div className={"text-center mt-4"}>
                                    <img src={"https://www.strunkmedia.com/wp-content/uploads/2018/05/bigstock-Print-163213010.png"} height="40" alt="logo" />
                                    <p className={"text-white-50 mt-3"}>Sign into EaZy uploads online App</p>
                                </div>
                            </div>
                            <CardBody className={"mt-3"} >
                                    <div className={"row"}>
                                        <Button className={"m-3"} outline color="info" style={{width:'25rem'}} onClick={FacebookLoginFunc}>
                                            <i className="fab fa-facebook-f fa-x mr-3"/>
                                            <span>Sign in with facebook</span>
                                        </Button>
                                    </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </Fragment> */}
    </>
  );
}
