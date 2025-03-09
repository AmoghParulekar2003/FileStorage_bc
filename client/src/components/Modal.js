import { useEffect, useState } from "react";
import "./Modal.css";

const Modal = ({ setModalOpen, contract }) => {
    const [accessAddresses, setAccessAddresses] = useState([]);

    useEffect(() => {
        const fetchAccessList = async () => {
            try {
                const addressList = await contract.shareAccess();
                console.log("Access List:", addressList);
                
                // Ensure the stored addresses are in object form
                setAccessAddresses(addressList.map(entry => ({ user: entry.user, access: entry.access })));
            } catch (error) {
                console.error("Error fetching access list:", error);
            }
        };
        contract && fetchAccessList();
    }, [contract]);
    

    const grantAccess = async () => {
        const address = document.querySelector(".address").value;
        if (!address) return alert("Please enter an address!");
        try {
            await contract.allow(address);
            setAccessAddresses([...accessAddresses, address]); // Update UI
            alert(`Access granted to ${address}`);
        } catch (error) {
            console.error("Error granting access:", error);
            alert("Failed to grant access.");
        }
    };

    const revokeAccess = async (entry) => {
        try {
            const userAddress = entry.user || entry; // Extract address if object
            console.log("Revoking access for:", userAddress);
            
            await contract.disallow(userAddress); // Ensure only the address is passed
            alert(`Access revoked for ${userAddress}`);
            
            setAccessAddresses(accessAddresses.filter(addr => addr.user !== userAddress)); // Update UI
        } catch (error) {
            console.error("Error revoking access:", error);
            alert("Failed to revoke access.");
        }
    };
    

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="title">Manage Access</div>
                <div className="body">
                    <input type="text" className="address" placeholder="Enter Address" />
                </div>
                <button onClick={grantAccess}>Grant Access</button>

                <h3>People with Access</h3>
                <ul>
    {accessAddresses.map((entry, index) => (
        <li key={index}>
            {entry.user}{" "}
            <button onClick={() => revokeAccess(entry)} style={{ marginLeft: "10px", color: "red" }}>
                Revoke
            </button>
        </li>
    ))}
</ul>


                <div className="footer">
                    <button onClick={() => setModalOpen(false)} id="cancelBtn">Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
