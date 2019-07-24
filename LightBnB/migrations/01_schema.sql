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
  description text,
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



INSERT INTO users(name, email, password)
VALUES ('jayjay','abc@gmail.com', 'abc');
        

INSERT INTO properties(owner_id, title, thumbnail_photo_url, cover_photo_url,cost_per_night, 
street, parking_spaces, number_of_bathrooms, 
number_of_bedrooms, country, city, province, post_code, active)
VALUES(1, 'HI', 'url1', 'url2', 45 ,'street1', 'parking1', 1, 1, 'country1', 'city1','province1' , 'post code 1', true);



INSERT INTO reservations(start_date, end_date, property_id, guest_id)
VALUES('01-07-1804', '02-08-1905', 1, 1);



INSERT INTO property_reviews(guest_id, reservation_id, property_id, rating)
VALUES(1, 1, 1, 10);