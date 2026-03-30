const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5002;

app.use(cors());
app.use(express.json());

// Serve static images if any
app.use('/images', express.static(path.join(__dirname, 'images')));

const dataPath = path.join(__dirname, 'data.json');

// Helper to read data
const readData = () => {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
};

// API Endpoints
app.get('/api/categories', (req, res) => {
    try {
        const data = readData();
        res.json(data.categories);
    } catch (error) {
        res.status(500).json({ message: "Error reading categories" });
    }
});

app.get('/api/products', (req, res) => {
    try {
        const data = readData();
        let products = data.products;
        
        // Filter by category if provided
        if (req.query.category) {
            products = products.filter(p => p.category.toLowerCase() === req.query.category.toLowerCase());
        }

        // Search by query if provided
        if (req.query.search) {
            products = products.filter(p => p.name.toLowerCase().includes(req.query.search.toLowerCase()));
        }

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Error reading products" });
    }
});

app.get('/api/products/:id', (req, res) => {
    try {
        const data = readData();
        const product = data.products.find(p => p.id === parseInt(req.params.id));
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error reading product details" });
    }
});

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
}); 
