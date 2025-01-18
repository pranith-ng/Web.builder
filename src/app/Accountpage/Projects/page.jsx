'use client'
import { useRouter } from 'next/navigation'
import React, { useState, useContext, useEffect } from 'react';
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase/firebase"
import { GlobalContext } from '@/Context';


function Projects() {

  const router = useRouter()

  const { projectindex, setprojectindex } = useContext(GlobalContext)

  const defaultwebdata = [

    {
      name: "Home",
      tag: "div",
      css: {
        lg:
        {
          editable: false,
          data: "",
          width: 250,
          height: 150,
          widthmode: "widthcustom",
          heightmode: "heightcustom",

          position: "static",
          top: 0,
          left: 0,

          display: "block",
          flexdirection: "row",
          flexwrap: "no-wrap",
          zindex: 1,
          justifyContent: "flex-start",
          alignitems: "flex-start",

          backgroundmode: "color",
          backgroundcolor: "#9f2323",
          opacity: 100,
          backgroundimage: "",
          backgroundrepeat: "no-repeat",
          backgroundposition: "top left",
          backgroundsize: "auto",

          fontSize: 12,
          color: "#FFFFFF",
          fontFamily: "Arial",
          fontWeight: "normal",
          textAlign: "left",
          lineHeight: "",

          border: false,
          borderColor: "#000000",
          borderStyle: "solid",
          borderWidth: 0,
          borderRadius: 0,

          margintop: 0,
          marginright: 0,
          marginbottom: 0,
          marginleft: 0,

          paddingtop: 0,
          paddingright: 0,
          paddingbottom: 0,
          paddingleft: 0,

        },
        md:
        {
          editable: false,
          data: "",
          width: 250,
          height: 150,
          widthmode: "widthcustom",
          heightmode: "heightcustom",

          position: "static",
          top: 0,
          left: 0,

          display: "block",
          flexdirection: "row",
          flexwrap: "no-wrap",
          zindex: 1,
          justifyContent: "flex-start",
          alignitems: "flex-start",

          backgroundmode: "color",
          backgroundcolor: "#9f2323",
          opacity: 100,
          backgroundimage: "",
          backgroundrepeat: "no-repeat",
          backgroundposition: "top left",
          backgroundsize: "auto",

          fontSize: 12,
          color: "#FFFFFF",
          fontFamily: "Arial",
          fontWeight: "normal",
          textAlign: "left",
          lineHeight: "",

          border: false,
          borderColor: "#000000",
          borderStyle: "solid",
          borderWidth: 0,
          borderRadius: 0,

          margintop: 0,
          marginright: 0,
          marginbottom: 0,
          marginleft: 0,

          paddingtop: 0,
          paddingright: 0,
          paddingbottom: 0,
          paddingleft: 0,

        },
        sm:
        {
          editable: false,
          data: "",
          width: 250,
          height: 150,
          widthmode: "widthcustom",
          heightmode: "heightcustom",

          position: "static",
          top: 0,
          left: 0,

          display: "block",
          flexdirection: "row",
          flexwrap: "no-wrap",
          zindex: 1,
          justifyContent: "flex-start",
          alignitems: "flex-start",

          backgroundmode: "color",
          backgroundcolor: "#9f2323",
          opacity: 100,
          backgroundimage: "",
          backgroundrepeat: "no-repeat",
          backgroundposition: "top left",
          backgroundsize: "auto",

          fontSize: 12,
          color: "#FFFFFF",
          fontFamily: "Arial",
          fontWeight: "normal",
          textAlign: "left",
          lineHeight: "",

          border: false,
          borderColor: "#000000",
          borderStyle: "solid",
          borderWidth: 0,
          borderRadius: 0,

          margintop: 0,
          marginright: 0,
          marginbottom: 0,
          marginleft: 0,

          paddingtop: 0,
          paddingright: 0,
          paddingbottom: 0,
          paddingleft: 0,

        },
      },
      Components: [

      ]
    },
  ]

  const { authuser, setauthuser } = useContext(GlobalContext)

  const { data, setdata } = useContext(GlobalContext)


  const [existingProjects, setExistingProjects] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");

  async function handleAddProject() {
    if (newProjectName.trim()) {
      try {
        const dataRef = doc(db, "website", authuser.uid, "projects", "mainprojects");
        const data = await getDoc(dataRef);
        const projectarray = data.data()?.data || []
        const newprojectarray =
          [...projectarray, {
            name: newProjectName,
            date: new Date(),
            webdata: defaultwebdata,
          }
          ]

        await setDoc(dataRef,
          {
            data: newprojectarray
            // data: [
            //   { id: 1, name: "Project Alpha" },
            //   { id: 2, name: "Project Beta" },
            //   { id: 3, name: "Project Gamma" },
            //   { id: 1, name: "Project Alpha" },
            //   { id: 2, name: "Project Beta" },
            //   { id: 3, name: "Project Gamma" },
            // ]
          }
        );

        setNewProjectName("");
        setModalOpen(false);

      } catch (err) {
        console.error(err);
      }

    }
  };


  useEffect(() => {
    const getprojectlist = async () => {
      try {
        const dataref = doc(db, "website", authuser.uid, "projects", "mainprojects");
        const data = await getDoc(dataref);

        // Log the data structure to verify
        console.log(data.data());

        // Assume `data.data()` contains a key holding the project list, e.g., `projects`
        const projects = data.data()?.data; // Safely access `data` and fallback to an empty array
        setExistingProjects(Array.isArray(projects) ? projects : []);
      } catch (err) {
        console.error(err);
      }
    };

    getprojectlist();
  }, [modalOpen]);


  function timenow(timestamp) {
    // Simulating Firestore timestamp in seconds
    const firestoreTimestampInSeconds = timestamp.seconds; // Example timestamp

    // Convert to a JavaScript Date object (Firestore seconds multiplied by 1000)
    const date = new Date(firestoreTimestampInSeconds * 1000);

    // Format the date
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');

    // Format the time
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
   

    // Determine AM or PM and convert to 12-hour format
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert 0 or 24 to 12

    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return `${formattedDate} @ ${formattedTime}`;
  }




  async function handleprojectclick(index) {

    try {
      setprojectindex(index)
      const dataref = doc(db, "website", authuser.uid, "projects", "mainprojects");
      const data = await getDoc(dataref);

      console.log(data.data());
      const projects = data.data()?.data[index];
      const webdata = projects.webdata
      setdata(webdata)
      router.push('/')
      console.log(webdata)
      // console.log(index)
      // console.log(projects)
    }
    catch (err) {
      console.error(err)
    }
  }



  return (
    <>
      {authuser !== null ?

        <div className="p-6 bg-gray-50 h-full">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Projects</h2>

          <div className="flex items-center mb-8">
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center justify-center bg-blue-600 text-white rounded-full w-12 h-12 mr-4 shadow-lg hover:bg-blue-700 transition duration-200"
            >
              <span className="text-3xl">+</span>
            </button>
            <span className="text-xl font-semibold text-gray-700">Add New Project</span>
          </div>





          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(existingProjects) &&
              existingProjects.map((project, index) => (
                <div onClick={() => handleprojectclick(index)}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-200"
                >
                  <h3 className="text-lg font-semibold text-gray-800">{project.name}</h3>
                  <div className='mt-2'>
                    <p>created at:</p>
                    <p className="text-gray-600 ">
                      {project.date ? timenow(project.date) : "Unknown time"}.
                    </p>
                  </div>

                </div>
              ))}
          </div>



          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-semibold mb-4">New Project</h3>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  placeholder="Enter project name"
                  className="border border-gray-300 rounded-md w-full p-2 mb-4"
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleAddProject}
                    className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-200"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="bg-gray-300 text-gray-800 rounded-md py-2 px-4 hover:bg-gray-400 transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        :

        <div> Login to see projects</div>

      }
    </>
  );
};

export default Projects;
