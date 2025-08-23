// src/utils/quiz.js
export const quizQuestions = {
  "atomic-structure-basic": [
    {
      question: "What is the smallest unit of matter?",
      options: ["Atom", "Molecule", "Proton", "Electron"],
      correctAnswer: 0,
      hint: "It's the building block of everything.",
    },
    {
      question: "Which particle has a negative charge?",
      options: ["Proton", "Neutron", "Electron", "Nucleus"],
      correctAnswer: 2,
      hint: "It orbits around the nucleus.",
    },
    {
      question: "Where are protons located?",
      options: ["Nucleus", "Electron cloud", "Outside the atom", "Orbitals"],
      correctAnswer: 0,
      hint: "It's at the atom's center.",
    },
  ],

  "periodic-table": [
    {
      question: "Which element has the symbol 'O'?",
      options: ["Gold", "Oxygen", "Osmium", "Oxide"],
      correctAnswer: 1,
      hint: "We breathe it every second.",
    },
    {
      question: "How many groups are in the modern periodic table?",
      options: ["7", "18", "12", "20"],
      correctAnswer: 1,
      hint: "It's greater than 15.",
    },
    {
      question: "Which element is in Group 1 (Alkali metals)?",
      options: ["Helium", "Sodium", "Calcium", "Carbon"],
      correctAnswer: 1,
      hint: "Found in table salt.",
    },
  ],

  "element-properties": [
    {
      question: "What defines an element?",
      options: ["Number of neutrons", "Number of protons", "Number of electrons", "Mass number"],
      correctAnswer: 1,
      hint: "It's also called atomic number.",
    },
    {
      question: "Which is a noble gas?",
      options: ["Nitrogen", "Oxygen", "Helium", "Chlorine"],
      correctAnswer: 2,
      hint: "Very stable, used in balloons.",
    },
  ],

  "ions-isotopes": [
    {
      question: "What is an ion?",
      options: [
        "An atom with extra or missing protons",
        "An atom with extra or missing neutrons",
        "An atom with extra or missing electrons",
        "An atom with a different mass number",
      ],
      correctAnswer: 2,
      hint: "It relates to electrical charge.",
    },
    {
      question: "Isotopes of an element differ in?",
      options: ["Protons", "Electrons", "Neutrons", "Charge"],
      correctAnswer: 2,
      hint: "They have the same protons, different ...?",
    },
  ],

  "electron-config": [
    {
      question: "How many electrons can the first shell hold?",
      options: ["2", "8", "18", "32"],
      correctAnswer: 0,
      hint: "It's the smallest shell.",
    },
    {
      question: "What is the electron configuration of Hydrogen?",
      options: ["1s1", "1s2", "2s1", "2p1"],
      correctAnswer: 0,
      hint: "It has only one electron.",
    },
  ],
};
