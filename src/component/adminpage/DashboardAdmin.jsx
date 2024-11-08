import "./Admin.css";
import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, defaults, plugins } from "chart.js/auto";
import Nav from "../narbar/Nav";
import Sitebar from "../sitebar/Sitebar";
import Nav2 from "../navbar2/Nav2";



defaults.maintainAspectRatio = true;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 35;
defaults.plugins.title.color = "black";



const DashboardAdmin = () => {

  // const li = document.querySelectorAll(".wc-wb");
  // li.forEach(el => {
  //   el.addEventListener("click", () => {
  //     document.querySelector(".active").classList.remove("active");
  //     el.classList.add("active");
  //   });
  // });
  const [oata, setOata] = useState({
    labels: ["col1", "col2", "col3", "col4", "col5", "col6"],
    datasets: [
      {
        label: "high",
        data: [100, 345, 200, 67, 91, 264],
        backgroundColor: "rgb(71, 23, 244)",
        borderColor: "rgb(71, 23, 244)",
      },
      {
        label: "low",
        data: [200, 310, 550, 120, 299, 180],
        backgroundColor: "rgb(244, 8, 8)",
        borderColor: "rgb(244, 8, 8",
      },
    ],
  });


  return (
    <>
      <div className="maina">
        <div className="dashMainTop">
          <Nav2 />
        </div>
        <div className="dashBody">

          <div className="leftDashBody">
            <Sitebar />
          </div>

          <div className="others">

            <div className="cards">
              <div className="cardd">
                <div className="up-icon">
                  <i className="fa-solid fa-pen-to-square"></i>
                </div>
                <div>
                  <p id="text-color"> Active</p>
                  <p id="num">34</p>
                </div>
              </div>
              <div className="cardd">
                <div className="up-icon">
                  <i className="fa-solid fa-money-check-dollar"></i>
                </div>
                <div>
                  <p id="text-color"> Ratings</p>
                  <p id="num">*****</p>
                </div>
              </div>
              <div className="cardd">
                <div className="up-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <p id="text-color"> Page Review</p>
                  <p id="num">100</p>
                </div>
              </div>
              <div className="cardd">
                <div className="up-icon">
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div>
                  <p id="text-color"> Collaborative</p>
                  <p id="num">70,338,42</p>
                </div>
              </div>
            </div>
            <div className="graph">
              <Bar
                data={oata}
                options={{
                  scales: {
                    x: {
                      position: "bottom",
                      ticks: {
                        padding: 5,
                        font: {
                          size: 16,
                        },
                      },
                    },
                    y: {
                      position: "bottom",
                      ticks: {
                        font: {
                          size: 16,
                        },
                      },
                    },
                  },
                  plugins: {
                    title: {
                      text: "Revenue ",
                    },
                  },
                }}
              />
              <Line
                data={oata}
                options={{
                  scales: {
                    x: {
                      ticks: {
                        padding: 5,
                        font: {
                          size: 17,
                        },
                      },
                    },
                    y: {
                      ticks: {
                        font: {
                          size: 17,
                        },
                      },
                    },
                  },
                  plugins: {
                    title: {
                      text: "Taxes ",
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default DashboardAdmin;
