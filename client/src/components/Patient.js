import { useEffect, useState } from "react";

function Patient({ account, contract, web3 }) {
  const [doctorAddress, setDoctorAddress] = useState("");
  const [fee, setFee] = useState("");
  const [records, setRecords] = useState([]);
  const [authorizedDoctors, setAuthorizedDoctors] = useState([]);
  const [payments, setPayments] = useState([]);

  // 🔐 Authorize doctor
  const authorizeDoctor = async () => {
    try {
      await contract.methods
        .authorizeDoctor(doctorAddress)
        .send({ from: account });

      alert("✅ Doctor authorized");
      loadAuthorizedDoctors();
    } catch (err) {
      console.error(err);
      alert("❌ Authorization failed");
    }
  };

  // 📋 Load authorized doctors
  const loadAuthorizedDoctors = async () => {
    try {
      const docs = await contract.methods
        .getAuthorizedDoctors(account)
        .call({ from: account });

      setAuthorizedDoctors(docs);
      console.log("Authorized doctors:", docs);
    } catch (err) {
      console.error(err);
    }
  };

  // 💸 Pay consultation fee (ETH transfer)
  const payConsultationFee = async () => {
    try {
      await web3.eth.sendTransaction({
        from: account,
        to: doctorAddress,
        value: web3.utils.toWei(fee, "ether"),
      });

      alert("✅ Consultation fee paid");
      setFee("");
      loadPayments();
    } catch (err) {
      console.error(err);
      alert("❌ Payment failed");
    }
  };

  // 📄 View medical records
  const viewRecords = async () => {
    try {
      const data = await contract.methods
        .viewRecords(account)
        .call({ from: account });

      setRecords(data);
    } catch (err) {
      console.error(err);
      alert("❌ Cannot view records");
    }
  };

  // 📜 Load ETH payment history (MetaMask transactions)
  const loadPayments = async () => {
    try {
      const latestBlock = await web3.eth.getBlockNumber();
      const history = [];

      for (let i = latestBlock; i >= 0 && history.length < 10; i--) {
        const block = await web3.eth.getBlock(i, true);
        if (!block || !block.transactions) continue;

        block.transactions.forEach((tx) => {
          if (
            tx.from?.toLowerCase() === account.toLowerCase() &&
            tx.to?.toLowerCase() === doctorAddress.toLowerCase()
          ) {
            history.push(tx);
          }
        });
      }

      setPayments(history);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔄 Load authorized doctors on page load
  useEffect(() => {
    if (contract && account) {
      loadAuthorizedDoctors();
    }
  }, [contract, account]);

  return (
    <div className="card">
      <h2>👤 Patient Dashboard</h2>
      <p><b>Wallet:</b> {account}</p>

      <h3>🔐 Authorize Doctor</h3>
      <input
        placeholder="Doctor Wallet Address"
        value={doctorAddress}
        onChange={(e) => setDoctorAddress(e.target.value)}
      />
      <button onClick={authorizeDoctor}>Authorize Doctor</button>

      <ul>
        {authorizedDoctors.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>

      <hr />

      <h3>💸 Pay Consultation Fee</h3>
      <input
        placeholder="Fee in ETH"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
      />
      <button onClick={payConsultationFee}>Pay</button>

      <hr />

      <h3>📜 Payment History</h3>
      <button onClick={loadPayments}>Load Payments</button>

      <ul>
        {payments.map((tx, i) => (
          <li key={i}>
            Sent {web3.utils.fromWei(tx.value, "ether")} ETH to {tx.to}
          </li>
        ))}
      </ul>

      <hr />

      <h3>📄 Medical Records</h3>
      <button onClick={viewRecords}>View Records</button>

      <ul>
        {records.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>
    </div>
  );
}

export default Patient;
