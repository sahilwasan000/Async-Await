const users = [{
  id:1,
  name: 'Sahil',
  schoolId: 55
},{
id: 2,
name: 'Micheal',
schoolId: 156
}];

const grades = [{
  id:1,
  schoolId: 55,
  grade: 85
},{
  id:2,
  schoolId: 156,
  grade: 79
},{
  id:3,
  schoolId: 55,
  grade: 87
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);

    if(user){
      resolve(user);
    } else {
      reject(`Unable to find user with id ${id}`);
    }
  });
};

const getGrades = (schoolId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grades) => grades.schoolId === schoolId));
  });
}

const getStatus = (userId) => {
  let user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    return getGrades(user.schoolId);
  }).then((grades) => {
    let avg = 0;

    if(grades.length > 0) {
      avg = grades.map((grade) => grade.grade).reduce((a,b) => a+b) / grades.length;
    }

    return `${user.name} has an average of ${avg}% in the class.`
  });
};


//---------Async-Await Code--------//

const getStatusAlt = async (userId) => { //ES7-> async always returns a Promise.
  // throw new Error('This is an error.') // Throw error always points to a reject value.
  // return 'Mike';  // return value always points to resolve

  // Await is always used in async code.
  //Without await we will get a regular Promise back but with await, we may get our original array back.
  const user = await getUser(userId);
  const grades = await getGrades(user.schoolId);
  
  console.log(user, grades);
};


getStatusAlt(1).then((name) => {
  console.log(name);
}).catch((e) => {
  console.log(e);
});

// getStatus(23).then((status) => {
//   console.log(status);
// }).catch((e) => {
//   console.log(e);
// });
