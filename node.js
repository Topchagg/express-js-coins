const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const Coins = require('./models/Coins')
 
const app = express();
app.use(express.json());
 
mongoose.connect('mongodb+srv://root:root@cluster0.ssf6ede.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.get('/coins/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    console.log(err)
  }
});

app.post('/coins', async (req, res) => {

    try {
    
      const coin = new Coins({...req.body});
  
      await coin.save();
  
      res.status(201).json(Coins);
  
    } catch (err) {
  
      res.status(500).send(err.message);
  
    }
  });
   
 
app.put('/coins/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
 
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});