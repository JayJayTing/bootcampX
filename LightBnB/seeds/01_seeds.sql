
INSERT INTO users(name, email, password)
VALUES ('jayjay','abc@gmail.com', 'abc');
        

INSERT INTO properties(owner_id, title, thumbnail_photo_url, cover_photo_url,cost_per_night, 
street, parking_spaces, number_of_bathrooms, 
number_of_bedrooms, country, city, province, post_code, active)
VALUES(1, 'HI', 'url1', 'url2', 'street1', 'parking1', 1, 1, 'country1', 'city1','province1' , 'post code 1', true);



INSERT INTO reservations(start_date, end_date, property_id, guest_id)
VALUES('01-07-1804', '02-08-1905', 1, 1);



INSERT INTO property_reviews(guest_id, reservation_id, property_id, rating)
VALUES(1, 1, 1, 10);