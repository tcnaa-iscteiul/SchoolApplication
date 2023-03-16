import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Icon,
  Box,
  Button,
  Link,
} from '@mui/material'
import { Blob } from 'buffer'
import { Fragment, useState } from 'react'
import useAxios from '../../hooks/use-axios'
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux'
import { ILesson } from '../../interfaces/ILesson'
import { StudentInformation } from '../../interfaces/IStudentInformation'
import { fetchUserClassData } from '../../store/menuActions'
import LoadingSpinner from '../UI/LoadingSpinner'
import Modal from '../UI/Modal'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import DeleteIcon from '@mui/icons-material/Delete'
import { UpdateLesson, UpdateLessonStudent } from '../../interfaces/UpdateLessonStudent'

type PropsType = {
  title: string
  data: ILesson
  lessonId: string
}
function DataStudentsTable({ title, data, lessonId }: PropsType) {
  const dispatch = useAppDispatch()
  const [showModal, setShowModal] = useState<boolean>(false)
  const [fileWork, setFileWork] = useState<Blob>()
  const [fileName, setFileName] = useState('')

  const option = useAppSelector(state => state.menu.option)
  const axiosParams = {
    method: 'Patch',
    url: 'class/deleteLesson',
    data: {
      className: option,
      summary: 'delete',
    },
  }
  const file = new FormData()

  const updateLesson: UpdateLesson = {
    className: option,
    lessonID: lessonId,
  }
  const fileParams = {
    method: 'Post',
    url: 'class/updateLesson',
    data: file,
  }
  const { error, loading, sendData } = useAxios(axiosParams)

  const { error: errorFile, loading: loadingFile, sendData: sendFile } = useAxios(fileParams)

  const deleteSummary = (event: React.MouseEvent) => {
    event.preventDefault()
    sendData()
    setShowModal(true)
    dispatch(fetchUserClassData())
  }
  const handleCloseModal = () => {
    setShowModal(false)
  }

  //handleFileUpload
  const onInputChange = ({ target }: any) => {
    console.log(typeof target.files[0])
    const fileReader = new FileReader()
    console.log(target.files[0].toFile)

    // const url = fileReader.readAsDataURL(blob)
    //console.log('url '+url)
    console.log(fileReader)
    console.log(target.files[0])
    setFileWork(target.files[0])
    file.append('file', target.files[0])
    setFileName(target.files[0].name)
    file.append('updateLesson', JSON.stringify(updateLesson))
    console.log(file)
    sendFile()
    // sendFileDb()
  }
  /*
const sendFileDb = () =>{
  //file.append('file', fileWork)
  file.append('file', fileWork!)
  console.log(file)
  console.log(fileWork)
  sendFile()
}*/

  const onDownload = () => {
    //const fileReader = new FileReader()
    //fileReader.readAsArrayBuffer(fileWork)

    // try{

    //const url = URL.createObjectURL(fileWork)
    //console.log(url)
    /*const blob = new Blob([fileWork!], {type : fileWork!.type})
  const link = document.createElement("a");
  link.download = blob.text.name
  link.href = blob.text.name
  link.click()
  }
  catch(e){
    console.log(e)
  }*/
    function download(filename: string, text: string) {
      const element = document.createElement('a')
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
      element.setAttribute('download', filename)

      element.style.display = 'none'
      document.body.appendChild(element)

      element.click()

      document.body.removeChild(element)
    }
  }

  return (
    <Fragment>
      {loading && <LoadingSpinner />}
      {!loading && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          message={error || 'Deleted with success'}
          title={error ? 'error' : 'Success'}
        />
      )}
      <Paper>
        <Typography variant="h4" color="inherit">
          {title}
          <Button onClick={deleteSummary}>
            <DeleteIcon />
          </Button>
        </Typography>
        <hr />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>{data.date!.toString().split('T')[0]}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Summary</TableCell>
              <TableCell>{data.summary!}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Class Work</TableCell>
              <TableCell>
                {data.classWork === null ? (
                  !fileWork ? (
                    <label htmlFor="upload-photo">
                      <input
                        style={{ display: 'none', cursor: 'pointer' }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        onChange={onInputChange}
                      />
                      <Button component="span">Upload</Button>
                    </label>
                  ) : (
                    <label>
                      <Link sx={{ cursor: 'pointer' }}>
                        <AttachFileIcon />
                        {fileName}
                      </Link>
                    </label>
                  )
                ) : (
                  /*data.classWork*/ ''
                )}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Student Email</TableCell>
                <TableCell>Presence</TableCell>
                <TableCell>Absence</TableCell>
                <TableCell>Class Work</TableCell>
              </TableRow>
              {data.students.map((item: StudentInformation) => (
                <TableRow key={item.studentName.id!}>
                  <TableCell>
                    {item.studentName.firstName} {item.studentName.lastName}
                  </TableCell>
                  <TableCell>{item.studentName.email}</TableCell>
                  <TableCell>{item.presence.toString()}</TableCell>
                  <TableCell>
                    <Link
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        onDownload()
                      }}
                    >
                      {fileWork && fileWork!.text.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        onDownload()
                      }}
                    >
                      {fileWork && fileWork!.text.name}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableHead>
          </TableBody>
        </Table>
      </Paper>
    </Fragment>
  )
}

export default DataStudentsTable
