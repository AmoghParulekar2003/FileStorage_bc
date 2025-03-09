# 🌟 FileStar  

FileStar is a decentralized file storage and sharing application that leverages **Ethereum** and **IPFS** to securely upload, store, and share files on the blockchain.  

## 🚀 Features  
- Upload files to **IPFS** via **Pinata**  
- Store file metadata on the **Ethereum blockchain**  
- Retrieve and share files securely  
- Supports **images, PDFs, and other file formats**  
- Uses **Hardhat** for smart contract development  

## 🛠 Tech Stack  
- **Frontend:** React, Ethers.js  
- **Backend:** Solidity (Smart Contracts)  
- **Storage:** IPFS (via Pinata)  
- **Blockchain:** Ethereum (Local Hardhat Network)  
- **Tools:** Hardhat, Pinata, Metamask  

## 🔧 Installation & Setup  

### 1️⃣ Clone the repository  
```bash
git clone https://github.com/your-username/filestar.git
cd filestar


### 2️⃣ Install dependencies  
```bash
npm install
```

### 3️⃣ Set up environment variables  
Create a `.env` file and add your **Pinata API keys** and **contract address**:  
```
PINATA_API_KEY=your_api_key
PINATA_SECRET_API_KEY=your_secret_api_key
CONTRACT_ADDRESS=your_contract_address
```

### 4️⃣ Start the Hardhat local blockchain  
```bash
npx hardhat node
```

### 5️⃣ Deploy the smart contract  
```bash
npx hardhat ignition deploy ignition/modules/UploadModule.js --network localhost
```

### 6️⃣ Run the frontend  
```bash
npm start
```

## 📜 Smart Contract  
The `Upload.sol` smart contract is responsible for storing file metadata (IPFS links) and allowing users to retrieve their uploaded files.  

## 📄 License  
This project is licensed under the **MIT License**.  
```
