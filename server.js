const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'database.json');

// -------- Place Order API --------
app.post('/place-order', (req, res) => {

  let data;

  // agar file empty ya missing ho
  try {
    data = JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch (err) {
    data = { orders: [] };
  }

  const newOrder = {
    id: Date.now(), // UNIQUE ID
    user: req.body.user || "guest",
    items: req.body.items || [],
    total: req.body.total || 0,
    createdAt: new Date().toISOString()
  };

  data.orders.push(newOrder);

  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

  res.json({
    success: true,
    message: "Order saved successfully",
    orderId: newOrder.id
  });
});


app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});

