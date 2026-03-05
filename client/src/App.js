import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import PatientPage from "./pages/PatientPage";
import DoctorPage from "./pages/DoctorPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { loadBlockchain } from "./contractConfig";

function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { contract, account } = await loadBlockchain();
      setContract(contract);
      setAccount(account);
    };
    init();
  }, []);

  if (!contract) return <h2>Connecting to blockchain...</h2>;

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<LoginPage />} />

        <Route
          path="/patient"
          element={
            <ProtectedRoute allowedRole="patient">
              <PatientPage account={account} contract={contract} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorPage account={account} contract={contract} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
