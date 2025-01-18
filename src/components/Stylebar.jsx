import React, { useState, useContext, useEffect } from "react"
import { GlobalContext } from '@/Context'
import Rangeslider from './sidebarcomponents/Rangeslider';
import Marginrangeslider from '@/components/sidebarcomponents/Marginrangeslider'
import '../app/globals.css'
import { MdOutlineClose } from "react-icons/md";

import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase/firebase"


const Stylebar = () => {


    const { data, setdata } = useContext(GlobalContext)
    const { undo, setundo } = useContext(GlobalContext)
    const { redo, setredo } = useContext(GlobalContext)
    let tempdata = JSON.parse(JSON.stringify(data));

    const { layetelementpath, setlayerelementpath } = useContext(GlobalContext)
    const { widthmodename, setwidthmodename } = useContext(GlobalContext)

    const { childpath, parentpath, childindex } = useContext(GlobalContext)

    const { openstylebar, setopenstylebar } = useContext(GlobalContext)

    const { projectindex, setprojectindex } = useContext(GlobalContext)
    const { authuser } = useContext(GlobalContext)

    const { imageUrl } = useContext(GlobalContext)

    const [stylebargallery, setstylebargalley] = useState(false)



    const [width, setwidth] = useState(0)
    const [height, setheight] = useState(0)
    const [widthmode, setwidthmode] = useState("widthcustom")
    const [heightmode, setheightmode] = useState("heightcustom")
    const [position, setposition] = useState("")
    const [top, settop] = useState(0)
    const [right, setright] = useState(0)
    const [left, setleft] = useState(0)
    const [bottom, setbottom] = useState(0)
    const [display, setdisplay] = useState("")
    const [flexdirection, setflexdirection] = useState("")
    const [zindex, setzindex] = useState()


    const [justifycontent, setjustifycontent] = useState("")
    const [alignitems, setalignitems] = useState("")
    const [flexwrap, setflexwrap] = useState("")


    const [textcolor, settextcolor] = useState("#000000");
    const [fontsize, setfontsize] = useState(0);
    const [fontfamily, setfontfamily] = useState("Arial");
    const [fontweight, setfontweight] = useState("normal");
    const [textalign, settextalign] = useState("left");
    const [lineheight, setlineheight] = useState(0);

    const [border, setborder] = useState("")
    const [backgroundmode, setbackgroundmode] = useState("")
    const [backgroundcolor, setbackgroundcolor] = useState("#ffffff")
    const [backgroundimage, setbackgroundimage] = useState("");
    const [backgroundrepeat, setbackgroundrepeat] = useState('no-repeat');
    const [backgroundposition, setbackgroundposition] = useState('top left');
    const [backgroundsize, setbackgroundsize] = useState('auto');
    const [opacity, setopacity] = useState(100)

    const [bordercolor, setbordercolor] = useState("#000000");
    const [borderstyle, setborderstyle] = useState("none");
    const [borderwidth, setborderwidth] = useState("1px");
    const [borderradius, setborderradius] = useState(0);


    const [marginTop, setMarginTop] = useState(0);
    const [marginRight, setMarginRight] = useState(0);
    const [marginBottom, setMarginBottom] = useState(0);
    const [marginLeft, setMarginLeft] = useState(0);

    const [paddingTop, setPaddingTop] = useState(0);
    const [paddingRight, setPaddingRight] = useState(0);
    const [paddingBottom, setPaddingBottom] = useState(0);
    const [paddingLeft, setPaddingLeft] = useState(0);


    useEffect(() => {
        const path = eval(layetelementpath)
        if (layetelementpath !== "" && path !== undefined) {

            setwidth(path.css[widthmodename].width)
            setheight(path.css[widthmodename].height)
            setwidthmode(path.css[widthmodename].widthmode)
            setheightmode(path.css[widthmodename].heightmode)
            setposition(path.css[widthmodename].position)
            settop(path.css[widthmodename].top)
            setright(path.css[widthmodename].right)
            setleft(path.css[widthmodename].left)
            setbottom(path.css[widthmodename].bottom)
            setdisplay(path.css[widthmodename].display)
            setflexdirection(path.css[widthmodename].flexdirection)
            setzindex(path.css[widthmodename].zindex)

            setjustifycontent(path.css[widthmodename].justifyContent)
            setalignitems(path.css[widthmodename].alignItems)
            setflexwrap(path.css[widthmodename].flexWrap)

            settextcolor(path.css[widthmodename].color)
            setfontsize(path.css[widthmodename].fontSize)
            setfontfamily(path.css[widthmodename].fontFamily)
            setfontweight(path.css[widthmodename].fontWeight)
            settextalign(path.css[widthmodename].textAlign)
            setlineheight(path.css[widthmodename].lineHeight)

            setborder(path.css[widthmodename].border)
            setbackgroundmode(path.css[widthmodename].backgroundmode)
            setbackgroundcolor(path.css[widthmodename].backgroundcolor)
            setopacity(path.css[widthmodename].opacity)


            setbordercolor(path.css[widthmodename].borderColor)
            setborderstyle(path.css[widthmodename].borderStyle)
            setborderwidth(path.css[widthmodename].borderWidth)
            setborderradius(path.css[widthmodename].borderRadius)

            // Update margin
            setMarginTop(path.css[widthmodename].margintop);
            setMarginRight(path.css[widthmodename].marginright);
            setMarginBottom(path.css[widthmodename].marginbottom);
            setMarginLeft(path.css[widthmodename].marginleft);

            // Update padding
            setPaddingTop(path.css[widthmodename].paddingtop);
            setPaddingRight(path.css[widthmodename].paddingright);
            setPaddingBottom(path.css[widthmodename].paddingbottom);
            setPaddingLeft(path.css[widthmodename].paddingleft);

            //IMAGE
            setbackgroundrepeat(path.css.backgroundrepeat);
            setbackgroundposition(path.css.backgroundposition);
            setbackgroundsize(path.css.backgroundsize);

        }

    }, [layetelementpath, widthmodename, data])


    async function undoredo(tempdata) {
        try {
            const pindex = projectindex;
            const dataref = doc(db, "website", authuser.uid, "projects", "mainprojects");
            const data = await getDoc(dataref);
            let webdata;

            setundo((prevundo) => {
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



    return (
        <>

            {openstylebar ?

                <div className='absolute z-40 right-0 top-0 border-2 bg-white max-w-96 h-screen pt-9 p-4 overflow-y-scroll'>
                    <div className="py-6 bg-white sticky top-0">
                        <div className="bg-gray-600 p-2 flex items-center justify-between rounded">
                            <p className="text-white p-1 rounded">Stylebar</p>
                            <MdOutlineClose
                                className="text-2xl text-white cursor-pointer hover:text-gray-300 transition duration-200"
                                onClick={() => setopenstylebar(false)}
                            />
                        </div>
                    </div>


                    {layetelementpath === "" ?
                        <div >select an element
                        </div>
                        :
                        <div>
                            <div>
                                <button
                                    onClick={() => {
                                        let tempdata = JSON.parse(JSON.stringify(data));
                                        let tempparentpath = `${parentpath}.Components`;
                                        let realparentpath = eval(tempparentpath);

                                        if (realparentpath === null) {
                                            return;
                                        }

                                        realparentpath.splice(childindex, 1);
                                        setdata(tempdata);
                                        setlayerelementpath("");
                                    }}
                                    className="bg-red-950 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 ease-in-out"
                                >
                                    Delete element
                                </button>

                                {/* whole width and height style  */}
                                <div className="pt-6">
                                    <p className="bg-green-500 text-white p-2 rounded">Size properties</p>

                                    <div className="flex justify-between my-6">
                                        {/* Width */}
                                        <div className="flex gap-2 items-center">
                                            <p className="font-medium">W</p>
                                            <div
                                                className={`flex items-center gap-2 border rounded-md p-2 w-fit transition-all duration-300 ${widthmode !== 'widthcustom' ? 'bg-gray-100 border-gray-300' : 'border-blue-400'
                                                    }`}
                                            >
                                                <div
                                                    className="outline-none text-gray-800 min-w-[40px] text-center"
                                                    contentEditable={widthmode === 'widthcustom' || widthmode === ''}
                                                    onBlur={(e) => {
                                                        const newwidth = e.target.innerText;
                                                        if (newwidth !== '' && newwidth > 0 && typeof newwidth !== 'number') {
                                                            const tempdata = JSON.parse(JSON.stringify(data));
                                                            const path = eval(layetelementpath);
                                                            path.css[widthmodename].width = newwidth;
                                                            undoredo(tempdata);
                                                        }
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            e.target.blur();
                                                        }
                                                    }}
                                                >
                                                    {width}
                                                </div>
                                                <span contentEditable={false}>px</span>
                                            </div>
                                        </div>

                                        {/* Height */}
                                        <div className="flex gap-2 items-center">
                                            <p className="font-medium">H</p>
                                            <div
                                                className={`flex items-center gap-2 border rounded-md p-2 w-fit transition-all duration-300 ${heightmode !== 'heightcustom' ? 'bg-gray-100 border-gray-300' : 'border-blue-400'
                                                    }`}
                                            >
                                                <div
                                                    className="outline-none text-gray-800 min-w-[40px] text-center"
                                                    contentEditable={heightmode === 'heightcustom' || heightmode === ''}
                                                    onBlur={(e) => {
                                                        const newheight = e.target.innerText;
                                                        setheight(newheight);
                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                        const path = eval(layetelementpath);
                                                        path.css[widthmodename].height = newheight;
                                                        undoredo(tempdata);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            e.target.blur();
                                                        }
                                                    }}
                                                >
                                                    {height}
                                                </div>
                                                <span contentEditable={false}>px</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        {/* Width Mode Select */}
                                        <div className="flex flex-col">
                                            <label className="font-medium mb-1">Width:</label>
                                            <select
                                                className="border rounded-md p-1"
                                                value={widthmode}
                                                onChange={(e) => {
                                                    const newwidthmode = e.target.value;
                                                    setwidthmode(newwidthmode);
                                                    const tempdata = JSON.parse(JSON.stringify(data));
                                                    const path = eval(layetelementpath);
                                                    path.css[widthmodename].widthmode = newwidthmode;
                                                    undoredo(tempdata);
                                                }}
                                            >
                                                <option value="widthcustom">Custom</option>
                                                <option value="100%">Screen</option>
                                                <option value="fit-content">Fit-content</option>
                                                <option value="min-content">Min-content</option>
                                                <option value="max-content">Max-content</option>
                                            </select>
                                        </div>

                                        {/* Height Mode Select */}
                                        <div className="flex flex-col">
                                            <label className="font-medium mb-1">Height:</label>
                                            <select
                                                className="border rounded-md p-1"
                                                value={heightmode}
                                                onChange={(e) => {
                                                    const newheightmode = e.target.value;
                                                    setheightmode(newheightmode);
                                                    const tempdata = JSON.parse(JSON.stringify(data));
                                                    const path = eval(layetelementpath);
                                                    path.css[widthmodename].heightmode = newheightmode;
                                                    undoredo(tempdata);
                                                }}
                                            >
                                                <option value="heightcustom">Custom</option>
                                                <option value="100%">Screen</option>
                                                <option value="fit-content">Fit-content</option>
                                                <option value="min-content">Min-content</option>
                                                <option value="max-content">Max-content</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>






                            </div>

                            <div className="py-6 space-y-6 rounded-lg ">
                                {/* Position Section */}
                                <p className="bg-green-500 text-white p-2 rounded">Display properties</p>
                                <div className="flex items-center gap-4">
                                    <label className="font-medium text-gray-800">Position:</label>
                                    <select
                                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
                                        value={position}
                                        onChange={(e) => {
                                            const newposition = e.target.value;
                                            setposition(newposition);
                                            const tempdata = JSON.parse(JSON.stringify(data));
                                            const path = eval(layetelementpath);
                                            path.css[widthmodename].position = newposition;
                                            undoredo(tempdata);
                                        }}
                                    >
                                        <option value="static">static</option>
                                        <option value="relative">relative</option>
                                        <option value="absolute">absolute</option>
                                        <option value="fixed">fixed</option>
                                        <option value="sticky">sticky</option>
                                    </select>
                                </div>

                                {position !== "static" && (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4">
                                            <span className="font-medium text-gray-700">Y-Axis:</span>
                                            <div
                                                className="border-b border-gray-300 px-2 focus:border-blue-400 focus:outline-none"
                                                contentEditable
                                                onBlur={(e) => {
                                                    const newtop = e.target.innerText.trim();
                                                    settop(newtop);
                                                    const tempdata = JSON.parse(JSON.stringify(data));
                                                    const path = eval(layetelementpath);
                                                    path.css[widthmodename].top = newtop;
                                                    undoredo(tempdata);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        e.target.blur();
                                                    }
                                                }}
                                            >
                                                {top}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <span className="font-medium text-gray-700">X-Axis:</span>
                                            <div
                                                className="border-b border-gray-300 px-2 focus:border-blue-400 focus:outline-none"
                                                contentEditable
                                                onBlur={(e) => {
                                                    const newleft = e.target.innerText.trim();
                                                    setleft(newleft);
                                                    const tempdata = JSON.parse(JSON.stringify(data));
                                                    const path = eval(layetelementpath);
                                                    path.css[widthmodename].left = newleft;
                                                    undoredo(tempdata);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        e.target.blur();
                                                    }
                                                }}
                                            >
                                                {left}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Display Section */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <label className="font-medium text-gray-800">Display:</label>
                                        <select
                                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
                                            value={display}
                                            onChange={(e) => {
                                                const newdisplay = e.target.value;
                                                setdisplay(newdisplay);
                                                const tempdata = JSON.parse(JSON.stringify(data));
                                                const path = eval(layetelementpath);
                                                path.css[widthmodename].display = newdisplay;
                                                undoredo(tempdata);
                                            }}
                                        >
                                            <option value="block">block</option>
                                            <option value="inline">inline</option>
                                            <option value="flex">flex</option>
                                        </select>
                                    </div>

                                    {display === "flex" && (
                                        <div className="space-y-4">
                                            <p className="bg-gray-500 text-white p-2 rounded">Flex Properties</p>

                                            <div className="flex items-center gap-4">
                                                <label className="font-medium text-gray-700">Flex Direction:</label>
                                                <select
                                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
                                                    value={flexdirection}
                                                    onChange={(e) => {
                                                        const newflexdirection = e.target.value;
                                                        setflexdirection(newflexdirection);
                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                        const path = eval(layetelementpath);
                                                        path.css[widthmodename].flexdirection = newflexdirection;
                                                        undoredo(tempdata);
                                                    }}
                                                >
                                                    <option value="row">row</option>
                                                    <option value="column">column</option>
                                                    <option value="row-reverse">row-reverse</option>
                                                    <option value="column-reverse">column-reverse</option>
                                                </select>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <label className="font-medium text-gray-700">Flex Wrap:</label>
                                                <select
                                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
                                                    value={flexwrap}
                                                    onChange={(e) => {
                                                        const newflexwrap = e.target.value;
                                                        setflexwrap(newflexwrap);
                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                        const path = eval(layetelementpath);
                                                        path.css[widthmodename].flexWrap = newflexwrap;
                                                        undoredo(tempdata);
                                                    }}
                                                >
                                                    <option value="nowrap">nowrap</option>
                                                    <option value="wrap">wrap</option>
                                                    <option value="wrap-reverse">wrap-reverse</option>
                                                </select>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <label className="font-medium text-gray-700">Justify Content:</label>
                                                <select
                                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
                                                    value={justifycontent}
                                                    onChange={(e) => {
                                                        const newjustifycontent = e.target.value;
                                                        setjustifycontent(newjustifycontent);
                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                        const path = eval(layetelementpath);
                                                        path.css[widthmodename].justifyContent = newjustifycontent;
                                                        undoredo(tempdata);
                                                    }}
                                                >
                                                    <option value="flex-start">start</option>
                                                    <option value="center">center</option>
                                                    <option value="space-between">space-between</option>
                                                    <option value="space-around">space-around</option>
                                                    <option value="space-evenly">space-evenly</option>
                                                </select>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <label className="font-medium text-gray-700">Align Items:</label>
                                                <select
                                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-600"
                                                    value={alignitems}
                                                    onChange={(e) => {
                                                        const newalignitems = e.target.value;
                                                        setalignitems(newalignitems);
                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                        const path = eval(layetelementpath);
                                                        path.css[widthmodename].alignItems = newalignitems;
                                                        undoredo(tempdata);
                                                    }}
                                                >
                                                    <option value="flex-start">start</option>
                                                    <option value="center">center</option>
                                                    <option value="flex-end">end</option>
                                                    <option value="stretch">stretch</option>
                                                    <option value="baseline">baseline</option>
                                                </select>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center gap-4">
                                    <p className="font-medium text-gray-700">Z-index:</p>
                                    <input
                                        type="number"
                                        min="0"
                                        step="1"
                                        value={zindex}
                                        onChange={(e) => {
                                            const newZIndex = e.target.value;
                                            const tempdata = JSON.parse(JSON.stringify(data));
                                            const path = eval(layetelementpath);
                                            path.css[widthmodename].zindex = newZIndex;
                                            undoredo(tempdata);
                                        }}
                                        className="w-20 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                            </div>


                            <p className="bg-green-500 text-white p-2 rounded">Text properties</p>
                            <div className="py-6 space-y-6">
                                {/* Font Size Control */}
                                <div className="flex items-center gap-2">
                                    <span>Font Size:</span>
                                    <div className="flex items-center gap-1 border rounded px-2">
                                        <div
                                            className="w-16 p-1"
                                            contentEditable
                                            onBlur={(e) => {
                                                const newfontsize = e.target.innerText;
                                                setfontsize(newfontsize);
                                                const tempdata = JSON.parse(JSON.stringify(data));
                                                const path = eval(layetelementpath);
                                                path.css[widthmodename].fontSize = newfontsize;
                                                undoredo(tempdata);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    e.target.blur();
                                                }
                                            }}
                                        >
                                            {fontsize}
                                        </div>
                                        <span>px</span>
                                    </div>
                                    <Rangeslider
                                        min={0}
                                        max={100}
                                        layetelementpath={layetelementpath}
                                        cssvalue="fontSize"
                                        actualvalue={fontsize}
                                    />
                                </div>

                                {/* Text Color Picker */}
                                <div className="flex items-center gap-2">
                                    <span>Text Color:</span>
                                    <input
                                        type="color"
                                        className="w-12 h-8"
                                        value={textcolor}
                                        onChange={(e) => {
                                            const newcolor = e.target.value;
                                            settextcolor(newcolor);
                                            const tempdata = JSON.parse(JSON.stringify(data));
                                            const path = eval(layetelementpath);
                                            path.css[widthmodename].color = newcolor;
                                            setdata(tempdata);
                                        }}
                                        onBlur={(e) => {
                                            const newcolor = e.target.value;
                                            settextcolor(newcolor);
                                            const tempdata = JSON.parse(JSON.stringify(data));
                                            const path = eval(layetelementpath);
                                            path.css[widthmodename].color = newcolor;
                                            undoredo(tempdata);
                                        }}
                                    />
                                </div>

                                {/* Font Family Selector */}
                                <div className="flex items-center gap-2">
                                    <span>Font Family:</span>
                                    <select
                                        className="p-1 border rounded"
                                        value={fontfamily}
                                        onChange={(e) => {
                                            const newfontfamily = e.target.value;
                                            setfontfamily(newfontfamily);
                                            const tempdata = JSON.parse(JSON.stringify(data));
                                            const path = eval(layetelementpath);
                                            path.css[widthmodename].fontFamily = newfontfamily;
                                            undoredo(tempdata);
                                        }}
                                    >
                                        <option value="Arial">Arial</option>
                                        <option value="Verdana">Verdana</option>
                                        <option value="Helvetica">Helvetica</option>
                                        <option value="Times New Roman">Times New Roman</option>
                                        <option value="Courier New">Courier New</option>
                                    </select>
                                </div>

                                {/* Font Weight Selector */}
                                <div className="flex items-center gap-2">
                                    <span>Font Weight:</span>
                                    <select
                                        className="p-1 border rounded"
                                        value={fontweight}
                                        onChange={(e) => {
                                            const newfontweight = e.target.value;
                                            setfontweight(newfontweight);
                                            const tempdata = JSON.parse(JSON.stringify(data));
                                            const path = eval(layetelementpath);
                                            path.css[widthmodename].fontWeight = newfontweight;
                                            undoredo(tempdata);
                                        }}
                                    >
                                        <option value="normal">normal</option>
                                        <option value="bold">bold</option>
                                        <option value="bolder">bolder</option>
                                        <option value="lighter">lighter</option>
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                        <option value="300">300</option>
                                        <option value="400">400</option>
                                        <option value="500">500</option>
                                        <option value="600">600</option>
                                        <option value="700">700</option>
                                        <option value="800">800</option>
                                        <option value="900">900</option>
                                    </select>
                                </div>

                                {/* Text Align Selector */}
                                <div className="flex items-center gap-2">
                                    <span>Text Align:</span>
                                    <select
                                        className="p-1 border rounded"
                                        value={textalign}
                                        onChange={(e) => {
                                            const newtextalign = e.target.value;
                                            settextalign(newtextalign);
                                            const tempdata = JSON.parse(JSON.stringify(data));
                                            const path = eval(layetelementpath);
                                            path.css[widthmodename].textAlign = newtextalign;
                                            undoredo(tempdata);
                                        }}
                                    >
                                        <option value="left">left</option>
                                        <option value="right">right</option>
                                        <option value="center">center</option>
                                        <option value="justify">justify</option>
                                    </select>
                                </div>

                                {/* Line Height Control */}
                                <div className="flex items-center gap-2">
                                    <span>Line Height:</span>
                                    <div className="flex items-center gap-1 border rounded px-2">
                                        <div
                                            className="w-16 p-1"
                                            contentEditable
                                            onBlur={(e) => {
                                                const newlineheight = e.target.innerText;
                                                setfontsize(newlineheight);
                                                const tempdata = JSON.parse(JSON.stringify(data));
                                                const path = eval(layetelementpath);
                                                path.css[widthmodename].lineHeight = newlineheight;
                                                undoredo(tempdata);
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    e.preventDefault();
                                                    e.target.blur();
                                                }
                                            }}
                                        >
                                            {lineheight}
                                        </div>
                                        <span>px</span>
                                    </div>
                                </div>
                            </div>


                            <div className="space-y-6 bg-white">
                                <p className="bg-green-500 text-white p-2 rounded">Background Properties</p>
                                <div className="flex items-center gap-4">
                                    <label >Background:</label>
                                    <div className="selectcontainer-css">
                                        <select
                                            className="select-css border rounded p-1"
                                            value={backgroundmode}
                                            onChange={(e) => {
                                                const newbackgroundmode = e.target.value;
                                                setbackgroundmode(newbackgroundmode);
                                                const tempdata = JSON.parse(JSON.stringify(data));
                                                const path = eval(layetelementpath);
                                                path.css[widthmodename].backgroundmode = newbackgroundmode;
                                                undoredo(tempdata);
                                            }}
                                        >
                                            <option value="color">Color</option>
                                            <option value="image">Image</option>
                                            <option value="none">None</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2">
                                        <label >Opacity:</label>
                                        <div className="flex items-center border rounded px-2">
                                            <div
                                                onBlur={(e) => {
                                                    const newOpacity = e.target.innerText;
                                                    setopacity(newOpacity);
                                                    const tempdata = JSON.parse(JSON.stringify(data));
                                                    const path = eval(layetelementpath);
                                                    path.css[widthmodename].opacity = newOpacity;
                                                    undoredo(tempdata);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Enter") {
                                                        e.preventDefault();
                                                        e.target.blur();
                                                    }
                                                }}
                                                contentEditable={true}
                                                className="min-w-10 p-1"
                                            >
                                                {opacity}
                                            </div>
                                            <span>%</span>
                                        </div>
                                    </div>
                                    <Rangeslider min={0} max={100} layetelementpath={layetelementpath} cssvalue={"opacity"} actualvalue={opacity} />
                                </div>

                                {backgroundmode === "color" && (
                                    <div className="flex items-center gap-2">
                                        <label >Background Color:</label>
                                        <input
                                            className="w-12 h-8 border rounded"
                                            value={backgroundcolor}
                                            onChange={(e) => {
                                                const newcolor = e.target.value;
                                                setbackgroundcolor(newcolor);
                                                const tempdata = JSON.parse(JSON.stringify(data));
                                                const path = eval(layetelementpath);
                                                path.css[widthmodename].backgroundcolor = newcolor;
                                                setdata(tempdata);
                                            }}
                                            onBlur={(e) => {
                                                const newcolor = e.target.value;
                                                setbackgroundcolor(newcolor);
                                                const tempdata = JSON.parse(JSON.stringify(data));
                                                const path = eval(layetelementpath);
                                                path.css[widthmodename].backgroundcolor = newcolor;
                                                undoredo(tempdata);
                                            }}
                                            type="color"
                                        />
                                    </div>
                                )}
                                {backgroundmode === "image" && (
                                    <div className="items-center">
                                        <div>
                                            <label >Background Image :</label>
                                            <span onClick={() => setstylebargalley(true)} className="border-2 mx-3 px-3 text-white bg-blue-500 rounded">select</span>
                                        </div>

                                        {
                                            stylebargallery === true ? (
                                                <div className="my-5 border-2 ">

                                                    <div className="flex justify-between p-2 text-white bg-green-500 rounded-lg">
                                                        <div>images</div>

                                                        <MdOutlineClose
                                                            className="text-2xl text-white cursor-pointer hover:text-gray-300 transition duration-200"
                                                            onClick={() => setstylebargalley(false)}
                                                        />

                                                    </div>

                                                    <div className='flex flex-wrap'>
                                                        {imageUrl && imageUrl.map((url, index) => (
                                                            <>
                                                                <div className="w-1/2 p-2"
                                                                    onClick={(e) => {
                                                                        const newbackgroundimage = url;
                                                                        setbackgroundimage(newbackgroundimage);
                                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                                        const path = eval(layetelementpath);
                                                                        path.css.lg.backgroundimage = newbackgroundimage ? newbackgroundimage : 'none';
                                                                        path.css.md.backgroundimage = newbackgroundimage ? newbackgroundimage : 'none';
                                                                        path.css.sm.backgroundimage = newbackgroundimage ? newbackgroundimage : 'none';
                                                                        undoredo(tempdata);
                                                                    }}>

                                                                    <img
                                                                        key={index}
                                                                        src={url}
                                                                        alt={`Image ${index}`}
                                                                        
                                                                    />

                                                                </div>
                                                            </>
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : null
                                        }

                                        <div className="selectcontainer-css py-4">
                                            <label>Background Repeat:</label>
                                            <select
                                                className="select-css border rounded p-1"
                                                value={backgroundrepeat}
                                                onChange={(e) => {
                                                    const newBackgroundRepeat = e.target.value;
                                                    setbackgroundrepeat(newBackgroundRepeat);
                                                    const tempdata = JSON.parse(JSON.stringify(data));
                                                    const path = eval(layetelementpath);
                                                    path.css[widthmodename].backgroundrepeat = newBackgroundRepeat;
                                                    undoredo(tempdata);
                                                }}
                                            >
                                                <option value="no-repeat">No Repeat</option>
                                                <option value="repeat">Repeat</option>
                                                <option value="repeat-x">Repeat Horizontally</option>
                                                <option value="repeat-y">Repeat Vertically</option>
                                                <option value="space">Space</option>
                                                <option value="round">Round</option>
                                            </select>
                                        </div>

                                        <div className="selectcontainer-css py-4">
                                            <label>Background Position:</label>
                                            <select
                                                className="select-css border rounded p-1"
                                                value={backgroundposition}
                                                onChange={(e) => {
                                                    const newBackgroundPosition = e.target.value;
                                                    setbackgroundposition(newBackgroundPosition);
                                                    const tempdata = JSON.parse(JSON.stringify(data));
                                                    const path = eval(layetelementpath);
                                                    path.css[widthmodename].backgroundposition = newBackgroundPosition;
                                                    undoredo(tempdata);
                                                }}
                                            >
                                                <option value="top left">Top Left</option>
                                                <option value="top center">Top Center</option>
                                                <option value="top right">Top Right</option>
                                                <option value="center left">Center Left</option>
                                                <option value="center center">Center Center</option>
                                                <option value="center right">Center Right</option>
                                                <option value="bottom left">Bottom Left</option>
                                                <option value="bottom center">Bottom Center</option>
                                                <option value="bottom right">Bottom Right</option>
                                            </select>
                                        </div>

                                        <div className="selectcontainer-css py-4">
                                            <label>Background Size:</label>
                                            <select
                                                className="select-css border rounded p-1"
                                                value={backgroundsize}
                                                onChange={(e) => {
                                                    const newBackgroundSize = e.target.value;
                                                    setbackgroundsize(newBackgroundSize);
                                                    const tempdata = JSON.parse(JSON.stringify(data));
                                                    const path = eval(layetelementpath);
                                                    path.css[widthmodename].backgroundsize = newBackgroundSize;
                                                    undoredo(tempdata);
                                                }}
                                            >
                                                <option value="auto">Auto</option>
                                                <option value="cover">Cover</option>
                                                <option value="contain">Contain</option>
                                                <option value="100% 100%">100% 100%</option>
                                            </select>
                                        </div>


                                    </div>
                                )}

                                <div >
                                    <p className="bg-green-500 text-white p-2 rounded">Border Properties</p>
                                    <div className="flex items-center gap-2 pt-6">
                                        <label >Border:</label>
                                        <input
                                            checked={border}
                                            onChange={(e) => {
                                                const tempdata = JSON.parse(JSON.stringify(data));
                                                const path = eval(layetelementpath);
                                                path.css[widthmodename].border = !border;
                                                setborder(!border);
                                                undoredo(tempdata);
                                            }}
                                            type="checkbox"
                                        />
                                    </div>
                                </div>

                                {border && (
                                    <>
                                        <div className="flex items-center gap-2">
                                            <label>Border Color:</label>
                                            <input
                                                className="w-12 h-8 border rounded"
                                                value={bordercolor}
                                                onChange={(e) => {
                                                    const newcolor = e.target.value;
                                                    setbordercolor(newcolor);
                                                    const tempdata = JSON.parse(JSON.stringify(data));
                                                    const path = eval(layetelementpath);
                                                    path.css[widthmodename].borderColor = newcolor;
                                                    undoredo(tempdata);
                                                }}
                                                type="color"
                                            />
                                        </div>

                                        <div className="selectcontainer-css">
                                            <label >Border Style:</label>
                                            <select
                                                className="select-css border rounded p-1"
                                                value={borderstyle}
                                                onChange={(e) => {
                                                    const newborderstyle = e.target.value;
                                                    setborderstyle(newborderstyle);
                                                    const tempdata = JSON.parse(JSON.stringify(data));
                                                    const path = eval(layetelementpath);
                                                    path.css[widthmodename].borderStyle = newborderstyle;
                                                    undoredo(tempdata);
                                                }}
                                            >
                                                <option value="none">None</option>
                                                <option value="solid">Solid</option>
                                                <option value="dotted">Dotted</option>
                                                <option value="dashed">Dashed</option>
                                                <option value="double">Double</option>
                                                <option value="groove">Groove</option>
                                                <option value="ridge">Ridge</option>
                                                <option value="inset">Inset</option>
                                                <option value="outset">Outset</option>
                                            </select>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <label>Border Width:</label>
                                            <div className="flex items-center border rounded px-2">
                                                <div
                                                    onBlur={(e) => {
                                                        const newwidth = e.target.innerText;
                                                        setborderwidth(newwidth);
                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                        const path = eval(layetelementpath);
                                                        path.css[widthmodename].borderWidth = newwidth;
                                                        undoredo(tempdata);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            e.target.blur();
                                                        }
                                                    }}
                                                    contentEditable={true}
                                                    className="min-w-10 p-1"
                                                >
                                                    {borderwidth}
                                                </div>
                                                <span>px</span>
                                            </div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="flex items-center gap-2">
                                                <label >Border Radius:</label>
                                                <div className="flex items-center border rounded px-2">
                                                    <div
                                                        onBlur={(e) => {
                                                            const newborderradius = e.target.innerText;
                                                            setborderradius(newborderradius);
                                                            const tempdata = JSON.parse(JSON.stringify(data));
                                                            const path = eval(layetelementpath);
                                                            path.css[widthmodename].borderRadius = newborderradius;
                                                            undoredo(tempdata);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === "Enter") {
                                                                e.preventDefault();
                                                                e.target.blur();
                                                            }
                                                        }}
                                                        contentEditable={true}
                                                        className="min-w-10 p-1"
                                                    >
                                                        {borderradius}
                                                    </div>
                                                    <span>px</span>
                                                </div>
                                            </div>
                                            <Rangeslider min={0} max={100} layetelementpath={layetelementpath} cssvalue={"borderRadius"} actualvalue={borderradius} />
                                        </div>
                                    </>
                                )}
                            </div>


                            <div>
                                <div className="py-6">
                                    <p className="bg-green-500 text-white p-2 rounded text-center">Margin</p>
                                    <div className="flex items-center py-4">
                                        <p className="font-medium mr-4">Margin ALL</p>
                                        <Marginrangeslider
                                            min={0}
                                            max={100}
                                            layetelementpath={layetelementpath}
                                            top={"margintop"}
                                            right={"marginright"}
                                            bottom={"marginbottom"}
                                            left={"marginleft"}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Top Margin */}
                                        <div className="flex flex-col gap-2">
                                            <p className="font-medium">Top</p>
                                            <div className="w-fit flex items-center border border-gray-300 rounded-md p-2">
                                                <div
                                                    onBlur={(e) => {
                                                        const marginTop = e.target.innerText;
                                                        setMarginTop(marginTop);
                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                        const path = eval(layetelementpath);
                                                        path.css[widthmodename].margintop = marginTop;
                                                        undoredo(tempdata);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            e.target.blur();
                                                        }
                                                    }}
                                                    className="min-w-10 max-w-[80px] outline-none"
                                                    contentEditable
                                                >
                                                    {marginTop}
                                                </div>
                                                <span className="ml-2">px</span>
                                            </div>
                                        </div>

                                        {/* Right Margin */}
                                        <div className="flex flex-col gap-2">
                                            <p className="font-medium">Right</p>
                                            <div className="w-fit flex items-center border border-gray-300 rounded-md p-2">
                                                <div
                                                    onBlur={(e) => {
                                                        const marginRight = e.target.innerText;
                                                        setMarginRight(marginRight);
                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                        const path = eval(layetelementpath);
                                                        path.css[widthmodename].marginright = marginRight;
                                                        undoredo(tempdata);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            e.target.blur();
                                                        }
                                                    }}
                                                    className="min-w-10 max-w-[80px] outline-none"
                                                    contentEditable
                                                >
                                                    {marginRight}
                                                </div>
                                                <span className="ml-2">px</span>
                                            </div>
                                        </div>

                                        {/* Bottom Margin */}
                                        <div className="flex flex-col gap-2">
                                            <p className="font-medium">Bottom</p>
                                            <div className="w-fit flex items-center border border-gray-300 rounded-md p-2">
                                                <div
                                                    onBlur={(e) => {
                                                        const marginBottom = e.target.innerText;
                                                        setMarginBottom(marginBottom);
                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                        const path = eval(layetelementpath);
                                                        path.css[widthmodename].marginbottom = marginBottom;
                                                        undoredo(tempdata);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            e.target.blur();
                                                        }
                                                    }}
                                                    className="min-w-10 max-w-[80px] outline-none"
                                                    contentEditable
                                                >
                                                    {marginBottom}
                                                </div>
                                                <span className="ml-2">px</span>
                                            </div>
                                        </div>

                                        {/* Left Margin */}
                                        <div className="flex flex-col gap-2">
                                            <p className="font-medium">Left</p>
                                            <div className="w-fit flex items-center border border-gray-300 rounded-md p-2">
                                                <div
                                                    onBlur={(e) => {
                                                        const marginLeft = e.target.innerText;
                                                        setMarginLeft(marginLeft);
                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                        const path = eval(layetelementpath);
                                                        path.css[widthmodename].marginleft = marginLeft;
                                                        undoredo(tempdata);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            e.target.blur();
                                                        }
                                                    }}
                                                    className="min-w-10 max-w-[80px] outline-none"
                                                    contentEditable
                                                >
                                                    {marginLeft}
                                                </div>
                                                <span className="ml-2">px</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="py-6">
                                    <p className="bg-green-500 text-white p-2 rounded text-center">Padding</p>
                                    <div className="flex items-center py-6">
                                        <p className="font-medium mr-4">Padding ALL</p>
                                        <Marginrangeslider
                                            min={0}
                                            max={100}
                                            layetelementpath={layetelementpath}
                                            top={"paddingtop"}
                                            right={"paddingright"}
                                            bottom={"paddingbottom"}
                                            left={"paddingleft"}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        {/* Top Padding */}
                                        <div className="flex flex-col gap-2">
                                            <p className="font-medium">Top</p>
                                            <div className="w-fit flex items-center border border-gray-300 rounded-md p-2">
                                                <div
                                                    onBlur={(e) => {
                                                        const paddingTop = e.target.innerText;
                                                        setPaddingTop(paddingTop);
                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                        const path = eval(layetelementpath);
                                                        path.css[widthmodename].paddingtop = paddingTop;
                                                        undoredo(tempdata);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            e.target.blur();
                                                        }
                                                    }}
                                                    className="min-w-10 max-w-[80px] outline-none"
                                                    contentEditable
                                                >
                                                    {paddingTop}
                                                </div>
                                                <span className="ml-2">px</span>
                                            </div>
                                        </div>

                                        {/* Right Padding */}
                                        <div className="flex flex-col gap-2">
                                            <p className="font-medium">Right</p>
                                            <div className="w-fit flex items-center border border-gray-300 rounded-md p-2">
                                                <div
                                                    onBlur={(e) => {
                                                        const paddingRight = e.target.innerText;
                                                        setPaddingRight(paddingRight);
                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                        const path = eval(layetelementpath);
                                                        path.css[widthmodename].paddingright = paddingRight;
                                                        undoredo(tempdata);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            e.target.blur();
                                                        }
                                                    }}
                                                    className="min-w-10 max-w-[80px] outline-none"
                                                    contentEditable
                                                >
                                                    {paddingRight}
                                                </div>
                                                <span className="ml-2">px</span>
                                            </div>
                                        </div>

                                        {/* Bottom Padding */}
                                        <div className="flex flex-col gap-2">
                                            <p className="font-medium">Bottom</p>
                                            <div className="w-fit flex items-center border border-gray-300 rounded-md p-2">
                                                <div
                                                    onBlur={(e) => {
                                                        const paddingBottom = e.target.innerText;
                                                        setPaddingBottom(paddingBottom);
                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                        const path = eval(layetelementpath);
                                                        path.css[widthmodename].paddingbottom = paddingBottom;
                                                        undoredo(tempdata);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            e.target.blur();
                                                        }
                                                    }}
                                                    className="min-w-10 max-w-[80px] outline-none"
                                                    contentEditable
                                                >
                                                    {paddingBottom}
                                                </div>
                                                <span className="ml-2">px</span>
                                            </div>
                                        </div>

                                        {/* Left Padding */}
                                        <div className="flex flex-col gap-2">
                                            <p className="font-medium">Left</p>
                                            <div className="w-fit flex items-center border border-gray-300 rounded-md p-2">
                                                <div
                                                    onBlur={(e) => {
                                                        const paddingLeft = e.target.innerText;
                                                        setPaddingLeft(paddingLeft);
                                                        const tempdata = JSON.parse(JSON.stringify(data));
                                                        const path = eval(layetelementpath);
                                                        path.css[widthmodename].paddingleft = paddingLeft;
                                                        undoredo(tempdata);
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            e.target.blur();
                                                        }
                                                    }}
                                                    className="min-w-10 max-w-[80px] outline-none"
                                                    contentEditable
                                                >
                                                    {paddingLeft}
                                                </div>
                                                <span className="ml-2">px</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    }

                </div>
                : null}
        </>
    )


}

export default Stylebar