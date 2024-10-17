import { Hono } from "hono";
import { cors } from "hono/cors";
import { isNameValid } from "./lib/validators";

const app = new Hono();

app.use("/*", cors());

 let students = [
  { id: "1", name: "Ola Normann" },
  { id: "2", name: "Kari Normann" },
];

app.get('/api/students', (c) => {
  return c.json(students);

});

app.get('/api/students/:id', (c) => {
  const id = c.req.param ("id");
  const student = students.filter((student)=> student.id === id)
  return c.json(students);

});

app.post('/api/students', async(c) => {
  const data = await c.req.json ();
  const {name} = data;
  if (!isNameValid(name)) 
    return c.json ({error: "invalid name"}, {status: 400});


  students.push({id: crypto.randomUUID(), name});
  return c.json({success: true, data: students}, {status: 201});

});

app.delete('/api/students/:id', (c) => {
  const id = c.req.param ("id");
  const removedStudentFromList = students.filter(
    (student)=> student.id !== id);
  return c.json(students);

});

app.patch('/api/students/:id', async (c) => {
  const id = c.req.param ("id");
  const {name} = await c.req.json();
  students = students.map((student) => 
    student.id == id? {...student,name} : student);
  return c.json( students);

});

app.onError((err, c) => {
  console.error(err);

  return c.json(
    {
      error: {
        message: err.message,
      },
    },
    { status: 500 }
  );
});

export default app;
