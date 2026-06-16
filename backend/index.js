const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const PORT = 3000;

// VARS

let subjects = {
  MATH: "Matematyka",
  POLISH: "Język polski",
  ENGLISH: "Język angielski",
  BIOLOGY: "Biologia",
};

// Lista klas w szkole
let classes = [
  {
    id: 0,
    name: "1a",
    profile: "matematyczno-fizyczny",
    schoolYear: "2025/2026",
    tutor: "mgr Janusz Nosacz",
    students: [0, 1],
  },
  {
    id: 1,
    name: "1b",
    profile: "biologiczno-chemiczny",
    schoolYear: "2025/2026",
    tutor: "dr Anna Nowak",
    students: [2],
  },
];

let students = [
  {
    id: 0,
    firstName: "Jan",
    lastName: "Kowalski",
    classId: 0,
    birthDate: "2010-05-14",
    contact: {
      email: "j.kowalski@szkola.pl",
      parentPhone: "+48 500 600 700",
    },
  },
  {
    id: 1,
    firstName: "Agnieszka",
    lastName: "Jakaśtam",
    classId: 0,
    birthDate: "2010-06-10",
    contact: {
      email: "a.jjj@szkola.pl",
      parentPhone: "+48 200 500 700",
    },
  },
  {
    id: 2,
    firstName: "Marzanna",
    lastName: "Utopiona",
    classId: 1,
    birthDate: "2010-01-09",
    contact: {
      email: "AAARGHHH@szkola.pl",
      parentPhone: "+48 888 555 707",
    },
  },
];

// po student id
let grades = {
  0: [
    {
      subject: subjects.MATH,
      grade: 3,
      weight: 2,
      comment: "Sprawdzian z ułamków",
      improved: 5,
    },
    {
      subject: subjects.ENGLISH,
      grade: 4,
      weight: 1,
      comment: "Kartkówka słówka",
      improved: null,
    },
    {
      subject: subjects.MATH,
      grade: 3,
      weight: 2,
      comment: "Sprawdzian z ułamków",
      improved: null,
    },
  ],
};

//

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express.js is working properly");
});

app.get("/api/classes/:id/students", (req, res) => {
  const id = Number(req.params.id);
  if (!classes.find((c) => c.id === id))
    return res.status(404).json({ message: "Class not found" });
  const result = students.filter((s) => s.classId === id);
  if (result.length === 0)
    return res.status(404).json({ message: "No students found" });

  res.json({ result });
});

app.get("/api/students/:id", (req, res) => {
  const studentId = Number(req.params.id);
  const student = students.find((student) => student.id === studentId);
  if (!student) return res.status(404).json({ message: "Student not found" });

  res.json({ message: `GET request for studentId = ${studentId}` });
});

app.get("/api/students/:id/grades", (req, res) => {
  const studentId = Number(req.params.id);
  if (!students.find((s) => s.id === studentId))
    return res.status(404).json({ message: "Student not found" });

  const result = grades[studentId];
  res.json({ result });
});

app.get("/api/students/:id/grades/:subject", (req, res) => {
  const studentId = Number(req.params.id);
  if (!students.find((s) => s.id === studentId))
    return res.status(404).json({ message: "Student not found" });

  const subjectKey = req.params.subject.toUpperCase();
  if (!subjects[subjectKey]) {
    return res.status(400).json({ message: "Invalid subject name" });
  }

  const subjectName = subjects[subjectKey];
  const studentGrades = grades[studentId] || [];
  const result = studentGrades.filter((g) => g.subject === subjectName);

  res.json({ result });
});

app.get("/api/classes/:id", (req, res) => {
  const classId = Number(req.params.id);
  const result = classes.find((c) => c.id === classId);
  if (!result) return res.status(404).json({ message: "Class not found" });

  return res.json({ result });
});

/*
const keys = Object.keys(allSubjects); 
Wynik: ["MATH", "POLISH", "ENGLISH", "BIOLOGY"]

const values = Object.values(allSubjects); 
Wynik: ["Matematyka", "Język polski", "Język angielski", "Biologia"]

*/
app.get("/api/subjects", (req, res) => {
  res.json({ result: subjects });
});

app.listen(PORT, () => {
  console.log(`Serwer działa pod adresem http://localhost:${PORT}`);
});
