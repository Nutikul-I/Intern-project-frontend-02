import React, { useState } from "react";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import "../assets/css/customers.css";
import SidebarComponent from "../components/Sidebar.js";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Customers = () => {
  console.log("📌 Customers Page Loaded");

  const [customers, setCustomers] = useState([
    { id: "0000001", name: "นายทดสอบ นามสกุลสมมติ", status: "รับเลย" },
    { id: "0000002", name: "นายทดสอบ นามสกุลสมมติ", status: "รับเลย" },
    { id: "0000003", name: "นายทดสอบ นามสกุลสมมติ", status: "รับเลย" },
  ]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    status: "รับเลย"
  });

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  const addCustomer = () => {
    setCustomers([
      ...customers,
      { id: Date.now().toString(), name: `${newCustomer.firstName} ${newCustomer.lastName}`, status: newCustomer.status }
    ]);
    setNewCustomer({ firstName: "", lastName: "", email: "", phone: "", address: "", status: "รับเลย" });
    closeModal();
  };

  return (
    <div className="d-flex">
      <SidebarComponent />
      <div className="content flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>ข้อมูลลูกค้า</h3>
          <button className="btn btn-primary" onClick={openModal}>
            <FaUserPlus className="me-2" /> เพิ่มข้อมูล
          </button>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>รหัส</th>
              <th>ชื่อ - นามสกุล</th>
              <th>รับเลย</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>{customer.status}</td>
                <td>
                  <button className="btn btn-warning me-2">
                    <FaEdit />
                  </button>
                  <button className="btn btn-danger">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-end">
          <span>แสดง 10 จากทั้งหมด 89 รายการ</span>
          <nav>
            <ul className="pagination ms-3">
              <li className="page-item"><a className="page-link" href="#">«</a></li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item active"><a className="page-link" href="#">9</a></li>
              <li className="page-item"><a className="page-link" href="#">10</a></li>
              <li className="page-item"><a className="page-link" href="#">»</a></li>
            </ul>
          </nav>
        </div>

        
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="เพิ่มลูกค้า"
          className="modal-content"
        >
          <h2 className="form-title">เพิ่มข้อมูลลูกค้า</h2>
          <button className="modal-close" onClick={closeModal}>
            &times;
          </button>
          <div className="form-container">
            <div className="form-grid">
              <div className="label-input-container">
                <label>ชื่อ - นามสกุล</label>
                <input
                  type="text"
                  name="name"
                  placeholder="กรอกชื่อและนามสกุล"
                  value={newCustomer.name}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="label-input-container">
                <label>เบอร์โทรศัพท์</label>
                <input
                  type="tel"
                  name="phone"
                  value={newCustomer.phone}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="กรอกเบอร์โทรศัพท์"
                />
              </div>
              <div className="label-input-container">
                <label>อีเมล</label>
                <input
                  type="email"
                  name="email"
                  value={newCustomer.email}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="example@email.com"
                />
              </div>
            </div>
            <div className="button-group">
              <button className="btn btn-cancel" onClick={closeModal}>
                ยกเลิก
              </button>
              <button className="btn btn-submit" onClick={addCustomer}>
                บันทึก
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Customers;
