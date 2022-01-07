import React, { useState } from "react";
import classes from "./Card.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { favoriteActions } from "../store/favoriteSlice";
import BasicModal from '../UI/BasicModal';
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getItemFromLocalStorage } from "../helpers/localStorageFunc";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { doFetch } from "../helpers/useFetch";

const Card = ({ mainpicture, title, description, flight }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const isAdmin = user.user.isAdmin;

  const isE = getItemFromLocalStorage("favorites")
  const isExist = isE ? isE.find((favorite) => favorite === flight._id) : false;
  const [isFavorite, setIsFavorite] = useState(isExist ? true : false);
  const [editTitle, setEditTitle] = useState(title)
  const [editDescription, setEditDescription] = useState(description)
  const [isEditing, setIsEditing] = useState(false)
  const [isChange, setIsChange] = useState(false);

  useEffect(() => {
    if(!user.token){
      setIsFavorite(false)
    }
  }, [user])

  const toggleFavorite = () => {
    if(!user.token){
      history.replace("/login")
      return alert("Please login first!")
    }
    dispatch(favoriteActions.toggleFavorite({flight, user}));
    setIsFavorite((prevState) => !prevState);
  };

  const onOpenModal = () => {
    if (!user.token) {
      history.replace("/login");
      return alert("Please login first!");
    }
  }
  const onChangeTitle = (e) => {
    setIsChange(true);
    setEditTitle(e.target.value);
  }
  const onChangeDescription = (e) => {
    setIsChange(true);
    setEditDescription(e.target.value);
  }

  const saveInputsChanges = async () => {
    setIsEditing(false);
    if (isChange){
      doFetch(`http://localhost:5000/flights/${flight._id}`, { name: editTitle, description: editDescription }, "PATCH");
        window.location.reload();
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div className={classes.icons}>
          {!isAdmin && !isFavorite && (
            <FavoriteBorderIcon
              className={classes.Icon}
              onClick={toggleFavorite}
            />
          )}
          {!isAdmin && isFavorite && (
            <FavoriteIcon className={classes.Icon} onClick={toggleFavorite} />
          )}
          {isAdmin && !isEditing && <EditIcon className={classes.Icon} onClick={() => setIsEditing(true)}/>}
          {isAdmin && isEditing && <CheckIcon className={classes.Icon} onClick={saveInputsChanges}/>}
        </div>
        {<div className={classes.icon2} onClick={onOpenModal}>
          <BasicModal flight={flight} isAdmin={isAdmin} isEditing={isEditing} setIsEditing={setIsEditing} />
        </div>}
        <div className={classes.image}>
          <img alt="Hotel" src={mainpicture} />
        </div>
        <b className={classes.title}>{title}</b>
        <div className={classes.content}>
          {!isEditing && <h3>{title}</h3>}
          {isAdmin && isEditing && <input value={editTitle} onChange={(e) => onChangeTitle(e)} style={{ padding: "1rem" }} />}
          {!isEditing && <p>{description}</p>}
          {isAdmin && isEditing && (
            <input
              value={editDescription}
              onChange={(e) => onChangeDescription(e)}
              style={{ paddingBottom: "4.2rem", marginTop: "0.3rem" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);