import React, { useState } from 'react';
import "./doctor-apply.styles.scss";

function DoctorApplication() {
    const [id, setId] = useState('');
    const [workYears, setWorkYears] = useState('');
    const [workClinic, setWorkClinic] = useState('');
    const [graduated, setGraduated] = useState('');
    const [degree, setDegree] = useState('');
    const [admissionTime, setAdmissionTime] = useState('');
    const [graduatedTime, setGraduatedTime] = useState('');
    const [license, setLicense] = useState('');
    const [imageSrc, setImageSrc] = useState('');
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        // 实现上传文件的逻辑
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleIdChange = (event) => {
        setId(event.target.value);
    };

    const handleWorkYearsChange = (event) => {
        setWorkYears(event.target.value);
    };

    const handleWorkClinicChange = (event) => {
        setWorkClinic(event.target.value);
    };

    const handleGraduatedChange = (event) => {
        setGraduated(event.target.value);
    };

    const handleDegreeChange = (event) => {
        setDegree(event.target.value);
    };

    const handleGraduatedTimeChange = (event) => {
        setGraduatedTime(event.target.value);
    };

    const handleAdmissionTimeChange = (event) => {
        setAdmissionTime(event.target.value);
    };

    const handleLicenseChange = (event) => {
        setLicense(event.target.value);
    };

    return (
        <div className="profile-page">
            <div className="profile-image">
                <span>Profile Image:</span>
                <div className="profile-icon"></div>
                <label htmlFor="image-upload">
                    {imageSrc ? (
                        <img src={imageSrc} alt="Profile" />
                    ) : (
                        <div className="image-placeholder">Upload Image</div>
                    )}
                </label>
                <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
                <button className="edit-button">Edit</button>
            </div>
            <div className="profile-details">
                <div className="id">
                    <label htmlFor="id">Identity ID:</label>
                    <input
                        id="id"
                        type="text"
                        value={id}
                        onChange={handleIdChange}
                    />
                </div>
                <div className="workYears">
                    <label htmlFor="workYears">Working Years:</label>
                    <input
                        id="workYears"
                        type="text"
                        value={id}
                        onChange={handleWorkYearsChange}
                    />
                </div>
                <div className="theClinic">
                    <label htmlFor="theClinic">The Clinic:</label>
                    <select className="theClinic-select">
                        <option>1</option>
                        <option>2</option>
                    </select>
                    <input
                        id="theClinic"
                        type="text"
                        value={id}
                        onChange={handleWorkClinicChange}
                    />
                </div>
                <div className="graduated">
                    <label htmlFor="graduated">Graduated School:</label>
                    <select className="graduated-select">
                        <option>1</option>
                        <option>2</option>
                    </select>
                    <input
                        id="graduated"
                        type="text"
                        value={id}
                        onChange={handleGraduatedChange}
                    />
                </div>
                <div className="degree">
                    <label htmlFor="degree">Academic Degree:</label>
                    <select className="degree-select">
                        <option>1</option>
                        <option>2</option>
                    </select>
                    <input
                        id="degree"
                        type="text"
                        value={id}
                        onChange={handleDegreeChange}
                    />
                </div>
                <div className="admissionTime:">
                    <label htmlFor="admissionTime">Admission Time:</label>
                    <input
                        id="admissionTime"
                        type="date"
                        value={id}
                        onChange={handleAdmissionTimeChange}
                    />
                </div>
                <div className="graduatedTime">
                    <label htmlFor="graduatedTime">Graduated Time:</label>
                    <input
                        id="graduatedTime"
                        type="date"
                        value={id}
                        onChange={handleGraduatedTimeChange}
                    />
                </div>
                <div className="file-upload">
                    <label htmlFor="graduatedTime">License:</label>
                    <div className="file-upload-box">
                        {file && (
                            <div className="file-upload-info">
                                <div>File Name: {file.name}</div>
                                <div>File Type: {file.type}</div>
                                <div>File Size: {(file.size / (1024 * 1024)).toFixed(2)} MB</div>
                            </div>
                        )}
                        <button onClick={handleFileUpload}>Upload Files</button>
                        <input type="file" onChange={handleFileChange} />
                    </div>
                </div>
                <div>Submit</div>
            </div>
        </div>
    );
}

export default DoctorApplication;
