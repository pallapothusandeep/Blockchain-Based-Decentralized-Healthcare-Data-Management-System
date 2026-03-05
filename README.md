# Healthcare Management System using Blockchain

A decentralized healthcare management system (DApp) built using blockchain technology to securely manage patient records and doctor access. This project ensures data privacy, transparency, and role-based access control using smart contracts on Ethereum.

---

## Project Overview

Traditional healthcare systems store sensitive patient data in centralized servers, making them vulnerable to data breaches, tampering, and unauthorized access.

This project uses blockchain to solve these problems by:

- Storing medical data immutably
- Allowing patients to control who can access their records
- Verifying registered doctors on-chain
- Removing dependency on a central authority

---

## Main Objectives

- Secure storage of patient medical records
- Role-based access control (Doctor / Patient)
- Prevent unauthorized access to sensitive data
- Ensure data integrity and transparency
- Use smart contracts for secure execution

---

## Key Features

### Patient
- Register as a patient
- Control access to personal medical records
- Authorize or revoke doctor access
- View personal health records securely

### Doctor
- Register as a verified doctor
- Add medical records only after patient authorization
- View patient records (if authorized)

### Security
- Blockchain immutability
- Ethereum address-based identity
- Role-based access control using smart contracts
- No centralized database

---

## How It Works

1. User connects wallet using MetaMask
2. Smart contract is loaded from the blockchain
3. Users interact with the DApp based on their role:
   - Patient
   - Doctor
4. All sensitive operations are handled by smart contracts
5. Records are stored on-chain in a tamper-proof manner

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js |
| Blockchain | Ethereum |
| Smart Contracts | Solidity |
| Web3 Provider | Web3.js |
| Development Framework | Truffle |
| Local Blockchain | Ganache |
| Wallet | MetaMask |

---

## Project Structure

```
healthcare-dapp/
├── contracts/
│ └── Healthcare.sol
│
├── migrations/
│ └── 2_deploy_contracts.js
│
├── client/
│ └── src/
│ ├── components/
│ │ ├── Doctor.js
│ │ └── Patient.js
│ ├── App.js
│ ├── contractConfig.js
│ ├── index.js
│ └── index.css
│
├── truffle-config.js
└── README.md

```

---

## Installation & Setup

### Prerequisites
- Node.js
- npm
- MetaMask browser extension
- Ganache (Local Blockchain)
- Truffle Framework

---

## Running the Project

### Step 1: Clone the Repository
- Clone the project from GitHub
- Navigate into the project folder

### Step 2: Install Dependencies
- Move to the `client` directory
- Run `npm install`

### Step 3: Start Ganache
- Open Ganache
- Start a local Ethereum workspace

### Step 4: Deploy Smart Contracts
- Run `truffle compile`
- Run `truffle migrate --reset`

### Step 5: Configure MetaMask
- Connect MetaMask to Ganache network
- Import an account from Ganache

### Step 6: Start Frontend
- Run `npm start`
- Open the app in browser at `http://localhost:3000`

---

## Smart Contract Functions

- `registerPatient(name, age, gender)` – Registers a patient
- `registerDoctor(name, specialization)` – Registers a doctor
- `authorizeDoctor(doctorAddress)` – Grants doctor access
- `addRecord(patientAddress, record)` – Adds medical record
- `viewRecords(patientAddress)` – Views patient records
- `getPatient(patientAddress)` – Fetch patient details

---

## Security & Access Control

- Data stored immutably on blockchain
- Only registered doctors can interact
- Patients control access permissions
- Unauthorized access is prevented
- All transactions are recorded transparently

---

## Advantages

- Decentralized architecture
- No central authority
- Tamper-proof medical records
- High security and trust
- Transparent data access

---

## Limitations

- Gas cost for storing data on-chain
- Requires MetaMask
- Not suitable for large file storage

---

## Future Enhancements

- IPFS integration for medical reports
- Government-based doctor verification
- Emergency access mechanism
- Deployment on Ethereum testnet
- Enhanced UI and user experience

---

## Conclusion

This project demonstrates how blockchain technology can transform healthcare systems by providing secure, decentralized, and transparent medical record management using smart contracts .



