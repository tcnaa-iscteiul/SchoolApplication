import * as React from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Typography } from '@mui/material'
import LoadingSpinner from '../UI/LoadingSpinner'
import Modal from '../UI/Modal'
import ChangePassword from '../ChangePassword'
import { memo, useState } from 'react'
import { useAppSelector } from '../../hooks/use-redux'
import InsertForm from './InsertForm'
import GridTeacher from './GridTeacher'
import ClassInfo from '../Classes/ClassInfo'

function TeacherContainer() {
  const [success] = useState<string>('')
  const [showModal, setShowModal] = useState<boolean>(false)
  const [error] = useState<string>('')
  const [loading] = useState<boolean>(false)
  const userClass = useAppSelector(state => state.menu.userClass)
  const option = useAppSelector(state => state.menu.option)
  const keyOption = userClass && userClass.find(item => item.name === option)
  const selectedClass = userClass.filter(item => item.name === option)

  //const classEnded = new Date(selectedClass[0].endDate).getTime() > new Date().getTime()

  const insertSummary: JSX.Element = (
    <InsertForm
      key={keyOption ? option : null}
      title={'Insert Summary'}
      method={'Patch'}
      url={'class/createLesson'}
    />
  )

  const components: JSX.Element[] =
    (option &&
      selectedClass.length > 0 && [
        <ChangePassword key={option === 'Change Password' ? option : null} />,
        <ClassInfo
          key={keyOption ? option : null}
          className={selectedClass[0].name}
          classId={selectedClass[0].id!}
          startDate={selectedClass[0].startDate}
          endDate={selectedClass[0].endDate}
        />,
        new Date(selectedClass[0].endDate).getTime() >= new Date().getTime() &&
        new Date(selectedClass[0].startDate).getTime() <= new Date().getTime() ? (
          insertSummary
        ) : (
          <></>
        ),
        new Date(selectedClass[0].startDate).getTime() <= new Date().getTime() ? (
          <GridTeacher key={keyOption ? option : null} />
        ) : (
          <></>
        ),
      ]) ||
    []

  const res = components.filter((item: JSX.Element) => item.key === option)

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <Container maxWidth="lg">
      {loading && <LoadingSpinner />}
      {!loading && (
        <Modal
          open={showModal}
          onClose={handleCloseModal}
          message={error || success}
          title={error ? 'error' : 'Success'}
        />
      )}
      <Grid container spacing={3}>
        {res &&
          res.map((item, index: number) => (
            <Grid item key={index} xs={12}>
              <Paper elevation={2}>{item}</Paper>
            </Grid>
          ))}
        {res.length === 0 && option && (
          <Grid container spacing={3}>
            <Grid item key={'welcome'} xs={12}>
              <Paper elevation={1}>
                <Typography component="h1" variant="h3" color="inherit" noWrap>
                  Welcome!
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Container>
  )
}

export default memo(TeacherContainer)
