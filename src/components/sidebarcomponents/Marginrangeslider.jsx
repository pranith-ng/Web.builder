import { GlobalContext } from '@/Context'
import React, { useContext , useState} from 'react'

import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase/firebase"


const Marginrangeslider = ({min, max , layetelementpath,  top, right, bottom, left}) => {

    const{data, setdata, widthmodename} = useContext(GlobalContext)
    const [value, setvalue] = useState(0)
    const{undo, setundo} = useContext(GlobalContext)
    const{redo, setredo} = useContext(GlobalContext)

    const {projectindex} = useContext(GlobalContext)
    const {authuser} = useContext(GlobalContext)
  
    
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
          await setDoc(dataref, projects); 
        } else {
          console.error("Invalid project structure in Firestore!");
        }
      } catch (err) {
        console.error(err);
      }
    }
    
    
    const handlechange = (event) => {
        const newvalue = event.target.value 
        const tempdata = JSON.parse(JSON.stringify(data))
        const path = eval(layetelementpath)
        path.css[widthmodename][top] = newvalue
        path.css[widthmodename][right] = newvalue
        path.css[widthmodename][bottom] = newvalue
        path.css[widthmodename][left] = newvalue
        setvalue(newvalue)
        setdata(tempdata)
    }

    const handlemouseup = (event) => {
      const tempdata = JSON.parse(JSON.stringify(data))
      const path = eval(layetelementpath)
      const newvalue = event.target.value
      path.css[widthmodename][top] = newvalue
      path.css[widthmodename][right] = newvalue
      path.css[widthmodename][bottom] = newvalue
      path.css[widthmodename][left] = newvalue
      setvalue(newvalue)
      undoredo(tempdata)
    }

  return (
    <div className="flex items-center">
        <input type="range" 
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={handlechange}
        onMouseUp={handlemouseup}
        />

    </div>
  )
}

export default Marginrangeslider