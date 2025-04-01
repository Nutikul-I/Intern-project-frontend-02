import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const SidebarComponent = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar collapsed={collapsed} style={{ height: "100vh" }}>
        <Menu>
          <MenuItem icon={<FaBars />} onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "" : "Toggle"}
          </MenuItem>
          <MenuItem component={<Link to="/dashboard" />}>Dashboard</MenuItem>
          <MenuItem component={<Link to="/profile" />}>Profile</MenuItem>
          <MenuItem component={<Link to="/settings" />}>Settings</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;