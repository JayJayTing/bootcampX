drop table if exists users cascade;
drop table if exists properties cascade;
drop table if exists reservations cascade;
drop table if exists property_reviews;

CREATE TABLE users(
    id serial primary key,
    name text not null,
    email text not null, 
    password text not null
);

CREATE TABLE properties(
  id serial PRIMARY KEY,
  owner_id integer not null references users(id) on delete cascade, 
  title text not null,
  description text not null,
  thumbnail_photo_url text,
  cover_photo_url text,
  cost_per_night  decimal not null,
  street text not null,
  parking_spaces text,
  number_of_bathrooms int,
  number_of_bedrooms int,
  country text not null,
  city text not null,
  province text not null,
  post_code text not null,
  active boolean not null
);

CREATE TABLE reservations(
    id serial primary key,
    start_date date not null,
    end_date date not null,
    property_id integer not null references properties(id) on delete cascade,
    guest_id integer not null references users(id)on delete cascade
);


CREATE TABLE property_reviews(
    id serial primary key,
    guest_id integer not null references users(id) on delete cascade,
    reservation_id integer not null references reservations(id)  on delete cascade,
    property_id integer not null references properties(id)  on delete cascade,
    rating smallint, 
    message text
);