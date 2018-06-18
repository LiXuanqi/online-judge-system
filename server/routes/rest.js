let express = require("express");
let router = express.Router();
let problemService = require("../services/problemService");
let bodyParser = require("body-parser");
let jsonParser = bodyParser.json();

let node_rest_client = require("node-rest-client").Client;

let restClient = new node_rest_client();

const EXECUTOR_SERVER_URL = 'http://localhost:5000/build_and_run';

restClient.registerMethod('build_and_run', EXECUTOR_SERVER_URL, 'POST');

router.get("/problems", (req, res) => {
  problemService.getProblems()
    .then(problems => res.json(problems));
});

router.get("/problems/:id", (req, res) => {
  let id = req.params.id;
  problemService.getProblem(+id)
    .then(problem => res.json(problem));
});

router.post("/problems", jsonParser, (req, res) => {
  problemService.addProblem(req.body)
    .then(
      (problem) => {
        res.json(problem);
      })
    .catch(
      (error) => {
        res.status(400).send("Problem name already exists!");
      }
    );
});

router.post("/build_and_run", jsonParser, (req, res) => {
  const userCode = req.body.user_code;
  const lang = req.body.lang;

  console.log(lang + ': ' + userCode);
  restClient.methods.build_and_run(
    {
      headers: { "Content-Type": "application/json" },
      data: {
        code: userCode,
        lang: lang
      }
    }, (data, response) => {
      console.log(response);
      console.log("Received response from execution server: " + response);
      const text = `
        Build output: ${data['build']}
        Execute output: ${data['run']}
      `;
      data['text'] = text;
      res.json(data);
    }
  );
});

module.exports = router;