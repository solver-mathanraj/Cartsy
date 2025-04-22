import React, { useEffect, useRef, useState } from "react";
import "../css/Header.css";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons"; 
import { useService } from "../context/ServiceContext";

const Header = () => {
  const [cart, setCart] = useState(0);
  const [search, setSearch] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState("");
  const [small, setSmall] = useState(true);
  const [title, setTitle] = useState([]);

  const { searchData, fetchTitle } = useService();

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

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [search]);

  useEffect(() => {
    getTitle();
  }, []);

  const getAlldata = async () => {
    try {
      const res = await searchData(search);
      setAllData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getTitle = async () => {
    try {
      const res = await fetchTitle();
      setTitle(res);
    } catch (error) {
      console.log(error);
    }
    // if (res && res.length) {
    //   res.forEach((data) => {});
    // }
  };
  const handleSelect = (value, title) => {
    setSelected(value);
    setSearch(title); // Set input box to selected title
    setShowOptions(false);
  };

  const scrollRef = useRef(null);
  const itemsPerSlide = 3;

  const handleScroll = (direction) => {
    const container = scrollRef.current;
    const itemWidth = container.children[0]?.offsetWidth || 0; // Get width of an item
    const scrollAmount = itemWidth * itemsPerSlide;

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else if (direction === "right") {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
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
                  onClick={() => handleSelect(item.id, item.title)}
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

      <div className="position-relative">
        {/* Previous Button */}
        <button
          className="position-absolute top-50 start-0 translate-middle-y z-1"
          style={{
            background: "white",
            border: "none",
            color: "rgb(255, 104, 108)",
          }}
          onClick={() => handleScroll("left")}
        >
          <ChevronLeft size={24} /> {/* Bootstrap Icon */}
        </button>

        {/* Scrollable Container */}
        <div
          className="d-flex align-items-center gap-2 overflow-hidden my-2 px-5"
          ref={scrollRef}
          style={{ scrollBehavior: "smooth" }}
        >
          {title &&
            title.map((category, index) => (
              <div
                key={index}
                className="p-2 px-4 border rounded flex-shrink-0"
                style={{ whiteSpace: "nowrap",cursor:'pointer' }}
              >
                {category}
              </div>
            ))}
        </div>

        {/* Next Button */}
        <button
          className="position-absolute top-50 end-0 translate-middle-y z-1"
          style={{
            background: "white",
            border: "none",
            color: "rgb(255, 104, 108)",
          }}
          onClick={() => handleScroll("right")}
        >
          <ChevronRight size={24} /> {/* Bootstrap Icon */}
        </button>
      </div>
    </div>
  );
};

export default Header;
