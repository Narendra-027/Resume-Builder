import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { ArrowDown } from "react-feather";

import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";

import styles from "./Body.module.css";
import { downloadResumeJSON } from './Sections/downLoadJSON';

function Body() {
  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];
  const sections = {
    basicInfo: "Basic Info",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    skill: "Skills",
    achievement: "Achievements",
    course: "Coursework",
    por : "Position of Responsibility",
  };
  const resumeRef = useRef();

  const [activeColor, setActiveColor] = useState(colors[0]);
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo,
      sectionTitle: sections.basicInfo,
      detail: {},
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [],
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [],
    },
    [sections.skill]: {
      id: sections.skill,
      sectionTitle: sections.skill,
      details: [],
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [],
    },
    [sections.course]: {
      id: sections.course,
      sectionTitle: sections.course,
      points: [],
    },
    [sections.por]: {
      id: sections.por,
      sectionTitle: sections.por,
      points: [],
    },
  });
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const uploadedData = JSON.parse(e.target.result);
          console.log("Uploaded JSON data:", uploadedData);
          setResumeInformation(uploadedData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      };
      reader.readAsText(selectedFile);
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Resume Builder</p>
      <div className={styles.toolbar}>
        <div className={styles.colors}>
          {colors.map((item) => (
            <span
              key={item}
              style={{ backgroundColor: item }}
              className={`${styles.color} ${
                activeColor === item ? styles.active : ""
              }`}
              onClick={() => setActiveColor(item)}
            />
          ))}
        </div>

        <input
          type="file"
          accept=".json"
           onChange={handleFileUpload}
        />
        <div className={styles.download_data}>
          <button onClick={() => downloadResumeJSON(resumeInformation)}>Resume JSON <ArrowDown /></button>
          <ReactToPrint
            trigger={() => {
              console.log("resumeRef", resumeRef.current);
              return (
                <button>Resume PDF <ArrowDown /></button>
              );
            }}
            content={() => resumeRef.current}
            pageStyle={`@page {size: 8.27in 11.69in;}`}
          />
          {/* <button onClick={generatePDF}>Generate PDF</button> */}
        </div>
      </div>
      <div className={styles.main}>
        <Editor
          sections={sections}
          information={resumeInformation}
          setInformation={setResumeInformation}
        />
        <Resume
          ref={resumeRef}
          sections={sections}
          information={resumeInformation}
          activeColor={activeColor}
        />
      </div>
    </div>
  );
}

export default Body;
