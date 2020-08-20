import React from "react";
import axios from "axios";
import { setToken, getString, getState } from "../../../utils/index";
import Strapi from "strapi-sdk-javascript/build/main";
import { Toast } from "react-bootstrap";

const emailUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:1337";
const url = process.env.REACT_APP_BACKEND_URL + "/auth/local/register";
const strapi = new Strapi(emailUrl);

class Signup extends React.Component {
  state = {
    username: "",
    lastName: "",
    message: "",
    email: "",
    password: "12345678",
    loading: false,
    successmessage: false,
    seconds: 10,
    toastShow: false,
    errorMessage: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const {
      username,
      firstName,
      lastName,
      message,
      email,
      password,
    } = this.state;

    const data = {
      username,
      firstName: username,
      lastName,
      message,
      email,
      password,
    };
    if (this.isFormEmpty(this.state)) {
      console.log("Signup.handleSubmit");
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    })
      .then((resp) =>
        resp
          .json()
          .then(async (res) => {
            this.setState({ loading: false });
            if (res.jwt) {
              setToken(res.jwt);
              this.timer = setInterval(() => {
                if (this.state.seconds === 1) {
                  this.props.history.push("/");
                }
                this.setState({ seconds: --this.state.seconds });
              }, 1000);
              this.setState({ successmessage: true });
            } else {
              this.setState({
                errorMessage: res.data[0].messages[0].message,
                toastShow: true,
              });
            }
            await strapi.request("POST", "/email", {
              data: {
                to: email,
                subject: `Request New User - Modrek ${new Date(Date.now())}`,
                text: "Your reuqest has been processed",
                html: "<bold>Thank for your registration with Us</bold>",
              },
            });
          })
          .catch((err) => {
            this.setState({ loading: false });
            console.log("err", err);
          })
      )
      .catch((err) =>
        err.json().then((error) => {
          this.setState({ loading: false });

          console.log(error);
        })
      );
    // axios.post(url, data).then(response => {
    //   console.log('response', response);
    // }).catch(error => {
    //   console.log('error', error)
    // })

    // try {
    //   this.setState({ loading: true });
    //   const response =  axios({
    //     method: "POST",
    //     url,
    //     data,
    //   });
    //   // await strapi.request('POST', '/email', {
    //   //   data: {
    //   //     to: email,
    //   //     subject: `Request New User - Modrek ${new Date(Date.now())}`,
    //   //     text: "Your reuqest has been processed",
    //   //     html: "<bold>Expect your request to approve 1-2 days</bold>"
    //   //   }
    //   // });
    //   this.setState({ loading: false });
    //   setToken(response.data.jwt);
    //   this.timer = setInterval(() => {
    //     if (this.state.seconds === 1) { this.props.history.push("/") }
    //     this.setState({ seconds: --this.state.seconds })
    //   }, 1000);
    //   // this.redirectUser("/");
    //   this.setState({ successmessage: true, toastShow: true });
    // } catch (err) {
    //   this.setState({ loading: false, toastShow: true });
    // }
  };

  redirectUser = (path) => this.props.history.push(path);

  isFormEmpty({ username, lastName, message, email, password }) {
    return !username || lastName || message || !email || !password;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { siteLanguage = "Arabic" } = getState();

    const { loading } = this.state;
    return (
      <div className="main-content-wrap">
        {!this.state.successmessage ? (
          <section className="max-width-880 mx-auto pt-100 mb-5">
            <div className="container">
              <div className="row">
                <div className="section-heading mb-4">
                  <h3 className="purple tajawal mx-3">
                    {getString("join-as-content-creator")}
                  </h3>
                </div>
              </div>

              <form className="contact-us-form" onSubmit={this.handleSubmit}>
                <div className="row">
                  <div className="col-12">
                    <div
                      className={`form-group tajawal ${
                        siteLanguage === "Arabic" ? "text-right" : ""
                      }`}
                    >
                      <label>{getString("your-email")}</label>
                      <input
                        id="email"
                        name="email"
                        placeholder="email@example.com"
                        onChange={this.handleChange}
                        type="email"
                        cols="25"
                        className="form-control"
                        required="required"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div
                      className={`form-group tajawal ${
                        siteLanguage === "Arabic" ? "text-right" : ""
                      }`}
                    >
                      <label>{getString("first-name")}</label>
                      <input
                        id="username"
                        name="username"
                        placeholder={getString("first-name")}
                        onChange={this.handleChange}
                        type="text"
                        className="form-control"
                        required="required"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div
                      className={`form-group tajawal ${
                        siteLanguage === "Arabic" ? "text-right" : ""
                      }`}
                    >
                      <label>{getString("last-name")}</label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder={getString("last-name")}
                        onChange={this.handleChange}
                        size="40"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div
                      className={`form-group tajawal ${
                        siteLanguage === "Arabic" ? "text-right" : ""
                      }`}
                    >
                      <label>{getString("about-you")}</label>
                      <textarea
                        onChange={this.handleChange}
                        name="message"
                        id="message"
                        className="form-control"
                        rows="4"
                        cols="25"
                        placeholder="Tell us more about yourself"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row mb-5">
                  <div
                    className={`col-sm-12 mt-3 ${
                      siteLanguage === "Arabic" ? "text-right" : ""
                    }`}
                  >
                    <button
                      type="submit"
                      className="btn solid-btn signupBtn mb-5 tajawal"
                      disabled={loading}
                    >
                      {getString("apply")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </section>
        ) : (
          <section
            className="hero-section ptb-100 purple-gradient-img full-screen"
            style={{
              backgroundImage: "url('img/app-hero-bg.jpg')",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center center",
              backgroundSize: "cover",
            }}
          >
            <div className="container">
              <div className="row align-items-center justify-content-center pt-5">
                <div className="col-md-9 col-lg-7">
                  <div className="error-content text-center text-white">
                    <h1 className="score pt-5">Thank You for Your Request</h1>
                    <p className="will-contact">
                      We Will contact you soon to confirm
                    </p>
                    <p className="will-contact">
                      you’ll be directed to home in {this.state.seconds}{" "}
                      secounds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        <Toast
          style={{
            position: "absolute",
            top: 30,
            right: 20,
            zIndex: 3000,
          }}
          onClose={() => this.setState({ toastShow: false })}
          show={this.state.toastShow}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{this.state.errorMessage}</Toast.Body>
        </Toast>
      </div>
    );
  }
}

export default Signup;
