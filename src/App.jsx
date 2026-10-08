import { useState } from "react";
import "./App.css";

// ======================================================
// GOOGLE APPS SCRIPT WEB APP URL
// ======================================================
// KEEP YOUR EXISTING WORKING GOOGLE APPS SCRIPT URL HERE
// ======================================================

const GOOGLE_SCRIPT_URL =
  "PASTE_YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";


// ======================================================
// ALL CLUBS
// ======================================================

const clubs = [
  {
    name: "Algorithmic Thinking Club",
    faculty: "Mr. Amit Kumar Updhyay",
  },
  {
    name: "Code and Canvas Club",
    faculty: "Dr. Puspendra Kumar Rajput",
  },
  {
    name: "National Youth Parliament Club",
    faculty: "Dr. Shivam Tiwari",
  },
  {
    name: "Open Source Club",
    faculty: "Dr. Anjum Mohd Aslam",
  },
  {
    name: "Drone Innovation and Implementation Club",
    faculty: "Dr. K. Meena",
  },
  {
    name: "NextGen Front-End Club",
    faculty: "Dr. Sushant Jhingran",
  },
  {
    name: "API Development & Integration Club",
    faculty: "Mr. Durgesh Narayan Singh",
  },
  {
    name: "Visual Arts, Music, Reel and Rhythm Club",
    faculty: "Dr. Harminder Kaur",
  },
  {
    name: "Cybersecurity, Threat Prevention & Digital Forensics Club",
    faculty: "Mr. Avinash Kumar",
  },
];


// ======================================================
// APP
// ======================================================

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

    // Member is fixed
    position: "Member",

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
// HANDLE INPUT
// ======================================================

  const handleChange = (e) => {

    const {
      name,
      value,
      type,
      checked,
    } = e.target;


    setForm({
      ...form,

      [name]:
        type === "checkbox"
          ? checked
          : value,
    });


    // Clear previous message

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


    // --------------------------------------------------
    // Declaration validation
    // --------------------------------------------------

    if (!form.declaration) {

      setMessage(
        "ERROR: Please accept the declaration before submitting."
      );

      return;
    }


    // --------------------------------------------------
    // University email validation
    // --------------------------------------------------

    const universityEmail =
      form.universityEmail
        .trim()
        .toLowerCase();


    if (
      !universityEmail.endsWith(
        "@ug.sharda.ac.in"
      )
    ) {

      setMessage(
        "ERROR: Please use your official university email ending with @ug.sharda.ac.in."
      );

      return;
    }


    // --------------------------------------------------
    // Mobile validation
    // --------------------------------------------------

    const mobileRegex =
      /^[6-9][0-9]{9}$/;


    if (
      !mobileRegex.test(
        form.mobile.trim()
      )
    ) {

      setMessage(
        "ERROR: Please enter a valid 10-digit mobile number."
      );

      return;
    }


    // --------------------------------------------------
    // CGPA validation
    // --------------------------------------------------

    const cgpa =
      Number(form.cgpa);


    if (
      Number.isNaN(cgpa) ||
      cgpa < 0 ||
      cgpa > 10
    ) {

      setMessage(
        "ERROR: CGPA must be between 0 and 10."
      );

      return;
    }


    // --------------------------------------------------
    // Club validation
    // --------------------------------------------------

    if (!form.club) {

      setMessage(
        "ERROR: Please select a club."
      );

      return;
    }


    // --------------------------------------------------
    // Apps Script URL validation
    // --------------------------------------------------

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


    // --------------------------------------------------
    // Start submission
    // --------------------------------------------------

    setSubmitting(true);


    try {

      const response =
        await fetch(
          GOOGLE_SCRIPT_URL,
          {
            method: "POST",

            body: JSON.stringify(
              form
            ),
          }
        );


      const result =
        await response.json();


      // ------------------------------------------------
      // SUCCESS
      // ------------------------------------------------

      if (result.success) {

        setMessage(
          "SUCCESS: Club membership registration submitted successfully."
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

          position: "Member",

          motivation: "",
          technicalSkills: "",
          projects: "",
          achievements: "",
          leadershipExperience: "",

          declaration: false,
        });


        // Scroll to top

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

      } else {

        setMessage(
          "ERROR: " +
            (
              result.message ||
              "Unable to submit registration."
            )
        );
      }


    } catch (error) {

      console.error(
        "Submission error:",
        error
      );


      setMessage(
        "ERROR: Unable to submit the registration. Please check your internet connection and try again."
      );

    }


    setSubmitting(false);
  };


// ======================================================
// FIND SELECTED CLUB
// ======================================================

  const selectedClub =
    clubs.find(
      (club) =>
        club.name === form.club
    );


