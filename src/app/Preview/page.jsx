'use client'
import { React, useContext, useState } from 'react'
import { RiComputerLine } from "react-icons/ri";
import { FaTabletAlt, FaMobileAlt } from "react-icons/fa";
import { GlobalContext } from '@/Context';
import Recursive from '@/components/Recursive';

const page = () => {

    const { data, setdata, authuser, widthmodename, setwidthmodename } = useContext(GlobalContext)

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

export default page