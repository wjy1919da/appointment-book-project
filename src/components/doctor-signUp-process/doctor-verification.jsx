import './doctor-verification.styles.scss';
import { Link } from 'react-router-dom';
import CloseButton from '../../assets/doctor/doctor-verification-close-Icon.png'
import UploadIcon from '../../assets/doctor/Upload.png'
import { Button, Dropdown, Form } from 'react-bootstrap';
import {Upload} from "@aws-sdk/lib-storage";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import React from "react";
import { useState, useRef } from 'react';

const s3Client = new S3Client({
    region: process.env.REACT_APP_REGION,
    credentials: {
      accessKeyId: process.env.REACT_APP_ACCESS_ID,
      secretAccessKey: process.env.REACT_APP_ACCESS_KEY
    },
    logger: console // 这会输出日志到控制台
});
  
const DoctorVerification = () => {
   // console.log("process", process.env);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef(null);
    // 新状态来跟踪正在上传的文件和已上传的文件
    const [uploadingFiles, setUploadingFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const uploadToS3 = async (file) => {
        const fileName = `${Date.now()}-${file.name}`;
        const upload = new Upload({
            client: s3Client,
            params: {
              Bucket: process.env.REACT_APP_BUCKET_NAME,
              Key: fileName,
              Body: file,
            },
            partSize: 8 * 1024 * 1024, // 设置每个部分大小为 1MB
            queueSize: 4, // 同时上传的部分数量
          });
        
          upload.on('httpUploadProgress', (progress) => {
            console.log(`上传进度：${Math.round((progress.loaded / progress.total) * 100)}%`);
          });
        
          try {
            const data = await upload.done();
            if (data.$metadata.httpStatusCode === 200) {
              // 所有分段都已成功上传
              console.log('上传成功', data);
              // 这里可以根据需要更新应用程序的状态或 UI
            }
          } catch (err) {
            console.error('上传错误', err);
            // 这里可以处理上传失败的情况
          }
    };
    const handleFileSelection = (event) => {
        const newFiles = Array.from(event.target.files);
        setSelectedFiles(prevFiles => {
            const existingFileNames = new Set(prevFiles.map(file => file.name));
            const newUniqueFiles = newFiles.filter(file => !existingFileNames.has(file.name));
            return [...prevFiles, ...newUniqueFiles];
        });
    };    
    
    const handleUploadClick = async () => {
        console.log(`正在上传 ${selectedFiles.length} 个文件...`);
        const uploadPromises = selectedFiles.map(file => uploadToS3(file));
        
        try {
            // 等待所有文件上传完成
            const uploadResults = await Promise.all(uploadPromises);
            console.log('所有文件上传结束', uploadResults);
            setUploadingFiles(selectedFiles); // 将选择的文件设置为正在上传状态
            setSelectedFiles([]); // 清空选择的文件列表
        } catch (err) {
            console.error('上传过程中出现错误', err);
        }
    };
    const handleRemoveFile = (fileName) => {
        // 过滤掉需要删除的文件
        setSelectedFiles(prevFiles => prevFiles.filter(file => file.name !== fileName));
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
                     Please upload all required medical licenses or certifications to verify your profile.
                </span>
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
                <span className='doctor-verification-text'>Uploading {selectedFiles.length}/3 files</span>
                 {selectedFiles.map((file) => (
                    <div key={file.name} className="selected-file">
                        <div className='uploadFile-box'>
                            <span className='doctor-verification-text' style={{ marginLeft: '10px' }}>{file.name}</span>
                            <img 
                                src={CloseButton}
                                onClick={() => handleRemoveFile(file.name)}
                                style={{ width: '15px', height: '15px', marginRight: '10px', cursor: 'pointer' }}
                                alt="Remove"
                            />
                        </div>
                    </div>
                ))}
            </div> 
            <div className='doctor-verification-list-file-section'>
                <span className='doctor-verification-text'>Upload</span>
                {uploadedFiles.map((file) => (
                    <div key={file.name} className="selected-file">
                        <div className='uploadFile-box'>
                            <span className='doctor-verification-text' style={{ marginLeft: '10px' }}>{file.name}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='doctor-verification-upload-button'>
                <button className="doctor-verification-upload-button" onClick={handleUploadClick}>UPLOAD FILES</button>
            </div>
        </div>  
    )
}

export default DoctorVerification;