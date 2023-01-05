import { memo, Fragment, useEffect } from 'react'
import Dashboard from '../components/UI/Dashboard'
import { useAppDispatch, useAppSelector } from '../hooks/use-redux'
import { fetchUserClassData } from '../store/menuActions'

const TeacherWelcomePage = () => {
  const menuList: string[] = useAppSelector(state => state.auth.userClasses) || []

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchUserClassData())
  }, [dispatch])

  const teacherDashboard: lists[] = [
    {
      id: '1',
      subheader: 'Manage Account',
      list: ['Change Password'],
    },
    {
      id: '.2',
      subheader: 'Manage Classes',
      list: menuList,
    },
  ]

  return (
    <Fragment>
      {' '}
      <Dashboard options={teacherDashboard} />
    </Fragment>
  )
}
export default memo(TeacherWelcomePage)
