import React from "react";

//Bootstrap components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SignIn.css";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    showModal: false,
    newEmail: "",
    newUsername: "",
    newFirstName: "",
    newLastName: "",
    newPassword: "",
  };

  handleSignIn = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/user/signInUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("Signed in!");
        } else {
          console.log("Sign in failed.");
        }
      })
      .catch((err) => console.log(err));
  };

  signUpUser = (e) => {
    if (
      this.state.newEmail.length === 0 ||
      this.state.newUsername.length === 0 ||
      this.state.newFirstName.length === 0 ||
      this.state.newLastName.length === 0 ||
      this.state.newPassword.length === 0
    ) {
      return;
    }

    fetch(`http://localhost:5000/user/createUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.newUsername,
        password: this.state.newPassword,
        email: this.state.newEmail,
        firstName: this.state.newFirstName,
        lastName: this.state.newLastName,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          console.log("User created successfully!");
          this.manageModal(false);
        } else {
          console.log("User could not be created");
        }
      })
      .catch((err) => console.log(err));
  };

  manageModal = (show) => {
    this.setState({ showModal: show });
  };

  render() {
    return (
      <div className='flexContainer'>
        {/* <img src={require("../images/tuneIn-logo.png")} alt="Tune in logo" /> */}
        <form className='ui form'>
          <div className='flexContainer'>
            <div className='feild'>
              <input
                type='text'
                placeholder='Username'
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className='feild'>
              <input
                type='password'
                placeholder='Password'
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <div className='feild'>
              <Button
                className='tuneInColor'
                variant='secondary'
                onClick={this.handleSignIn}
              >
                Sign In
              </Button>
            </div>
          </div>
        </form>
        <br />
        <Button
          className='tuneInColor'
          variant='secondary'
          onClick={() => this.manageModal(true)}
        >
          Sign Up
        </Button>

        <Modal
          show={this.state.showModal}
          onHide={() => this.manageModal(false)}
        >
          <Modal.Header className='signUpModal' closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body className='signUpModal'>
            <Form>
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  value={this.state.newEmail}
                  onChange={(e) => this.setState({ newEmail: e.target.value })}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type='text'
                  value={this.state.newUsername}
                  onChange={(e) =>
                    this.setState({ newUsername: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicFirstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type='text'
                  value={this.state.newFirstName}
                  onChange={(e) =>
                    this.setState({ newFirstName: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicLastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type='text'
                  value={this.state.newLastName}
                  onChange={(e) =>
                    this.setState({ newLastName: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='text'
                  value={this.state.newPassword}
                  onChange={(e) =>
                    this.setState({ newPassword: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer className='signUpModal'>
            <Button
              className='tuneInColor'
              variant='secondary'
              onClick={() => this.manageModal(false)}
            >
              Close
            </Button>
            <Button
              className='tuneInColor'
              variant='secondary'
              onClick={this.signUpUser}
            >
              Sign Up
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default SignIn;
