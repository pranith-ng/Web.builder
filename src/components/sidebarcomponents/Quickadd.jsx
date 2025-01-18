import { React, useState, useContext } from 'react'
import { GlobalContext } from '@/Context'


const Quickadd = () => {

    const { quickaddcomponent, setquickaddcomponent, setisdragend } = useContext(GlobalContext)

    const components = [

        {
            tag: "p",
            name: "Paragraph",
            css: {
                lg:
                {
                    editable: false,
                    data: "Paragraph",
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
                    data: "Paragraph",
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
                    data: "Paragraph",
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
        },



        {
            tag: "span",
            name: "Span",
            css: {
                lg:
                {
                    editable: false,
                    data: "Span",
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
                    data: "Span",
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
                    data: "Span",
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
        },




        {
            tag: "h1",
            name: "Heading",
            css: {
                lg:
                {
                    editable: false,
                    data: "Heading",
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
                    data: "Heading",
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
                    data: "Heading",
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
        },


        {
            tag: "div",
            name: "Container",
            data: "",
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

            ],
        },

    ]

    function handledragstart(event, index) {
        setquickaddcomponent(components[index])

    }
    function handledragend() {
        setisdragend(true)
    }

    return (
        <>
            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                {components.map((item, index) => (
                    <div
                        key={index}
                        draggable
                        onDrag={(event) => handledragstart(event, index)}
                        onDragEnd={handledragend}
                        className="flex items-center justify-center w-[80px] h-[80px] border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 hover:border-gray-400 transition-colors cursor-pointer"
                    >
                        {item.name}
                    </div>
                ))}
            </div>
            {/* <div>
                <p>NAVBAR, AUDIO, VIDEO, BUTTONS <br></br> components not available yet it is under <br></br> development  </p>
            </div> */}
        </>
    );

}

export default Quickadd