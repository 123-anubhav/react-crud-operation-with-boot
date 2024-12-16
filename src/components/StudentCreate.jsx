import React, { Fragment, useState } from "react";
import './StudentCreate.css';
import Axios from "axios";
import loadGif from '../assets/page-loading.gif';

let StudentCreate = () => {

    let [state, setState] = useState({
        student: {
            id: '',
            name: '',
            emailid: '',
            mobilenumber: ''
        },
        isLoading: false,
        responseData: ''
    });

    let readValue = (event) => {
        let { name, value } = event.target;
        setState({
            student: {
                ...state.student,
                [name]: value
            }
        });
    };

    let { name, emailid, mobilenumber } = state.student;

    let baseUrl = 'http://localhost:8080';

    let createUser = (event) => {
        event.preventDefault(); // for stopping page refresh
        console.log("inserted data is :: " + state.student.emailid);

        setState(prevState => ({
            ...prevState,
            isLoading: true // Start loading
        }));

        // Simulate a delay of 2 seconds before making the actual backend call 
        // to check my gif is working or not
        setTimeout(() => {
            Axios.post(baseUrl + '/create-Student', state.student)
                .then(response => {
                    setState({
                        student: { ...state.student },
                        responseData: response.data, // Store response data
                        isLoading: false // Stop loading
                    });
                })
                .catch(err => {
                    console.error(err);
                    setState(prevState => ({
                        ...prevState,
                        isLoading: false // Stop loading in case of error
                    }));
                });
        }, 2000); // Delay of 2 seconds

        /* Axios.post(baseUrl + '/create-Student', state.student)
            .then(response => {
                console.log(response);
                setState({
                    student: { ...state.student },
                    responseData: response.data,
                    isLoading: false
                })
            })
            .catch(err => {
                console.error(err);
                setState(prevState => ({
                    ...prevState,
                    isLoading: false // Stop loading in case of error
                }));
            }); */
    };

    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",  // Centers the content horizontally
            alignItems: "center",      // Centers the content vertically
            height: "100vh",           // Full viewport height
            textAlign: "center"        // Centers the text inside the div
        }
    };

    return (
        <Fragment>
            <div className="container text-center h5 mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header  bg-secondary text-white">
                                CREATE STUDENT RECORD
                            </div>
                            {
                                state.isLoading ?
                                    (
                                        // Show loading spinner
                                        <div style={styles.container}>
                                            <img src={loadGif} alt="Loading..." height="50px" width="50px" />
                                        </div>
                                    )
                                    : (
                                        // Display form after loading finishes
                                        <div className="card-body bg-light">
                                            <span className="bg-dark text-white text-center">{state.responseData}</span>
                                            <br />
                                            <form onSubmit={createUser} className="form-container">
                                                <h2 className="form-heading">User Information</h2>
                                                <div className="form-group">
                                                    <label htmlFor="name" className="form-label">Enter Name</label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        className="form-input"
                                                        placeholder="John Doe"
                                                        onChange={readValue}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="emailid" className="form-label">Enter Email-ID</label>
                                                    <input
                                                        type="email"
                                                        name="emailid"
                                                        id="emailid"
                                                        className="form-input"
                                                        placeholder="example@email.com"
                                                        onChange={readValue}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="mobilenumber" className="form-label">Enter Mobile Number</label>
                                                    <input
                                                        type="tel"
                                                        name="mobilenumber"
                                                        id="mobilenumber"
                                                        className="form-input"
                                                        placeholder="+1234567890"
                                                        onChange={readValue}
                                                    />
                                                </div>
                                                <div className="form-group form-button">
                                                    <button type="submit" className="btn-submit">Submit</button>
                                                </div>
                                            </form>
                                        </div>
                                    )


                            }
                        </div>
                    </div>
                    <div className="col-md-6 bg-dark text-white text-center" style={{ height: "80px" }}>
                        <span className="bg-secondary text-light">
                            CHECKING YOUR INSERTION
                        </span>
                        <pre>{JSON.stringify(state.student)}</pre>
                    </div>

                </div>
            </div>

        </Fragment>
    );

}
export default StudentCreate;