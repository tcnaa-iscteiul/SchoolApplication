import * as React from 'react'
import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Button from '@mui/material/Button'
import Title from '../Admin/Title'
import { Fragment, useState } from 'react'
import { Checkbox, CssBaseline } from '@mui/material'
import { memo } from 'react'
import { useAppSelector } from '../../hooks/use-redux'
import { IStudentLesson } from '../../interfaces/IStudentLesson'
import useAxios from '../../hooks/use-axios'
import { UpdateLessonStudent } from '../../interfaces/UpdateLessonStudent'
import { DownloadForOfflineOutlined } from '@mui/icons-material'
import LoadSpinner from '../UI/LoadingSpinner'
import LoadingSpinner from '../UI/LoadingSpinner'
import { Service } from '../../services/Service'

function StudentTable() {
  const userClass = useAppSelector(state => state.menu.userClass)
  const option = useAppSelector(state => state.menu.option)
  console.log(option)
  userClass.forEach(item => console.log(item.name))
  const classInfo = (userClass && userClass.filter(classItem => classItem.name === option)) || []
  console.log(classInfo)
  const summaries: IStudentLesson[] =
    classInfo && classInfo[0] && classInfo[0].lessonsStudent ? classInfo[0].lessonsStudent : []
  const [more, setMore] = useState<boolean>(false)

  const [checked, setChecked] = useState<boolean>(false)
  const [fileWork, setFileWork] = useState(null)
  const [fileJustification, setFileJustification] = useState(null)
  const [donwloadFile, setDownloadFile] = useState<string>('')
  const [lessonId, setLessonId] = useState<string>('')
  const [summary, setSummaryID] = useState<string>('')

  function preventDefault(event: React.MouseEvent) {
    event.preventDefault()
    setMore(!more)
  }

  const summaryInfo =
    summaries &&
    (more ? summaries : summaries.filter((summItem: IStudentLesson, index: number) => index < 5))
  /*
  const { evaluations } = (classInfo && classInfo[0]) || undefined

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
            {evaluations !== undefined && <TableCell>Evaluation Date</TableCell>}
            {evaluations !== undefined && <TableCell>Grade</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={classInfo[0].id}>
            <TableCell>{classInfo[0].startDate.toString().split('T')[0]}</TableCell>
            <TableCell>{classInfo[0].endDate.toString().split('T')[0]}</TableCell>
            <TableCell>{classInfo[0].teacher?.id}</TableCell>
            {evaluations !== undefined && (
              <TableCell key={Math.random()}>
                {evaluations.date ? evaluations.date.toString().split('T')[0] : ''}
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
  )
*/
  const updateLessonStudent: UpdateLessonStudent = {
    className: classInfo[0].name,
    lessonID: lessonId,
    studentSummaryId: summary,
    studentId: classInfo[0].studentId!,
    presence: checked,
    absence: 'absent',
    submmitedWork: fileWork ? new FormData().append('file', fileWork) : '',
  }
  const file = new FormData()
  const data = { file, updateLessonStudent }

  const { loading: isLoading, sendData } = useAxios({
    method: 'Patch',
    url: '/class/updateLessonStudent',
    data: file,
  })

  const { sendData: sendFile } = useAxios({
    method: 'Post',
    url: '/attachment/files',
    data: file,
  })

  //handleFileUpload
  const onInputChange = ({ target }: any) => {
    setFileWork(target.files[0])
  }

  const onInputChangeJustification = ({ target }: any) => {
    setFileJustification(target.files[0])
  }
  const updateLesson = {
    className: classInfo[0].name,
    lessonID: lessonId,
  }
  const {
    loading: isLoad,
    response,
    sendData: downloadFile,
  } = useAxios({
    method: 'Get',
    url: '/class/download',
    data: updateLesson,
  })

  const onDownload = async () => {
    console.log('download')
    //downloadFile()

    await Service.download(updateLesson)
      .then(response => {
        console.log('response')
        console.log(response.data.data)
        const { obj } = response.data.data
        //const fileReader = new FileReader()
        // fileReader.readAsArrayBuffer(response.data.data)
        const link = document.createElement('a')
        link.href = URL.createObjectURL(new Blob([response.data], { type: `image/png` }))
        link.download = 'image.png'
        link.click()
        //console.log(fileReader)

        /*  const link = document.createElement('a');
      const file = new File(response.data.data, 'file')
     // file.append('file', response.data.data)
      link.download = file.name
      link.href = file.name
      //link.setAttribute('download', `sample.${this.state.file}`);  
      // 3. Append to html page
      // 4. Force download
      link.click();
      console.log(obj)*/
        //return obj.blob()

        //return response.data.data
        return response.data.toFile()
        //return response.data.blob()
      })
      .then(blob => {
        // 2. Create blob link to download
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = `${response?.data.data}`
        link.href = url
        //link.setAttribute('download', `sample.${this.state.file}`);
        // 3. Append to html page
        // 4. Force download
        link.click()
      })
    /* const link = document.createElement("a");
    link.download = donwloadFile.toString();
    link.href = "./download.txt";
    link.click();*/
    console.log(response)
    if (!isLoad) {
      console.log(response)
    }
  }
  const dow = () => {
    const fileReader = new FileReader()
    fileReader.readAsArrayBuffer(response?.data)
    const url = URL.createObjectURL(response?.data)
    console.log(fileReader)
    console.log(url)
    const link = document.createElement('a')
    link.download = response?.data
    link.href = response?.data
    link.click()
  }
  /* React.useEffect(()=>{
    console.log(response)
    const link = document.createElement("a");
    link.download = response?.data
    link.href = response?.data
    link.click()
  },[response])*/

  return (
    <Fragment>
      {isLoad && <LoadingSpinner />}
      {!isLoad && <p onClick={dow}>File</p>}
      {!classInfo && <p>No data available!</p>}
      {/*classInfo && classTableInfo*/}
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
                    <TableCell>
                      <Link
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          setDownloadFile(lesson.lessonClassWork!.name)
                          onDownload()
                        }}
                      >
                        {lesson.lessonClassWork!.name}
                      </Link>
                    </TableCell>
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
                          <Button color="secondary" variant="contained" component="span">
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
                            onClick={() => {
                              setLessonId(lesson.lessonId)
                              setSummaryID(lesson.lessonSummaryId)
                              file.append('file', fileWork)
                              file.append('updateLesson', JSON.stringify(updateLessonStudent))
                              console.log(file)
                              sendFile()
                              // sendData();
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
                              setFileWork(null)
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
                          setLessonId(lesson.lessonId)
                          setSummaryID(lesson.lessonSummaryId)
                          setChecked(!checked)
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
                          <Button color="secondary" variant="contained" component="span">
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
                            onClick={() => {
                              setLessonId(lesson.lessonId)
                              setSummaryID(lesson.lessonSummaryId)
                              file.append('file', fileJustification)
                              file.append('updateLesson', JSON.stringify(updateLessonStudent))

                              sendFile()
                            }}
                          >
                            Submitt
                          </Button>
                          <Button
                            color="error"
                            variant="outlined"
                            component="span"
                            sx={{ width: '15%' }}
                            onClick={() => {
                              setFileJustification(null)
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
  )
}

//<TableCell>{lesson.lessonStudentPresence}</TableCell>
/*<TableCell>{lesson.lessonStudentSubmmitedClassWork}</TableCell>*/

export default memo(StudentTable)
