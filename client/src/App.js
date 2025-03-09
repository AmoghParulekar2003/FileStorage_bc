import "./App.css";
import Upload from "./artifacts/contracts/Upload.sol/Upload.json";
import Display from "./components/Display";
import FileUpload from "./components/FileUpload";
import Modal from "./components/Modal";

import { useEffect, useState } from "react";
import { BrowserProvider, Contract } from "ethers";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const provider = new BrowserProvider(window.ethereum);
    const wallet = async () => {
      if (provider) {
        await provider.send("eth_requestAccounts", []);

        window.ethereum.on("accountsChanged", (accounts) => {
          window.location.reload(); 
        });

        window.ethereum.on("chainChanged", (chainId) => {
          window.location.reload();
        });

        const signer = await provider.getSigner();
        const address = signer.address; // Fix: get address directly

        console.log(address);
        setAccount(address);

        let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contract = new Contract(contractAddress, Upload.abi, signer);
        
        console.log(contract);
        setContract(contract);
        setProvider(signer);
      } else {
        alert("Metamask is not installed");
      }
    };
    provider && wallet();
  }, []);

  return(
    <>
      {!modalOpen && (
        <button className="share" onClick={()=>setModalOpen(true)}>Share</button>
      )} 
      {
        modalOpen && (
          <Modal setModalOpen={setModalOpen} contract={contract}></Modal>
        )
      }
      <div className="App">
        <h1 style={{color: "white"}}>FileStar</h1>
        <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>

        <p style={{color: "white"}}>
          Account : {account}
        </p>
        <FileUpload account={account} contract={contract}></FileUpload>
        <Display account={account} contract={contract}></Display>
      </div>
    </>
  );
}

export default App;
