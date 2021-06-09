import React, { useEffect, useState } from "react";
import Upload from "./Upload";
import Uploaded from "./Uploaded";
import Uploading from "./Uploading";
import { uploadImage } from "services/firebase";
import "./styles.css";

const Uploader = () => {
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState<File | undefined>();
    const [uploadedPreview, setUploadedPreview] =
        useState<string | undefined>();
    const [done, setDone] = useState(false);

    const postImage = async () => {
        if (image) {
            setUploading(true);
            uploadImage(image)
                .then(data => {
                    setUploadedPreview(data.url);
                    setDone(true);
                    setUploading(false);
                })
                .catch(error => {
                    console.log(error);
                    setDone(false);
                    setUploading(false);
                });
        }
    };

    const back = () => {
        setUploading(false);
        setDone(false);
    };

    useEffect(() => {
        if (image) {
            postImage();
        }
    }, [image]);

    if (done) return <Uploaded src={uploadedPreview} back={back} />;
    if (uploading) return <Uploading />;
    return <Upload setImage={setImage} />;
};

export default Uploader;
