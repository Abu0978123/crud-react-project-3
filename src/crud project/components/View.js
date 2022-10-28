import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function View() {
    const {id} = useParams();
    // console.log(id)
    const [student, setStudent] = useState([]);
    useEffect(()=>{
        getStudent();
    })
    async function getStudent()
    {
        try {
            const student = await axios.get(`http://localhost:3333/students/${id}`);
            setStudent(student.data)
        } catch (error) {
            console.log('someThing is going wrong')
        }
    }
  return (
    <div>
        <div className="container text-center ">
          <h5 className="bgg"> Student List </h5>
          <table className="table">
  <thead>
    <tr>
    <th scope='col'>ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    <tr>
        <td>{student.id}</td>
      <td>{student.stdName}</td>
      <td>{student.email}</td>
      <td>
    <Link to="/edit/1"><i className="fa-solid fa-pen-to-square"></i></Link>    
    <i className="fa-solid fa-trash"></i>
      </td>
    </tr>
  </tbody>
</table>

        </div>
        <div className='home-btn'>
        <Link to={'/'}>  <button type="button" className="btn btn-info ">
              Back to Home
            </button>
            </Link></div>
        </div>
  )
}
