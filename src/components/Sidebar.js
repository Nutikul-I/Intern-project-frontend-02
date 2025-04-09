import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaUsers, FaUser, FaSuitcase } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItemClass = ({ isActive }) =>
    `nav-link d-flex align-items-center gap-2 w-100 px-3 py-2 rounded 
    ${isActive ? "bg-white shadow-sm text-dark" : "text-secondary"} 
    justify-content-${collapsed ? "center" : "start"} 
    ${!isActive ? "hover-bg-light" : ""}`;

  const iconWrapper = (isActive) =>
    `d-flex justify-content-center align-items-center rounded 
    ${isActive ? "bg-primary text-white" : "text-secondary"}`
  
  const iconSize = { width: "32px", height: "32px" };

  return (
    <div style={{ display: "flex", height: "100vh", backgroundColor: "#F8F9FA" }}>
      <div
        className={`bg-light text-dark p-3 vh-100 d-flex flex-column align-items-${collapsed ? "center" : "start"} position-relative`}
        style={{ width: collapsed ? "80px" : "250px", transition: "width 0.3s" }}
      >
        {/* <button
          className="btn btn-outline-dark position-absolute top-0 end-0 m-2"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FaBars size={20} />
        </button> */}

        <h5 className={`fw-bold mb-3 text-center w-100 ${collapsed ? "d-none" : "d-block"}`}>LOGO</h5>

        <NavLink to="/layout/dashboard" className={navItemClass}>
          {({ isActive }) => (
            <>
              <div className={iconWrapper(isActive)} style={iconSize}>
                <FaHome size={16} />
              </div>
              {!collapsed && <span>แดชบอร์ด</span>}
            </>
          )}
        </NavLink>

        <div className={`mt-4 w-100 ps-2 text-muted ${collapsed ? "d-none" : "d-block"}`}>ข้อมูลผู้ใช้</div>
        <ul className={`nav flex-column w-100 align-items-${collapsed ? "center" : "start"}`}>
          <li className="nav-item w-100">
            <NavLink to="/layout/customers" className={navItemClass}>
              {({ isActive }) => (
                <>
                  <div className={iconWrapper(isActive)} style={iconSize}>
                    <FaUsers size={16} />
                  </div>
                  {!collapsed && <span>ลูกค้า</span>}
                </>
              )}
            </NavLink>
          </li>
          <li className="nav-item w-100">
            <NavLink to="/layout/employee" className={navItemClass}>
              {({ isActive }) => (
                <>
                  <div className={iconWrapper(isActive)} style={iconSize}>
                    <FaUser size={16} />
                  </div>
                  {!collapsed && <span>พนักงาน</span>}
                </>
              )}
            </NavLink>
          </li>
        </ul>

        <div className={`mt-4 w-100 ps-2 text-muted ${collapsed ? "d-none" : "d-block"}`}>ตั้งค่าระบบ</div>
        <ul className={`nav flex-column w-100 align-items-${collapsed ? "center" : "start"}`}>
          <li className="nav-item w-100">
            <NavLink to="/layout/position" className={navItemClass}>
              {({ isActive }) => (
                <>
                  <div className={iconWrapper(isActive)} style={iconSize}>
                    <FaSuitcase size={16} />
                  </div>
                  {!collapsed && <span>ตำแหน่ง</span>}
                </>
              )}
            </NavLink>
          </li>
        </ul>

        <div className={`text-muted mt-auto mb-3 w-100 text-center ${collapsed ? "d-none" : "d-block"}`} style={{ fontSize: "12px" }}>
          version 1.0.0
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
