import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const student = 'Halgeir Geirson'
  const degree = 'Bachelor IT'
  const points = 180
  const experienceOne = 'Figma UI for customer X'
  const experienceTwo = 'Website for customer Y'
  const email = 'student@hiof.no'

  return (
    <div>
      <Header student={student} degree={degree} points={points} />
      <Experiences experienceOne={experienceOne} experienceTwo={experienceTwo} />
      <Contact email={email} />
    </div>
  )
}

export default App
export default function Experiences({ experienceOne, experienceTwo }) {
  return (
    <div>
      <Experience description={experienceOne} />
      <Experience description={experienceTwo} />
    </div>
  )
}