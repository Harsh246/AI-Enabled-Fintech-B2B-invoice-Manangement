import React from "react";
import { Modal, Box, TextField } from "@mui/material";
import moment from "moment";
import { useForm } from "react-hook-form";

export default function AddDialog({ ifAdd, setAdd, handleRefresh }) {
  const addstyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width:"90%",
    height: "auto",
    p: 2,
    bgcolor: "#2a3e4c",
    boxShadow: 24,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
    flexWrap:'wrap',


  };

  const { register, handleSubmit } = useForm();

  const convertDate = (date) => {
    return date ? moment(date).format("YYYY-MM-DD") : null;
  };

  // handle add
  const onSubmit = async (data) => {
    const formData = {
      ...data,
      clear_date: convertDate(data.clear_date),
      posting_date: convertDate(data.posting_date),
      due_in_date: convertDate(data.due_in_date),
      document_create_date: convertDate(data.document_create_date),
      baseline_create_date: convertDate(data.baseline_create_date),
    };
    console.log("formData: ");
    console.log(formData);

    fetch("http://localhost:8080/HRCFinal1/AddDetail", {
      method: "POST",
      body: JSON.stringify({
        sl_no: 1,
        business_code: formData.business_code,
        cust_number: formData.cust_number,
        clear_date: formData.clear_date,
        buisness_year: formData.buisness_year,
        doc_id: formData.doc_id,
        posting_date: formData.posting_date,
        document_create_date: formData.document_create_date,
        due_in_date: formData.due_in_date,
        baseline_create_date: formData.baseline_create_date,
        cust_payment_terms: formData.cust_payment_terms,
        invoice_currency: formData.invoice_currency,
        document_type: formData.document_type,
        posting_id: formData.posting_id,
        invoice_id: formData.invoice_id,
        total_open_amount: formData.total_open_amount,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(() => {
      handleRefresh();
    });

    setAdd(false);
  };

  return (
    <Modal
      open={ifAdd}
      onClose={() => setAdd(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={addstyle}>
        <div className="box-container">
          <div>
            <p>Add</p>
          </div>

          <div className="box-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%" }}
                required
                id="filled-required"
                label="Business Code"
                name="business_code"
                variant="standard"
                
                fullWidth 
                {...register("business_code", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%"  }}
                required
                id="filled-required"
                label="Customer Number"
                name="cust_number"
                type="number"
                variant="standard"
                fullWidth 
                {...register("cust_number", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%"  }}
                required
                id="filled-required"
                label="clear_date"
                name="clear_date"
                type="date"
                variant="standard"
                fullWidth 
                InputLabelProps={{ shrink: true, required: true }}
                {...register("clear_date", { required: true })}
              />

              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%"  }}
                required
                id="filled-required"
                label="buisness_year"
                name="buisness_year"
                variant="standard"
                fullWidth 
                type="number"
                {...register("buisness_year", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%"  }}
                required
                id="filled-required"
                label="doc_id"
                name="doc_id"
                variant="standard"
                fullWidth 
                {...register("doc_id", { required: true })}
              />

              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%"  }}
                required
                id="filled-required"
                label="posting_date"
                name="posting_date"
                type="date"
                variant="standard"
                fullWidth 
                InputLabelProps={{ shrink: true, required: true }}
                {...register("posting_date", { required: true })}
              />

              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%"  }}
                required
                id="filled-required"
                label="document_create_date"
                name="document_create_date"
                type="date"
                variant="standard"
                fullWidth 
                InputLabelProps={{ shrink: true, required: true }}
                {...register("document_create_date", { required: true })}
              />

              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%"  }}
                required
                id="filled-required"
                label="due_in_date"
                name="due_in_date"
                type="date"
                variant="standard"
                fullWidth 
                InputLabelProps={{ shrink: true, required: true }}
                {...register("due_in_date", { required: true })}
              />

              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%"  }}
                required
                id="filled-required"
                label="baseline_create_date"
                name="baseline_create_date"
                type="date"
                variant="standard"
                fullWidth 
                InputLabelProps={{ shrink: true, required: true }}
                {...register("baseline_create_date", { required: true })}
              />

              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%"  }}
                required
                id="filled-required"
                label="cust_payment_terms"
                name="cust_payment_terms"
                variant="standard"
                fullWidth 
                {...register("cust_payment_terms", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%"  }}
                required
                id="filled-required"
                label="invoice_currency"
                name="invoice_currency"
                variant="standard"
                fullWidth 
                {...register("invoice_currency", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%"  }}
                required
                id="filled-required"
                label="document_type"
                name="document_type"
                variant="standard"
                fullWidth 
                {...register("document_type", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%"  }}
                required
                id="filled-required"
                label="posting_id"
                name="posting_id"
                variant="standard"
                fullWidth 
                type="number"
                {...register("posting_id", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%"  }}
                required
                id="filled-required"
                label="invoice_id"
                name="invoice_id"
                variant="standard"
                fullWidth 
                type="number"
                {...register("invoice_id", { required: true })}
              />
              <TextField
                sx={{ margin: 1, bgcolor: "white",  borderRadius: "5px",width:"23%"  }}
                required
                id="filled-required"
                label="total_open_amount"
                name="total_open_amount"
                variant="standard"
                fullWidth 
                {...register("total_open_amount", { required: true })}
              />
<div style={{width:"100%"}}>
              <button type="submit" className="span-cancel">
                ADD
              </button>

              <button className="span-cancel" onClick={() => setAdd(false)}>
                CANCEL
              </button>
              
              </div>
            </form>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
