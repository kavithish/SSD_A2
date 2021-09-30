import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/Login";
import Googleauth from "./components/GoogleAuth";
import Uploadpage from "./components/UploadPage";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/upload/auth" component={Googleauth} />
      <Route exact path="/upload" component={Uploadpage} />
      <Route path="/api/drive/auth/oauthcallback" component={Googleauth} />
    </Router>
  );
}

export default App;
