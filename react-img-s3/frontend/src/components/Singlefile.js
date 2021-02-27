import React, { useState, useRef } from 'react';
import Axios from "axios";

function Singlefile() {

    const [previewfile, setPreviewFiles] = useState();
    const [files, setFiles] = useState([]);


    const filePickerRef = useRef();

    const pickedHandler = e => {

        setFiles(e.target.files[0])

        // function has responsible for preview an image on screen.
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewFiles(fileReader.result);
        };
        fileReader.readAsDataURL(e.target.files[0]);
    }

    const pickImageHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            console.log(files)
            // For an image, not necessary for uploding many images.
            formData.append('image', files)
            formData.append('text', "5555")
            const fetchData = await Axios.post('http://localhost:5000/api/file', formData)
                .then(res => console.log(res.data));
        
        } catch (err) {
            console.log("Frontend can not send data")
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h3>Single Images</h3>
                <div>
                    {previewfile && <img style={{ width: "50px", height: "50px" }} src={previewfile} alt="" />}
                </div>
                <div className="col-4">
                    <form onSubmit={pickImageHandler}>
                        <input type="file"
                            ref={filePickerRef}
                            className="form-control"
                            onChange={pickedHandler}
                        />
                        <button
                            className="btn btn-primary"
                            type="submit"
                        >
                            upload
                    </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Singlefile
