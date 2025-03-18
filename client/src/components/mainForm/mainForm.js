import "./mainForm.css"
import Button from "../button/button.js"
import {useState} from "react";

const MainForm = () => {
    const [jobDescription, setJobDescription] = useState("")

    const handleChange = (event) => {
        const value = event.target.value;
        setJobDescription(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (jobDescription.length < 50) {
            alert("Job description must be at least 50 characters.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/api/upload-job-description/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({job_description: jobDescription}),
            });

            if (response.ok) {
                const data = await response.json();
                alert(data.message || "Job description uploaded successfully");
            } else {
                alert("Error uploading job description.");
            }
        } catch (error) {
            console.error("Upload error:", error);
            alert("Failed to upload. Please try again.");
        }
    }

    return (
        <form className="beginForm" onSubmit={handleSubmit}>
            <div className="beginForm__field">
                <div className="mainForm__title">
                </div>
                <p>
                    To start, copy and paste the job description you want to compare your resume to. Don't have a job in
                    mind yet?
                    Instantly get a free resume review with Score My Resume.
                </p>

                <textarea
                    className="beginForm__input"
                    required
                    minLength={50}
                    maxLength={5000}
                    type="text"
                    placeholder="Paste your job description here to get result."
                    value={jobDescription}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div className="beginForm__button">
                <Button text={"Submit"} className="btn">Submit</Button>
            </div>
        </form>
    )
}

export default MainForm

