// Load environment variables
require('dotenv').config();

// Import necessary dependencies
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Set default PORT

app.use(cors());

// GET Endpoint
app.get('/api/classify-number/:number', async (req, res) => {
    const { number } = req.params;

    // Validation to ensure valid integer input
    if (!number || isNaN(number) || !Number.isInteger(parseFloat(number))) {
        return res.status(400).json({ 
            number, 
            error: true, 
            message: "Invalid input. Please enter a valid integer."
        });
    }

    const num = parseInt(number, 10);
    const isPrime = checkPrime(num);
    const isArmstrong = checkArmstrong(num);
    const isPerfect = checkPerfect(num);
    const digitSum = getDigitSum(num);
    const properties = getProperties(num, isArmstrong);

    let funFact = '';
    try {
        const response = await axios.get(`http://numbersapi.com/${num}/math?json`);
        funFact = response.data.text;
    } catch (error) {
        console.error("Numbers API Error:", error.message);
        funFact = "Fun fact unavailable due to external API error.";
    }

    // Return correct JSON response
    res.json({
        number: num,
        is_prime: isPrime,
        is_perfect: isPerfect,
        properties,
        digit_sum: digitSum,
        fun_fact: funFact
    });
});

// Check if a number is prime
function checkPrime(num) {
    if (num < 2) return false;
    for (let i = 2; i * i <= num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

// Check if a number is an Armstrong number
function checkArmstrong(num) {
    const digits = num.toString().split('').map(Number);
    const power = digits.length;
    return digits.reduce((sum, digit) => sum + Math.pow(digit, power), 0) === num;
}

// Check if a number is a Perfect number
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

// Get digit sum of a number
function getDigitSum(num) {
    return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
}

// Get number properties
function getProperties(num, isArmstrong) {
    const properties = [];
    if (isArmstrong) properties.push("armstrong");
    properties.push(num % 2 === 0 ? "even" : "odd");
    return properties;
}

// Start the server
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
