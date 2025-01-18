import React, { useState, useContext } from 'react';
import { BsLayers } from "react-icons/bs";
import { RiPagesLine, RiAccountCircleFill } from "react-icons/ri";
import { IoMdImages } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineClose } from "react-icons/md";
import { GlobalContext } from '@/Context';
import Quickadd from "@/components/sidebarcomponents/Quickadd";
import Layercomponent from "@/components/sidebarcomponents/Layercomponent";
import Pages from '@/components/sidebarcomponents/Pages';
import Gallery from '@/components/sidebarcomponents/Gallery';
import Link from 'next/link';

const Sidebar = () => {
    const { data } = useContext(GlobalContext);
    const [sidebarindex, setsidebarindex] = useState(null);

    const icons = [
        { icon: <FaPlus />, heading: "Quick Add", component: <Quickadd /> },
        { icon: <BsLayers />, heading: "Layers", component: <Layercomponent data={data} mainpath="tempdata" path="" /> },
        { icon: <RiPagesLine />, heading: "Pages", component: <Pages /> },
        { icon: <IoMdImages />, heading: "Gallery", component: <Gallery /> },
    ];

    function handlesidebarbuttonclick(index) {
        setsidebarindex(index);
    }

    return (
        <div className="flex z-30 h-screen absolute pt-10 pb-8 top-0 left-0 bg-white shadow-lg border-r border-gray-200">            {/* Sidebar icons section */}
            <div className='flex flex-col justify-between'>
                <div className="flex flex-col bg-gray-50 p-3 border-r border-gray-200 space-y-3">
                    {icons.map((item, index) => (
                        <button
                            key={index}
                            onClick={() => handlesidebarbuttonclick(index)}
                            className={`p-3 text-2xl rounded-md transition 
                            ${index === sidebarindex ? 'bg-blue-500 text-white shadow' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            {item.icon}
                        </button>

                    ))}

                </div>
                <Link href="/Accountpage" className='text-3xl flex justify-center text-gray-600 hover:text-gray-400'>
                 <RiAccountCircleFill />
                </Link>
            </div>

            {/* Sidebar content section */}
            {sidebarindex !== null && (
                <div className="p-3 border-l border-gray-200 bg-white shadow-md min-w-52 max-w-ft overflow-auto">
                    <div className="flex justify-between items-center mb-3">
                        <h1 className="text-md font-semibold">{icons[sidebarindex].heading}</h1>
                        <MdOutlineClose
                            className="text-2xl cursor-pointer text-gray-500 hover:text-red-500 transition"
                            onClick={() => setsidebarindex(null)}
                        />
                    </div>
                    {icons[sidebarindex].component}
                </div>
            )}

        </div>
    );
};

export default Sidebar;
