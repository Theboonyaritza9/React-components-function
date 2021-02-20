import React, { useState, useRef } from 'react'

function Multifile() {

    const [previewfiles, setPreviewFiles] = useState([]);
    const [files, setFiles] = useState([]);

    const filePickerRef = useRef();

    const pickedHandler = e => {
        console.log(e.target.files);

        const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
        setPreviewFiles((prevImages) => prevImages.concat(filesArray));
    }

    const pickImageHandler = () => {
        filePickerRef.current.click();
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
