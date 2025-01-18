import { React, useContext, useState } from 'react'
import { RiComputerLine } from "react-icons/ri";
import { FaTabletAlt, FaMobileAlt, FaEye } from "react-icons/fa";
import { LiaUndoSolid, LiaRedoSolid } from "react-icons/lia";
import { GlobalContext } from '@/Context';
import { useRouter } from 'next/navigation';

import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase/firebase"





const Navbar = () => {

    const router = useRouter()

    const { width, setwidth } = useContext(GlobalContext)
    const { widthmodename, setwidthmodename } = useContext(GlobalContext)

    const { data, setdata } = useContext(GlobalContext)
    const { undo, setundo } = useContext(GlobalContext)
    const { redo, setredo } = useContext(GlobalContext)

    const { projectindex } = useContext(GlobalContext)
    const { authuser } = useContext(GlobalContext)


    const devices = [
        {
            name: "lg",
            icon: RiComputerLine,
            value: "1000px",
        },
        {
            name: "md",
            icon: FaTabletAlt,
            value: "768px",
        },
        {
            name: "sm",
            icon: FaMobileAlt,
            value: "390px",
        },
    ]




    async function handleundo() {
        if (undo.length > 1) {

            try {

                const pindex = projectindex;
                const dataref = doc(db, "website", authuser.uid, "projects", "mainprojects");
                const data = await getDoc(dataref);
                let webdata;

                const tempundo = JSON.parse(JSON.stringify(undo));
                const tempredo = tempundo[tempundo.length - 1];
                const updatedUndo = tempundo.slice(0, tempundo.length - 1);
                webdata = updatedUndo[updatedUndo.length - 1];


                setredo(prev => [...prev, tempredo]);


                setundo(updatedUndo);


                setdata([webdata]);


                const projects = data.data();
                if (projects?.data?.[pindex]) {
                    projects.data[pindex].webdata = [webdata];
                    console.log(projects);
                    await setDoc(dataref, projects);
                } else {
                    console.error("Invalid project structure in Firestore!");
                }

                console.log(updatedUndo);
                console.log(undo);
                console.log(redo);
            }
            catch (err) {
                console.error(err)
            }

        }
    }




    async function handleredo() {
        if (redo.length >= 1) {
            try {

                const pindex = projectindex;
                const dataref = doc(db, "website", authuser.uid, "projects", "mainprojects");
                const data = await getDoc(dataref);
                let webdata;

                const tempredo = JSON.parse(JSON.stringify(redo))
                const redoupdate = tempredo[tempredo.length - 1]
                webdata = tempredo[tempredo.length - 1]
                const updateredo = tempredo.slice(0, -1)



                const projects = data.data();
                if (projects?.data?.[pindex]) {
                    projects.data[pindex].webdata = [webdata];
                    console.log(projects);
                    await setDoc(dataref, projects);
                } else {
                    console.error("Invalid project structure in Firestore!");
                }


                setundo(prev => [...prev, redoupdate])
                setredo(updateredo)
                setdata([redoupdate])



            }

            catch (err) {
                console.error(err)
            }

        }
    }


    function handlepreview(){
        router.push('/Preview')
    }

    return (
        <div className='relative z-50 pl-10 flex justify-between items-center h-8 p-5 bg-slate-700 text-white'>
            <p>
                web.builder
            </p>
            <div className='flex gap-3 text-xl'>
                {
                    devices.map((item, index) => (
                        <>
                            {< item.icon className={`${item.name === widthmodename ? 'text-blue-600' : 'text-black-500'}`} onClick={() => {
                                setwidth(item.value)
                                setwidthmodename(item.name)
                                console.log(width)
                            }} />}
                        </>
                    ))
                }
            </div>
            <div className='flex gap-3 text-xl'>
                <span onClick={handleundo} ><LiaUndoSolid /></span>
                <span onClick={handleredo}><LiaRedoSolid /></span>
                <span onClick={handlepreview} className='px-3'><FaEye /></span>
            </div>
        </div>
    )
}

export default Navbar