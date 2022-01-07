import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import './BasicModal.css';
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { doFetch } from "../helpers/useFetch";
import Button from "./Button"; 
import { useHistory } from "react-router-dom";
import { setItemToLocalStorage } from "../helpers/localStorageFunc";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ flight, isAdmin, isEditing, setIsEditing }) => {
  const [open, setOpen] = useState(false);
  const [editName, setEditName] = useState(flight.name);
  const [editPrice, setEditPrice] = useState(flight.price);
  const [isChange, setIsChange] = useState(false);
  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => setOpen(false);

  const saveInputsChanges = () => {
    setIsEditing(false);
    if (isChange){
      doFetch(`http://localhost:5000/flights/${flight._id}`, { name: editName, price: editPrice }, "PATCH");
        window.location.reload();
    }
  };

  const onChangePrice = (e) => {
    setIsChange(true);
    setEditPrice(e.target.value);
  }
  const onChangeName = (e) => {
    setIsChange(true);
    setEditName(e.target.value);
  }

  const onCheckOut = () => {
    setItemToLocalStorage("purchase", flight)
    history.replace("/checkout");
  }

  return (
    <>
      <OpenInNewIcon style={{ cursor: "pointer" }} onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isAdmin && !isEditing && (
            <EditIcon className="Icon" onClick={() => setIsEditing(true)} />
          )}
          {isAdmin && isEditing && (
            <CheckIcon className="Icon" onClick={saveInputsChanges} />
          )}

          <img
            src={flight.pictures.main}
            style={{ width: "100%", paddingBottom: "2rem" }}
          />

          {!isEditing && <h5 style={{ textAlign: "center" }}>{flight.name}</h5>}
          {isEditing && (
            <input
              id="modal-modal-description"
              className="editInput"
              value={editName}
              onChange={(e) => onChangeName(e)}
              sx={{ mt: 2 }}
            />
          )}

          {!isEditing && <b>{flight.price}$ per night</b>}
          {isEditing && (
            <input
              id="modal-modal-description"
              className="editInput"
              type="number"
              value={editPrice}
              onChange={(e) => onChangePrice(e)}
              sx={{ mt: 2 }}
            />
          )}

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {flight.date}
          </Typography>
          {!isAdmin && <div className="myButton" onClick={onCheckOut}>
            <Button />
          </div>}
          {isAdmin && <div className="myButton">
            <Button isAdmin={isAdmin} />
          </div>}
        </Box>
      </Modal>
    </>
  );
}
 
export default BasicModal;