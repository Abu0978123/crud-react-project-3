import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function Edit() {
  const { id } = useParams();
  const navigate =  useNavigate();
  const [studentData, setStudentData] = useState({
    stdName: "",
    email: "",
  });
  useEffect(() => {
    async function getStudent() {
      try {
        const student = await axios.get(`http://localhost:3333/students/${id}`);
        setStudentData(student.data);
      } catch (error) {
        console.log("someThing is going wrong");
      }
    }
    getStudent();
  });
  function onTextFieldChange(e) {
    setStudentData({
      ...studentData,
      [e.target.name]: e.target.value,
    });
  }
  async function onFormSubmit(e) {
    e.preventDefault();
    navigate('/')
    try {
      await axios.put(`http://localhost:3333/students/${id}`, studentData);
    } catch (error) {
      console.log("someThing is going wrong");
    }
  }

  return (
    <div>
      <div className="container   boxx ">
        <h5 className="text-center bg"> Update Student</h5>
        <form>
          <div className="mb-3">
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                ID
              </label>
              <input
                type="number"
                className="form-control"
                id="exampleInputPassword1"
                value={id}
                onChange={e => onTextFieldChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputPassword1"
                // value={studentData.stdName}
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
            //   value={studentData.email}
              onChange={(e) => onTextFieldChange(e)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <button type="submit" className="btn btn-primary" onClick={((e)=>onFormSubmit(e))}>
            Update
          </button>
        </form>
        <div className="home-btn">
          <Link to={"/"}>
            <button type="button" className="btn btn-info ">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
