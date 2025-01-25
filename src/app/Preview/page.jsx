'use client'
import { React, useContext, useState, useEffect } from 'react'
import { RiComputerLine } from "react-icons/ri";
import { FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import { GlobalContext } from '@/Context';
import Recursive from '@/components/Recursive';
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase/firebase"

const Page = () => {

    const { data, setdata, authuser, widthmodename, setwidthmodename } = useContext(GlobalContext)
    const { projectindex, setauthuser, setprojectindex } = useContext(GlobalContext)

    const [width, setwidth] = useState()

    const devices = [
        {
            name: "lg",
            icon: RiComputerLine,
            value: "100vw"
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


        useEffect(() => {
           const saveduser = sessionStorage.getItem('user');
           if (saveduser) {
             setauthuser(JSON.parse(saveduser));
           }
       
           const savedprojectindex = sessionStorage.getItem('sessionprojectindex');
           if (savedprojectindex) {
             setprojectindex(savedprojectindex);
           }
         }, []);
    
    
    useEffect(() => {
      async function getprojectdata() {
        
        if(authuser && projectindex){
          try{
            const dataref = doc(db, "website", authuser.uid, "projects", "mainprojects");
            const data = await getDoc(dataref);
            const projects = data.data()?.data[projectindex];
            const webdata = projects?.webdata
            setdata(webdata)
          }
          catch(err){
            console.log(err)
          }
        }
        }
        getprojectdata()
    }, [authuser, projectindex])

    return (
        <>
            <div className='bg-gray-800 flex gap-3 justify-center text-white p-2'>
                {devices.map((item, index) => (
                    <>
                        <item.icon className={`${item.name === widthmodename ? 'text-blue-600' : 'text-black-500'}`}
                            onClick={() => {
                                setwidthmodename(item.name)
                                setwidth(item.value)
                            }
                            }
                        />
                    </>
                ))}
            </div>
            <div>
                <div style={{
                    width: `${width}`,
                    height: "95vh",
                    margin: "auto",
                    borderWidth: "1px",
                    borderStyle: "solid",
                    borderColor: "gray",
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
                            Login to see preview
                        </div>
                    )}


                </div>
            </div>
        </>
    )
}

export default Page