select cohorts.name, avg(completed_at - started_at) as avg_assistance_duration
from cohorts
join students on cohorts.id = cohort_id
join assistance_requests on students.id  = student_id
group by cohorts.name
order by avg_assistance_duration







