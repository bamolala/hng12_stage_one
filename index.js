// Load environment variables
require("dotenv").config();

// Import necessary dependencies
const express = require("express");
const axios = require("axios");
const cors = require("cors");

// Initialize Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// API Endpoint: GET /api/classify-number
app.get("/api/classify-number/:number", async (req, res) => {
    const { number } = req.params;

    // Validate input
    if (!number || isNaN(number) || !Number.isInteger(Number(number))) {
        return res.status(400).json({ number, error: true });
    }

    const num = parseInt(number, 10);
    const isPrime = checkPrime(num);
    const isArmstrong = checkArmstrong(num);
    const isPerfect = checkPerfect(num);
    const digitSum = getDigitSum(num);
    const properties = getProperties(num, isArmstrong);
    let funFact = await getFunFact(num);


    // Adjust fun fact for Armstrong numbers
    if (isArmstrong) {
        const digits = num.toString().split("").map(Number);
        const power = digits.length;
        const armstrongSum = digits.map((d) => `${d}^${power}`).join(" + ");
        funFact = `${num} is an Armstrong number because ${armstrongSum} = ${num}`;
    }

    res.json({
        number: num,
        is_prime: isPrime,
        is_perfect: isPerfect,
        properties,
        digit_sum: digitSum,
        fun_fact: funFact,
    });
});

// Cache object for storing fun facts
const cache = {};

// Function to get a fun fact with caching
async function getFunFact(num) {
    if (cache[num]) return cache[num]; // Return cached result

    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math?json`, { timeout: 300 });
        cache[num] = response.data.text; // Store in cache
        return response.data.text;
    } catch (error) {
        return "No fun fact available.";
    }
}

// Function to check if a number is prime
function checkPrime(num) {
    if (num < 2) return false;
    if (num % 2 === 0 && num !== 2) return false;
    for (let i = 3; i * i <= num; i += 2) {
        if (num % i === 0) return false;
    }
    return true;
}

// Function to check if a number is an Armstrong number
function checkArmstrong(num) {
    const digits = num.toString().split("").map(Number);
    const power = digits.length;
    return digits.reduce((sum, digit) => sum + Math.pow(digit, power), 0) === num;
}

// Function to check if a number is a perfect number
function checkPerfect(num) {
    if (num < 2) return false;
    let sum = 1;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            sum += i + (i !== num / i ? num / i : 0);
        }
    }
    return sum === num;
}

// Function to get digit sum
function getDigitSum(num) {
    return num.toString().split("").reduce((sum, digit) => sum + parseInt(digit), 0);
}

// Function to determine number properties
function getProperties(num, isArmstrong) {
    return [isArmstrong ? "armstrong" : null, num % 2 === 0 ? "even" : "odd"].filter(Boolean);
}


// Start the server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
