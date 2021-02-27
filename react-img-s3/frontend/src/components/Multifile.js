import React, { useState, useRef } from 'react'
import Axios from "axios";

function Multifile() {

    const [previewfiles, setPreviewFiles] = useState([]);
    const [files, setFiles] = useState([]);

    const pickedHandler = e => {
        console.log(e.target.files);

        // function has responsible for preview all images on screen.
        const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
        setPreviewFiles((prevImages) => prevImages.concat(filesArray));
        
        setFiles(e.target.files);
    }

    const pickImageHandler = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            console.log(files)
            // formData.append('images', files)

            // To uploading many images must use only ForLoop
            // It will failable if you use formData.append('images', files) like this.
            for (var i = 0; i < files
                .length; i++) {
                console.log('Img Loop: ', files[i]);
                formData.append('images', files[i]);
            }
            formData.append('text', "5555")
            const fetchData = await Axios.post('http://localhost:5000/api/files', formData)
                .then(res => console.log(res.data));

        } catch (err) {
            console.log("Frontend can not send data")
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h3>Multiple Images</h3>
                <div>
                    {previewfiles.map((photo, index) => {
                        return (
                            // <div key={index} style={{ width: "50px", height: "50px" }}>
                            <img key={index} style={{ width: "50px", height: "50px" }} src={photo} alt="" />
                            // </div>
                        )
                    })}
                </div>
                <div className="col-4">
                    <input type="file"
                        className="form-control"
                        onChange={pickedHandler}
                        multiple
                    />
                    <button
                        className="btn btn-primary"
                        onClick={pickImageHandler}
                    >
                        uploads
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Multifile
