import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams,useSearchParams } from "react-router-dom";
import './StudentCreate.css';
import { useNavigate } from "react-router-dom";

let StudentUpdateQueryParam = () => {

    const [isLoading, setIsLoading] = useState(true);  // Track the loading state

    const [searchParams] = useSearchParams();
    const queryParamId=searchParams.get('queryParamId');

    const navigate = useNavigate(); // Declare useNavigate inside the component

    let [state, setState] = useState({
        student: {
            id: '',
            name: '',
            emailid: '',
            mobilenumber: ''
        },
        responseOfBackend: ''
    });

    let updateStudent = (event) => {
        event.preventDefault(); // for stopping page refresh
        console.log("inserted data is :: " + state.student.emailid);
        Axios.put(baseUrl + '/update-Student', state.student)
            .then(response => {
                console.log(response);
                setState(prevState => ({
                    ...prevState,
                    responseOfBackend: response.data
                }));
            })
            .catch(err => {
                console.error(err);
            })
    };

    let baseUrl = 'http://localhost:8080';

    let readValue = (event) => {
        let { name, value } = event.target;
        setState({
            student: {
                ...state.student,
                [name]: value
            }
        });
    };

    useEffect(() => {
        
        console.log(`queryParamId =>  ${queryParamId}`);
        console.log("this is life cycle method in react using functional component");
        Axios.get(`${baseUrl}/get-Student-by-id?queryParamId=${queryParamId}`, state.student)
            .then(response => {
                console.log(response);
                setState({
                    student: response.data
                }); // Set the student object
                setIsLoading(false);  // Stop the loading GIF after data is fetched
            })
            .catch(err => {
                console.error(err);
                setIsLoading(false);  // Stop the loading GIF even if there is an error
            });
    }, []);

    let { id, name, emailid, mobilenumber } = state.student;

    return (
        <Fragment>
            <div className="container text-center h5 mt-4">
                <div className="row">
                    <div className="col-md-6 bg-dark text-white text-center" style={{ height: "150px" }}>
                        {/* Display Backend Response */}
                        {state.responseOfBackend && (
                            <div className="container bg-danger mt-2">
                                <p>{state.responseOfBackend}</p>
                            </div>
                        )}
                        <span className="bg-secondary text-light">
                            CHECKING YOUR INSERTION
                        </span>
                        <pre>{JSON.stringify(state.student)}</pre>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header  bg-secondary text-white">
                                Update STUDENT RECORD BY Query-Param
                            </div>
                            <div className="card-body bg-light">
                                FILL FORM
                                <form onSubmit={updateStudent} className="form-container">
                                    <h2 className="form-heading">User Information</h2>
                                    <div className="form-group">
                                        <input type="hidden"
                                            value={id}
                                            name="id"
                                            id="name"
                                            className="form-input"
                                        />
                                        <label htmlFor="name" className="form-label">Enter Name</label>
                                        <input type="text"
                                            name="name"
                                            id="name" className="form-input"
                                            value={name}

                                            onChange={readValue}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="emailid" className="form-label">Enter Email-ID</label>
                                        <input type="email"

                                            onChange={readValue}
                                            name="emailid"
                                            id="emailid"
                                            className="form-input"
                                            value={emailid} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="mobilenumber" className="form-label">Enter Mobile Number</label>
                                        <input type="tel"

                                            onChange={readValue}
                                            name="mobilenumber"
                                            id="mobilenumber"
                                            className="form-input"
                                            value={mobilenumber} />
                                    </div>
                                    <div className="form-group form-button">
                                        <button type="submit" className="btn-submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Fragment>
    );

}
export default StudentUpdateQueryParam;