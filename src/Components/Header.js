import React from "react";
import { TextField } from "@mui/material";

import axios from "axios";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import AdvancedDialog from "./AdvancedDialog";
import AddDialog from "./AddDialog";
import name from "../media/name.png";
import logo from "../media/logo.svg";
import "../styles/Header.css";

//Style CSS for Mui Modal Pop Up
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  height: "auto",
  p: 2,
  bgcolor: "#2a3e4c",
  boxShadow: 24,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  color: "white",
};

export default function Header({
  selectedRows,
  details,
  setDetails,
  handleRefresh,
}) {
  //States for Managing Dailog Box
  const [ifAdvance, setAdvance] = React.useState(false);
  const [ifAdd, setAdd] = React.useState(false);
  const [ifEdit, setEdit] = React.useState(false);
  const [ifDelete, setDelete] = React.useState(false);

  /**HANDLE CUSTOMER ID SEARCH**/
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const key = event.target.value;

      // details = fetch api result array
      if (key !== "") {
        const searchResult = details.filter((item) => {
          const custNumber = item.cust_number;

          if (custNumber && custNumber.includes(key)) {
            // if i want it should strictly starts that pattern: custNumber.startsWith(key)
            return item;
          }
          return null;
        });

        console.log(searchResult.length);

        setDetails(searchResult); // Reset the details to search result
      } else {
        fetch("http://localhost:8080/HRCFinal1/Fetcher")
          .then((res) => res.json())
          .then((data) => {
            console.log(data.length);
            setDetails(data);
          });
      }
    }
  };

  /**Handle Predict **/
  const handlePredict = async () => {
    console.log("handle predict");

    try {
      const doc_ids = [];

      selectedRows.forEach((i) => {
        doc_ids.push(parseInt(i.doc_id));
      });
      console.log(doc_ids);

      const res = await axios.post(
        "http://127.0.0.1:5000/get_prediction", // link we got from flask integration file.
        {
          data: doc_ids,
        },

        {
          params: {
            type: "post",
          },
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res.data);

      const result = res.data;
      result.forEach((item) => {
        const updatedDetails = details.map((i) => {
          if (item.doc_id.startsWith(i.doc_id)) {
            i.aging_bucket = item.aging_bucket;
            console.log(item);
          }
          return i;
        });
        
        setDetails(updatedDetails);
      });
      
      window.alert("Your data is being updated!");
    } catch (error) {
      console.log("error");
      // console.log(error.response.data.error);
      alert("You just broke something!");
      return;
    }
  };

  return (
    <header>
      <section id="header-list">
        <div className="header-list-item">
          <img src={name} alt="name-logo" />
        </div>
        <div className="header-list-item logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="header-list-item"></div>
        <div className="invoice-list">Invoice List</div>
      </section>

      <section id="crud-bar">
        <div id="crud-bar-buttons">
          <div id="three-buttons">
            {selectedRows.length >= 1 ? (
              <div
                id="predict"
                className="three-one left predict"
                onClick={handlePredict}
              >
                Predict
              </div>
            ) : (
              <div
                id="predict"
                className="three-one left disabled"
                title="Show Predictable Data"
              >
                Predict
              </div>
            )}
            <div id="analytics" className="three-one">
              Analytics View
            </div>
            <div
              id="advanvce"
              className="three-one right"
              onClick={() => setAdvance(true)}
            >
              Advance Search
            </div>
          </div>
          <div
            id="refresh-btn"
            onClick={() => {
              handleRefresh();
            }}
          >
            <img
              src="https://img.icons8.com/external-kmg-design-flat-kmg-design/16/000000/external-refresh-arrow-kmg-design-flat-kmg-design-1.png"
              alt="img"
            />
          </div>

          {/* Customer id search bar */}
          <TextField
            sx={{ margin: 1, bgcolor: "white", borderRadius: "5px",width:"100%" }}
            fullWidth
            required
            id="filled-required"
            label="Search Customer Id"
            name="search cust_id"
            variant="standard"
            onKeyDown={handleKeyDown}
            style={{ width: "300px", overflow:"hidden" }}
            type="number"
          />

          {/* ADD, EDIT, DELETE */}

          <div id="three-buttons">
            <div id="Add" className="three-one left" onClick={() => setAdd(true)}>
              Add
            </div>
            {/* conditional css */}
            {selectedRows.length === 1 ? (
              <div
                id="Edit"
                className="three-one middle"
                onClick={() => setEdit(true)}
              >
                Edit
              </div>
            ) : (
              <div id="Edit" className="three-one disabled">
                Edit
              </div>
            )}

            {selectedRows.length >= 1 ? (
              <div
                id="Delete"
                className="three-one right"
                onClick={() => setDelete(true)}
              >
                Delete
              </div>
            ) : (
              <div id="Delete" className="three-one right disabled">
                Delete
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Add Modal */}

      <AddDialog ifAdd={ifAdd} setAdd={setAdd} handleRefresh={handleRefresh} />

      {/* Edit Modal */}

      <EditDialog
        ifEdit={ifEdit}
        setEdit={setEdit}
        selectedRows={selectedRows}
        style={style}
        handleRefresh={handleRefresh}
      />

      {/* Delete popup Modal */}

      <DeleteDialog
        ifDelete={ifDelete}
        setDelete={setDelete}
        handleRefresh={handleRefresh}
        selectedRows={selectedRows}
        style={style}
      />

      {/* Advanved Search Modal */}
      <AdvancedDialog
        ifAdvance={ifAdvance}
        setAdvance={setAdvance}
        setDetails={setDetails}
        details={details}
        style={style}
        handleRefresh={handleRefresh}
      />
    </header>
  );
}
