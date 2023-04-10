import React, { useEffect, useState } from "react";
import "./UpdateTrain.css";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import "./Sidebar";

import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import { Button } from "@mui/material";
import { clearErrors, getTrain, updateTrain } from "../../actions/trainActions";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_TRAIN_RESET } from "../../constants/trainConstants";
import { toast } from "react-toastify";
const UpdateTrain = () => {
  const { loading, isUpdated, error } = useSelector(
    (state) => state.modifyTrain
  );
  const {
    train,
    error: detailsError,
    loading: detailsLoading,
  } = useSelector((state) => state.singleTrain);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  const [name, setName] = useState("");
  const [pricePerSeat, setPricePerSeat] = useState(0);
  const [category, setCategory] = useState("");
  const [destination, setdestination] = useState("");
  const [startingCity, setstartingCity] = useState("");
  const [numOfSeats, setNumOfSeats] = useState(0);
  const [departureDay, setdepartureDay] = useState();
  const [departureTime, setdepartureTime] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  const categories = ["Economical", "Business"];
  const createTrainSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);

    myForm.set("destination", destination);
    myForm.set("startingCity", startingCity);
    myForm.set("category", category);
    myForm.set("numOfSeats", numOfSeats);
    myForm.set("pricePerSeat", pricePerSeat);
    myForm.set("departureDay", departureDay);
    myForm.set("departureTime", departureTime);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    console.log(images);
    dispatch(updateTrain(id, myForm));
  };
  const updateTrainImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  useEffect(() => {
    if (train && train._id !== id) {
      dispatch(getTrain(id));
    } else {
      setName(train.name);
      setPricePerSeat(train.pricePerSeat);
      setCategory(train.category);
      setdepartureDay(train.departureDay);
      setdepartureTime(train.departureTime);
      setdestination(train.destination);
      setstartingCity(train.startingCity);
      setNumOfSeats(train.numOfSeats);
      setOldImages(train.images);
    }

    if (detailsError) {
      toast.error(error);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      toast.success("Updated Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: UPDATE_TRAIN_RESET });
    }
    console.log(train);
  }, [dispatch, error, isUpdated, navigate, id, train]);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="newProductContainer">
        <form
          className="createProductForm"
          encType="multipart/form-data"
          onSubmit={createTrainSubmitHandler}
        >
          <h1>Update Train</h1>

          <div>
            <SpellcheckIcon />
            <input
              type="text"
              placeholder="Train Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <LocationCityIcon />
            <input
              type="text"
              placeholder="Starting City"
              required
              onChange={(e) => setstartingCity(e.target.value)}
              value={startingCity}
            />
          </div>
          <div>
            <LocationCityIcon />
            <input
              type="text"
              placeholder="Destination"
              value={destination}
              required
              onChange={(e) => setdestination(e.target.value)}
            />
          </div>
          <div>
            <AttachMoneyIcon />
            <input
              type="number"
              placeholder="Price Per Seat"
              required
              onChange={(e) => setPricePerSeat(e.target.value)}
              value={pricePerSeat}
            />
          </div>
          <div>
            <AccessTimeFilledIcon />
            <input
              type="text"
              placeholder="Departure Day"
              required
              onChange={(e) => setdepartureDay(e.target.value)}
              value={departureDay}
            />
          </div>
          <div>
            <AccessTimeFilledIcon />
            <input
              type="text"
              placeholder="Departure Time"
              required
              onChange={(e) => setdepartureTime(e.target.value)}
              value={departureTime}
            />
          </div>

          <div>
            <AccountTreeIcon />
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div>
            <StorageIcon />
            <input
              type="number"
              placeholder="Number Of Seats"
              required
              onChange={(e) => setNumOfSeats(e.target.value)}
              value={numOfSeats}
            />
          </div>

          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={updateTrainImagesChange}
              multiple
            />
          </div>

          <div id="createProductFormImage">
            {oldImages &&
              oldImages.map((image, index) => (
                <img key={index} src={image.url} alt="Old train Preview" />
              ))}
          </div>

          <div id="createProductFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Train Preview" />
            ))}
          </div>
          <Button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTrain;
