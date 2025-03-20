import React from 'react'
import Header from '../Components/Header'
import ProfileImg from '../assets/images/pro-img.png'

const Employee = () => {
    return (
        <>
            <div className="container-fluid employee-page">
                <Header />
                <div className="px-5">
                    <div className="row">
                        <div className="col-12 px-4">
                            <h1 className="my-4">Employee Management</h1>
                        </div>
                        <div className="col-md-12 mb-4">
                            <div className="card bg-ffffff94 border-0 rounded-5 h-100">
                                <div class="card-header pt-3 d-flex justify-content-between bg-transparent border-bottom-0">
                                    <h4 class="mb-0 fw-bold ">Employee List</h4>
                                    <div className="">
                                        <button type="button" class="btn btn-dark rounded-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <span className="me-2"><i class="fa-solid fa-circle-plus"></i></span>Add Employee
                                        </button>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div className="table-responsive">
                                        <table class="table table-hover mb-0 rounded-4 overflow-hidden">
                                            <thead>
                                                <tr class="table-warning">
                                                    <th scope="col">#</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Job Title</th>
                                                    <th scope="col">Department</th>
                                                    <th scope="col">Site</th>
                                                    <th scope="col">Salary</th>
                                                    <th scope="col">Start Date</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">1</th>
                                                    <td>
                                                        <img src={ProfileImg} alt="" className="tbl-empImg" />
                                                        Mark
                                                    </td>
                                                    <td>Otto</td>
                                                    <td>Otto</td>
                                                    <td>Otto</td>
                                                    <td>Otto</td>
                                                    <td>Otto</td>
                                                    <td>
                                                        <button type="button" class="btn btn-warning text-white rounded-5 me-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                            Edit
                                                            <span className="ms-2"><i class="fa-solid fa-user-pen"></i></span>
                                                        </button>
                                                        <button type="button" class="btn btn-danger rounded-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                            Delete
                                                            <span className="ms-2"><i class="fa-solid fa-trash-can"></i></span>
                                                        </button>
                                                    </td>
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

            {/* Modal Add-Employee */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Edit-Employee */}
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ...
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Employee