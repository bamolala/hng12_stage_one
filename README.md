# hng_stage_one

# Number Classification API

This API classifies numbers based on mathematical properties and provides a fun fact about the number using the Numbers API.

## Features
- **Prime Number Check**: Determines if the number has exactly two divisors (1 and itself).
- **Armstrong Number Check**: Checks if the sum of its digits raised to the power of its length equals the number itself.
- **Perfect Number Check**: Determines if the sum of its proper divisors equals the number.
- **Odd or Even Classification**: Classifies the number as odd or even.
- **Sum of Digits Calculation**: Computes the sum of all digits in the number.
- **Fun Fact Retrieval**: Fetches a fun fact about the number from the Numbers API or generates a custom fact for Armstrong numbers.

## Technology Stack
- Node.js (JavaScript Runtime)
- Express.js (Web Framework)
- Axios (HTTP Requests)
- CORS (Cross-Origin Resource Sharing)

## API Endpoint
`GET /api/classify-number?number=<number>`

### Example Request
```bash
curl "https://hng12-stage-one-j006.onrender.com/api/classify-number?number=371
```
Successful Response (200 OK)
json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
Error Response (400 Bad Request)
json
{
    "number": "alphabet",
    "error": true
}

### **Installation & Setup**
Clone the Repository
bash
git clone https://github.com/bamolala/hng12_stage_one.git
cd hng12_stage_one

Install Dependencies

npm install

Run the Server

npm start
The API will run at http://localhost:3000.

Deployment
The API is deployed on Render at:

https://hng12-stage-one-j006.onrender.com/api/classify-number?number=371

### **How It Works**
Prime Number Check: Determines if the number has exactly two divisors (1 and itself).

Armstrong Number Check: Checks if the sum of its digits raised to the power of its length equals the number itself.

Perfect Number Check: A number is perfect if the sum of its proper divisors equals the number.

Odd or Even Classification: Determines whether the number is odd or even.

Sum of Digits Calculation: Computes the sum of all digits in the number.

Fun Fact Retrieval: If the number is Armstrong, a custom fun fact is generated. Otherwise, the Numbers API provides a math-related fact.

### **Contributing**
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch for your feature or bugfix.

Commit your changes.

Submit a pull request.


Acknowledgments
Numbers API for providing fun facts.

Render for hosting the API.
