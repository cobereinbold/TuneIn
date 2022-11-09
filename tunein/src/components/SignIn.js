import React from "react";
import "../css/SignIn.css";

class SignIn extends React.Component {
  state = { email: "", password: "" };

  handleSignIn = (e) => {
    e.preventDefault();
    console.log(this.state.email);
    console.log(this.state.password);
  };

  render() {
    return (
      <div className="flexContainer">
        <h1>TuneIn</h1>
        <form className="ui form">
          <div className="feild">
            <input
              type="text"
              placeholder="Email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
            />
          </div>
          <div className="feild">
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={(e) => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="feild">
            <button className="ui button" onClick={this.handleSignIn}>
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default SignIn;
