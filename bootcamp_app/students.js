const { Pool } = require('pg');

const pool = new Pool({
  user: 'JJ',
  host: 'localhost',
  database: 'bootcampx',
  password: '123'
});
const cohortName = process.argv[2];
const limit = process.argv[3] || 5;
// Store all potentially malicious values in an array. 
const values = [`%${cohortName}%`, limit];

pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, values)
.then(res => {
    for(let obj of res.rows){
        console.log(`${obj.name} has an id of ${obj.student_id} and was in the ${obj.cohort} cohort`);
    }
  //console.log(res.rows.name);
})
.catch(err => console.error('query error', err.stack));