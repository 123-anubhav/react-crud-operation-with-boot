# react-crud-operation-with-boot-routing-path-variable-queryParam-life-cycle-in-functional-componentact-crud-operation-with-boot
react crud operation with boot

---

# React CRUD Application

This project is a **React-based CRUD (Create, Read, Update, Delete) application** showcasing student management functionalities with seamless routing and a responsive UI.

---

## Features

- **Dynamic Routing**: 
  - Create a student (`/create`)
  - View all students (`/get-all`)
  - Update a student using:
    - Path variables (`/update/:idFromParam`)
    - Query parameters (`/update?queryParamId={id}`)
- **Responsive Navbar**:
  - Navigate between the `Create` and `View All Students` pages.
- **State Management**:
  - Manage student records using React's `useState` and `useEffect` hooks.
- **Error Handling**:
  - Graceful error handling for API operations.
- **Loading Indicator**:
  - GIF loader displayed while fetching data.
- **Backend Integration**:
  - RESTful APIs to perform CRUD operations on student records.
- **Bootstrap Styling**:
  - Enhanced UI design with Bootstrap classes.

---

## Components

### 1. **Navbar**

A navigation bar that links to major routes:

```jsx
<nav className="navbar navbar-expand-lg">
  <Link className="navbar-brand" to="/">React CRUD OPERATION WITH BOOT Example</Link>
  <Link className="nav-link" to="/create">Create Student</Link>
  <Link className="nav-link" to="/get-all">Get Student Record</Link>
</nav>
```

This component provides links to navigate between the **Create Student** and **Get All Students** pages.

---

### 2. **StudentFetch**

Fetches and displays student records in a table with options to edit or delete records.

- **Key Features**:
  - Displays a list of students.
  - Edit functionality using both:
    - Path variables.
    - Query parameters.
  - Delete functionality with a real-time update.

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentFetch = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/students')
      .then((response) => {
        setStudents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching students:', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/students/${id}`)
      .then(() => {
        setStudents(students.filter((student) => student.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting student:', error);
      });
  };

  return (
    <div className="container">
      <h2>Student Records</h2>
      {loading ? (
        <img src="src/assets/page-loading.gif" alt="Loading..." />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.mobileNumber}</td>
                <td>
                  <Link to={`/update/${student.id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentFetch;
```

This component:
- Fetches all student records from the backend.
- Displays the records in a table format.
- Provides buttons to edit or delete a record.

---

### 3. **StudentCreate**

The form to create a new student record.

```jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentCreate = () => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    mobileNumber: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8080/api/students', student)
      .then(() => {
        alert('Student created successfully');
        navigate('/get-all');
      })
      .catch((error) => {
        console.error('Error creating student:', error);
        alert('Failed to create student');
      });
  };

  return (
    <div className="container">
      <h2>Create Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={student.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={student.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            className="form-control"
            id="mobileNumber"
            name="mobileNumber"
            value={student.mobileNumber}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Student
        </button>
      </form>
    </div>
  );
};

export default StudentCreate;
```

This component allows the user to:
- Create a new student record by filling out a form.
- Submit the form, which sends a `POST` request to the backend.

---

### 4. **StudentUpdateQueryParam**

This component handles the updating of student records using **query parameters**.

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const StudentUpdateQueryParam = () => {
  const [student, setStudent] = useState({
    id: '',
    name: '',
    email: '',
    mobileNumber: ''
  });

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get('queryParamId');

  useEffect(() => {
    if (studentId) {
      axios
        .get(`http://localhost:8080/api/students/${studentId}`)
        .then((response) => {
          setStudent(response.data);
        })
        .catch((error) => {
          console.error('Error fetching student:', error);
        });
    }
  }, [studentId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/students/${student.id}`, student)
      .then(() => {
        alert('Student updated successfully');
        navigate('/get-all');
      })
      .catch((error) => {
        console.error('Error updating student:', error);
        alert('Failed to update student');
      });
  };

  return (
    <div className="container">
      <h2>Update Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={student.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={student.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            className="form-control"
            id="mobileNumber"
            name="mobileNumber"
            value={student.mobileNumber}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Student
        </button>
      </form>
    </div>
  );
};

export default StudentUpdateQueryParam;
```

This component:
- Fetches student data using the **query parameter** (`?queryParamId={id}`).
- Displays the current student details in a form.
- Allows the user to update the student and submit the changes to the backend.

---

## Technology Stack

### **Frontend**
- **React**: React Router DOM for navigation and React hooks (`useState`, `useEffect`, `useNavigate`).
- **Axios**: For handling HTTP requests and interacting with the backend API.
- **Bootstrap**: For responsive UI design and styling.

### **Backend**
- **Node.js** or **Spring Boot** (Assumed as the backend server for CRUD operations).

---

## Installation & Setup

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd react-crud-app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Application**:
   ```bash
   npm start
   ```

4. **Backend Server**:
   Ensure the backend server is running and configured at `http://localhost:8080`.



---

## Conclusion

This React-based CRUD application demonstrates how to manage student records efficiently using frontend React hooks and backend integration for CRUD operations. The code includes basic error handling, data fetching, and user-friendly navigation.


