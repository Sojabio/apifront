import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";


function NewPassword() {
  const navigate = useNavigate();
  const token = useParams().token;
  const [password, setPassword] = useState("");
  // const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const setNewpassword = e => {
    e.preventDefault();

    // if (password !== passwordConfirmation) {
    //   setErrorMessage("Password and confirmation do not match.");
    //   return;
    // }

    const data = {
      user: {
        reset_password_token: token,
        password: password,
        password_confirmation: password,
      },
    };
    fetch("https://testapiback.fly.dev/users/password", {
      method: "patch",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(() => navigate("/modifysuccess"))
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Modify your Password</h1>
      <form onSubmit={setNewpassword}>
        <div>
          <input
            type="text"
            placeholder="New Password..."
            onChange={e => setPassword(e.target.value)}
          ></input>
        </div>
        {/* <div>
          <input
            type="text"
            placeholder="confirmation"
            onChange={e => setPasswordConfirmation(e.target.value)}
          ></input>
        </div> */}
        <button type="submit" className="btn btn-primary">
          Modify password
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default  NewPassword;
