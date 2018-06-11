const problems = [{
  id: 1,
  name: '2 sum',
  desc: 'the easy two sum',
  acceptance: 0.394,
  difficulty: 'easy'
}, {
  id: 2,
  name: '3 sum',
  desc: '3 sum a!!',
  acceptance: 0.233,
  difficulty: 'medium'
}, {
  id: 3,
  name: '4 sum',
  desc: '4 sum a!!',
  acceptance: 0.133,
  difficulty: 'hard'
}];

let ProblemModel = require("../models/problemModel");

let getProblems = () => {
  return new Promise((resolve, reject) => {
    ProblemModel.find({}, (err, problems) => {
      if (err) {
        reject(err);
      } else {
        resolve(problems);
      }
    });
  });
}

let getProblem = (id) => {
  return new Promise((resolve, reject) => {
    ProblemModel.findOne({ id: id }, (err, problem) => {
      if (err) {
        reject(err);
      } else {
        resolve(problem);
      }
    });
  })
}

let addProblem = (newProblem) => {
  return new Promise((resolve, reject) => {
    ProblemModel.findOne({ name: newProblem.name }, (err, problem) => {
      if (problem) {
        reject("Problem name already exists!");
      } else {
        ProblemModel.count({}, (err, num) => {
          newProblem.id = num + 1;
          let mongoProblem = new ProblemModel(newProblem);
          mongoProblem.save();
          resolve(newProblem);
        });
      }
    });
  });
}

module.exports = {
  getProblems: getProblems,
  getProblem: getProblem,
  addProblem: addProblem
}