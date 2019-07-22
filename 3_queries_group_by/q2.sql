select cohorts.name, count(students.*)
from cohorts 
join students on cohorts.id = students.cohort_id
group by cohorts.name 
having count(students.*) >= 18
order by count(students.*)





