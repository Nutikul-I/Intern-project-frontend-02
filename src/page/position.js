import React from "react";
import { FaEdit, FaTrash, FaUserPlus } from "react-icons/fa";
import "../assets/css/style.css";
import SidebarComponent from "../components/Sidebar.js";

const Position = () => {
  console.log("Position Page Loaded");
  
  const customers = [
    { id: "0000001", position: "position", salary:"100,000" },
    { id: "0000002", position: "position", salary:"100,000" },
    { id: "0000003", position: "position", salary:"100,000" },
    { id: "0000004", position: "position", salary:"100,000" },
    { id: "0000005", position: "position", salary:"100,000" },
    
  ];
  
  return (
    <div className="d-flex">
      <SidebarComponent />
      <div className="content flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>ตำแหน่ง</h3>
          <button className="btn btn-primary">
            <FaUserPlus className="me-2" /> เพิ่มข้อมูล
          </button>
        </div>
        
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>รหัส</th>
              <th>ตำแหน่ง</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.id}</td>
                <td>{customer.position}</td>
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
      </div>
    </div>
  );
};

export default Position;
