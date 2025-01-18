import { GlobalContext } from '@/Context'
import React, { useContext } from 'react'

const Pages = () => {

    const {data, setdata} = useContext(GlobalContext)

  return (
    <div>
        {
            data.map((item, index) => (
               <div>
                {item.name}
               </div>
            ))
        }
    </div>
  )
}

export default Pages