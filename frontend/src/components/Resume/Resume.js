import React, { forwardRef, useEffect, useRef, useState } from "react";
import {
  AtSign,
  Calendar,
  GitHub,
  Linkedin,
  MapPin,
  Paperclip,
  Phone,
} from "react-feather";
import { Document, Page, PDFViewer } from 'react-pdf';
import styles from "./Resume.module.css";

const Resume = forwardRef((props, ref) => {
  const months = ["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Dec"]
  const information = props.information;
  const sections = props.sections;
  const containerRef = useRef();

  const [columns, setColumns] = useState([[], []]);
  const [source, setSource] = useState("");
  const [target, seTarget] = useState("");

  const info = {
    workExp: information[sections.workExp],
    project: information[sections.project],
    achievement: information[sections.achievement],
    education: information[sections.education],
    basicInfo: information[sections.basicInfo],
    skill: information[sections.skill],
    course: information[sections.course],
    por: information[sections.por],
  };

  const getFormattedDate = (value) => {
    if (!value) return "";
    const date = new Date(value);

    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  };

  const sectionDiv = {
    [sections.workExp]: (
      <div
        key={"workexp"}
        draggable
        onDragOver={() => seTarget(info.workExp?.id)}
        onDragEnd={() => setSource(info.workExp?.id)}
        className={`${styles.section} ${
          info.workExp?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.workExp.sectionTitle}</div>
        <div className={styles.content}>
          {info.workExp?.details?.map((item) => (
            <div className={styles.item} key={item?.title}>
              {item.title ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <span />
              )}
              <div className={styles.row}>
                  {item.companyName ? (
                    <p className={styles.subTitle}>{item.companyName}</p>
                  ) : (
                    <span />
                  )}
                  {item.certificationLink ? (
                    <a className={styles.link} href={item.certificationLink} target="_blank">
                      Link
                      <Paperclip />
                    </a>
                  ) : (
                    <span />
                  )}
              </div>

              <div className={styles.row}>
                  {item.startDate && item.endDate ? (
                    <div className={styles.date}>
                      <Calendar /> {getFormattedDate(item.startDate)} - 
                      {getFormattedDate(item.endDate)}
                    </div>
                  ) : (
                    <div />
                  )}
                  {item.location ? (
                    <p className={styles.date}>
                      <MapPin /> {item.location}
                    </p>
                  ) : (
                    <span />
                  )}
              </div>
              {item.points?.length > 0 ? (
                <ul className={styles.points}>
                  {item.points?.map((elem, index) => (
                    elem.length > 0?
                    <li className={styles.point} key={elem + index}>
                      {elem}
                    </li>:<span/>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.project]: (
      <div
        key={"project"}
        draggable
        onDragOver={() => seTarget(info.project?.id)}
        onDragEnd={() => setSource(info.project?.id)}
        className={`${styles.section} ${
          info.project?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.project.sectionTitle}</div>
        <div className={styles.content}>
          {info.project?.details?.map((item) => (
            <div className={styles.item}>
              <div className={styles.row1}>
                {item.title ? (
                  <p className={styles.title}>{item.title}</p>
                ) : (
                  <span />
                )}
                {item.type ? (
                  <p className={styles.type}>{item.type}</p>
                ) : (
                  <span />
                )}
              </div>
              <div className={styles.row}>
                {item.startDate && item.endDate ? (
                  <div className={styles.date}>
                    <Calendar /> {getFormattedDate(item.startDate)} -
                    {getFormattedDate(item.endDate)}
                  </div>
                ) : (
                  ""
                )}
                <div className={styles.row1}>
                  {item.link ? (
                    <a className={styles.link} href={item.link} target="_blank">
                      <Paperclip />
                       Link
                    </a>
                  ) : (
                    <span />
                  )}
                  {item.github ? (
                    <a className={styles.link} href={item.github} target="_blank">
                      <GitHub />
                      Github
                    </a>
                  ) : (
                    <span />
                  )}
                </div>
              </div>
  
              {item.overview ? (
                <p className={styles.overview}>{item.overview} </p>
              ) : (
                <span />
              )}
              {item.points?.length > 0 ? (
                <ul className={styles.points}>
                  {item.points?.map((elem, index) => (
                    elem.length > 0?
                    <li className={styles.point} key={elem + index}>
                      <p>{elem} </p>
                    </li>:<span/>
                  ))}
                </ul>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.education]: (
      <div
        key={"education"}
        draggable
        onDragOver={() => seTarget(info.education?.id)}
        onDragEnd={() => setSource(info.education?.id)}
        className={`${styles.section} ${
          info.education?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>
          {info.education?.sectionTitle}
        </div>
        <div className={styles.content}>
          {info.education?.details?.map((item) => (
            <div className={styles.item}>
              {item.title ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <span />
              )}
              {item.college ? (
                <p className={styles.subTitle}>{item.college}</p>
              ) : (
                <span />
              )}
              <div className={styles.row}>
                {item.startDate && item.endDate ? (
                  <div className={styles.date}>
                    <Calendar /> {getFormattedDate(item.startDate)} -
                    {getFormattedDate(item.endDate)}
                  </div>
                ) : (
                  ""
                )}
                {item.result ? (
                  <div className={styles.result}>{item.result}</div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.skill]: (
      <div
        key={"skill"}
        draggable
        onDragOver={() => seTarget(info.skill?.id)}
        onDragEnd={() => setSource(info.skill?.id)}
        className={`${styles.section} ${
          info.skill?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.skill?.sectionTitle}</div>
        <div className={styles.content}>
          {info.skill?.details?.map((item) => (
            <div className={styles.item}>
              {item.title ? (
                <p className={styles.title}>{item.title}</p>
              ) : (
                <span />
              )}
              {item.points?.length > 0 ? (
                <div className={styles.skillContainer}>
                  {item.points?.map((elem, index) => (
                    elem.length > 0?
                    (<div className={styles.skill} key={elem + index}>
                      {elem}
                    </div>):(<span/>)
                  ))}
                </div>
              ) : (
                <span />
              )}
            </div>
          ))}
        </div>
      </div>
    ),
    [sections.course]: (
      <div
        key={"course"}
        draggable
        onDragOver={() => seTarget(info.course?.id)}
        onDragEnd={() => setSource(info.course?.id)}
        className={`${styles.section} ${
          info.course?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.course?.sectionTitle}</div>
        <div className={styles.content}>
          {info.course?.points?.length > 0 ? (
            <ul className={styles.numbered}>
              {info.course?.points?.map((elem, index) => (
                elem.length > 0?
                <li className={styles.point} key={elem + index}>
                  {elem}
                </li>:<span/>
              ))}
            </ul>
          ) : (
            <span />
          )}
        </div>
      </div>
    ),
    [sections.achievement]: (
      <div
        key={"achievement"}
        draggable
        onDragOver={() => seTarget(info.achievement?.id)}
        onDragEnd={() => setSource(info.achievement?.id)}
        className={`${styles.section} ${
          info.achievement?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.achievement?.sectionTitle}</div>
        <div className={styles.content}>
          {info.achievement?.points?.length > 0 ? (
            <ul className={styles.numbered}>
              {info.achievement?.points?.map((elem, index) => (
                elem.length > 0?
                <li className={styles.point} key={elem + index}>
                  {elem}
                </li>:<span/>
              ))}
            </ul>
          ) : (
            <span />
          )}
        </div>
      </div>
    ),
    [sections.por]: (
      <div
        key={"por"}
        draggable
        onDragOver={() => seTarget(info.por?.id)}
        onDragEnd={() => setSource(info.por?.id)}
        className={`${styles.section} ${
          info.por?.sectionTitle ? "" : styles.hidden
        }`}
      >
        <div className={styles.sectionTitle}>{info.por?.sectionTitle}</div>
        <div className={styles.content}>
          {info.por?.points?.length > 0 ? (
            <ul className={styles.numbered}>
              {info.por?.points?.map((elem, index) => (
                elem.length > 0?
                <li className={styles.point} key={elem + index}>
                  {elem}
                </li>:<span/>
              ))}
            </ul>
          ) : (
            <span />
          )}
        </div>
      </div>
    ),
  };

  const swapSourceTarget = (source, target) => {
    if (!source || !target) return;
    const tempColumns = [[...columns[0]], [...columns[1]]];

    let sourceRowIndex = tempColumns[0].findIndex((item) => item === source);
    let sourceColumnIndex = 0;
    if (sourceRowIndex < 0) {
      sourceColumnIndex = 1;
      sourceRowIndex = tempColumns[1].findIndex((item) => item === source);
    }

    let targetRowIndex = tempColumns[0].findIndex((item) => item === target);
    let targetColumnIndex = 0;
    if (targetRowIndex < 0) {
      targetColumnIndex = 1;
      targetRowIndex = tempColumns[1].findIndex((item) => item === target);
    }

    const tempSource = tempColumns[sourceColumnIndex][sourceRowIndex];
    tempColumns[sourceColumnIndex][sourceRowIndex] =
      tempColumns[targetColumnIndex][targetRowIndex];

    tempColumns[targetColumnIndex][targetRowIndex] = tempSource;

    setColumns(tempColumns);
  };

  useEffect(() => {
    setColumns([
      [sections.workExp,sections.project, sections.por],
      [sections.education, sections.skill, sections.course, sections.achievement],
    ]);
  }, []);

  useEffect(() => {
    swapSourceTarget(source, target);
  }, [source]);

  useEffect(() => {
    const container = containerRef.current;
    if (!props.activeColor || !container) return;

    container.style.setProperty("--color", props.activeColor);
  }, [props.activeColor]);

  return (
    <div ref={ref}>
      <div ref={containerRef} className={styles.container} id="resume1">
        <div className={styles.header}>
          <p className={styles.heading}>{info.basicInfo?.detail?.name}</p>
          <p className={styles.subHeading}>{info.basicInfo?.detail?.title}</p>

          <div className={styles.links}>
            {info.basicInfo?.detail?.email ? (
              <a className={styles.link} type="email">
                <AtSign /> {info.basicInfo?.detail?.email}
              </a>
            ) : (
              <span />
            )}
            {info.basicInfo?.detail?.phone ? (
              <a className={styles.link}>
                <Phone /> {info.basicInfo?.detail?.phone}
              </a>
            ) : (
              <span />
            )}
            {info.basicInfo?.detail?.linkedin ? (
              <a className={styles.link} href={info.basicInfo?.detail?.linkedin} target="_blank">
                <Linkedin /> LinkedIn
              </a>
            ) : (
              <span />
            )}
            {info.basicInfo?.detail?.github ? (
              <a className={styles.link} href={info.basicInfo?.detail?.github} target="_blank">
                <GitHub /> GitHub
              </a>
            ) : (
              <span />
            )}
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.col1}>
            {columns[0].map((item) => sectionDiv[item])}
          </div>
          <div className={styles.col2}>
            {columns[1].map((item) => sectionDiv[item])}
          </div>
        </div>
      </div>
    </div>
  );
});

export default Resume;
