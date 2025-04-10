import React, { useState, useRef } from "react";
import Modal from "react-modal";
import "../assets/css/employee.css";
import { Button } from "react-bootstrap";
import { Checkbox } from "@mui/material";
import { ReactExcel, readFile, generateObjects } from "@ramonak/react-excel";
import Pagination from "@mui/material/Pagination";
import * as XLSX from "xlsx";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { Font } from '@react-pdf/renderer';
import SarabunRegular from '../assets/font/Sarabun-Regular.ttf';
import SarabunBold from '../assets/font/Sarabun-Bold.ttf';
import SarabunLight from '../assets/font/Sarabun-Light.ttf';
import {
    FaEdit,
    FaTrash,
    FaUserPlus,
    FaFileExcel,
    FaSave,
} from "react-icons/fa";

// ย้าย Font.register มาที่นี่ หลัง import ทั้งหมด
Font.register({
    family: 'Sarabun',
    fonts: [
        { src: SarabunRegular, fontWeight: 'normal' },
        { src: SarabunBold, fontWeight: 'bold' },
        { src: SarabunLight, fontWeight: 'light' },
    ],
});

Modal.setAppElement("#root");

const EmployeeComponent = () => {
    const [initialData, setInitialData] = useState(undefined);
    const [currentSheet, setCurrentSheet] = useState({});
    const [currentPage, setCurrentPage] = useState(1); // หน้าปัจจุบัน
    const rowsPerPage = 10; // จำนวนรายการต่อหน้า
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

    const indexOfLastEmployee = currentPage * rowsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;

    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [showExcelImport, setShowExcelImport] = useState(false);
    const fileInputRef = useRef(null);
    const [showExportOptions, setShowExportOptions] = useState(false);

    const [newEmployee, setNewEmployee] = useState({
        id: "",
        title: "",
        firstName: "",
        lastname: "",
        nickname: "",
        position: "",
        color: "",
        email: "",
        password: "",
        status: "",
        salary: "",
        paymentDate: "",
        socialSecurity: false,
        socialSecurityNumber: "",
        taxDeduction: "",
        hourlyRate: "",
        overtimeRate: "",
        paymentMethod: "",
        accountType: "",
        bankName: "",
        bankAccountNumber: "",
        bankBranch: "",
        personalLeave: "",
        vacationLeave: "",
        sickLeave: "",
    });

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewEmployee({
            ...newEmployee,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const addEmployee = () => {
        if (
            !newEmployee.firstName ||
            !newEmployee.lastname ||
            !newEmployee.position ||
            !newEmployee.email
        ) {
            alert("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน");
            return;
        }
        setEmployees([...employees, { ...newEmployee, id: Date.now().toString() }]);
        setNewEmployee({
            id: "",
            title: "",
            firstName: "",
            lastname: "",
            nickname: "",
            position: "",
            color: "",
            email: "",
            password: "",
            status: "",
            salary: "",
            paymentDate: "",
            socialSecurity: false,
            socialSecurityNumber: "",
            taxDeduction: "",
            hourlyRate: "",
            overtimeRate: "",
            paymentMethod: "",
            accountType: "",
            bankName: "",
            bankAccountNumber: "",
            bankBranch: "",
            personalLeave: "",
            vacationLeave: "",
            sickLeave: "",
        });
        closeModal();
    };

    const deleteEmployee = (id) => {
        setEmployees(employees.filter((emp) => emp.id !== id));
    };

    const handleEdit = (employee) => {
        setNewEmployee({ ...employee });
        openModal();
    };

    const handleUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        readFile(file)
            .then((readedData) => {
                setInitialData(readedData);
                setShowExcelImport(true);
            })
            .catch((error) => console.error("Error reading file:", error));
    };

    const formatDate = (dateString) => {
        // ตรวจสอบว่าเป็น serial number หรือไม่
        if (!isNaN(dateString) && Number(dateString) > 0) {
            // แปลง serial number เป็นวันที่
            const excelEpoch = new Date(1899, 11, 30); // Excel เริ่มนับวันที่จาก 30 ธันวาคม 1899
            const days = Number(dateString);
            const date = new Date(excelEpoch.getTime() + days * 24 * 60 * 60 * 1000);
            return date.toISOString().split("T")[0]; // แปลงเป็นรูปแบบ YYYY-MM-DD
        }

        // หากไม่ใช่ serial number ให้ลองแปลงเป็นวันที่ปกติ
        const date = new Date(dateString);
        if (isNaN(date)) return "N/A"; // หากไม่สามารถแปลงได้ ให้คืนค่า N/A
        return date.toISOString().split("T")[0]; // แปลงเป็นรูปแบบ YYYY-MM-DD
    };
    const save = () => {
        const importedData = generateObjects(currentSheet).map((row) => ({
            id: row["รหัสพนักงาน"] || "N/A",
            name: `${row["ชื่อ"] || ""} ${row["นามสกุล"] || ""}`,
            gender: row["เพศ"] || "N/A",
            position: row["ตำแหน่ง"] || "N/A",
            department: row["แผนก"] || "N/A",
            startDate: row["วันที่เริ่มงาน"] ? formatDate(row["วันที่เริ่มงาน"]) : "N/A",
            salary: row["เงินเดือน"] || "N/A",
            email: row["อีเมล"] || "N/A",
        }));

        console.log("Mapped Imported Data:", importedData);

        if (!importedData || importedData.length === 0) {
            alert("No data to save. Please check the imported file.");
            return;
        }

        // รวมข้อมูลใหม่กับข้อมูลเดิม
        setEmployees((prevEmployees) => [...prevEmployees, ...importedData]);

        // ซ่อนการแสดงผล Excel import preview
        setShowExcelImport(false);

        alert("Data imported and saved successfully!");
    };
    const exportData = () => {
        if (employees.length === 0) {
            alert("ไม่มีข้อมูลสำหรับการส่งออก");
            return;
        }

        const data = employees.map((emp) => ({
            "รหัสพนักงาน": emp.id,
            "ชื่อ": emp.name.split(" ")[0], // แยกชื่อจาก full name
            "นามสกุล": emp.name.split(" ")[1] || "", // แยกนามสกุลจาก full name
            "เพศ": emp.gender || "N/A",
            "ตำแหน่ง": emp.position,
            "แผนก": emp.department || "N/A",
            "วันที่เริ่มงาน": emp.startDate || "N/A",
            "เงินเดือน": emp.salary || "N/A",
            "อีเมล": emp.email || "N/A", // เพิ่มฟิลด์อีเมล
        }));

        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

        XLSX.writeFile(workbook, "employees.xlsx");
    };


    const styles = StyleSheet.create({
        page: { padding: 30 },
        header: { fontSize: 16, marginBottom: 10, fontFamily: "Sarabun", textAlign: "center", fontWeight: "bold" },
        date: { fontSize: 12, marginBottom: 20, fontFamily: "Sarabun", textAlign: "right" },
        table: { display: "table", width: "auto", marginBottom: 20 },
        tableRow: { flexDirection: "row" },
        tableCol: { width: "12.5%", border: "1px solid black", padding: 5 },
        tableCell: { fontSize: 10, fontFamily: "Sarabun", textAlign: "center" },
        summary: { fontSize: 12, marginTop: 20, fontFamily: "Sarabun", textAlign: "left" },
        signature: { marginTop: 40, fontSize: 12, fontFamily: "Sarabun", textAlign: "left" },
        footer: { fontSize: 10, marginTop: 20, fontFamily: "Sarabun", textAlign: "center" },
    });
    const EmployeePDF = ({ employees }) => (
        <Document>
            <Page size="A4" style={styles.page}>
            <Text style={styles.header}>ข้อมูลพนักงาน</Text>
            <Text style={styles.date}>วันที่ {new Date().toLocaleDateString("th-TH")}</Text>
                <View style={styles.table}>
                    {/* Header */}
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>ID</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Name</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Gender</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Position</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Department</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Start Date</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Salary</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Email</Text>
                        </View>
                    </View>
                    {/* Data */}
                    {employees.map((emp) => (
                        <View style={styles.tableRow} key={emp.id}>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{emp.id}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{emp.name}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{emp.gender || "N/A"}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{emp.position}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{emp.department || "N/A"}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{emp.startDate || "N/A"}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{emp.salary || "N/A"}</Text>
                            </View>
                            <View style={styles.tableCol}>
                                <Text style={styles.tableCell}>{emp.email}</Text>
                            </View>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
    return (
        <div className="container-fluid vh-100 d-flex flex-column bg-light">
            <div className="row flex-grow-1">
                <div className="col-md-12">
                    <div className="mb-3 bg-white rounded p-3">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold">ข้อมูลพนักงาน</h5>
                            <div className="d-flex gap-2">
                                <Button className="btn btn-primary" onClick={openModal}>
                                    <FaUserPlus className="me-2" /> เพิ่มข้อมูล
                                </Button>

                                {/* ปุ่ม Dropdown สำหรับเลือกการส่งออก */}
                                <div className="btn-group">
                                    <Button
                                        className="btn btn-success dropdown-toggle"
                                        onClick={() => setShowExportOptions(!showExportOptions)}
                                    >
                                        <FaSave className="me-2" /> ส่งออกข้อมูล
                                    </Button>
                                    {showExportOptions && (
                                        <div className="dropdown-menu show">
                                            <button className="dropdown-item" onClick={exportData}>
                                                ส่งออกเป็น Excel
                                            </button>
                                            <PDFDownloadLink
                                                document={<EmployeePDF employees={employees} />}
                                                fileName="employees.pdf"
                                                className="dropdown-item"
                                            >
                                                {({ loading }) => (loading ? "กำลังสร้าง PDF..." : "ส่งออกเป็น PDF")}
                                            </PDFDownloadLink>
                                        </div>
                                    )}
                                </div>

                                <Button
                                    className="btn btn-secondary"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <FaFileExcel className="me-2" /> อัพโหลดไฟล์
                                </Button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: "none" }}
                                    accept=".xlsx, .xls, .csv"
                                    onChange={handleUpload}
                                />
                            </div>
                        </div>

                        {showExcelImport && (
                            <div className="card mb-3">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <h6 className="mb-0">นำเข้าข้อมูลจาก Excel</h6>
                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => setShowExcelImport(false)}
                                    >
                                        ปิด
                                    </Button>
                                </div>
                                <div className="card-body">
                                    <ReactExcel
                                        initialData={initialData}
                                        onSheetUpdate={(currentSheet) => {
                                            console.log("Updated Sheet Data:", currentSheet); // Debug: Log the updated sheet data
                                            setCurrentSheet(currentSheet); // Update the current sheet state
                                        }}
                                        activeSheetClassName="active-sheet"
                                        reactExcelClassName="react-excel"
                                    />
                                    <div className="d-flex justify-content-end mt-3">
                                        <Button variant="success" onClick={save}>
                                            <FaSave className="me-2" /> บันทึกข้อมูล
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

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
                                    {currentEmployees.map((employee) => (
                                        <tr key={employee.id}>
                                            <td>{employee.id}</td>
                                            <td>{employee.name}</td>
                                            <td>{employee.position}</td>
                                            <td>{employee.email}</td>
                                            <td>
                                                <div className="d-flex">
                                                    <button
                                                        className="btn btn-warning me-2 flex-fill d-flex align-items-center justify-content-center p-0"
                                                        style={{
                                                            height: "40px",
                                                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                                            transition: "all 0.3s ease",
                                                        }}
                                                        onClick={() => handleEdit(employee)}
                                                    >
                                                        <FaEdit
                                                            style={{
                                                                width: "70%",
                                                                height: "70%",
                                                                color: "#fff",
                                                            }}
                                                        />
                                                    </button>
                                                    <button
                                                        className="btn btn-danger flex-fill d-flex align-items-center justify-content-center p-0"
                                                        style={{
                                                            height: "40px",
                                                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                                            transition: "all 0.3s ease",
                                                        }}
                                                        onClick={() => deleteEmployee(employee.id)}
                                                    >
                                                        <FaTrash
                                                            style={{
                                                                width: "70%",
                                                                height: "70%",
                                                                color: "#fff",
                                                            }}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            <Pagination
                                count={Math.ceil(employees.length / rowsPerPage)} // จำนวนหน้าทั้งหมด
                                page={currentPage} // หน้าปัจจุบัน
                                onChange={(event, value) => setCurrentPage(value)} // อัปเดตหน้าปัจจุบัน
                                color="primary"
                            />
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
                            <label>คำนำหน้า</label>
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
                            <label>ชื่อเล่น</label>
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
                            <label>ตำแหน่ง</label>
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
