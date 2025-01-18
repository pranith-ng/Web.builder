// components/Recursive.js

import React, { useState, useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '@/Context';
import Stylebar from './Stylebar';
const Recursive = ({ data, setdata, mainpath, path }) => {

  const { isdragend, setisdragend } = useContext(GlobalContext)
  const { childpath, setchildpath, parentpath, setparentpath, childindex, setchildindex, draggedelementindex, setdraggedelementindex, draggedelementparent, setdraggedelementparent, isdragging, setisdragging } = useContext(GlobalContext)
  const { layetelementpath, setlayerelementpath } = useContext(GlobalContext)
  const { widthmodename, setwidthmodename } = useContext(GlobalContext)
  const { undoredoindex, setundoredoindex } = useContext(GlobalContext)
  const { openstylebar, setopenstylebar } = useContext(GlobalContext)
  const pathname = mainpath + path
  const [text, settext] = useState("\u00A0")



  function handleclick(event, index) {
    const layerdatakey = event.target.getAttribute("data-key")
    setlayerelementpath(layerdatakey)
    const datakey = event.target.getAttribute("data-index")
    setchildindex(datakey)
    const parentpath = event.target.parentElement.getAttribute("data-Key")
    setparentpath(parentpath)
    setopenstylebar(true)
    console.log("pathname", datakey, index)
  }

  function handledragenter(event) {

    const tagname = event.target.getAttribute("data-tag")
    if (tagname !== "div") {
      const layerdatakey = event.target.getAttribute("data-key")
      setlayerelementpath(layerdatakey)
      const datakey = event.target.getAttribute("data-index")
      setchildindex(datakey)
      const parentpath = event.target.parentElement.getAttribute("data-Key")
      setparentpath(parentpath)
      console.log(datakey)
    } else {
      const divpath = event.target.getAttribute("data-key")
      setparentpath(divpath)
      setlayerelementpath(divpath)
      const divlength = event.target.children.length
      setchildindex(divlength)
      console.log(divlength)
    }
  }

  function handleondragstart(event) {
    const tagcheck = event.target.getAttribute("data-tag")
    if (tagcheck === "div") {
      event.preventDefault()
    }
    setisdragging(true)
    setisdragend(false)
    const elementpath = event.target.getAttribute("data-key")
    setchildpath(elementpath)
    const draggedelementparentpath = event.target.parentElement.getAttribute("data-key")
    setdraggedelementparent(draggedelementparentpath)
    const dragggedelementpath = event.target.getAttribute("data-index")
    setdraggedelementindex(dragggedelementpath)
  }

  function handledragend() {
    setisdragend(true)
  }

  // function handledoubleclick(event) {
  //   // const layerdatakey = event.target.getAttribute("data-key")
  //   // let tempdata = JSON.parse(JSON.stringify(data))
  //   // const path = tempdata[0].Components[0]
  //   // console.log(path)

  //   // path.css[widthmodename].editable = true
  //   // setdata(tempdata)
  //   let tempdata = JSON.parse(JSON.stringify(data))
  //   const layerelementdata = eval(layetelementpath)
  //   layerelementdata.css[widthmodename].data = "fish"
  //   console.log(layerelementdata)
  // }

  function handledoubleclick(Tag) {
    let tempdata = JSON.parse(JSON.stringify(data));
    // const layerelementdata = eval(layetelementpath);
    // const tag = layerelementdata?.tag
    // console.log(tag)

    if(Tag !== "div"){
      try {
        const layerelementdata = eval(layetelementpath);
  
        if (layerelementdata && layerelementdata.css && layerelementdata.css[widthmodename]) {
          layerelementdata.css[widthmodename].editable = true;
          console.log(layerelementdata);
          setdata(tempdata);
        } else {
          console.error("Invalid path or missing css properties:", layerelementdata);
        }
      } catch (error) {
        console.error("Error evaluating layetelementpath with eval:", error);
      }
    } 
  }

  function handleinput(event) {
    settext(event.target.innerText)
    console.log(text)
  }

  function handleblur(Tag) {
    if(text !== "" && Tag !== "div"){
      let tempdata = JSON.parse(JSON.stringify(data))
    try {
      const layerelementdata = eval(layetelementpath);
      if (layerelementdata && layerelementdata.css && layerelementdata.css[widthmodename]) {
        layerelementdata.css[widthmodename].data = text? text : "\u00A0"
        layerelementdata.css[widthmodename].editable = false
        console.log(layerelementdata)
        setdata(tempdata)
        settext("")
      }
    }
    catch (error) {
      console.error(error)
    }
    }

  }


  function makecss(path) {

    return `
      width: ${path.widthmode === "100%" ? "100%" : path.widthmode === "widthcustom" || path.widthmode === "" ? `${path.width}px` : `${path.widthmode}`};
      height: ${path.heightmode === "100%" ? "100%" : path.heightmode === "heightcustom" || path.heightmode === "" ? `${path.height}px` : `${path.heightmode}`};

      ${path.backgroundmode === 'color' ?
        ` background-color : ${path.backgroundcolor};
      opacity : ${path.opacity / 100};`
        : ""}

      ${path.backgroundmode === 'none' ?
        ` background: none;`
        : ""}

      ${path.backgroundmode === 'image' && `
      background-image : url(${path.backgroundimage});
      opacity : ${path.opacity / 100};
      background-repeat : ${path.backgroundrepeat};
      background-position : ${path.backgroundposition};
      background-size : ${path.backgroundsize};
      `}
      
      position : ${path.position};
      top : ${path.top}px;
      left : ${path.left}px;

      display : ${path.display};
      flex-direction : ${path.flexdirection};
      flex-wrap : ${path.flexwrap};
      justify-content : ${path.justifyContent};
      align-items : ${path.alignitems};
      z-index : ${path.zindex};

      font-size : ${path.fontSize}px;
      color : ${path.color};
      font-family : ${path.fontFamily};
      font-weight : ${path.fontWeight};
      text-align: ${path.textAlign};
      line-height: ${path.lineHeight}px;

      ${path.border ?
        `border-color : ${path.borderColor} ;
        border-style : ${path.borderStyle} ;
        border-width : ${path.borderWidth}px ;
        border-radius : ${path.borderRadius}px ;
        `
        : ""
      }

      margin-top : ${path.margintop}px;
      margin-right : ${path.marginright}px;
      margin-bottom : ${path.marginbottom}px;
      margin-left : ${path.marginleft}px;

      padding-top : ${path.paddingtop}px;
      padding-right : ${path.paddingright}px;
      padding-bottom : ${path.paddingbottom}px;
      padding-left : ${path.paddingleft}px;
    `;
  }


  return (
    <>
      {data.map((item, index) => {
        const iseditable = item.css[widthmodename].editable
        const Tag = item.tag;
        const key = `${pathname}[${index}]`

        const csskey = key.replace(/[\[\]]/g, "_").replace(/\./g, "");

        const cssfile = `
        
            #${csskey} {
                    ${makecss(item.css[widthmodename])}
                   }
            
        `

        return (
          <>
            <style>
              {cssfile}
            </style>
            <Tag
              contentEditable={iseditable}
              suppressContentEditableWarning
              onDoubleClick={() => handledoubleclick(iseditable, Tag)}
              onInput={(event) => handleinput(event)}
              onBlur={() => handleblur(iseditable)}
              id={csskey}
              draggable={Tag !== "div"}
              onClick={(event) => handleclick(event, index)}
              onDragEnter={(event) => handledragenter(event)}
              onDragStart={(event) => handleondragstart(event)}
              onDragEnd={handledragend}
              key={key}
              data-index={Tag !== "div" ? index : ""}
              data-key={key}
              data-tag={Tag}

            className={`${layetelementpath !== "" && layetelementpath === key ? "outline outline-2 outline-blue-700" : null} `}
            >
              {item.css[widthmodename]?.data || "\u00A0"}
              {item.Components && item.Components.length !== 0 ? <Recursive data={item.Components} mainpath={key} path=".Components" /> : null}
            </Tag>
          </>
        );
      })}
    </>
  )


};

export default Recursive;
