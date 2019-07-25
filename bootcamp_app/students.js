const { Pool } = require('pg');

const pool = new Pool({
  user: 'JJ',
  host: 'localhost',
  database: 'bootcampx',
  password: '123'
});


pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3]};
`)
.then(res => {
    for(let obj of res.rows){
        console.log(`${obj.name} has an id of ${obj.student_id} and was in the ${obj.cohort} cohort`);
    }
  //console.log(res.rows.name);
})
.catch(err => console.error('query error', err.stack));