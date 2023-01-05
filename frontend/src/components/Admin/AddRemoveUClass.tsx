import Dropdown from '../UI/Dropdown'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import { Fragment } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { Service } from '../../services/Service'
import { useState } from 'react'
import LoadingSpinner from '../UI/LoadingSpinner'
import Modal from '../UI/Modal'
import { memo } from 'react'
import { AxiosError } from 'axios'
import { Grid } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks/use-redux'
import { IUser } from '../../interfaces'
import { IClass } from '../../interfaces/IClass'
import { fetchClassData } from '../../store/classesActions'

type AllStudents = {
  title: string
  students?: boolean
  teacher?: boolean
  add?: boolean
  remove?: boolean
}

const AddRemoveUClass = (props: AllStudents): JSX.Element => {
  const [user, setUser] = useState<string>('')
  const [classNotAssigned, setClassNotAssigned] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showModal, setShowModal] = useState<boolean>(false)

  const classes = useAppSelector(state => state.classes.classes)

  const dispatch = useAppDispatch()

  const clickHandler = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    console.log(assigned)
    console.log(notAssigned)
    try {
      setIsLoading(true)

      props.students && props.add && (await Service.assignStudentToClass(classNotAssigned, user))
      props.students && props.remove && (await Service.removeStudentToClass(classNotAssigned, user))
      props.teacher && props.add && (await Service.assignTeacherToClass(classNotAssigned, user))
      props.teacher && props.remove && (await Service.removeTeacherToClass(classNotAssigned, user))
      setUser('')
      setClassNotAssigned('')
      dispatch(fetchClassData())
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data) {
          setError(error.response.data.message)
        } else if (error.message) {
          setError(error.message)
        }
      } else {
        setError('Something went wrong!')
      }
    }
    setIsLoading(false)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const today = new Date()
  //Classes where user is not assigned to
  const notAssigned = user
    ? classes.filter((clas: IClass) => {
        if (props.students) {
          const response = clas.students.map((student: IUser) => {
            if (student.email === user && new Date(clas.startDate).getTime() >= today.getTime())
              return clas
          })
          const [objs] = response
          if (objs !== clas) return clas
          //console.log(response);
          return clas
        }
        if (props.teacher) {
          if (clas.teacher?.email !== user) return clas
        }
      })
    : []

  //Classes where user is assigned
  const assigned = user
    ? classes.filter((clas: IClass) => {
        if (props.students) {
          const response = clas.students.map((student: IUser) => {
            if (student.email === user && new Date(clas.endDate).getTime() >= today.getTime())
              return clas
          })
          const [objs] = response
          if (objs === clas) return clas
        }
        if (props.teacher) {
          if (clas.teacher?.email === user) return clas
        }
      })
    : []

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <Modal
            open={showModal}
            onClose={handleCloseModal}
            message={error || props.add ? 'Added with success' : 'Removed with success'}
            title={error ? 'error' : 'Success'}
          />
        )}
        <CssBaseline />
        <Box display="flex">
          <Typography component="h1" variant="h5">
            {props.title}
          </Typography>
          <br />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {props.students && (
              <Dropdown
                students
                manageUser={(email: string) => {
                  setUser(email)
                }}
                value={user}
              />
            )}

            {props.teacher && (
              <Dropdown
                teachers
                manageUser={(email: string) => {
                  setUser(email)
                }}
                value={user}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            <Dropdown
              classes={props.add ? notAssigned : assigned}
              manageUser={(name: string) => {
                setClassNotAssigned(name)
              }}
              value={classNotAssigned}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={!user && !classNotAssigned}
              onClick={clickHandler}
            >
              {props.add ? 'Add' : 'Remove'}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  )
}

export default memo(AddRemoveUClass)
