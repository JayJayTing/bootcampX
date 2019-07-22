select day, count(id) from assignments

group by day

having count(id) >=10

order by day





