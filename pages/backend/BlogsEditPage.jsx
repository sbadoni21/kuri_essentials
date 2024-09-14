"use client";
import React, { useEffect, useState } from "react";
import {
  getDocs,
  query,
  collection,
  updateDoc,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../../firebase/firebase";
import { Button, Menu, MenuItem } from "@mui/material";
import { DialogActions, TextField } from "@mui/material";
import { MdDelete } from "react-icons/md";
import { MdCheckCircle, MdCancel } from 'react-icons/md';
import {
  bigHighlightedLineModel,
  paragraphModel,
  routineModel,
  smallItalicLineModel,
  highlightedItalicLine,
  boldLine,
  highlightedParagraphModel,
  largeItalicLineModel,
  largeLineModel,
  mediumItalicLineModel,
  mediumLineModel,
  largeItalicBoldfontModel,
  mediumItalicBoldfontModel,
  smallItalicBoldfontModel,
  smallLineModel,
  captionModel,
  codeBlockModel,
  headingModel,
  horizontalRuleModel,
  listItemModel,
  quoteModel,
  audioModel,
  buttonModel,
  checkboxModel,
  datePickerModel,
  dropdownModel,
  fileUploadModel,
  imageModel,
  largeBoldfontModel,
  linkModel,
  mediumBoldfontModel,
  radioModel,
  smallBoldfontModel,
  timePickerModel,
  videoModel,
  space10Model,
  space20Model,
  space30Model,
  tagModel,
} from "../../models/dataModels";
import Space16 from "@/components/backend/Space16";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const BlogsEditPage = ({ id }) => {
  const [routineData, setRoutineData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  const [anchorEl3, setAnchorEl3] = useState(null);
  const [count, setCount] = useState(0);

  const handleOpenDialog = (model) => {
    setSelectedModel(model);
    setOpenDialog(true);
  };

  const handleCount = () => {
    setCount(count + 1);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenMainMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenLinesMenu = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleOpenSpaceMenu = (event) => {
    setAnchorEl3(event.currentTarget);
  };

  const handleCloseSpaceMenu = () => {
    setAnchorEl3(null);
  };

  const handleCloseLinesMenu = () => {
    setAnchorEl2(null);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoutineData({ ...routineData, [name]: value });
  };

  const handleCloseMainMenu = () => {
    setAnchorEl(null);
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setRoutineData({ ...routineData, heroImage: reader.result });
    };
    const bannerRef = ref(storage, `bannerImages/${id}/banner.jpg`);
    await uploadBytes(bannerRef, file);
    const downloadURL = await getDownloadURL(bannerRef);
    const userRef = doc(db, "routines", id);
    await updateDoc(userRef, { heroImage: downloadURL });

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleDelete = async (index) => {
    try {
      const routineDocRef = doc(db, "routines", id);
      const routineDocSnapshot = await getDoc(routineDocRef);

      if (routineDocSnapshot.exists()) {
        const content = routineDocSnapshot.data().content;
        if (index >= 0 && index < content.length) {
          const updatedContent = [
            ...content.slice(0, index),
            ...content.slice(index + 1),
          ];

          await updateDoc(routineDocRef, { content: updatedContent });

          console.log("Object deleted successfully.");
          fetchRoutineData();
        } else {
          console.error("Index out of bounds.");
        }
      } else {
        console.error("Routine document not found.");
      }
    } catch (error) {
      console.error("Error deleting object:", error);
    }
  };
  const handleSaveChanges = async () => {
    try {
      const routineDocRef = doc(db, "routines", id);
      await updateDoc(routineDocRef, {
        title: routineData.title,
        description: routineData.description,
      });
      console.log("Routine updated successfully!");
    } catch (error) {
      console.error("Error updating routine:", error);
    }
  };
  const fetchRoutineData = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "routines"), where("id", "==", id))
    );
    if (!querySnapshot.empty) {
      const data = querySnapshot.docs.map((doc) => {
        const routine = doc.data();

        return {
          title: routine.title,
          id: routine.id,
          count: routine.count,
          description: routine.description,
          heroImage: routine.heroImage,
          timestamp: routine.timestamp,
          content: routine.content || [],
        };
      });
      console.log(data[0].count);
      setCount(data[0].count);
      setRoutineData(data[0]);
    } else {
    }
  };
  useEffect(() => {
    fetchRoutineData();
  }, []);
  const sortedContent =
    routineData?.content?.length > 0
      ? routineData.content.sort((a, b) => a.sno - b.sno)
      : routineData;
  return (
    <>
      <div className="w-[100%] pb-36 bg-white absolute z-10 top-0 left-0">
        <div className="flex h-full z-20">
          <div>
            <div>
              <div>
                <div className="w-full pb-36 bg-white absolute z-10 top-0 left-0">
                  <div className="flex h-full z-20">
                    <div>
                      <div>
                        <div>
                          <div
                            style={{
                              backgroundImage: `url(${routineData?.heroImage})`,
                              backgroundRepeat: "no-repeat",
                              backgroundSize: "cover",
                            }}
                            className="w-[100vw] h-[70vh] pl-20 pr-20 pt-40 pb-20 text-pink-500 text-center lemonada z-10"
                          >
                            <Space16 />
                            <Space16 />
                            <input
                              type="file"
                              onChange={handleImageChange}
                              className="mb-4"
                              accept="image/*"
                            />
                            <input
                              type="text"
                              name="title"
                              value={routineData.title}
                              onChange={handleInputChange}
                              placeholder="Enter title"
                              className="block w-full text-4xl md:text-6xl allura text-black backdrop-blur-sm backdrop-opacity-90 backdrop-brightness-125 p-3"
                            />
                            <input
                              type="text"
                              name="description"
                              value={routineData.description}
                              onChange={handleInputChange}
                              placeholder="Enter description"
                              className="block w-full text-2xl md:text-4xl allura text-black backdrop-blur-sm backdrop-opacity-90 backdrop-brightness-125 p-3"
                            />
                            <DialogActions className="flex justify-end p-0">
                              <Button
                                variant="contained"
                                onClick={handleSaveChanges}
                              >
                                Save Changes
                              </Button>
                            </DialogActions>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {routineData?.content?.length > 0 ? (
                <div className="p-5 md:p-20 space-y-5 text-justify montserrat_Alternates">
                  {sortedContent?.map((item, index) => {
                    switch (item.type) {
                      case "paragraph":
                        return (
                          <div key={index} className="space-y-3 text-[20px]">
                            <h3>{item.heading}</h3>
                            <p>{item.content}</p>
                            <p>
                              <i className="text-red-300">{item.italicLine}</i>
                            </p>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "list":
                        return (
                          <div key={index}>
                            <h3>{item.heading}</h3>
                            <ul className="p-5">
                              {item.listItems.map((listItem, listItemIndex) => (
                                <li
                                  key={listItemIndex}
                                  className="text-red-300 font-semibold text-[20px]"
                                >
                                  {listItemIndex + 1}. {listItem.heading} :
                                  <span className="pl-3 text-black font-normal text-[18px]">
                                    {listItem.content}
                                  </span>
                                </li>
                              ))}
                              <button
                                onClick={() => handleDelete(index)}
                                className="bg-red-500 rounded-lg p-3 text-white"
                              >
                                <MdDelete />
                              </button>
                            </ul>
                          </div>
                        );
                      case "bigHighlightedLine":
                        return (
                          <div
                            key={index}
                            className="bg-red-300 text-xl w-fit px-2"
                          >
                            {item.content}
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "highlightedItalicLine":
                        return (
                          <i key={index} className="bg-red-300 w-fit px-2">
                            {item.content}
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </i>
                        );
                      case "smallItalicLine":
                        return (
                          <div key={index}>
                            <i className="text-blue-300 italic">
                              {item.content}
                            </i>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "gallery":
                        return (
                          <div key={index}>
                            <h3>{item.heading}</h3>
                            {!item.imgUrls ? (
                              <></>
                            ) : (
                              <div>
                                {item.imgURLs.map((imgUrl, imgIndex) => (
                                  <img
                                    key={imgIndex}
                                    src={imgUrl}
                                    alt={`Image ${imgIndex}`}
                                  />
                                ))}
                              </div>
                            )}
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "steps":
                        return (
                          <div key={index}>
                            <h2>{item.heading}</h2>
                            <ol>
                              {item.steps.map((step, stepIndex) => (
                                <li key={stepIndex}>{step.content}</li>
                              ))}
                            </ol>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "quote":
                        return (
                          <div key={index}>
                            <blockquote>
                              <p>{item.text}</p>
                              <footer>{item.author}</footer>
                            </blockquote>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "caption":
                        return (
                          <div key={index}>
                            <p>{item.text}</p>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "mediumBoldfontModel":
                        return (
                          <div key={index}>
                            <p className="text-xl font-extrabold">
                              {item.content}
                            </p>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "smallBoldfontModel":
                        return (
                          <div key={index}>
                            <p className="text-sm font-extrabold">
                              {item.content}
                            </p>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "largeBoldfontModel":
                        return (
                          <div key={index}>
                            <p className="text-3xl font-extrabold">
                              {item.content}
                            </p>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );

                      case "mediumItalicBoldfontModel":
                        return (
                          <div key={index}>
                            <i className="text-xl font-extrabold">
                              {item.content}
                            </i>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "smallItalicBoldfontModel":
                        return (
                          <div key={index}>
                            <i className="text-sm font-extrabold">
                              {item.content}
                            </i>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "largeItalicBoldfontModel":
                        return (
                          <div key={index}>
                            <i className="text-3xl font-extrabold">
                              {item.content}
                            </i>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );

                      case "mediumItalicLine":
                        return (
                          <div key={index}>
                            <i className="text-xl ">{item.content}</i>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "smallLine":
                        return (
                          <div key={index}>
                            <p className="text-sm">{item.content}</p>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "largeLine":
                        return (
                          <div key={index}>
                            <p className="text-3xl">{item.content}</p>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );

                      case "mediumLine":
                        return (
                          <div key={index}>
                            <p className="text-xl text-bold">{item.content}</p>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "smallLine":
                        return (
                          <div key={index}>
                            <p className="text-sm text-bold">{item.content}</p>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "largeLine":
                        return (
                          <div key={index}>
                            <p className="text-3xl text-bold">{item.content}</p>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "heading":
                        return (
                          <div key={index} className="flex">
                            <p className="text-xl md:text-3xl text-bold ` ">
                              {item.text}
                            </p>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "tag":
                        return (
                          <div key={index}>
                            <span>{item.text}</span>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "listItem":
                        return (
                          <div key={index}>
                            <li>{item.text}</li>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "codeBlock":
                        return (
                          <div key={index} className="bg-gray-100 p-3">
                            <pre>
                              <code>{item.code}</code>
                              <button
                                onClick={() => handleDelete(index)}
                                className="bg-red-500 rounded-lg p-3 text-white"
                              >
                                <MdDelete />
                              </button>
                            </pre>
                          </div>
                        );
                      case "space10":
                        return (
                          <>
                            {" "}
                            <div key={index} className="w-full h-[10px]"></div>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </>
                        );
                      case "space20":
                        return (
                          <>
                            {" "}
                            <div key={index} className="w-full h-[20px]"></div>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </>
                        );
                      case "image":
                        return (
                          <div key={index}>
                            <img src={item.url} alt={item.altText} />
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "video":
                        return (
                          <div key={index}>
                            <video controls>
                              <source src={item.url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "audio":
                        return (
                          <div key={index}>
                            <audio controls>
                              <source src={item.url} type="audio/mpeg" />
                              Your browser does not support the audio tag.
                            </audio>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "link":
                        return (
                          <div key={index}>
                            <a className="text-blue underline" href={item.url}>
                              {item.text}
                            </a>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "button":
                        return (
                          <div key={index}>
                            <button>{item.text}</button>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "checkbox":
                        return (
                          <div key={index}>
                            <input
                              type="checkbox"
                              checked={item.checked}
                              onChange={() => {}}
                            />
                            <label>{item.label}</label>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "radio":
                        return (
                          <div key={index}>
                            <input
                              type="radio"
                              checked={item.selectedOption === option}
                              onChange={() => {}}
                            />
                            <label>{item.label}</label>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </div>
                        );
                      case "space30":
                        return (
                          <>
                            {" "}
                            <div key={index} className="w-full h-[30px]"></div>
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </>
                        );
                      case "horizontalRule":
                        return (
                          <>
                            <hr key={index} />{" "}
                            <button
                              onClick={() => handleDelete(index)}
                              className="bg-red-500 rounded-lg p-3 text-white"
                            >
                              <MdDelete />
                            </button>
                          </>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
          {/* showing the options*/}

          <div
            className=" fixed bottom-0 flex-col bg-rose-300 gap-3 p-10 items-start justify-start w-full
          "
          >
            <div className="text-2xl ">Editing Board</div>
            <Space16 />
            <Space16 />
            {/* Buttons for changes*/}
            <div className="flex gap-4  ">
              <Button
                aria-controls="simple-menu"
                className="text-lg bg-primary hover:bg-green-400 shadow-md text-gray-500"
                aria-haspopup="true"
                onClick={handleOpenMainMenu}
              >
                All
              </Button>
              <Button
                aria-controls="simple-menu-2"
                aria-haspopup="true"
                className="text-xl bg-primary hover:bg-green-400 shadow-md text-gray-500"
                onClick={handleOpenLinesMenu}
              >
                Lines
              </Button>
              <Button
                aria-controls="simple-menu-3"
                aria-haspopup="true"
                className="text-xl bg-primary hover:bg-green-400 shadow-md text-gray-500"
                onClick={handleOpenSpaceMenu}
              >
                Spaces
              </Button>
              {/* <Button onClick={handleEditingClose()}>Back</Button>{" "} */}
            </div>
            {/* All DropDowns for changes*/}

            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseMainMenu}
            >
              {[
                bigHighlightedLineModel,
                paragraphModel,
                routineModel,
                smallItalicLineModel,
                boldLine,
                highlightedParagraphModel,
                largeItalicLineModel,
                largeLineModel,
                mediumItalicLineModel,
                mediumLineModel,
                smallLineModel,
                captionModel,
                codeBlockModel,
                headingModel,
                horizontalRuleModel,
                listItemModel,
                quoteModel,
                tagModel,
              ].map((model, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleOpenDialog(model);
                    handleCloseMainMenu();
                  }}
                >
                  {model.name}
                </MenuItem>
              ))}
            </Menu>
            <Menu
              id="simple-menu-2"
              anchorEl={anchorEl2}
              keepMounted
              open={Boolean(anchorEl2)}
              onClose={handleCloseLinesMenu}
            >
              {[
                bigHighlightedLineModel,
                smallItalicLineModel,
                boldLine,
                largeItalicLineModel,
                largeLineModel,
                mediumItalicLineModel,
                largeItalicBoldfontModel,
                mediumItalicBoldfontModel,
                smallItalicBoldfontModel,
                mediumLineModel,
                smallLineModel,
                largeBoldfontModel,
                linkModel,
                mediumBoldfontModel,
                smallBoldfontModel,
                highlightedItalicLine,
              ].map((model, index) => (
                <MenuItem
                  key={index}
                  onClick={() => {
                    handleOpenDialog(model);
                    handleCloseLinesMenu();
                  }}
                >
                  {model.name}
                </MenuItem>
              ))}
            </Menu>
            <Menu
              id="simple-menu-3"
              anchorEl={anchorEl3}
              keepMounted
              open={Boolean(anchorEl3)}
              onClose={handleCloseSpaceMenu}
            >
              {[space10Model, space20Model, space30Model].map(
                (model, index) => (
                  <MenuItem
                    key={index}
                    onClick={() => {
                      handleOpenDialog(model);
                      handleCloseLinesMenu();
                    }}
                  >
                    {model.name}
                  </MenuItem>
                )
              )}
            </Menu>
            <DataEntryDialog
              open={openDialog}
              handleClose={handleCloseDialog}
              model={selectedModel}
              id={id}
              fetchRoutineData={fetchRoutineData}
              count={count}
              handleCount={handleCount}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const DataEntryDialog = ({
  open,
  handleClose,
  model,
  id,
  fetchRoutineData,
  handleCount,
  count,
}) => {
  const [formData, setFormData] = useState({});
  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
      type: model.type,
      sno: count + 1,
      name: model.name,
    });
  };
  console.log(formData);

  const handleSubmit = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "routines"), where("id", "==", id))
      );
      const doc = querySnapshot.docs[0];
      const updatedContent = [
        ...doc.data().content,
        { ...formData, sno: count + 1 },
      ];
      await updateDoc(doc.ref, { content: updatedContent, count: count + 1 });
      fetchRoutineData();
    } catch (error) {
      console.error("Error adding data:", error);
    }
    setFormData({});
    handleClose();
    handleCount();
  };

  return (
    <dialog className="fixed inset-0" open={open} onClose={handleClose}>
      <h1>Add Data</h1>
      <div>
        {model &&
          Object.keys(model)
            ?.filter((key) => key !== "type")

            .map((key) => (
              <TextField
                key={key}
                label={key}
                FormHelperTextProps={false}
                SelectProps={false}
                value={formData[key] || ""}
                onChange={(e) => handleInputChange(key, e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            ))}
      </div>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </dialog>
  );
};

export default BlogsEditPage;
