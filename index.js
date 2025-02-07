// Load environment variables
require('dotenv').config();

// Import necessary dependencies
const express = require('express'); 
const axios = require('axios'); 
const cors = require('cors'); 

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Root Route - API Welcome Message
app.get('/', (req, res) => {
    res.json({ message: "Welcome to the Number Classification API!" });
});

// GET Endpoint to classify a number
app.get('/api/classify-number/:number', async (req, res) => {
    const { number } = req.params;

    // Validate input (must be a valid integer)
    if (!number || isNaN(number)) {
        return res.status(400).json({ number, error: true });
    }

    const num = parseInt(number, 10);
    const isPrime = checkPrime(num); 
    const isArmstrong = checkArmstrong(num); 
    const isPerfect = checkPerfect(num); 
    const digitSum = getDigitSum(num); 
    const properties = getProperties(num, isArmstrong);

    // Fetch a fun fact from the Numbers API
    let funFact = '';
    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
        funFact = response.data.text; // Extract fun fact text
    } catch (error) {
        funFact = "No fun fact available.";
    }

    // Correct Fun Fact for Armstrong Numbers
    if (isArmstrong) {
        const digits = num.toString().split('').map(Number);
        const power = digits.length;
        const armstrongSum = digits.map(d => `${d}^${power}`).join(' + ');

        funFact = `${num} is an Armstrong number because ${armstrongSum} = ${num}`;
    }

    // Return JSON response with all computed data
    res.json({
        number: num,
        is_prime: isPrime,
        is_perfect: isPerfect,
        properties,
        digit_sum: digitSum,
        fun_fact: funFact
    });
});

// Function to check if a number is prime
function checkPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Function to check if a number is an Armstrong number
function checkArmstrong(num) {
    const digits = num.toString().split('').map(Number);
    const power = digits.length; 
    return digits.reduce((sum, digit) => sum + Math.pow(digit, power), 0) === num;
}

// Function to check if a number is a Perfect number
function checkPerfect(num) {
    let sum = 1; 
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) {
            sum += i;
            if (i !== num / i) sum += num / i;
        }
    }
    return num !== 1 && sum === num;
}

// Function to calculate the sum of a number’s digits
function getDigitSum(num) {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}

// Function to get number properties
function getProperties(num, isArmstrong) {
    const properties = [];
    if (isArmstrong) properties.push("armstrong"); 
    properties.push(num % 2 === 0 ? "even" : "odd");
    return properties;
}

// Start the server and listen on the specified PORT
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
