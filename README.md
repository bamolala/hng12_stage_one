# hng_stage_one

Number Classification API

This API classifies numbers based on mathematical properties and provides a fun fact about the number using the Numbers API.

* FEATURES
  

Determines if a number is prime

Checks if a number is an Armstrong number

Checks if a number is perfect

Classifies a number as odd or even

Calculates the sum of digits

Fetches a fun fact about the number

* TECHNOLOGY STACK
  

Node.js (JavaScript Runtime)

Express.js (Web Framework)

Axios (HTTP Requests)

CORS (Cross-Origin Resource Sharing)

* API ENDPOINT
  

GET /api/classify-number?number=<integer>

 Successful Response (200 OK)

{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}

 Error Response (400 Bad Request)

{
    "number": "alphabet",
    "error": true
}

* INSTALLATION & SETUP
  

1️.  Clone the Repository

git clone https://github.com/bamolala/hng12_stage_one.git
cd hng12_stage_one

2️. Install Dependencies

npm install

3️. Run the Server

npm start

The API will run at http://localhost:3000.

* DEPLOYMENT
  

The API is deployed at:

 https://hng12-stage-one-3k8i.onrender.com/api/classify-number?number=371

* HOW IT WORKS
  

1. Prime Number Check

Determines if the number has exactly two divisors (1 and itself).

2. Armstrong Number Check

Checks if the sum of its digits raised to the power of its length equals the number itself.

3. Perfect Number Check

A number is perfect if the sum of its proper divisors equals the number.

4. Odd or Even Classification

Determines whether the number is odd or even.

5. Sum of Digits Calculation

Computes the sum of all digits in the number.

6. Fun Fact Retrieval

If the number is Armstrong, a custom fun fact is generated.

Otherwise, the Numbers API provides a math-related fact.
