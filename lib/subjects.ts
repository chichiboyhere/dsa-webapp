export const SUBJECT_CONFIG = {
  WAEC: {
    SCIENCE: {
      compulsory: [
        "English",
        "Mathematics",
        "Physics",
        "Chemistry",
        "Citizenship & Heritage Studies",
      ],
      electives: [
        "Agriculture",
        "Geography",
        "Technical Drawing",
        "Further Maths",
        "Physical Education",
        "Health Education",
        "Biology",
        "Food & Nutrition",
      ],
      maxElectives: 4,
    },

    COMMERCIAL: {
      compulsory: [
        "English",
        "Mathematics",
        "Economics",
        "Citizenship & Heritage Studies",
      ],

      electives: ["Commerce", "Financial Accounting", "Government", "Biology"],
      maxElectives: 4,
    },

    ART: {
      compulsory: [
        "English",
        "Mathematics",
        "Literature",
        "Citizenship & Heritage Studies",
        "Government",
      ],
      electives: [
        "Music",
        "Home Management",
        "Visual Arts",
        "IRS",
        "CRS",
        "Nigerian Language",
        "Nigerian History",
      ],
      maxElectives: 5,
    },
  },

  JAMB: {
    SCIENCE: {
      compulsory: ["English", "Physics"],
      electives: [
        "Mathematics",
        "Chemistry",
        "Biology",
        "Computer studies",
        "Geography",
        "Physical and Health Education",
        "Agriculture",
        "Computer Studies",
        "Art",
      ],
      maxElectives: 2,
    },

    COMMERCIAL: {
      compulsory: ["English", "Mathematics"],
      electives: [
        "Commerce",
        "Economics",
        "Government",
        "Geography",
        "Principles of Account",
      ],
      maxElectives: 2,
    },

    ART: {
      compulsory: ["English"],
      electives: [
        "CRS",
        "IRS",
        "French",
        "Literature",
        "Government",
        "Economics",
        "Hausa",
        "History",
        "Home Economics",
        "Igbo",
        "Yoruba",
        "Music",
        "Arabic",
        "Art",
      ],
      maxElectives: 3,
    },
  },
};
