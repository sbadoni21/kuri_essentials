"use client";
import Space16 from "@/components/backend/Space16";
import { db } from "@/firebase/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import EmailDialog from "../../components/backend/EmailDialogBox";
import { MdDelete } from "react-icons/md";
import { FaReply } from "react-icons/fa";

const ContactRequests = () => {
  const [contactUsRequests, setContactUsRequests] = useState([]);
  const [openMailBox, setOpenMailBox] = useState(false);
  const [emailData, setEmailData] =useState([])

  const fetchContactRequests = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "queries"));
        const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContactUsRequests(data);
    } catch (error) {
      console.error("Error fetching contact requests:", error);
    }
  };

  useEffect(() => {
    fetchContactRequests();
  }, []);

  const handleMailBox = (request) => {
    setEmailData(request)
    setOpenMailBox(true);
  };
  const handleDelete = async ({id}) => {   
    try {
      console.log(id)
      const data = doc(db, "queries", id);
      await deleteDoc(data);
      // toast.success("Deleted Successfully !!!");

      fetchContactRequests();
    } catch (error) {
      console.error("Error deleting:", error);
      // toast.error("Error deleting. Please try again.");
    }
  };

  return (
    <>
      <div className="p-20">
        <h3 className=" allura text-6xl ">Contact Requests</h3>
        <Space16 />

        <div className="flex  gap-4 flex-wrap">
          {contactUsRequests.map((request) => (
            <div 
              // 
              className=" bg-primary w-96 relative  text-wrap p-4 rounded-md"
              key={request.id}
            >
              <p className="text-xl">{request.name}</p>

              <p className="text-sm text-blue underline">{request.email}</p>
              <Space16 />
              <p className="text-sm">Message: </p>
              <div className="">{request.message}</div>
              <div onClick={() =>handleMailBox(request)} className="absolute z-10  top-2 right-8 text-green-600"><FaReply/>
</div>
              <div onClick={()=> handleDelete({id: request.id})} className="absolute z-10  top-2 right-2 text-red-500"><MdDelete />
</div>

            </div>
          ))}
        </div>
      </div>

      {/* Render EmailDialog component if openMailBox is true */}
      {openMailBox && (
                <EmailDialog
                  open={openMailBox}
                  onClose={() => setOpenMailBox(false)}
                  emailData={emailData}
                
                />
              )}
    </>
  );
};

export default ContactRequests;
