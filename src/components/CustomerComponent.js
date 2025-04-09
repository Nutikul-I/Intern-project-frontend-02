import React, { useState } from "react";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";

const CustomerComponent = () => {
  const [customers, setCustomers] = useState([
    { id: "0000001", name: "นายทดสอบ นามสกุลสมมติ", email: "email@gmail.com" },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleShow = () => setModalIsOpen(true);
  const handleClose = () => setModalIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const addCustomer = () => {
    setCustomers([
      ...customers,
      {
        id: Date.now().toString(),
        name: newCustomer.name,
        email: newCustomer.email,
        phone: newCustomer.phone,
      },
    ]);
    setNewCustomer({ name: "", email: "", phone: "" });
    handleClose();
  };

  const deletecustomer = (id) => {
    setCustomers(customers.filter(customer => customer.id !== id));
  };

  return (
    <div className="container-fluid vh-100 d-flex flex-column bg-light">
      <div className="row flex-grow-1">
        {/* Main Content */}
        <div className="col-md-12">
          <div className="mb-3 bg-white rounded p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="fw-bold">ข้อมูลลูกค้า</h5>
              <Button className="btn btn-primary" onClick={handleShow}>
                <FaUserPlus className="me-2" />
                เพิ่มข้อมูล
              </Button>
            </div>
            {/* Table */}
            <div className="table-responsive">
              <table className="table table-borderless align-middle">
                <thead className="border-bottom">
                  <tr>
                    <th style={{ width: "10%" }}>รหัส</th>
                    <th style={{ width: "40%" }}>ชื่อ - นามสกุล</th>
                    <th style={{ width: "40%" }}>อีเมล</th>
                    <th style={{ width: "10%" }}>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
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
                          onClick={() => deletecustomer(customer.id)}>
                            <FaTrash style={{ width: "70%", height: "70%", color: "#fff" }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>{/* end Table */}
          </div>
        </div>
      </div>

      {/* Bootstrap Modal for Adding Customer */}
      <Modal show={modalIsOpen} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>เพิ่มข้อมูลลูกค้า</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column sm={4}>ชื่อ - นามสกุล</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="กรอกชื่อและนามสกุล"
                  value={newCustomer.name}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column sm={4}>เบอร์โทรศัพท์</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="กรอกเบอร์โทรศัพท์"
                  value={newCustomer.phone}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group className="mb-3" as={Row}>
              <Form.Label column sm={4}>อีเมล</Form.Label>
              <Col sm={8}>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  value={newCustomer.email}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={addCustomer}>
            บันทึก
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CustomerComponent;
