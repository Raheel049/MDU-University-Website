import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
      <div>Dashboard</div>
      <Link to="/admission">AdmissionForm</Link>
    </>
  )
}

export default Dashboard