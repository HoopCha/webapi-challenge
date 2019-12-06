import React, {useState, useEffect} from "react";
import axios from "axios"

const ProjectActions = props => {
  const [actions, setActions] = useState([])
  const projectId = props.match.params.id

  useEffect(() => {
    axios.get(`http://localhost:4000/api/project/${projectId}/actions`)
      .then(res => setActions(res.data))
      .catch(err => console.log(err))
  }, [projectId])

  return (
    <div>
        <h2>Actions:</h2>
      {actions.map(action => 
      <div>
      <p>Action: {action.description}</p>
      <p>Notes: {action.notes}</p>
      </div>)}
    </div>
  )
}

export default ProjectActions;