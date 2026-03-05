// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Healthcare {
    struct Patient {
        string name;
        uint age;
        string gender;
        string[] records;
        address[] authorizedDoctors;
    }

    struct Doctor {
        string name;
        string specialization;
        bool isRegistered;
    }

    mapping(address => Patient) public patients;
    mapping(address => Doctor) public doctors;

    // 🔔 PAYMENT EVENT
    event ConsultationPaid(
        address indexed patient,
        address indexed doctor,
        uint amount,
        uint timestamp
    );

    // ---------------- PATIENT ----------------

    function registerPatient(
        string memory _name,
        uint _age,
        string memory _gender
    ) public {
        patients[msg.sender].name = _name;
        patients[msg.sender].age = _age;
        patients[msg.sender].gender = _gender;
    }

    // ---------------- DOCTOR ----------------

    function registerDoctor(
        string memory _name,
        string memory _specialization
    ) public {
        doctors[msg.sender] = Doctor(_name, _specialization, true);
    }

    // ---------------- AUTH ----------------

    function authorizeDoctor(address _doctor) public {
        patients[msg.sender].authorizedDoctors.push(_doctor);
    }

    function revokeDoctor(address _doctor) public {
        address[] storage docs = patients[msg.sender].authorizedDoctors;
        for (uint i = 0; i < docs.length; i++) {
            if (docs[i] == _doctor) {
                docs[i] = docs[docs.length - 1];
                docs.pop();
                break;
            }
        }
    }

    function getAuthorizedDoctors(address _patient)
        public
        view
        returns (address[] memory)
    {
        return patients[_patient].authorizedDoctors;
    }

    // ---------------- RECORDS ----------------

    function addRecord(address _patient, string memory _record) public {
        bool authorized = false;

        for (uint i = 0; i < patients[_patient].authorizedDoctors.length; i++) {
            if (patients[_patient].authorizedDoctors[i] == msg.sender) {
                authorized = true;
                break;
            }
        }

        require(authorized, "Doctor not authorized");
        patients[_patient].records.push(_record);
    }

    function viewRecords(address _patient)
        public
        view
        returns (string[] memory)
    {
        if (msg.sender == _patient) {
            return patients[_patient].records;
        }

        for (uint i = 0; i < patients[_patient].authorizedDoctors.length; i++) {
            if (patients[_patient].authorizedDoctors[i] == msg.sender) {
                return patients[_patient].records;
            }
        }

        revert("Access denied");
    }

    // ---------------- PAYMENT ----------------
    // Patient → Doctor

    function payConsultationFee(address _doctor) public payable {
        require(msg.value > 0, "Fee must be > 0");
        require(doctors[_doctor].isRegistered, "Doctor not registered");

        payable(_doctor).transfer(msg.value);

        emit ConsultationPaid(
            msg.sender,
            _doctor,
            msg.value,
            block.timestamp
        );
    }
}
