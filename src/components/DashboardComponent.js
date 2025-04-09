import React from "react";
import { FaBell, FaUser } from "react-icons/fa";

const DashboardComponent = () => {
  console.log("📌 DashboardComponent Loaded");

  const cards = [
    { title: "ลูกค้า (คน)", value: "53,000", change: "+55%" },
    { title: "พนักงาน (คน)", value: "53,000", change: "+55%" },
    { title: "ตำแหน่ง", value: "53,000", change: "+55%" }
  ];

  return (
    <div className="p-4">

      <div className="row">
        {cards.map((card, index) => (
          <div className="col-md-4" key={index}>
            <div className="card p-3 d-flex flex-row align-items-center justify-content-between">
              <div>
                <h6>{card.title}</h6>
                <h2>{card.value}</h2>
                <span className="text-success">{card.change}</span>
              </div>
              <FaBell className="text-primary fs-3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardComponent;
