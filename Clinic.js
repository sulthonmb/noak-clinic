class Doctor {
    constructor(id, name, averageConsultationTime) {
        this.id = id;
        this.name = name;
        this.averageConsultationTime = averageConsultationTime;
    }
  
    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }
  
    getAverageConsultationTime() {
        return this.averageConsultationTime;
    }
}

class Patient {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
  
    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }
}

class Clinic {
    constructor(id, name, doctors, patients) {
        this.id = id;
        this.name = name;
        this.doctors = doctors;
        this.patients = patients;
    }
  
    getId() {
        return this.id;
    }

    getName() {
      return this.name;
    }
  
    getDoctors() {
      return this.doctors;
    }
  
    getPatients() {
      return this.patients;
    }
  
    addDoctor(doctor) {
      this.doctors.push(doctor);
    }
  
    addPatient(patient) {
      this.patients.push(patient);
    }

    estimateWaitingTime(idPatient) {
        const totalDoctors = this.doctors.length;
        const processingTimes = this.doctors.map((doctor) => doctor.getAverageConsultationTime());
        const indexPatient = this.patients.findIndex((patient) => patient.id == idPatient);
        const totalPatients = this.patients.length;

        let channelEndTimes = new Array(totalDoctors).fill(0);
        let waitingTimes = [];
    
        for (let i = 0; i < totalDoctors; i++) {
            let endTime = processingTimes[i];
            channelEndTimes[i] = endTime;
            waitingTimes.push(0); // The first 3 tasks don't wait
        }
    
        for (let i = totalDoctors; i < totalPatients; i++) {
            let earliestEndTime = Math.min(...channelEndTimes);
            let channelIdx = channelEndTimes.indexOf(earliestEndTime);
            let endTime = Math.max(earliestEndTime, 0);
    
            endTime += processingTimes[channelIdx];
            channelEndTimes[channelIdx] = endTime;
    
            let waitingTime = endTime - processingTimes[channelIdx]; // Subtract channel processing time
            waitingTimes.push(waitingTime);
        }
    
        return waitingTimes[indexPatient];
    }
}


const doctors = [
    new Doctor(1, "Doctor A", 3),
    new Doctor(2, "Doctor B", 4),
];

const patients = [
    new Patient(1, "John Doe"),
    new Patient(2, "Jane Doe"),
    new Patient(3, "Peter Parker"),
    new Patient(4, "Mary Jane Watson"),
    new Patient(5, "Bruce Wayne"),
    new Patient(6, "Clark Kent"),
    new Patient(7, "Diana Prince"),
    new Patient(8, "Arthur Curry"),
    new Patient(9, "Barry Allen"),
    new Patient(10, "Victor Stone"),
    new Patient(11, "Koriand'r"),
    new Patient(12, "Garfield Logan"),
    new Patient(13, "Raven"),
    new Patient(14, "Starfire"),
    new Patient(15, "Beast Boy"),
];

const clinic = new Clinic(1, "My Clinic", doctors, patients);

for (let i=1; i<=15; i++) {
    console.log(`Estimate for patient with ID ${i}: ${clinic.estimateWaitingTime(i)}`);
}


