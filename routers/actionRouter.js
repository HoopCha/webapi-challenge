const express = require('express');
const router = express.Router();

const actionDB = require("../data/helpers/actionModel");

//CREATE
router.post("/", validateActionInfo, (req, res) => {
    const actions = req.body;
    actionDB
      .insert(actions)
      .then(actions => {
        res.status(201).json(actions);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: "Error inserting actions." });
      });
  });

//READ
router.get("/:id", validateAction, (req, res) => {
    actionDB
      .get(req.params.id)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(error => {
        res
        .status(500)
        .json({ error: "There was an error getting actions." });
      });
  });

//UPDATE
router.put("/:id", validateAction, validateActionInfo, (req, res) => {
    const { id } = req.params;
    const { project_id, description, notes, completed } = req.body;
    actionDB
      .update(id, { project_id, description, notes, completed })
      .then(updatedAction => {
        res.status(200).json(updatedAction);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ message: "Error updating actions."
        });
      });
  });

  //DELETE
  router.delete("/:id", validateAction, (req, res) => {
    actionDB
      .remove(req.params.id)
      .then(response => {res.status(404).json(response);
      })
      .catch(error => {
        res.status(500).json({ message: "Error deleting action" });
      });
  });

//middleware

function validateAction(req, res, next) {
    const actionId = req.params.id;
    actionDB
      .get(actionId)
      .then(action => {
        if (action) {
          next();
        } else {
          res
            .status(404)
            .json({ message: "An action with this id does not exist." });
        }
      })
      .catch(error => {
        res
          .status(500)
          .json({error: "There was an error retrieving the action from the database."
          });
      });
  }
  
  function validateActionInfo(req, res, next) {
    if (!req.body) {
      res.status(400).json({ message: "Missing action data." });
    } else if (!req.body.notes) {
      res.status(400).json({ message: "Missing required action notes." });
    } else if (!req.body.description) {
      res.status(400).json({ message: "Missing required action description." });
    } else {
      next();
    }
  }
  

module.exports = router;