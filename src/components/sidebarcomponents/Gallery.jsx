import React, { useContext, useEffect, useState } from 'react';
import supabase from "@/supabase/supabaseClient"
import { GlobalContext } from '@/Context';

const Gallery = () => {

    const { authuser } = useContext(GlobalContext)
    const { projectindex, setprojectindex } = useContext(GlobalContext)
    const [files, setFiles] = useState(null);
    const { imageUrl, setImageUrl } = useContext(GlobalContext);


    useEffect(() => {
        const fetchimages = async () => {
            const folderpath = `${authuser.uid}/project${projectindex}`;

            const { data, error } = await supabase.storage
                .from('nocodeweb')
                .list(folderpath)

            if (error) {
                console.error('Error fetching images:', error.message);
                return;
            }

            const urls = data.map((file) =>
                supabase.storage
                    .from('nocodeweb')
                    .getPublicUrl(`${folderpath}/${file.name}`).data.publicUrl
            );

            setImageUrl(urls)
        }

        fetchimages()
    }, [])

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && projectindex !== null && authuser !== null) {
            setFiles(selectedFile);

            const path = `${authuser.uid}/project${projectindex}/${selectedFile.name}`;
            const { error } = await supabase.storage
                .from('nocodeweb')
                .upload(path, selectedFile)

            if (error) {
                console.error(`Error: ${error.message}`);
            } else {
                console.error(`Uploaded to: ${path}`);
            }
        }



    };

    return (
        <div>
            {authuser !== null ? 
            (
               <>
                <input type="file" onChange={handleFileChange} />
                <div className='flex flex-col gap-2'>
                    {imageUrl && imageUrl.map((url, index) => (
                        <>
                            <div>
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Image ${index}`}
                                    style={{ width: '200px', margin: '10px' }}
                                />
                            </div>
                        </>
                    ))}
                </div>
               </>
            )
        :(
           <>
            <div>
                you have not logged in
            </div>
           </>
        )
    }
        </div>
    );
};

export default Gallery;
