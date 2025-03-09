import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  const [data, setData] = useState([]);

  const getData = async () => {
    let dataArray;
    const OtherAddress = document.querySelector(".address").value;
    
    try {
      dataArray = OtherAddress
        ? await contract.display(OtherAddress)
        : await contract.display(account);
    } catch (error) {
      return alert("Error fetching data: " + error);
    }

    if (!dataArray || dataArray.length === 0) {
      return alert("No files to display");
    }

    // Process each file and determine how to display it
    const files = dataArray.map((item, i) => {
      const fileType = item.split(".").pop().toLowerCase(); // Extract file extension
      
      if (["png", "jpg", "jpeg", "gif", "webp"].includes(fileType)) {
        // Image preview
        return (
          <a href={item} key={`a-${i}`} target="_blank" rel="noreferrer">
            <img key={`img-${i}`} src={item} alt="Uploaded File" className="image-list" />
          </a>
        );
      } else if (fileType === "pdf") {
        // PDF preview
        return (
          <iframe 
            key={`pdf-${i}`} 
            src={item} 
            title="PDF Preview" 
            className="file-preview"
          />
        );
      } else if (["mp4", "webm", "ogg"].includes(fileType)) {
        // Video preview
        return (
          <video key={`video-${i}`} controls className="file-preview">
            <source src={item} type={`video/${fileType}`} />
            Your browser does not support the video tag.
          </video>
        );
      } else if (["mp3", "wav", "ogg"].includes(fileType)) {
        // Audio preview
        return (
          <audio key={`audio-${i}`} controls className="file-preview">
            <source src={item} type={`audio/${fileType}`} />
            Your browser does not support the audio tag.
          </audio>
        );
      } else {
        // Other file types (show as download link)
        return (
          <a 
            key={`download-${i}`} 
            href={item} 
            download 
            className="download-link"
          >
            📄 Download File
          </a>
        );
      }
    });

    setData(files);
  };

  return (
    <>
      <div className="file-container">{data}</div>
      <input type="text" placeholder="Enter Address" className="address" />
      <button className="center button" onClick={getData}>
        Get Data
      </button>
    </>
  );
};

export default Display;
