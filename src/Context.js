"use client"
import { Component, React, useState } from "react"
import { createContext } from "react";


export const GlobalContext = createContext({})

export const GlobalContextProvider = ({ children }) => {

  const [openstylebar, setopenstylebar] = useState(false)
  const [widthmodename, setwidthmodename] = useState("sm")
  const [width, setwidth] = useState("390px")
  const [layetelementpath, setlayerelementpath] = useState("")

  const [isdragging, setisdragging] = useState(false)
  const [isdragend, setisdragend] = useState(false)
  const [childpath, setchildpath] = useState(null)
  const [parentpath, setparentpath] = useState(null)
  const [childindex, setchildindex] = useState(null)
  const [draggedelementindex, setdraggedelementindex] = useState(null)
  const [draggedelementparent, setdraggedelementparent] = useState(null)
  const [quickaddcomponent, setquickaddcomponent] = useState(null)

  const [authuser, setauthuser] = useState(null)
  const [projectindex, setprojectindex] = useState(null)

  const [imageUrl, setImageUrl] = useState(null);


  // const [data, setdata] = useState([
  //   {
  //     tag: 'div',
  //     data: 'fffffffffffffffffffffffffffff',
  //     css: 'bg-gray-500 text-white p-4 m-2 ',
  //     Components: [

  //     ],
  //   },
  //   {
  //     tag: 'div',
  //     data: 'fffffffffffffffffffffffffffff',
  //     css: 'bg-gray-500 text-white p-4 m-2 ',
  //     Components: [
  //       {
  //         tag: 'p',
  //         data: 'this is paragraph',
  //         css: 'bg-blue-500 text-white',
  //       },
  //       {
  //         tag: 'span',
  //         data: 'this is span',
  //         css: 'bg-green-500 text-white',
  //       },
  //       {
  //         tag: 'div',
  //         data: 'this is div',
  //         css: 'bg-gray-500 text-white p-4 m-2',
  //         Components: [
  //           {
  //             tag: 'p',
  //             data: 'this is paragraph',
  //             css: 'bg-blue-500 text-white',
  //           },
  //           {
  //             tag: 'span',
  //             data: 'this is span',
  //             css: 'bg-green-500 text-white',
  //           },
  //           {
  //             tag: 'div',
  //             data: 'this is div',
  //             css: 'bg-gray-500 text-white p-4 h-fit',
  //             Components: [
  //               {
  //                 tag: 'p',
  //                 data: 'this is paragraph',
  //                 css: 'bg-blue-500 text-white text-4xl',
  //               },
  //               {
  //                 tag: 'span',
  //                 data: 'this is span',
  //                 css: 'bg-green-500 text-5xl text-white mt-4',
  //               },
  //               {
  //                 tag: "div",
  //                 data: "dragabblediv",
  //                 css: "bg-red-500 text-white p-4 h-fit",
  //                 Components: [

  //                 ]
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ]);

  const [data, setdata] = useState([

    {
      name: "Home",
      tag: "div",
      css: {
        lg:
        {
          editable: false,
          data: "container",
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
          backgroundimage : "",
          backgroundrepeat : "no-repeat",
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
          data: "container",
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
          backgroundimage : "",
          backgroundrepeat : "no-repeat",
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
          data: "container",
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
          backgroundimage : "",
          backgroundrepeat : "no-repeat",
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
  ]);
  const [undo, setundo] = useState([])
  const [redo, setredo] = useState([])





  return (
    <GlobalContext.Provider value={{ isdragend, setisdragend, childpath, setchildpath, parentpath, setparentpath, childindex, setchildindex, draggedelementindex, setdraggedelementindex, draggedelementparent, setdraggedelementparent, isdragging, setisdragging, quickaddcomponent, setquickaddcomponent, data, setdata, layetelementpath, setlayerelementpath, width, setwidth, widthmodename, setwidthmodename, undo, setundo, redo, setredo, openstylebar, setopenstylebar, authuser, setauthuser, projectindex, setprojectindex, imageUrl, setImageUrl }}>
      {children}
    </GlobalContext.Provider>
  )
}














