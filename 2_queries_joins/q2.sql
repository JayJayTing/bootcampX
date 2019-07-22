select sum(duration) as total_amount_of_time

from assignment_submissions 
join students on student_id = students.id 
join cohorts on students.cohort_id = cohorts.id
where cohorts.name = 'FEB12';


