select assignments.id, day, chapter, name, count(assistance_requests.*) as total_assistances
from assignments
join assistance_requests on assignment_id = assignments.id
group by assignments.id
order by total_assistances desc













