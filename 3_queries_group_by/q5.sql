select students.name, avg(assignments.duration),avg(assignment_submissions.duration)
from students

join assignment_submissions on students.id = assignment_submissions.student_id
join assignments on assignment_submissions.assignment_id = assignments.id
where students.end_date is null 

group by students.name
having avg(assignment_submissions.duration)<avg(assignments.duration)
order by students.name



