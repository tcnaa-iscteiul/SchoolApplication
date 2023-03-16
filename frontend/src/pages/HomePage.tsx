import { memo } from 'react'
import Header from '../components/UI/Header'
import HeaderCard from '../components/UI/HeaderCard'
import PopularCourse from '../components/UI/PopularCourse'
import StatisticsCard from '../components/UI/StatisticsCard'

const HomePage = () => {
  return (
    <div id="Home">
      <Header />
      <HeaderCard />
      <StatisticsCard />
      <PopularCourse />
    </div>
  )
}

export default memo(HomePage)
