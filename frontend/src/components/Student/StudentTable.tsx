import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Title from '../Admin/Title';
import { Fragment, useState } from 'react';
import { Checkbox, CssBaseline } from '@mui/material';
import { memo } from 'react';
import { useAppSelector } from '../../hooks/use-redux';
import { IStudentLesson } from '../../interfaces/IStudentLesson';
import useAxios from '../../hooks/use-axios';
import { UpdateLessonStudent } from '../../interfaces/UpdateLessonStudent';

function StudentTable() {
  const userClass = useAppSelector((state) => state.menu.userClass);
  const option = useAppSelector((state) => state.menu.option);
  const classInfo =
    (userClass && userClass.filter((classItem) => classItem.name === option)) ||
    [];
  const summaries: IStudentLesson[] =
    classInfo && classInfo[0].lessonsStudent ? classInfo[0].lessonsStudent : [];
  const [more, setMore] = useState<boolean>(false);

  const [checked, setChecked] = useState<boolean>(false);
  const [fileWork, setFileWork] = useState(null);
  const [fileJustification, setFileJustification] = useState(null);
  const [lessonId, setLessonId] = useState<string>('');
  const [summary, setSummaryID] = useState<string>('');

  function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
    setMore(!more);
  }

  const summaryInfo =
    summaries &&
    (more
      ? summaries
      : summaries.filter(
          (summItem: IStudentLesson, index: number) => index < 5,
        ));

  const { evaluations } = (classInfo && classInfo[0]) || null;

  const classTableInfo: JSX.Element = (
    <Fragment>
      <Title>{option}</Title>
      <CssBaseline />
      <Table size="small" key={Math.random()}>
        <TableHead>
          <TableRow key={Math.random()}>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Teacher</TableCell>
            {evaluations !== undefined && (
              <TableCell>Evaluation Date</TableCell>
            )}
            {evaluations !== undefined && <TableCell>Grade</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={classInfo[0].id}>
            <TableCell>
              {classInfo[0].startDate.toString().split('T')[0]}
            </TableCell>
            <TableCell>
              {classInfo[0].endDate.toString().split('T')[0]}
            </TableCell>
            <TableCell>{classInfo[0].teacher?.id}</TableCell>
            {evaluations !== undefined && (
              <TableCell key={Math.random()}>
                {evaluations.date
                  ? evaluations.date.toString().split('T')[0]
                  : ''}
              </TableCell>
            )}
            {evaluations !== undefined && (
              <TableCell key={Math.random()}>
                {evaluations.grade !== undefined ? evaluations.grade : ''}
              </TableCell>
            )}
          </TableRow>
        </TableBody>
      </Table>
    </Fragment>
  );


  const updateLessonStudent: UpdateLessonStudent = {
    className: classInfo[0].name,
    lessonID: lessonId,
    studentSummaryId:summary,
    studentId: classInfo[0].studentId!,
    presence: checked,
    absence: 'absent',
    submmitedWork: fileWork ? new FormData().append('file', fileWork) :'',
  };
  const file = new FormData();
  const data = {file, updateLessonStudent,}

  const {
    loading: isLoading,
    sendData,
  } = useAxios({
    method: 'Patch',
    url: '/class/updateLessonStudent',
    data: updateLessonStudent,
  });

  const {
    sendData:sendFile,
  } = useAxios({
    method: 'Post',
    url: '/attachment/files',
    data: file,
  });

  React.useEffect(() => {
    
    const data= sendData();
    console.log(updateLessonStudent);
  }, [checked]);

  //handleCheckbox
  const handleChange = () => {
    setChecked(!checked);
    sendData();
  };
  //handleFileUpload
  const onInputChange = ({ target }: any) => {
    setFileWork(target.files[0]);
  };

  const onInputChangeJustification = ({ target }: any) => {
    setFileJustification(target.files[0]);
  };

  const handleSumbitWork = ()=>{
    console.log(updateLessonStudent);
    console.log(fileWork);
    sendFile;
  }

  return (
    <Fragment>
      {!classInfo && <p>No data available!</p>}
      {classInfo && classTableInfo}
      {classInfo && summaryInfo.length > 0 && (
        <Fragment>
          <CssBaseline />
          <Table size="small">
            <TableHead>
              <TableRow key={Math.random()}>
                <TableCell>Date</TableCell>
                <TableCell>Summary</TableCell>
                <TableCell>Class Work</TableCell>
                <TableCell>Submmited Class Work</TableCell>
                <TableCell>Presence</TableCell>
                <TableCell>Absence</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {summaryInfo &&
                summaryInfo.map((lesson: IStudentLesson) => (
                  <TableRow key={lesson.lessonId}>
                    <TableCell>{lesson.lessonDate}</TableCell>
                    <TableCell>{lesson.lessonSummary}</TableCell>
                    <TableCell>{lesson.lessonClassWork}</TableCell>
                    <TableCell>
                      {!fileWork && (
                        <label htmlFor="upload-photo">
                          <input
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            onChange={onInputChange}
                          />
                          <Button
                            color="secondary"
                            variant="contained"
                            component="span"
                          >
                            Upload button
                          </Button>
                        </label>
                      )}
                      {fileWork && (
                        <label>
                          <Button
                            color="primary"
                            variant="outlined"
                            component="span"
                            sx={{ width: '15%' }}
                            onClick={()=>{
                              setLessonId(lesson.lessonId);
                              setSummaryID(lesson.lessonSummaryId);
                              console.log('Frontend');
                              console.log(updateLessonStudent);
                              file.append('file', fileWork);
                              file.append('updateLesson', JSON.stringify(updateLessonStudent));
                              updateLessonStudent.submmitedWork=file;
                              sendFile();
                            }}
                          >
                            Submmit work
                          </Button>
                          <Button
                            color="error"
                            variant="outlined"
                            component="span"
                            sx={{ width: '15%' }}
                            onClick={() => {
                              setFileWork(null);
                            }}
                          >
                            Cancel
                          </Button>
                        </label>
                      )}
                    </TableCell>
                    <TableCell key={Math.random()}>
                      <Checkbox
                        checked={checked}
                        onChange={() => {
                          setLessonId(lesson.lessonId);
                          setSummaryID(lesson.lessonSummaryId);
                          setChecked(!checked);
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      {!fileJustification && (
                        <label htmlFor="upload-photo">
                          <input
                            key={Math.random()}
                            style={{ display: 'none' }}
                            id="upload-photo"
                            name="upload-photo"
                            type="file"
                            onChange={onInputChangeJustification}
                          />
                          <Button
                            color="secondary"
                            variant="contained"
                            component="span"
                          >
                            Upload Justification
                          </Button>
                        </label>
                      )}
                      {fileJustification && (
                        <label>
                          <Button
                            color="primary"
                            variant="outlined"
                            component="span"
                            sx={{ width: '15%' }}
                          >
                            Submitt
                          </Button>
                          <Button
                            color="error"
                            variant="outlined"
                            component="span"
                            sx={{ width: '15%' }}
                            onClick={() => {
                              setFileJustification(null);
                            }}
                          >
                            Cancel
                          </Button>
                        </label>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Link href="#" onClick={preventDefault}>
            {!more ? 'See more' : 'See less'}
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
}

//<TableCell>{lesson.lessonStudentPresence}</TableCell>
/*<TableCell>{lesson.lessonStudentSubmmitedClassWork}</TableCell>*/

export default memo(StudentTable);
