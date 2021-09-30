const express = require("express");
const router = express.Router();

// Import Controller
const GoogleDriveOauthCtrl = require("../controller/googleDrive.controller");

router.route("/getAuthURL")
    .get(GoogleDriveOauthCtrl.getAuthURL)

router.route("/getToken")
    .post(GoogleDriveOauthCtrl.getToken)

router.route("/uploadFile")
    .post(GoogleDriveOauthCtrl.uploadFile)

module.exports = {
    router
}