import "./FileUpload.css";
import { useState } from "react";
import axios from "axios";

const FileUpload = ({ account, contract }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No File Uploaded");

    const PINATA_API_KEY = process.env.REACT_APP_PINATA_API_KEY;
    const PINATA_SECRET_API_KEY = process.env.REACT_APP_PINATA_SECRET_API_KEY;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: PINATA_API_KEY,
                        pinata_secret_api_key: PINATA_SECRET_API_KEY,
                        "Content-Type": "multipart/form-data",
                    },
                });

                const fileUrl = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                await contract.add(account, fileUrl); // Ensure this is awaited

                alert("File Uploaded Successfully!");
                setFileName("No File Uploaded");
                setFile(null);
            } catch (error) {
                console.error("Upload Error:", error);
                alert("File Upload Failed");
            }
        }
    };

    const retrieveFile = (event) => {
        const data = event.target.files[0];
        if (!data) return;

        const reader = new FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(data);
        };

        setFileName(data.name); // Show file name
        event.preventDefault();
    };

    return (
        <div className="top">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="choose">Choose File</label>
                <input type="file" id="file-upload" name="data" onChange={retrieveFile} disabled={!account} />
                <span className="textArea">File: {fileName}</span>
                <button type="submit" className="upload" disabled={!file}>Upload File</button>
            </form>
        </div>
    );
};

export default FileUpload;
