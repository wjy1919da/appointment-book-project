import './doctor-verification.styles.scss';
import { Link } from 'react-router-dom';
import CloseButton from '../../assets/doctor/doctor-verification-close-Icon.png'
import UploadIcon from '../../assets/doctor/Upload.png'
import { Button, Dropdown, Form } from 'react-bootstrap';
import {Upload} from "@aws-sdk/lib-storage";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { useState, useRef } from 'react';
import userInfoQueryStore from '../../userStore';
// import doctorInfoQueryStxore from '../../doctorStore.ts';
import SignupAndLoginButton from '../components-signup-and-login/signup-and-login-button/signup-and-login-button.component';
const s3Client = new S3Client({
    region: 'us-west-1', // 例如 'us-west-2'
    credentials: {
        accessKeyId: 'AKIAWQE6ZUZGA6LCR3UX',
        secretAccessKey: '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'
    }

  });
const DoctorVerification = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const switchPopupTab = userInfoQueryStore(state => state.switchPopupTab);
    const fileInputRef = useRef(null);
    const uploadToS3 = async (file) => {
        const fileName = `${Date.now()}-${file.name}`;
        const upload = new Upload({
            client: s3Client,
            params: {
                Bucket: 'verificationbucketcharm',
                Key: fileName,
                Body: file,
            },
            // 可以增加一些配置来控制上传的部分大小和并发性
            partSize: 5 * 1024 * 1024, // 例如，设置每个部分大小为 5MB
            queueSize: 4, // 同时上传的部分数量
        });
    
        upload.on('httpUploadProgress', (progress) => {
            console.log(`上传进度：${Math.round(progress.loaded / progress.total * 100)}%`);
        });
    
        try {
            const data = await upload.done();
            console.log('上传成功', data);
            // 文件上传成功后的操作
        } catch (err) {
            console.log('上传错误', err);
        }
    };
    const handleBrowseFiles = () => {
        fileInputRef.current.click();
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    
    const handleDrop = (e) => {
        e.preventDefault();
        handleFileSelection({ target: { files: e.dataTransfer.files } });
    };

    const handleFileSelection = (event) => {
        // 获取新选中的所有文件并转换为数组
        const newFilesArray = Array.from(event.target.files);
    
        // 更新状态以添加不重复的新文件
        setSelectedFiles(prevFiles => {
            // 创建一个包含所有当前文件名的集合
            const existingFileNames = new Set(prevFiles.map(file => file.name));
    
            // 过滤掉已经存在的文件
            const filteredNewFiles = newFilesArray.filter(file => !existingFileNames.has(file.name));
    
            // 将过滤后的新文件添加到已有文件数组中
            return [...prevFiles, ...filteredNewFiles];
        });
    };    
    const handleRemoveFile = (fileName) => {
        // 过滤掉需要删除的文件
        setSelectedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
    };
    const handleUploadClick = async () => {
        console.log(`正在上传 ${selectedFiles.length} 个文件...`);
        const uploadPromises = selectedFiles.map(file => uploadToS3(file));
        
        try {
            // 等待所有文件上传完成
            const uploadResults = await Promise.all(uploadPromises);
            console.log('所有文件上传成功', uploadResults);
            // 可以在这里调用 switchPopupTab 或其他函数来处理上传成功后的逻辑
        } catch (err) {
            console.error('上传过程中出现错误', err);
        }
    };
    const handleClickUploadBox = () => {
        // Trigger the hidden file input click event
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className='doctor-verification-main-container'>
            <div className='doctor-verification-title'>
                <span className='doctor-verification-text'>
                    Verification
                </span>
            </div>
            <div className='doctor-verification-doctor-profile'>
                <span className='doctor-verification-text'>Which Profile do you want to Claim</span>
                <label htmlFor="doctorProfile"></label>
                <Dropdown>
                        <Dropdown.Toggle className="doctor-verification-dropDown--button" id="dropdownMenuButton" data-bs-auto-close="outside">
                            Doctor Profile
                        </Dropdown.Toggle>
                        <Dropdown.Menu  className='search-doctor-dropDown-menu'>
                        </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className='doctor-verification-certification'>
                <Dropdown>
                        <Dropdown.Toggle className="doctor-verification-dropDown--button" id="dropdownMenuButton" data-bs-auto-close="outside">
                            Board Certificate
                        </Dropdown.Toggle>

                        <Dropdown.Menu  className='search-doctor-dropDown-menu'>
                        </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className='doctor-verification-upload-section'>
                <span className='doctor-verification-gray-text'>
                    Step 1 of 1
                </span>
                <span className='doctor-verification-text'>
                {selectedFiles.length === 0 
                    ? "Please upload all required medical licenses or certifications to verify your profile." 
                    : `${selectedFiles.length} file(s) selected`}
                </span>
                {selectedFiles.map((file, index) => (
                    <div key={index} className="selected-file">
                        <span>{file.name}</span>
                        <button onClick={() => handleRemoveFile(file.name)}>delete</button>
                    </div>
                ))}
                {/* <input type="file" onChange={handleFileSelection} multiple className='doctor-verification-text' /> */}
            </div>
            <div className='doctor-verification-upload-body'
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={handleBrowseFiles}>
                    <img src={UploadIcon} alt="Upload Icon" />
                    <span className='doctor-verification-text'>Drag and Drop files or Browse</span>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelection}
                    multiple
                    style={{ display: 'none' }}
                />
            <div className='doctor-verification-choose-file-section'>
                <span className='doctor-verification-text'>Uploading 3/3 files</span>
                <div className='uploadFile-box'>
                    <span className='doctor-verification-text' style={{marginLeft:'10px'}}>license.PDF</span>
                    <img src = {CloseButton} style={{width:'15px',height:'15px',marginRight:'10px'}}></img>
                </div>
            </div>
            <div className='doctor-verification-list-file-section'>
                <span className='doctor-verification-text'>Upload</span>
                <div className='uploadFile-box' onClick={handleClickUploadBox}>
                    <span className='doctor-verification-text' style={{marginLeft:'10px'}}>license.PDF</span>
                </div>
                <div className='uploadFile-box' onClick={handleClickUploadBox}>
                    <span className='doctor-verification-text' style={{marginLeft:'10px'}}>license.PDF</span>
                </div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelection}
                multiple
                style={{ display: 'none' }}
            />
            <div className='doctor-verification-upload-button'>
                <button className="doctor-verification-upload-button" onClick={handleUploadClick}>UPLOAD FILES</button>
            </div>
        </div>  
    )
}

export default DoctorVerification;