import Axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import loadGif from '../assets/page-loading.gif'; // Assuming the GIF is stored in the 'assets' folder

/*
In React Router v5.2.0, useHistory is used for programmatic navigation, whereas in newer versions (v6+), useNavigate replaces useHistory for navigation.

 In React Router v5.2.0 (Using useHistory):
For React Router v5.2.0, you would use useHistory for navigation, which provides the history object with a method push() to navigate to different routes.

How to use useHistory:
javascript
Copy code
import { useHistory } from 'react-router-dom'; // React Router v5.2.0

let history = useHistory();  // Declare the useHistory hook

// To navigate programmatically:
history.push('/update');  // This navigates to the '/update' page
In React Router v6+ (Using useNavigate):
In React Router version 6 and newer, useHistory is replaced by useNavigate. The useNavigate hook provides a function navigate() to perform navigation.

How to use useNavigate:
javascript
Copy code
import { useNavigate } from 'react-router-dom';  // React Router v6 and above

let navigate = useNavigate();  // Declare the useNavigate hook

// To navigate programmatically:
navigate('/update');  // This navigates to the '/update' page

 */

let StudentFetch = () => {

    const [students, setStudents] = useState([]);  // Directly store the array of students
    const [isLoading, setIsLoading] = useState(true);  // Track the loading state

    const navigate = useNavigate(); // Declare useNavigate inside the component


    let baseUrl = 'http://localhost:8080';

    // ON PAGE LOAD EXECUTE THIS FUNCTIONAL BASED JUST LIKE componentDidMount IN CLASS BASED COMPONENT
    useEffect(() => {

        // HERE EXPLICIT WAIT FOR 5 SECOND TO CHECK MY LOAD.GIF IS WORKING OR NOT
        setTimeout(() => {

            console.log("this is life cycle method in react using functional component");
            Axios.get(`${baseUrl}/get-Student`)
                .then(response => {
                    console.log(response);
                    setStudents(response.data);  // Directly set the array of students
                    setIsLoading(false);  // Stop the loading GIF after data is fetched
                })
                .catch(err => {
                    console.error(err);
                    setIsLoading(false);  // Stop the loading GIF even if there is an error
                })
        }, 5000);

    }, []);  // The empty array ensures this runs only once when the component mounts

    // PERFORM DELETE OPERATION
    let handleDelete = (id) => {
        console.log("you give " + id + " record for delete from db");
        Axios.delete(`${baseUrl}/delete-Student?id=${id}`)
            .then(response => {
                console.log(response);
                setStudents(response.data);  // Directly set the array of students
            })
            .catch(err => {
                console.error(err);
            });
    }

    let handleEdit = (idFromParam) => {
        //F alert(`Handle Edit for student with ID: ${id}`);

        // Trigger navigation to the update page using useNavigate
        // USING PATH VARIABLE
        navigate(`/update/${idFromParam}`)

    }

    let handleEditQueryParam = (queryParamId) => {
        // alert(`Handle Edit for student with ID: ${queryParamId}`);

        // Trigger navigation to the update page using useNavigate
        // USING PATH VARIABLEQueryParam
        navigate(`/update?queryParamId=${queryParamId}`);

    }

    return (
        <Fragment>
            <div className="container mt-4">
                <h2 className="text-center">Student List</h2>

                {/* Show loading GIF if data is still being fetched */}
                {isLoading ? (
                    <div className="text-center">
                        <img src={loadGif} alt="Loading..." height="50px" width="50px" />
                    </div>
                ) : (
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email ID</th>
                                <th scope="col">Mobile Number</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{student.name}</td>
                                    <td>{student.emailid}</td>
                                    <td>{student.mobilenumber}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-md mr-2"
                                            onClick={() => handleEdit(student.id)}
                                        >
                                            Edit with path variable
                                        </button>
                                        <button
                                            className="btn btn-danger btn-md"
                                            onClick={() => handleDelete(student.id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="btn btn-success btn-md mr-2"
                                            onClick={() => handleEditQueryParam(student.id)}
                                        >
                                            Edit with query-param
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Fragment>
    );
}

export default StudentFetch;
