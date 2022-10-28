import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Home() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    getAllStudents();
  });
  async function getAllStudents() {
    try {
      const students = await axios.get("http://localhost:3333/students/");
      setStudents(students.data);
    } catch (error) {
      console.log("someThing is going wrong");
    }
  }
  const [addStudent, setAddStudent] = useState({
    stdName: "",
    email: "",
  }); // for adding new data in db.json
  const [status, setStatus] = useState(); //this state is used for condition and then render the home page again..
  function onTextFieldChange(e) {
    setAddStudent({
      ...addStudent,
      [e.target.name]: e.target.value,
    });
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:3333/students/`, addStudent);
      setStatus(true);
    } catch (error) {
      console.log("someThing is going wrong");
    }
  }
  if (status) {
    return <Home />;
  }
  //it is for deleding data from the given Table 
  const handleDeled = async (id)=>{
    await axios.delete(`http://localhost:3333/students/${id}`)
  }


  return (
    <>
      <div className="container-fluid p-3">
        <a className="navbar-brand mb-0 h1 ">This is CRUD Project</a>
      </div>

      <div className="row mt-2 container m-auto">
        <div className="col-md-6   ">
          <h5 className="text-center bg"> Add Student</h5>
          <form>
            <div className="mb-3">
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputPassword1"
                  name="stdName"
                  onChange={(e) => onTextFieldChange(e)}
                />
              </div>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                onChange={(e) => onTextFieldChange(e)}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => onFormSubmit(e)}
            >
              Add
            </button>
          </form>
        </div>
        <div className="col-md-6  text-center ">
          <h5 className="bgg"> Student List </h5>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name </th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            {students.map((student, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <th scope="row">{student.id}</th>
                    <td>{student.stdName}</td>
                    <td>{student.email}</td>
                    <td>
                      <Link to={`/edit/${student.id}`}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </Link>
                      <Link to={`/view/${student.id}`}>
                        <i className="fa-solid fa-eye"></i>
                      </Link>
                      <button
                        className="buttonstyle"
                        onClick={() => {
                          handleDeled(student.id);
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}
