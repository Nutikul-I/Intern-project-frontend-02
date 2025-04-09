import React, { useState } from "react";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import Modal from "react-modal";
import "../assets/css/employee.css";
import { Button } from 'react-bootstrap';
import { Checkbox } from "@mui/material";

Modal.setAppElement("#root");

const EmployeeComponent = () => {
    const [employees, setEmployees] = useState([
        {
            id: "0000001",
            name: "นายทดสอบ นามสกุลสมมติ",
            position: "ตำแหน่ง",
            email: "email@gmail.com",
        },
        {
            id: "0000002",
            name: "นายทดสอบ นามสกุลสมมติ",
            position: "ตำแหน่ง",
            email: "email@gmail.com",
        },
        {
            id: "0000003",
            name: "นายทดสอบ นามสกุลสมมติ",
            position: "ตำแหน่ง",
            email: "email@gmail.com",
        },
    ]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [newEmployee, setNewEmployee] = useState({
        id: "",
        name: "",
        position: "",
        email: "",
    });

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleChange = (e) => {
        setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
    };

    const addEmployee = () => {
        setEmployees([...employees, { ...newEmployee, id: Date.now().toString() }]);
        setNewEmployee({ id: "", name: "", position: "", email: "" });
        closeModal();
    };

    const deleteEmployee = (id) => {
        setEmployees(employees.filter((emp) => emp.id !== id));
    };

    return (
        <div className="container-fluid vh-100 d-flex flex-column bg-light">
            <div className="row flex-grow-1">
                {/* Main Content */}
                <div className="col-md-12">
                    <div className="mb-3 bg-white rounded p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold">ข้อมูลพนักงาน</h5>
                            <Button className="btn btn-primary" onClick={openModal}>
                                <FaUserPlus className="me-2" /> เพิ่มข้อมูล
                            </Button>
                        </div>

                        <div className="table-responsive">
                            <table className="table table-borderless align-middle">
                                <thead className="border-bottom">
                                    <tr>
                                        <th style={{ width: "10%" }}>รหัส</th>
                                        <th style={{ width: "30%" }}>ชื่อ - นามสกุล</th>
                                        <th style={{ width: "25%" }}>ตำแหน่ง</th>
                                        <th style={{ width: "25%" }}>อีเมล</th>
                                        <th style={{ width: "10%" }}>จัดการ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.position}</td>
                                            <td>{employee.email}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <button className="btn btn-warning me-2 flex-fill d-flex align-items-center justify-content-center p-0"
                                                        style={{
                                                            height: "40px",
                                                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                                            transition: "all 0.3s ease",
                                                        }}>
                                                        <FaEdit style={{ width: "70%", height: "70%", color: "#fff" }} />
                                                    </button>
                                                    <button className="btn btn-danger flex-fill d-flex align-items-center justify-content-center p-0"
                                                        style={{
                                                            height: "40px",
                                                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                                            transition: "all 0.3s ease",
                                                        }}
                                                        onClick={() => deleteEmployee(employee.id)}>
                                                        <FaTrash style={{ width: "70%", height: "70%", color: "#fff" }} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="เพิ่มพนักงาน"
            >
                <h2 className="form-title">เพิ่มพนักงาน</h2>

                <div className="form-grid">
                    {/* คอลัมน์ที่ 1 */}
                    <div className="column">
                        <h3 className="form-subtitle">ข้อมูลพนักงาน</h3>
                        {/* รูปภาพ */}
                        <div className="profile-pic">
                            <img src="https://via.placeholder.com/120" alt="Profile" />
                        </div>

                        {/* ฟอร์มข้อมูล */}
                        <div className="label-input-container">
                            <label>
                                คำนำหน้า
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="กรอกคำนำหน้า"
                                value={newEmployee.title}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>ชื่อ</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="กรอกชื่อ"
                                value={newEmployee.firstName}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>นามสกุล</label>
                            <input
                                type="text"
                                name="lastname"
                                placeholder="นามสกุล"
                                value={newEmployee.lastname}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="label-input-container">

                            <label>
                                ชื่อเล่น
                            </label>
                            <input
                                type="text"
                                name="nickname"
                                placeholder="กรอกชื่อเล่น"
                                value={newEmployee.nickname}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>
                                ตำแหน่ง
                            </label>
                            <select
                                name="position"
                                value={newEmployee.position}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="">เลือกตำแหน่ง</option>
                                <option value="developer">นักพัฒนา</option>
                                <option value="designer">นักออกแบบ</option>
                                <option value="manager">ผู้จัดการ</option>
                            </select>
                        </div>

                        <div className="label-input-container">
                            <label>สี</label>
                            <select
                                name="color"
                                value={newEmployee.color}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="">เลือกสี</option>
                                <option value="blue">น้ำเงิน</option>
                                <option value="red">แดง</option>
                                <option value="green">เขียว</option>
                            </select>
                        </div>
                        <h3 className="form-subtitle">บัญชีผู้ใช้งาน</h3>
                        <div className="label-input-container">
                            <label>อีเมล์</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="กรอกอีเมล์"
                                value={newEmployee.email}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>รหัสผ่าน</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="กรอกรหัสผ่าน"
                                value={newEmployee.password}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>สภานะ</label>
                            <select
                                name="status"
                                value={newEmployee.status}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="">เลือกสถานะ</option>
                                <option value="active">ทำงาน</option>
                                <option value="inactive">ไม่ทำงาน</option>
                                <option value="leave">ลาพัก</option>
                            </select>
                        </div>
                    </div>





                    {/* คอลัมน์ที่ 2 */}
                    <div className="column">
                        <h3 className="form-subtitle">ข้อมูลเงินเดือน/ค่าจ้าง</h3>
                        <div className="label-input-container">
                            <label>รหัสผ่าน</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="กรอกรหัสผ่าน"
                                value={newEmployee.password}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>เงินเดีอน</label>
                            <input
                                type="text"
                                name="salary"
                                placeholder="กรอกเงินเดือน"
                                value={newEmployee.salary}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>วันที่จ่ายเงินเดือน</label>
                            <input
                                type="date"
                                name="paymentDate"
                                placeholder="กรอกวันที่จ่ายเงินเดือน"
                                value={newEmployee.paymentDate}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>ประกันสังคม</label>
                            <Checkbox
                                name="socialSecurity"
                                checked={newEmployee.socialSecurity}
                                onChange={(e) =>
                                    setNewEmployee({
                                        ...newEmployee,
                                        socialSecurity: e.target.checked,
                                    })
                                }
                            />
                        </div>
                        <div className="label-input-container">
                            <label>เลขประกันสังคม</label>
                            <input
                                type="text"
                                name="socialSecurityNumber"
                                placeholder="กรอกเลขประกันสังคม"
                                value={newEmployee.socialSecurityNumber}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>หัก ณ ที่จ่าย</label>
                            <input
                                type="text"
                                name="taxDeduction"
                                placeholder="กรอกหัก ณ ที่จ่าย"
                                value={newEmployee.taxDeduction}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>ค่านั่ง/ชั่วโมง</label>
                            <input
                                type="text"
                                name="hourlyRate"
                                placeholder="กรอกค่านั่งต่อชั่วโมง"
                                value={newEmployee.hourlyRate}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>ค่าโอที</label>
                            <input
                                type="text"
                                name="overtimeRate"
                                placeholder="จำนวนเงิน/ชั่วโมง"
                                value={newEmployee.overtimeRate}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <h3 className="form-subtitle">ข้อมูลบัญชีธนาคาร</h3>
                        <div className="label-input-container">
                            <label>ช่องทางการชำระ</label>
                            <input
                                type="text"
                                name="paymentMethod"
                                placeholder="กรอกช่องทางการชำระ"
                                value={newEmployee.paymentMethod}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>ประเภทบัญชี</label>
                            <select
                                name="accountType"
                                value={newEmployee.accountType}
                                onChange={handleChange}
                                className="form-control"
                            >
                                <option value="">เลือกประเภทบัญชี</option>
                                <option value="saving">บัญชีออมทรัพย์</option>
                                <option value="current">บัญชีสะสมทรัพย์</option>
                            </select>
                        </div>
                        <div className="label-input-container">
                            <label>ธนาคาร</label>
                            <input
                                type="text"
                                name="bankName"
                                placeholder="กรอกธนาคาร"
                                value={newEmployee.bankName}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>เลขบัญชี</label>
                            <input
                                type="text"
                                name="bankAccountNumber"
                                placeholder="กรอกเลขบัญชี"
                                value={newEmployee.bankAccountNumber}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>สาขาธนาคาร</label>
                            <input
                                type="text"
                                name="bankBranch"
                                placeholder="กรอกสาขาธนาคาร"
                                value={newEmployee.bankBranch}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                    </div>

                    {/* คอลัมน์ที่ 3 */}
                    <div className="column">
                        <h3 className="form-subtitle">จำนวนวันหยุดประจำปี</h3>
                        <div className="label-input-container">
                            <label>ลากิจ</label>
                            <input
                                type="text"
                                name="personalLeave"
                                placeholder="กรอกจำนวนวันลากิจ"
                                value={newEmployee.personalLeave}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>ลาพักร้อน</label>
                            <input
                                type="text"
                                name="vacationLeave"
                                placeholder="กรอกจำนวนวันลาพักร้อน"
                                value={newEmployee.vacationLeave}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <div className="label-input-container">
                            <label>ลาป่วย</label>
                            <input
                                type="text"
                                name="sickLeave"
                                placeholder="กรอกจำนวนวันลาป่วย"
                                value={newEmployee.sickLeave}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                        <h3 className="form-subtitle">สิทธิ์การใช้งาน</h3>




                    </div>
                </div>

                {/* ปุ่ม */}
                <div className="button-group">
                    <button className="btn btn-cancel" onClick={closeModal}>
                        ยกเลิก
                    </button>
                    <button className="btn btn-submit" onClick={addEmployee}>
                        เพิ่ม
                    </button>
                </div>
            </Modal>
        </div>


    );
};

export default EmployeeComponent;
