import React, { useContext, useState } from 'react';
import { GlobalContext } from '@/Context';

const Layercomponent = ({ data, mainpath, path }) => {
  const [drop, setdrop] = useState(false);
  const { layetelementpath, setlayerelementpath , setparentpath, setchildindex, setopenstylebar} = useContext(GlobalContext);
  const pathname = mainpath + path;

  // function handleclick(event) {
  //   const path = event.target.getAttribute('data-key');
  //   setlayerelementpath(path);
  //   console.log("layetpath", path);
  // }

  function handleclick(event, index) {
    const layerdatakey = event.target.getAttribute("data-key")
    setlayerelementpath(layerdatakey)
    const datakey = event.target.getAttribute("data-index")
    setchildindex(datakey)
    const parentpath = event.target.parentElement.getAttribute("data-Key")
    setparentpath(parentpath)
    setdrop(!drop);
    setopenstylebar(true)
    console.log("pathname", datakey, index)
  }

  // function handlebutton2click() {
  //   setdrop(!drop);
  // }

  return (
    <>
      {
        data.map((item, index) => {
          const datakey = `${pathname}[${index}]`;
          return (
            <div key={datakey} className="flex flex-col items-center ">
              {item.tag === "div" ?
                <div
                  data-key={datakey}
                  onClick={(event) => handleclick(event, index)}
                  className={`border-2 bg-blue-500 text-white p-0.5 rounded-md flex justify-between items-center w-full`}
                >
                  {item.tag}
                  <span className="ml-2">{drop ? '↑' : '↓'}</span>
                </div>
                :
                <div
                  data-key={datakey}
                  onClick={(event) => handleclick(event, index)}
                  className={`border-2 bg-gray-500 text-white p-0.5 rounded-md flex justify-between items-center w-full`}
                >
                  {item.tag}
                  
                </div>}
              {drop && item.Components && (
                <div className="pl-4 w-full">
                  <Layercomponent data={item.Components} mainpath={datakey} path=".Components" />
                </div>
              )}
            </div>
          );
        })
      }
    </>
  );
};

export default Layercomponent;
