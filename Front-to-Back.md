# Calls to the back-end and expected results.
See exampe data in db.json files in /client.

## Pages

### /signin
- Log in
  - endpoint: http://localhost:3000/signin
  - method: POST
  - headers: Content-Type: 'application/json' 
  - body: 
    - requestType: "login"
    - username: string
    - password: string
  - Expected response:
    - JWT access token
    - response status: 200
    - message that says "Login successful" ??
  - Back-end actions:
    - Do we manage the session on the back-end? I'm trying to learn how JWTs work.

### /register
- Register
  - endpoint: http://localhost:3000/register
  - method: POST
  - headers: Content-Type: 'application/json'
  - body:
    - org: string
    - streetAddress: string
    - city: string
    - state: string
    - zip: string
    - email: string
    - phone: string
    - username: boolean
    - password: boolean
  - Expected response:
    - response status: 200
    - message that says registration success or not ??
  - Back-end actions:
    - Store user registration info in database
  - Front-end actions:
    - Redirect to /signin

### /donate
- Donate
  - endpoint: http://localhost:3000/pantry
    - could also make this a different end point just for posting donations, like http://localhost:3000/pantry/donate
  - method: POST
  - headers: Content-Type: 'application/json'
  - body:
    - dateActve: string
    - dateExpires: string
    - food: string
    - orgDisplayName: string
    - contactEmail: string
    - contactPhone: string
    - pickup_streetAddress: string
    - pickup_city: string
    - pickup_state: Array (of label:value pairs)
    - pickup_zip: string
    - submittedBy_orgEmail: string
  - Expected response:
    - reponse status: 200
  - Back-end actions:
    - Store donation info in database
  - Front-end actions:
    - Redirect to /home

### /home
- Get donations for the current user/org
  - endpoint: http://localhost:3000/pantry
    - could also make this a different end point just for retrieving donations for current user, like http://localhost:3000/pantry/user
  - method: GET
  - headers: Content-Type: 'application/json'
  - body: none
  - Expected response:
    - response status: 200
    - array of donations
  - Front-end actions:
    - Display active and past donations for the current user/org
- Cancel donation
  - method: POST
  - headers: Content-Type: 'application/json'
  - body:
    - donationId: number
  - Expected response:
    - response status: 200
    - Sucess/failure message
  - Back-end actions:
    - set donation expiration date to today
  - Front-end actions:
    - Display success/failure message
    - Refresh donations list

### /pantry
- Get active donations
  - endpoint: http://localhost:3000/pantry
  - method: GET
  - headers: Content-Type: 'application/json'
  - body: none
  - Expected response:
    - response status: 200 
    - array of donations that are active, not expired, and not reserved
  - Front-end actions:
    - Display donations.
- Reserve a donation
  - method: POST
  - headers: Content-Type: 'application/json'
  - body:
    - donationId: number
    - reservedBy: string
  - Expected response:
    - response status: 200
    - Sucess/failure message
  - Back-end actions:
    - set donation reserved status to true
    - set donation reservedBy to the user/org that reserved it
  - Front-end actions:
    - Display success/failure message
    - Route to /home