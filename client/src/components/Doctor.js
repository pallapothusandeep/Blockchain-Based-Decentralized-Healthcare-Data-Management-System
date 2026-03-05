import { useState } from "react";

function Doctor({ account, contract }) {
  const [patientAddress, setPatientAddress] = useState("");
  const [record, setRecord] = useState("");
  const [payments, setPayments] = useState([]);

  const addMedicalRecord = async () => {
    await contract.methods
      .addRecord(patientAddress, record)
      .send({ from: account });
    alert("✅ Record added");
  };

  // 🔍 LOAD PAYMENT HISTORY
  const loadPayments = async () => {
    const events = await contract.getPastEvents("ConsultationPaid", {
      filter: { doctor: account },
      fromBlock: 0,
      toBlock: "latest",
    });

    setPayments(events);
  };

  return (
    <div className="card">
      <h2>🧑‍⚕️ Doctor Dashboard</h2>
      <p><b>Wallet:</b> {account}</p>

      <input
        placeholder="Patient Wallet Address"
        value={patientAddress}
        onChange={(e) => setPatientAddress(e.target.value)}
      />

      <textarea
        placeholder="Medical Notes"
        value={record}
        onChange={(e) => setRecord(e.target.value)}
      />

      <button onClick={addMedicalRecord}>Add Record</button>

      <hr />

      <h3>📜 Payment History</h3>
      <button onClick={loadPayments}>Load Payments</button>

      <ul>
        {payments.map((e, i) => (
          <li key={i}>
            Received {window.web3.utils.fromWei(e.returnValues.amount, "ether")} ETH
            from {e.returnValues.patient}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Doctor;
