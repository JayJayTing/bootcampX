select teachers.name, count(assistance_requests.*) 
from assistance_requests
join teachers on teachers.id = assistance_requests.teacher_id
where teachers.name = 'Waylon Boehm'

group by name;





