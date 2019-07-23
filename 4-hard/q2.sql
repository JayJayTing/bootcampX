select count(assistance_requests.*), students.name
from students
join assistance_requests on students.id = assistance_requests.student_id
where students.name = 'Elliot Dickinson'
group by students.name





