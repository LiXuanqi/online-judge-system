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

let getProblems = () => {
  return new Promise((resolve, reject) => {
    resolve(problems);
  });
}

let getProblem = (id) => {
  return new Promise((resolve, reject) => {
    resolve(problems.find(problem => problem.id === id));
  })
}

let addProblem = (newProblem) => {
  return new Promise((resolve, reject) => {
    if (problems.find(problem => problem.name === newProblem.name)) {
      reject("Problem already exists");
    } else {
      newProblem.id = problems.length + 1;
      problems.push(newProblem);
      resolve(newProblem);
    }
  });
}

module.exports = {
  getProblems: getProblems,
  getProblem: getProblem,
  addProblem: addProblem
}