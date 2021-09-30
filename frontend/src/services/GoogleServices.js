export default {
  getAuth: () => {
    return fetch("http://localhost:8000/api/googleDrive/getAuthURL").then(
      (response) => {
        //console.log(response.json());
        if (response.status != 401) {
          return response.json().then((data) => data);
        } else {
          return { message: { msgBody: "Unauthorized" }, msgError: true };
        }
      }
    );
  },

  getToken: (reqCode) => {
    return fetch("http://localhost:8000/api/googleDrive/getToken", {
      method: "post",
      body: JSON.stringify({ code: reqCode }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.status != 401) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "Unauthorized" }, msgError: true };
      }
    });
  },

  uploadToDrive: async (formData) => {
    let request = await fetch(
      "http://localhost:8000/api/googleDrive/uploadFile",
      {
        method: "post",
        body: formData,
      }
    ).then((response) => {
      if (response.status == 200) {
        return response.json().then((data) => data);
      } else {
        return { message: { msgBody: "Error" }, msgError: true };
      }
    });
    // const response = await request.json();
    // console.log(response);
  },
};
