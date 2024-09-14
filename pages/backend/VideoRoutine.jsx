"use client"

import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase"; // Adjust the import path as needed
import Link from "next/link";

const VideoGalleryPage = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editVideo, setEditVideo] = useState(null);
  const [newVideoTitle, setNewVideoTitle] = useState("");
  const [newVideoDescription, setNewVideoDescription] = useState("");
  const [newVideoID, setNewVideoID] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

 
  
  const fetchVideos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "videoRoutines"));
      const videoData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVideos(videoData);
      setFilteredVideos(videoData);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Filter videos based on search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredVideos(videos);
    } else {
      setFilteredVideos(
        videos.filter((video) =>
          video.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm, videos]);

  // Handle editing video title and description
  const handleEditVideo = async () => {
    try {
      if (editVideo) {
        const videoRef = doc(db, "videoRoutines", editVideo.id);
        await updateDoc(videoRef, {
          title: editVideo.title,
          description: editVideo.description,
        });
        setEditVideo(null);
        fetchVideos(); // Refetch videos after edit
      }
    } catch (error) {
      console.error("Error updating video:", error);
    }
  };

  // Handle adding a new video
  const handleAddVideo = async () => {
    try {
      if (newVideoTitle && newVideoDescription) {
        const docRef = await addDoc(collection(db, "videoRoutines"), {
          title: newVideoTitle,
          description: newVideoDescription,
          url: newVideoID, 
        });
        console.log("New video added with ID: ", docRef.id);
        setNewVideoTitle("");
        setNewVideoDescription("");
        setNewVideoID('')
        setShowAddModal(false); // Close modal after add
        fetchVideos(); // Refetch videos after add
      }
    } catch (error) {
      console.error("Error adding new video:", error);
    }
  };

  // Handle deleting a video
  const handleDeleteVideo = async (id) => {
    try {
      const videoRef = doc(db, "videoRoutines", id);
      await deleteDoc(videoRef);
      fetchVideos(); // Refetch videos after delete
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };
  const truncateText = (text, limit) => {
    if (text === undefined) {
      return ""; 
    }
  
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + "...";
    }
    return text;
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Contact on YouTube</h1>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full max-w-md"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Render videos */}
          {filteredVideos.length > 0 ? (
            filteredVideos.map((video) => (
              <div key={video.id} className="relative bg-black rounded-lg overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.url}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-2 text-white text-center">
                  {editVideo?.id === video.id ? (
                    <div className="mb-2">
                      <input
                        type="text"
                        value={editVideo.title}
                        onChange={(e) =>
                          setEditVideo({ ...editVideo, title: e.target.value })
                        }
                        className="block w-full border rounded-md  p-1 text-black"
                      />
                      <textarea
                        value={editVideo.description}
                        onChange={(e) =>
                          setEditVideo({
                            ...editVideo,
                            description: e.target.value,
                          })
                        }
                        className="block w-full border rounded-md p-1 mt-2 text-black"
                      ></textarea>
                      <button
                        onClick={handleEditVideo}
                        className="bg-blue-500 text-white bg-slate px-10 rounded-md mt-2"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2 className="text-lg font-bold">{video.title}</h2>
                      <p className="text-sm">{truncateText(video.description, 10)}</p>
                      <div className="flex justify-center mt-2">
                        <button
                          onClick={() => setEditVideo(video)}
                          className="bg-blue-500 text-white px-4 py-1 rounded-md mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteVideo(video.id)}
                          className="bg-red-500 text-white px-4 py-1 rounded-md"
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 text-2xl">
              No videos available
            </div>
          )}
        </div>
        {/* Button to open add new video modal */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Add New Video
          </button>
        </div>

        {showAddModal && (
          <div className="fixed inset-0 z-10 overflow-y-auto flex items-center justify-center">
            <div className="relative bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-4">Add New Video</h2>
              <input
                type="text"
                placeholder="Title"
                value={newVideoTitle}
                onChange={(e) => setNewVideoTitle(e.target.value)}
                className="block w-full border rounded-md p-2 mb-4"
              />
              <textarea
                placeholder="Description"
                value={newVideoDescription}
                onChange={(e) => setNewVideoDescription(e.target.value)}
                className="block w-full border rounded-md p-2 mb-4"
              ></textarea>
                 <textarea
                placeholder="Video UID"
                value={newVideoID}
                onChange={(e) => setNewVideoID(e.target.value)}
                className="block w-full border rounded-md p-2 mb-4"
              ></textarea>
              <div className="flex justify-end">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddVideo}
                  className="bg-green-500 text-white px-4 py-2 rounded-md"
                >
                  Add Video
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoGalleryPage;
