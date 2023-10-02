import React, { useEffect, useState } from "react";
import styles from "../Editor.module.css";
import InputControl from "../../InputControl/InputControl";
function WorkExpBody(props) {
  return (
    <div className={styles.detail}>
        <div className={styles.row}>
        <InputControl
            label="Title"
            placeholder="Enter title eg. Frontend developer"
            value={props.values.title}
            onChange={(event) =>
            props.setValues((prev) => ({ ...prev, title: event.target.value }))
            }
        />
        <InputControl
            label="Company Name"
            placeholder="Enter company name eg. amazon"
            value={props.values.companyName}
            onChange={(event) =>
            props.setValues((prev) => ({ ...prev, companyName: event.target.value }))
            }
        />
        </div>
        <div className={styles.row}>
        <InputControl
            label="Certificate Link"
            placeholder="Enter certificate link"
            value={props.values.certificationLink}
            onChange={(event) =>
            props.setValues((prev) => ({
                ...prev,
                certificationLink: event.target.value,
            }))
            }
        />
        <InputControl
            label="Location"
            placeholder="Enter location eg. Remote"
            value={props.values.location}
            onChange={(event) =>
            props.setValues((prev) => ({ ...prev, location: event.target.value }))
            }
        />
        </div>
        <div className={styles.row}>
        <InputControl
            label="Start Date"
            type="date"
            placeholder="Enter start date of work"
            value={props.values.startDate}
            onChange={(event) =>
            props.setValues((prev) => ({ ...prev, startDate: event.target.value }))
            }
        />
        <InputControl
            label="End Date"
            type="date"
            placeholder="Enter end date of work"
            value={props.values.endDate}
            onChange={(event) =>
            props.setValues((prev) => ({ ...prev, endDate: event.target.value }))
            }
        />
        </div>

        <div className={styles.column}>
        <label>Enter work description</label>
        <InputControl
            placeholder="Line 1"
            value={props.values.points ? props.values.points[0] : ""}
            onChange={(event) => props.handlePointUpdate(event.target.value, 0)}
        />
        <InputControl
            placeholder="Line 2"
            value={props.values.points ? props.values.points[1] : ""}
            onChange={(event) => props.handlePointUpdate(event.target.value, 1)}
        />
        <InputControl
            placeholder="Line 3"
            value={props.values.points ? props.values.points[2] : ""}
            onChange={(event) => props.handlePointUpdate(event.target.value, 2)}
        />
        </div>
    </div>
  )
}

export default WorkExpBody