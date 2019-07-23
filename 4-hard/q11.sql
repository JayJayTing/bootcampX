select day, count(assignments.*), sum(duration)
from assignments
group by day
order by day











