import React, { useState, useRef } from 'react'

function Singlefile() {

    const [previewfile, setPreviewFiles] = useState();
    const [files, setFiles] = useState([]);


    const filePickerRef = useRef();

    const pickedHandler = e => {
        console.log(e.target.files)

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewFiles(fileReader.result);
        };
        fileReader.readAsDataURL(e.target.files[0]);
    }

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <h3>Single Images</h3>
                <div>
                    { previewfile && <img style={{ width: "50px", height: "50px" }} src={previewfile} alt="" />}
                </div>
                <div className="col-4">
                    <input type="file"
                        ref={filePickerRef}
                        className="form-control"
                        onChange={pickedHandler}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={pickImageHandler}
                    >
                        upload
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Singlefile
