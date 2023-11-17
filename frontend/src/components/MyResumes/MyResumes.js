import React,{ useState, useEffect }from 'react'
import { Space, Table, Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons'
import resumeData from './Sections/DefaultResume.json';
import { withRouter } from 'react-router-dom';
import Axios from 'axios';

function MyResumes(props) {
    const [resumeDefault, setResumeDefault] = useState(resumeData);
    const [resumeList, setResumeList] = useState([]);
    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'titel',
          render: (text) => <a>{text}</a>,
        },
        {
          title: 'Last Modified',
          dataIndex: 'last_modified',
          key: 'last_modified',
        }
    ]

    const handleAddNew = () => {
        setResumeDefault(resumeData);
        const variable = {
            resume: resumeDefault,
        }
        Axios.post('/api/resume/uploadResume', variable)
        .then(response1 =>{
          if(response1.data.success){
              console.log("data:", response1.data);
              Axios.post('/api/users/addResume',{userId: props.user.userData._id, resumeId: response1.data.id})
              .then(response2 =>{
                  if(response2.data.success){
                    console.log("response2: ",response2);
                    props.history.push({
                      pathname: "/body",
                      state: { resumeId: response1.data.id,
                               userId: props.user.userData._id } //
                    });
                  }else{
                    alert('Failed to add Resume to user');
                  }
              })
          }else{
              alert('Failed to create Resume');
          }
        })
    }

    const compareByDateDesc = (a, b) => {
      return new Date(b.last_modified) - new Date(a.last_modified);
    };
    
    useEffect(() =>{
      if(props.user && props.user.userData){
        Axios.get(`/api/users/getResumeList?userId=${props.user.userData._id}`)
        .then(response =>{
          console.log("resp: ", response);
          let myResumes = response.data.resumes.map((ele, index) =>{
              return {
                key: ele.id,
                title: ele.title,
                last_modified: ele.date
              }
            })
            const sortedResumes = myResumes.sort(compareByDateDesc);
            setResumeList(sortedResumes);
            console.log("resumeList",resumeList);
        })
     }
    },[props.user.userData])
  return (
  <div style={{backgroundColor: '#A3BCB6', height: '58rem', paddingTop: '1rem'}}>
    <div style={{ width: '75%', margin: '3rem auto', 
                height: '100vh', backgroundColor:'#fff', 
                padding: '0.5rem', borderRadius: '0.25rem'}}>
        <Button onClick = {handleAddNew} type="primary" icon={<PlusOutlined />} size='large' >New </Button>
        <Table 
         onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              props.history.push({
                pathname: "/body",
                state: { resumeId: record.key, userId: props.user.userData._id } //
              });
            }, // click row
            onDoubleClick: (event) => {}, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
        dataSource={resumeList} columns={columns} 
        />
    </div>
  </div>
  )
}

export default withRouter(MyResumes)