// ======================================================
// UI
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
            Student Club Membership Registration
          </h2>

          <p>
            Academic Session 2026–27
          </p>

        </div>

      </header>


      {/* ==================================================
          MAIN
      ================================================== */}

      <main className="container">


        {/* ==================================================
            INTRODUCTION
        ================================================== */}

        <div className="intro">

          <h2>
            Club Membership Form
          </h2>


          <p>
            Students are invited to register as members
            of the Department of Computer Science &
            Engineering Clubs according to their
            interests and areas of development.
          </p>


          <p>
            Students are encouraged to actively
            participate in club activities, workshops,
            events, projects, competitions and other
            activities conducted by the respective Club.
          </p>


          {/* CLUB LIST */}

          <div className="club-information">

            <h3>
              Clubs Available for Membership
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


          {/* DEADLINE */}

          <p className="deadline">

            Registration Deadline:{" "}

            <strong>
              15 October 2026
            </strong>

          </p>

        </div>


        {/* ==================================================
            FORM
        ================================================== */}

        <form
          onSubmit={handleSubmit}
        >


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
                  Only @ug.sharda.ac.in email
                  addresses are accepted.
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
              2. Club Membership
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


                {clubs.map(
                  (club) => (

                    <option
                      key={club.name}
                      value={club.name}
                    >
                      {club.name}
                    </option>

                  )
                )}

              </select>

            </div>


            {/* FACULTY COORDINATOR */}

            {selectedClub && (

              <div className="faculty-display">

                <strong>
                  Faculty Coordinator:
                </strong>{" "}

                {selectedClub.faculty}

              </div>

            )}


            {/* POSITION */}

            <div className="field">

              <label>
                Membership Type
              </label>


              <input
                type="text"
                value="Member"
                readOnly
              />

            </div>

          </section>


          {/* ==================================================
              SECTION 3
          ================================================== */}

          <section className="section">

            <h3>
              3. Interest & Background
            </h3>


            {/* MOTIVATION */}

            <div className="field">

              <label>
                Why do you want to join the selected
                Club? *
              </label>


              <textarea
                name="motivation"
                value={form.motivation}
                onChange={handleChange}
                rows="6"
                placeholder="Tell us about your interest in the selected Club and what you would like to learn or contribute."
                required
              />

            </div>


            {/* TECHNICAL SKILLS */}

            <div className="field">

              <label>
                Relevant Technical / Other Skills *
              </label>


              <textarea
                name="technicalSkills"
                value={form.technicalSkills}
                onChange={handleChange}
                rows="4"
                placeholder="Programming languages, frameworks, tools, communication, creative skills, etc."
                required
              />

            </div>


            {/* PROJECTS */}

            <div className="field">

              <label>
                Projects / Activities
              </label>


              <textarea
                name="projects"
                value={form.projects}
                onChange={handleChange}
                rows="4"
                placeholder="Mention relevant academic projects, personal projects, competitions or activities."
              />

            </div>


            {/* ACHIEVEMENTS */}

            <div className="field">

              <label>
                Achievements
              </label>


              <textarea
                name="achievements"
                value={form.achievements}
                onChange={handleChange}
                rows="4"
                placeholder="Mention academic, technical, sports, creative or other achievements."
              />

            </div>


            {/* LEADERSHIP */}

            <div className="field">

              <label>
                Leadership / Teamwork Experience
              </label>


              <textarea
                name="leadershipExperience"
                value={
                  form.leadershipExperience
                }
                onChange={handleChange}
                rows="4"
                placeholder="Mention leadership, event coordination, teamwork or student activity experience."
              />

            </div>

          </section>


          {/* ==================================================
              SECTION 4
        ================================================== */}

          <section className="section declaration">

            <h3>
              4. Declaration
            </h3>


            <label className="checkbox">

              <input
                type="checkbox"
                name="declaration"
                checked={
                  form.declaration
                }
                onChange={
                  handleChange
                }
              />


              <span>

                I confirm that the information provided
                in this membership registration form is
                correct. I agree to actively participate
                in Club activities, follow the guidance of
                the Faculty Coordinator and contribute
                towards building an active and
                collaborative Club community.

              </span>

            </label>

          </section>


          {/* ==================================================
              MESSAGE
          ================================================== */}

          {message && (

            <div
              className={
                message.startsWith(
                  "SUCCESS"
                )
                  ? "message success"
                  : "message error"
              }
            >

              {message}

            </div>

          )}


          {/* ==================================================
              SUBMIT BUTTON
          ================================================== */}

          <button
            type="submit"
            disabled={submitting}
          >

            {submitting
              ? "Submitting..."
              : "Register as Club Member"}

          </button>

        </form>

      </main>


      {/* ==================================================
          FOOTER
      ================================================== */}

      <footer>

        <div>
          Department of Computer Science &
          Engineering
        </div>


        <div className="developed-by">

          Developed by{" "}

          <strong>
            Dr. Sushant Jhingran
          </strong>

        </div>

      </footer>

    </div>
  );
}

export default App;