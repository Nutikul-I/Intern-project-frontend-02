import React, { useState } from "react";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";

const PositionComponent = () => {
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        salary: "",
        active: false,
    });

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [positions, setPositions] = useState([
        { id: "0000001", position: "ตำแหน่ง", salary: "20,000" },
    ]);

    const deletePosition = (id) => {
        setPositions(positions.filter(position => position.id !== id));
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleToggle = () => {
        setFormData({ ...formData, active: !formData.active });
    };

    const handleSubmit = () => {
        if (!formData.name || !formData.salary) {
            Swal.fire({
                icon: "error",
                title: "เกิดข้อผิดพลาด",
                text: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
                confirmButtonColor: "#d33",
            });
            return;
        }

        const newPosition = {
            id: (positions.length + 1).toString().padStart(7, "0"), // Generate new ID
            position: formData.name,
            salary: formData.salary,
        };

        setPositions([...positions, newPosition]); // Add new position to state

        Swal.fire({
            icon: "success",
            title: "บันทึกข้อมูลสำเร็จ!",
            confirmButtonColor: "#3085d6",
        });

        handleClose();
    };


    return (
        <div className="container-fluid vh-100 d-flex flex-column bg-light">
            <div className="row flex-grow-1">
                {/* Main Content */}
                <div className="col-md-12">
                    <div className="mb-3 bg-white rounded p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold">ตำแหน่ง</h5>
                            <Button className="btn btn-primary" onClick={handleShow}>เพิ่มข้อมูล</Button>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-borderless align-middle">
                                <thead className="border-bottom">
                                    <tr>
                                        <th style={{ width: "10%" }}>รหัส</th>
                                        <th style={{ width: "40%" }}>ชื่อตำแหน่ง</th>
                                        <th style={{ width: "40%" }}>เงินเดือน</th>
                                        <th style={{ width: "10%" }}>จัดการ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {positions.map((position) => (
                                        <tr key={position.id}>
                                            <td>{position.id}</td>
                                            <td>{position.position}</td>
                                            <td>{position.salary}</td>
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
                                                        onClick={() => deletePosition(position.id)}>
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
                    {/* Pagination */}
                    <div className="d-flex justify-content-end mt-3">
                        <nav>
                            <ul className="pagination">
                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">...</a></li>
                                <li className="page-item active"><a className="page-link" href="#">6</a></li>
                                <li className="page-item"><a className="page-link" href="#">7</a></li>
                                <li className="page-item"><a className="page-link" href="#">...</a></li>
                                <li className="page-item"><a className="page-link" href="#">20</a></li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} centered size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>ตำแหน่ง</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row className="mb-3 align-items-center">
                            <Col sm={3} className="text-end">
                                <Form.Label>ชื่อตำแหน่ง</Form.Label>
                            </Col>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    placeholder="placeholder"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3 align-items-center">
                            <Col sm={3} className="text-end">
                                <Form.Label>เงินเดือน</Form.Label>
                            </Col>
                            <Col sm={9}>
                                <Form.Control
                                    type="number"
                                    name="salary"
                                    placeholder="placeholder"
                                    value={formData.salary}
                                    onChange={handleChange}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3 align-items-center">
                            <Col sm={3} className="text-end">
                                <Form.Label>ใช้งาน</Form.Label>
                            </Col>
                            <Col sm={9}>
                                <Form.Check
                                    type="switch"
                                    id="custom-switch"
                                    label=""
                                    checked={formData.active}
                                    onChange={handleToggle}
                                />
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={handleClose}>
                        ยกเลิก
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        บันทึก
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}
export default PositionComponent;