import { motion } from "framer-motion";

interface Job {
  title: string;
  company: string;
  type: string;
  location: string;
  period: string;
  responsibilities: string[];
  skills: string;
}

const jobs: Job[] = [
  {
    title: "Elements of Calculus Teaching Assistant",
    company: "Constructor University",
    type: "Working Student",
    location: "Bremen, DE",
    period: "Feb 2025 - Current",
    responsibilities: [
      "Developed a Python script to partially automate grading, reducing manual effort and improving efficiency by 20%.",
      "Guided hundreds of students in learning calculus concepts essential to Computer Science, strengthening their problem-solving and analytical skills.",
      "Used Python Visualization Frameworks to help students better understand concepts, increasing student grades by 15%."
    ],
    skills: "Python (Matplotlib, Seaborn, SymPy, Mayavi, Numpy, SciPy)"
  },
  {
    title: "Full-Stack Developer",
    company: "Arba's Dayschool",
    type: "Freelancer",
    location: "Prishtina, RKS",
    period: "June 2024 – November 2024",
    responsibilities: [
      "Implemented a user-friendly interface that reduced the time spent on book management tasks by 40%.",
      "Conducted rigorous testing and debugging, achieving a 98% bug-free deployment rate.",
      "Integrated secure authentication protocols, enhancing data security and reducing unauthorized access incidents by 100%."
    ],
    skills: "Linux, Git, HTML, CSS, SQL, Python(Flask, Seaborn, Jinja), Javascript(Chart.js)"
  },
  {
    title: "IT Support and Event Technician",
    company: "Ministry of Culture, Youth and Sports",
    type: "Volunteer",
    location: "Prishtina, RKS",
    period: "July 2021 - Sep 2021",
    responsibilities: [
      "Coordinated logistical support for over 200 event attendees during a two-month period, ensuring seamless registration, providing tailored assistance, and optimizing attendee experience, which increased overall satisfaction ratings by 25%.",
      "Managed and resolved sound system issues during events attended by hundreds of participants daily.",
      "Acted as an IT Assistant, resolving technical issues and ensuring smooth operation of IT systems."
    ],
    skills: "Linux, Cybersecurity, Software Installation & Maintenance, Ableton"
  },
  {
    title: "Teaching Assistant",
    company: "Digital School of Kosovo",
    type: "Working Student",
    location: "Prishtina, RKS",
    period: "Jan 2017 - Nov 2018",
    responsibilities: [
      "Assisted students with troubleshooting and resolving issues in game development projects.",
      "Designed and implemented a comprehensive curriculum for website development, incorporating coding, debugging, and optimization techniques; directly enhanced student project completion rates by 40% within a semester.",
      "Conducted interactive workshops and coding labs to assist students in applying theoretical knowledge to real-world projects."
    ],
    skills: "Git, Python, Javascript, jQuery, PHP"
  }
];
const Experience = () => {
  return (
    <section
      id="experience"
      className="min-h-screen py-20 px-4 bg-white dark:bg-navy transition-colors duration-300"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
          Work Experience
        </h2>
        <div className="space-y-12">
          {jobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg shadow-lg transition-colors duration-300 bg-white dark:bg-navy border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {job.title}
                  </h3>
                  <p className="text-teal-600 dark:text-teal-400">{job.company}</p>
                  <p className="text-gray-700 dark:text-gray-300">{job.type}</p>
                  <p className="text-gray-700 dark:text-gray-300">{job.location}</p>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mt-2 md:mt-0">
                  {job.period}
                </p>
              </div>
              <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-300 mb-4">
                {job.responsibilities.map((resp, i) => (
                  <li key={i}>{resp}</li>
                ))}
              </ul>
              <div className="mt-4">
                <p className="text-teal-600 dark:text-teal-400 text-sm font-semibold">
                  Skills:
                </p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {job.skills}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;