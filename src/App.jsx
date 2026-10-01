import { useState } from "react";
import "./App.css";

// ======================================================
// GOOGLE APPS SCRIPT WEB APP URL
// Replace this with your actual deployed Apps Script URL
// ======================================================
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz4xKUPJRwQ8bVvebLV9EOdCYLwu2XTGYZL7irD96x6P3oCN26YmG_WnHgc_Erz4llw/exec";

// ======================================================
// CLUBS
// ======================================================
const clubs = [
  {
    name: "NextGen Front-End Club",
    faculty: "Dr. Sushant Jhingran",
  },
  {
    name: "API Development & Integration Club",
    faculty: "Mr. Durgesh Narayan Singh",
  },
];

const positions = [
  "President",
  "Vice-President",
  "Secretary",
  "Member",
];

function App() {
  const [form, setForm] = useState({
    fullName: "",
    systemId: "",
    mobile: "",
    personalEmail: "",
    universityEmail: "",
    course: "",
    branch: "",
    batch: "",
    year: "",
    cgpa: "",
    backlog: "",
    club: "",
    position: "",
    motivation: "",
    technicalSkills: "",
    projects: "",
    achievements: "",
    leadershipExperience: "",
    declaration: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  // ======================================================
  // HANDLE FORM INPUT
  // ======================================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear previous message when user changes something
    if (message) {
      setMessage("");
    }
  };

  // ======================================================
  // SUBMIT FORM
  // ======================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    // ------------------------------------------
    // Declaration validation
    // ------------------------------------------
    if (!form.declaration) {
      setMessage(
        "ERROR: Please accept the declaration before submitting."
      );
      return;
    }

    // ------------------------------------------
    // University email validation
    // ------------------------------------------
    const universityEmail = form.universityEmail
      .trim()
      .toLowerCase();

    if (!universityEmail.endsWith("@ug.sharda.ac.in")) {
      setMessage(
        "ERROR: Please use your official university email ending with @ug.sharda.ac.in."
      );
      return;
    }

    // ------------------------------------------
    // Mobile validation
    // ------------------------------------------
    const mobileRegex = /^[6-9][0-9]{9}$/;

    if (!mobileRegex.test(form.mobile.trim())) {
      setMessage(
        "ERROR: Please enter a valid 10-digit mobile number."
      );
      return;
    }

    // ------------------------------------------
    // CGPA validation
    // ------------------------------------------
    const cgpa = Number(form.cgpa);

    if (cgpa < 0 || cgpa > 10) {
      setMessage(
        "ERROR: CGPA must be between 0 and 10."
      );
      return;
    }

    // ------------------------------------------
    // Apps Script URL check
    // ------------------------------------------
    if (
      !GOOGLE_SCRIPT_URL ||
      GOOGLE_SCRIPT_URL ===
        "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"
    ) {
      setMessage(
        "ERROR: Google Apps Script URL has not been configured."
      );
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify(form),
      });

      const result = await response.json();

      if (result.success) {
        setMessage(
          "SUCCESS: Nomination submitted successfully."
        );

        // Reset form
        setForm({
          fullName: "",
          systemId: "",
          mobile: "",
          personalEmail: "",
          universityEmail: "",
          course: "",
          branch: "",
          batch: "",
          year: "",
          cgpa: "",
          backlog: "",
          club: "",
          position: "",
          motivation: "",
          technicalSkills: "",
          projects: "",
          achievements: "",
          leadershipExperience: "",
          declaration: false,
        });

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        setMessage(
          "ERROR: " +
            (result.message ||
              "Unable to submit nomination.")
        );
      }
    } catch (error) {
      console.error(error);

      setMessage(
        "ERROR: Unable to submit the nomination. Please check your internet connection and try again."
      );
    }

    setSubmitting(false);
  };

  // ======================================================
  // WEBSITE
  // ======================================================
  return (
    <div className="page">

      {/* ==================================================
          HEADER
      ================================================== */}
      <header className="header">

        <div className="header-content">

          <h1>
            Department of Computer Science & Engineering
          </h1>

          <h2>
            Student Club Office-Bearer Nomination
          </h2>

          <p>
            Academic Session 2026–27
          </p>

        </div>

      </header>


      {/* ==================================================
          MAIN CONTENT
      ================================================== */}
      <main className="container">

        {/* INTRODUCTION */}
        <div className="intro">

          <h2>
            Nomination Form
          </h2>

          <p>
            Students interested in serving as Student
            President, Vice-President, or Secretary of the
            following Department Clubs are invited to submit
            their nominations.
          </p>

          {/* CLUB INFORMATION */}

          <div className="club-information">

            <h3>
              Clubs Inviting Nominations
            </h3>

            {clubs.map((club) => (
              <div
                className="club-card"
                key={club.name}
              >

                <div>

                  <strong>
                    {club.name}
                  </strong>

                  <span>
                    Faculty Coordinator:{" "}
                    {club.faculty}
                  </span>

                </div>

              </div>
            ))}

          </div>


          <p className="deadline">
            Last Date for Nomination:{" "}
            <strong>
              4 October 2026
            </strong>
          </p>

        </div>


        {/* ==================================================
            FORM
        ================================================== */}

        <form onSubmit={handleSubmit}>

          {/* ==================================================
              SECTION 1
          ================================================== */}

          <section className="section">

            <h3>
              1. Student Information
            </h3>

            <div className="grid">

              {/* FULL NAME */}

              <div className="field">

                <label>
                  Full Name *
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* SYSTEM ID */}

              <div className="field">

                <label>
                  System ID *
                </label>

                <input
                  type="text"
                  name="systemId"
                  value={form.systemId}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* MOBILE */}

              <div className="field">

                <label>
                  Mobile Number *
                </label>

                <input
                  type="tel"
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  required
                />

              </div>


              {/* PERSONAL EMAIL */}

              <div className="field">

                <label>
                  Personal Email ID *
                </label>

                <input
                  type="email"
                  name="personalEmail"
                  value={form.personalEmail}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* UNIVERSITY EMAIL */}

              <div className="field">

                <label>
                  Official University Email ID *
                </label>

                <input
                  type="email"
                  name="universityEmail"
                  value={form.universityEmail}
                  onChange={handleChange}
                  placeholder="yourid@ug.sharda.ac.in"
                  pattern="[A-Za-z0-9._%+-]+@ug\.sharda\.ac\.in"
                  title="Please enter your official university email ending with @ug.sharda.ac.in"
                  required
                />

                <small>
                  Only @ug.sharda.ac.in email addresses
                  are accepted.
                </small>

              </div>


              {/* COURSE */}

              <div className="field">

                <label>
                  Course *
                </label>

                <input
                  type="text"
                  name="course"
                  value={form.course}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech"
                  required
                />

              </div>


              {/* BRANCH */}

              <div className="field">

                <label>
                  Branch *
                </label>

                <input
                  type="text"
                  name="branch"
                  value={form.branch}
                  onChange={handleChange}
                  placeholder="e.g. CSE"
                  required
                />

              </div>


              {/* BATCH */}

              <div className="field">

                <label>
                  Batch *
                </label>

                <input
                  type="text"
                  name="batch"
                  value={form.batch}
                  onChange={handleChange}
                  placeholder="e.g. 2023-2027"
                  required
                />

              </div>


              {/* YEAR */}

              <div className="field">

                <label>
                  Year *
                </label>

                <select
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select Year
                  </option>

                  <option value="1st Year">
                    1st Year
                  </option>

                  <option value="2nd Year">
                    2nd Year
                  </option>

                  <option value="3rd Year">
                    3rd Year
                  </option>

                  <option value="4th Year">
                    4th Year
                  </option>

                </select>

              </div>


              {/* CGPA */}

              <div className="field">

                <label>
                  Current CGPA *
                </label>

                <input
                  type="number"
                  min="0"
                  max="10"
                  step="0.01"
                  name="cgpa"
                  value={form.cgpa}
                  onChange={handleChange}
                  required
                />

              </div>


              {/* BACKLOG */}

              <div className="field">

                <label>
                  Active Backlog *
                </label>

                <select
                  name="backlog"
                  value={form.backlog}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Select
                  </option>

                  <option value="Yes">
                    Yes
                  </option>

                  <option value="No">
                    No
                  </option>

                </select>

              </div>

            </div>

          </section>


          {/* ==================================================
              SECTION 2
          ================================================== */}

          <section className="section">

            <h3>
              2. Club & Position
            </h3>


            {/* CLUB */}

            <div className="field">

              <label>
                Select Club *
              </label>

              <select
                name="club"
                value={form.club}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Club
                </option>

                {clubs.map((club) => (
                  <option
                    key={club.name}
                    value={club.name}
                  >
                    {club.name} — Faculty Coordinator:{" "}
                    {club.faculty}
                  </option>
                ))}

              </select>

            </div>


            {/* FACULTY COORDINATOR */}

            {form.club && (
              <div className="faculty-display">

                <strong>
                  Faculty Coordinator:
                </strong>{" "}

                {
                  clubs.find(
                    (club) =>
                      club.name === form.club
                  )?.faculty
                }

              </div>
            )}


            {/* POSITION */}

            <div className="field">

              <label>
                Position Applied For *
              </label>

              <select
                name="position"
                value={form.position}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select Position
                </option>

                {positions.map((position) => (
                  <option
                    key={position}
                    value={position}
                  >
                    {position}
                  </option>
                ))}

              </select>

            </div>

          </section>


          {/* ==================================================
              SECTION 3
          ================================================== */}

          <section className="section">

            <h3>
              3. Technical & Leadership Background
            </h3>


            {/* MOTIVATION */}

            <div className="field">

              <label>
                Why do you want to apply for this
                position, and why are you suitable
                for the position selected? *
              </label>

              <textarea
                name="motivation"
                value={form.motivation}
                onChange={handleChange}
                rows="6"
                required
              />

            </div>


            {/* TECHNICAL SKILLS */}

            <div className="field">

              <label>
                Relevant Technical Skills *
              </label>

              <textarea
                name="technicalSkills"
                value={form.technicalSkills}
                onChange={handleChange}
                rows="4"
                placeholder="Programming languages, frameworks, Git/GitHub, tools, technologies, etc."
                required
              />

            </div>


            {/* PROJECTS */}

            <div className="field">

              <label>
                Projects *
              </label>

              <textarea
                name="projects"
                value={form.projects}
                onChange={handleChange}
                rows="4"
                placeholder="Mention relevant academic or personal projects."
                required
              />

            </div>


            {/* ACHIEVEMENTS */}

            <div className="field">

              <label>
                Achievements *
              </label>

              <textarea
                name="achievements"
                value={form.achievements}
                onChange={handleChange}
                rows="4"
                placeholder="Mention relevant technical, academic, coding or other achievements."
                required
              />

            </div>


            {/* LEADERSHIP */}

            <div className="field">

              <label>
                Leadership Experience *
              </label>

              <textarea
                name="leadershipExperience"
                value={form.leadershipExperience}
                onChange={handleChange}
                rows="4"
                placeholder="Mention previous leadership, event coordination, team management or student activities."
                required
              />

            </div>

          </section>


          {/* ==================================================
              SECTION 4 - DECLARATION
          ================================================== */}

          <section className="section declaration">

            <h3>
              4. Declaration
            </h3>

            <label className="checkbox">

              <input
                type="checkbox"
                name="declaration"
                checked={form.declaration}
                onChange={handleChange}
              />

              <span>
                I confirm that the information provided
                in this nomination form is correct. If
                selected as an office-bearer of the Club,
                I agree to actively perform the
                responsibilities assigned to me,
                participate in Club activities, coordinate
                with the Faculty Coordinator and fellow
                office-bearers, and contribute towards
                building an active student community.
              </span>

            </label>

          </section>


          {/* ==================================================
              MESSAGE
          ================================================== */}

          {message && (
            <div
              className={
                message.startsWith("SUCCESS")
                  ? "message success"
                  : "message error"
              }
            >
              {message}
            </div>
          )}


          {/* ==================================================
              SUBMIT
          ================================================== */}

          <button
            type="submit"
            disabled={submitting}
          >

            {submitting
              ? "Submitting..."
              : "Submit Nomination"}

          </button>

        </form>

      </main>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer>

        <div>
          Department of Computer Science & Engineering
        </div>

        <div className="developed-by">
          Developed by <strong>Dr. Sushant Jhingran</strong>
        </div>

      </footer>

    </div>
  );
}

export default App;