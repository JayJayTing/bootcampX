const properties = require('./json/properties.json');
const users = require('./json/users.json');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'JJ',
  host: 'localhost',
  database: 'lightbnb',
  password: '123'
});
/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users
  WHERE users.email = $1;
  `, [email])
  .then(res => {
    console.log(res.rows)
    return res.rows[0]});
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  WHERE users.id = $1;
  `, [id])
  .then(res => {
    console.log("done");
    return res.rows[0]});
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
 return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [user.name, user.email, user.password])
  
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`
  SELECT properties.*, reservations.*, avg(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id 
WHERE reservations.guest_id = $1 
AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT $2;
  `, [guest_id, limit])
  .then(res => {
    console.log(res.rows);
    return res.rows});
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // 3
  let specified = false;
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
    specified = true;
  }

  if(options.minimum_price_per_night){
    queryParams.push(Number(options.minimum_price_per_night) * 100);
    if(specified){
      queryString += `AND properties.cost_per_night >= $${queryParams.length}`
    }else{
      queryString += `WHERE properties.cost_per_night >= $${queryParams.length}`
      specified = true;

    }
  }
  if(options.maximum_price_per_night){
    queryParams.push(Number(options.maximum_price_per_night) * 100);
    if(specified){
      queryString += `AND properties.cost_per_night <= $${queryParams.length}`
    }else{
      queryString += `WHERE properties.cost_per_night <= $${queryParams.length}`
      specified = true;

    }
  }
  if(options.minimum_rating){
    queryParams.push(options.minimum_rating);
    if(specified){
      queryString += `AND rating >= $${queryParams.length}`
    }else{
      queryString += `WHERE rating >= $${queryParams.length}`
      specified = true;

    }
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log(queryString, queryParams);

  // 6
  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  
  let items = [property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.provence,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms, true]

  let queryString = `
  INSERT INTO properties (
    owner_id,
    title,
    description,
    thumbnail_photo_url,
    cover_photo_url,
    cost_per_night,
    street,
    city,
    provence,
    post_code,
    country,
    parking_spaces,
    number_of_bathrooms,
    number_of_bedrooms, active)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14, $15)
  RETURNING *;
  `;
console.log(items);
  return pool.query(queryString, items);
}
exports.addProperty = addProperty;
