const { Pool } = require('pg');

const pool = new Pool({
  user: 'JJ',
  host: 'localhost',
  database: 'bootcampx',
  password: '123'
});
const cohortName = process.argv[2];
const values = [`%${cohortName}%`];

pool.query(`SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort, count(assistance_requests.*) as total_assistances
FROM teachers
JOIN assistance_requests ON teacher_id = teachers.id
JOIN students ON student_id = students.id
JOIN cohorts ON cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
group by teachers.name, cohorts.name
ORDER BY cohort;`, values).then(res => {
    for(let obj of res.rows){
        console.log(`${obj.cohort}: ${obj.teacher}`);
    }
  //console.log(res.rows);
})
.catch(err => console.error('query error', err.stack));