"use client";
import React, { useEffect, useState } from "react";
import {
  getDocs,
  query,
  collection,
  addDoc,
  updateDoc,
  Timestamp,
  where,
  count,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { Button } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import {
  bigHighlightedLineModel,
  galleryModel,
  listModel,
  paragraphModel,
  routineModel,
  smallItalicLineModel,
  stepModel,
  boldLine,
  highlightedParagraphModel,
  largeItalicLineModel,
  largeLineModel,
  mediumItalicLineModel,
  mediumLineModel,
  smallLineModel,
  spaceModel,
} from "../../models/dataModels";
import Space16 from "@/components/backend/Space16";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import BlogsEditPage from "./BlogsEditPage";

const Blogs = () => {
  const [routineData, setRoutineData] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [openContainer, setOpenContainer] = useState(false);
  const [openBlogEditing, setOpenBlogEditing] = useState(false);

  const [id, setID] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    id: "",
    url: "",
  });
  const handleOpenDialog = (model) => {
    setSelectedModel(model);
  };

  const mainDetials = async (model) => {
    setSelectedModel(model);
    setOpenContainer(true);
  };

  const handleClose = () => {
    setOpenContainer(false);
  };
  const handleEditingClose = () => {
    setOpenBlogEditing(false);
  };

  const handleID = ({ id }) => {
    setID(id);
    console.log(id);
    setOpenBlogEditing(true);
  };

  const deleteBlog = async ({ id , url }) => {
    try {
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
      console.log(id);
      const routine = doc(db, "routines", id);
      await deleteDoc(routine);
      fetchRoutineData();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const fetchRoutineData = async () => {
    const querySnapshot = await getDocs(collection(db, "routines"));
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs.map((doc) => {
        const routine = doc.data();
        return {
          title: routine.title,
          id: routine.id,
          description: routine.description,
          heroImage: routine.heroImage,
          count: routine.count,
        };
      });
      setRoutineData(data);
    }
  };
  useEffect(() => {
    fetchRoutineData();
  }, []);

  return (
    <>
      <div className="p-20 flex-col">
        {/* Add  A new routine */}
        <Button
          className="w-40 h-12 bg-primary rounded-lg hover:bg-green-400 text-white font-bold "
          onClick={() => mainDetials(routineModel)}
        >
          Add New Blog
        </Button>
        <Space16 />
        {/* Main Menu Dialog Box */}
        <MainEntryDialogbox
          open={openContainer}
          handleClose={handleClose}
          model={selectedModel}
          fetchRoutineData={fetchRoutineData}
        />
        <Space16 />
        {/* Data for all Routines */}
        <div className="flex gap-4 flex-wrap ">
          {routineData.map((routine) => (
            <div className=" bg-primary rounded-lg w-64 pb-10 relative" key={routine.id}>
              <img
                alt=" "
                onClick={() => handleID({ id: routine.id })}
                src={`${routine.heroImage}`}
                width={100}
                height={100}
                className="w-64 h-40 rounded-lg"
              />
              <h2 className="p-2 text-slate">{routine.title}</h2>
              <Button onClick={() => deleteBlog({ id: routine.id, url: routine.heroImage })} className="bg-red-400 text-sm text-white rounded-lg absolute bottom-2 right-2 ">
                Delete
              </Button>
            </div>
          ))}
        </div>
        {openBlogEditing && <BlogsEditPage id={id}  />}
      </div>
    </>
  );
};

const MainEntryDialogbox = ({ open, handleClose, model, fetchRoutineData }) => {
  const [formData, setFormData] = useState({});

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };
  const handlePhotoChange = (e) => {
    console.log(e);
    const file = e.target.files[0]; 
    console.log(file); 
    setFormData({ ...formData, heroImage: file });
  };
  
  const handleSubmit = async () => {
    try {
      const { heroImage, ...formDataWithoutImage } = formData;
      
      const storageRef = ref(storage, `product_images/${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, heroImage);
      await uploadTask;
        const imageURL = await getDownloadURL(storageRef);
        const docRef = await addDoc(collection(db, "routines"), {
        ...formDataWithoutImage,
        heroImage: imageURL,
      });
        await updateDoc(docRef, {
        id: docRef.id,
        timestamp: Timestamp.now(),
        content: [],
        count: 0,
      });
        fetchRoutineData();
    } catch (error) {
      console.error("Error adding data:", error);
    }
      setFormData({});
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="p-24 "
      fullWidth
      maxWidth="sm"
      style={{ borderRadius: "30px", textAlign: "center" }}
    >
      <h1 className="pt-10">Enter Data for New Blog</h1>
      <div className="p-6">
        {model &&
          Object.keys(model).map((key) => (
           key!= "heroImage"? <TextField
              key={key}
              label={key}
              value={formData[key] || ""}
              onChange={(e) => handleInputChange(key, e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            /> :    <input
            key={key}
            label={key}
            id="heroImage"
            type="file"
            name="heroImage"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full  px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          ))}
      </div>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Blogs;
