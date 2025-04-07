import React from 'react';
import { useState, useEffect } from "react";
import Header from '../Components/Header'
import ProfileImg from '../assets/images/pro-img.png'

const Employee = () => {
  
    return (
        <>
            <div className="container-fluid employee-page">
                <Header />
                <div className="px-lg-5 px-0">
                    <div className="row">
                        <div className="col-12 px-4">
                            <h1 className="my-4">Employee Management</h1>
                        </div>
                        <div className="col-md-12 mb-4">
                            <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                                <div className="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                    <h4 className="mb-0 fw-bold ">Employee List</h4>
                                </div>
                                <div className="card-body">
                                    <div className="table-responsive">
                                        <table className="table table-hover mb-0 rounded-4 overflow-hidden">
                                            <thead>
                                                <tr className="table-warning">
                                                    <th scope="col">#</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Entry Time</th>
                                                    <th scope="col">Exit Time</th>
                                                    <th scope="col">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>20/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">2</th>
                                                    <td>21/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">3</th>
                                                    <td>22/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">4</th>
                                                    <td>23/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">5</th>
                                                    <td>24/03/25</td>
                                                    <td>10:30 AM</td>
                                                    <td>7:15 PM</td>
                                                    <td>Present</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Employee