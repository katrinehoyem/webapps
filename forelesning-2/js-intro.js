const studentName = "Lars"

const lars = {
    name: studentName,
    birthYear: 1992,
    isNew: false,
    role: 'student'
}

const students = [
    lars, 
    {
        name: 'Trude',
        birthYear: 1989,
        isNew: true,
        role: 'admin'
    },
    {       name: 'Ali',
        birthYear: 1989,
        isNew: true,
        role: 'superadmin'
    },
    {
        name: 'Simone',
        birthYear: 2001,
        isNew: true,
        role: 'student'
    },
]

const getStudentAboveBirthYear = (students = [], birthYear) => {
    return students.filter((student) => students.birthYear > birthYear)
}


const studentsAbove = getStudentAboveBirthYear(students, 1991) 

const transformStudents =  students => 
    students.map(student =>({
        ...student,
        age: new Date().getFullYear() = student.birthYear
}))

const studentsWithAge = transformStudents(students)

const findStudent = (students, name) => {
    return students.find(student => student.name.toLowerCase() === name?.toLowerCase())
}

const studentFound = findStudent(students, 'lars'
)