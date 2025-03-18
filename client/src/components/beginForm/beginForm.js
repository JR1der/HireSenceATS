import './beginForm.css';
import downloadImg from '../../asset/images/download.svg';
import { useState } from "react";

const BeginForm = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("Click the button above or drop your resume in here! English resumes in PDF or DOCX only.");

    const handleFileChange = async (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setFileName(selectedFile.name); // Update the label with the file name
            await uploadFile(selectedFile);
        } else {
            alert("Будь ласка, виберіть PDF-файл.");
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append("cv", file);

        try {
            const response = await fetch("http://127.0.0.1:8000/api/upload-cv/", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Файл успішно завантажено!");
            } else {
                alert("Помилка завантаження.");
            }
        } catch (error) {
            console.error("Помилка завантаження:", error);
        }
    };

    return (
        <form className="beginForm" onSubmit={(e) => e.preventDefault()}>
            <div className="beginForm__field">
                <input id="fileInput" type="file" accept="application/pdf" onChange={handleFileChange} />
                <label htmlFor="fileInput" className="fileLabel">
                    <img src={downloadImg} alt="upload" />
                    <p>{fileName}</p>
                </label>
            </div>
        </form>
    );
};

export default BeginForm;
