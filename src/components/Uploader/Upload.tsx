import React, { useEffect, useRef, useState } from "react";
import dragDropImageIcon from "../../images/image.svg";

interface Props {
    setImage: React.Dispatch<React.SetStateAction<File | undefined>>;
}
const Upload = ({ setImage }: Props) => {
    const [imageUrl, setImageUrl] = useState<string | undefined>();
    const [error, setError] = useState<string | undefined>();
    const dropArea = useRef<any>();

    const validateFileFormat = (file: File): boolean => {
        const fileType = file.type.toLowerCase();
        if (fileType === "image/jpeg" || fileType === "image/png") return true;
        return false;
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        let data = event.dataTransfer.files;
        const file = data.item(0);
        if (validateFileFormat(file)) {
            setImageUrl(URL.createObjectURL(file));
            setImage(file);
        } else setError("Invalid file format, only jpeg and png allowed");
        event.target?.classList?.remove("highlight");
    };

    const handleFileSelection = (event: any) => {
        if (event.target.files) {
            const file = event.target.files[0];
            if (validateFileFormat(file)) {
                setImageUrl(URL.createObjectURL(file));
                setImage(file);
            } else setError("Invalid file format, only jpeg and png allowed");
        }
    };

    useEffect(() => {
        if (imageUrl) {
            dropArea.current.classList.add("image-shown");
        } else {
            dropArea.current.classList.remove("image-shown");
        }
    }, [imageUrl]);

    return (
        <div className="Upload-image">
            <h1 className="title">Upload image</h1>
            <p className="description">File should be Jpeg, Png,...</p>
            <div
                ref={dropArea}
                className="drag-n-drop"
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                onDragEnter={(e: any) => e.target?.classList?.add("highlight")}
                onDragLeave={(e: any) =>
                    e.target?.classList?.remove("highlight")
                }
                style={{ backgroundImage: imageUrl && `url(${imageUrl})` }}
            >
                <img className="image" src={dragDropImageIcon} alt="..." />
                <p className="text">Drag {"&"} Drop your image here</p>
            </div>
            <p className="or">Or</p>

            <div className="file-container">
                <input
                    type="file"
                    id="choose-file"
                    accept="image/png, image/jpeg"
                    onChange={handleFileSelection}
                />
                <label htmlFor="choose-file" className="choose-file">
                    Choose a file
                </label>
            </div>
        </div>
    );
};

export default Upload;
