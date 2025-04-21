import React, { useEffect, useState } from "react";
import "../css/Header.css";
import { useService } from "../context/ServiceContext";

const header = () => {
  const [cart, setCart] = useState(0);
  const [search, setSearch] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState("");
  const [small, setSmall] = useState(true);

  const { searchData } = useService();

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    if (search == "") {
      setShowOptions(false);
    }
    const handleResize = () => {
      if (window.innerWidth <= 576) {
        setSmall(true); // or any value you want
      } else {
        setSmall(false); // optional reset for larger screens
      }
    };

    // Call on component mount
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [search]);
  const getAlldata = async () => {
    const res = await searchData(search);
    setAllData(res);
    if (res && res.length) {
      res.forEach((data) => {});
    }
  };
  const handleSelect = (value, title) => {
    setSelected(value);
    setSearch(title); // Set input box to selected title
    setShowOptions(false);
  };

  return (
    <div className="container-fluid">
      <div className="mt-2 d-flex align-items-baseline justify-content-evenly overflow-auto overflow-visible">
        <div>
          <img src="/cartsy.png" alt="" className="logo" />
        </div>
        <div
          className="search-input w-50 d-none d-sm-block "
          style={{ position: "relative" }}
        >
          <input
            type="search"
            name=""
            className="form-control"
            placeholder="Search your world"
            onChange={(e) => {
              setSearch(e.target.value);
              getAlldata(e.target.value);
              setShowOptions(true);
            }}
            onFocus={() => setShowOptions(true)}
            // onBlur={() => setShowOptions(false)}
            value={search}
          />
          <i className="bi bi-search"></i>
          {!small && showOptions && allData.length > 0 && (
            <div
              style={{
                top: "100%",
                left: "0%",
                border: "1px solid #ccc",
                borderTop: "none",
                maxHeight: "300px",
                overflowY: "auto",
                position: "absolute",
                width: "100%",
                backgroundColor: "#fff",
                zIndex: 100,
              }}
            >
              {allData.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.value, item.title)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {item.title}
                </div>
              ))}
            </div>
          )}
        </div>
        <button className="btn btn-outline-primary">
          {" "}
          cart {cart == 0 ? "" : cart}
        </button>
      </div>

      <div className="search-input small-dev-search w-100 d-sm-none">
        <input
          type="search"
          name=""
          className="form-control"
          placeholder="Search your world"
          onChange={(e) => {
            setSearch(e.target.value);
            getAlldata(e.target.value);
            setShowOptions(true);
          }}
          onFocus={() => setShowOptions(true)}
          // onBlur={() => setShowOptions(false)}
          value={search}
        />
        <i className="bi bi-search"></i>
      </div>
      {small && showOptions && allData.length > 0 && (
        <div
          style={{
            border: "1px solid #ccc",
            borderTop: "none",
            maxHeight: "300px",
            overflowY: "auto",
            position: "absolute",
            width: "100%",
            backgroundColor: "#fff",
            zIndex: 1,
          }}
        >
          {allData.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item.value, item.title)}
              style={{
                padding: "8px",
                cursor: "pointer",
                borderBottom: "1px solid #eee",
              }}
            >
              {item.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default header;
