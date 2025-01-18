"use client"


import { useContext, useEffect } from "react"
import { useRouter } from "next/navigation";
import Recursive from '@/components/Recursive';
import { GlobalContext } from '@/Context';
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Stylebar from "@/components/Stylebar";


import { doc, getDoc, setDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase"


import { db } from "@/firebase/firebase"



const IndexPage = () => {

  const { isdragend, setisdragend } = useContext(GlobalContext)
  const { childpath, setchildpath,
    parentpath, setparentpath,
    childindex, setchildindex,
    draggedelementindex, setdraggedelementindex,
    draggedelementparent, setdraggedelementparent,
    isdragging, setisdragging,
    quickaddcomponent, setquickaddcomponent,
    width, setwidth } = useContext(GlobalContext)


  const { data, setdata } = useContext(GlobalContext)
  const { undo, setundo } = useContext(GlobalContext)
  const { redo, setredo } = useContext(GlobalContext)
  const { projectindex } = useContext(GlobalContext)
  const { authuser, setauthuser } = useContext(GlobalContext)
  const router = useRouter()



  async function undoredo(tempdata) {
    try {
      const pindex = projectindex;
      const dataref = doc(db, "website", authuser.uid, "projects", "mainprojects");
      const data = await getDoc(dataref);
      let webdata;

      setundo((prevundo) => {
        if (!Array.isArray(prevundo)) {
          console.error("prevundo is not an array");
          return [];
        }
        const newUndo = [...prevundo, ...tempdata];
        webdata = newUndo[newUndo.length - 1];
        setdata([webdata]);
        setredo([]);
        return newUndo;
      });

      const projects = data.data();
      if (projects?.data?.[pindex]) {
        projects.data[pindex].webdata = [webdata];
        console.log(projects);
        await setDoc(dataref, projects);
      } else {
        console.error("Invalid project structure in Firestore!");
      }
    } catch (err) {
      console.error(err);
    }
  }

   


  useEffect(() => {
    if (isdragend) {
      let tempdata = JSON.parse(JSON.stringify(data));

      let tempparentpath = `${parentpath}.Components`
      let tempchildpath = childpath



      if (childindex !== null & draggedelementparent !== null) {
        let realparentpath = eval(tempparentpath)
        let realchildpath = eval(tempchildpath)
        let tempdraggedelementparentpath = `${draggedelementparent}.Components`
        let draggedelementparentpath = eval(tempdraggedelementparentpath)
        draggedelementparentpath.splice(draggedelementindex, 1)
        realparentpath.splice(childindex, 0, realchildpath)
      }

      if (quickaddcomponent !== null & childindex !== null) {
        let realparentpath = eval(tempparentpath)
        let realchildpath = eval(tempchildpath)
        realparentpath.splice(childindex, 0, quickaddcomponent)
      }

      // console.log(realparentpath, realchildpath)
      // setdata([undo[undo.length-1]])
      undoredo(tempdata)
      setdraggedelementparent(null)
      setdraggedelementindex(null)
      setisdragend(false)
      setisdragging(false)
      setquickaddcomponent(null)

    }
  }, [isdragend]);


  return (
    <>
      <div>
        <Navbar />
        <Sidebar />
        <Stylebar />
      </div>
      <div style={{
        width: `${width}`,
        height: "90vh",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "10px",
        outline: "2px solid gray",
        overflow: "scroll",
      }} >


        {authuser !== null ? (
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {data.length > 0 ? (
              <Recursive data={data} setdata={setdata} mainpath="tempdata" path="" />
            ) : (
              <div>excel</div>
            )}
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            Login to use editor
          </div>
        )}


      </div>
    </>

  );
};

export default IndexPage;
