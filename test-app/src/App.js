import React, {useState, useEffect} from 'react';
import {Route, Link} from "react-router-dom";
import axios from 'axios';
import styled from "styled-components";

import ProjectActions from "./components/Project.js"

const Page = styled.div `
display: flex;
`
const Card = styled.div `
transition: 0.3s;
width: 35%;
padding: 10px 20px 10px 20px;
`

function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/api/project/')
      .then(res => setProjects(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <h2>Projects:</h2>
      <Page>
      {projects.map(project => <Card><Link to={`/project/${project.id}`}>{project.name}</Link></Card>)}
      </Page>
      <Route path="/project/:id" component={ProjectActions} />
    </div>
  );
}

export default App;