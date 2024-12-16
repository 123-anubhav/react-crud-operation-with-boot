import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import './Navbar.css'; // Optional for additional custom styles

let Navbar = () => {
    return (
        <Fragment>
            <nav className="navbar navbar-expand-lg">
                <div className="container">
                    <Link className="navbar-brand fw-bold " to="/">React CRUD OPERATION WITH BOOT Example</Link>
                    <div className="d-flex">
                        <Link className="nav-link " to="/create">create student</Link>&nbsp;&nbsp;&nbsp;
                        {/* <Link className="nav-link " to="/update">update student</Link>&nbsp;&nbsp;&nbsp; */}
                        <Link className="nav-link " to="/get-all">get student record</Link>&nbsp;&nbsp;&nbsp;
                       
                    </div>
                </div>
            </nav>
        </Fragment>
    );
};

export default Navbar;
