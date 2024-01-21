// lib/DrinkModel.js
import mongoose from 'mongoose';

const drinkSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  matched: { type: Boolean, default: false },
});

const Drink = mongoose.models.Drink || mongoose.model('Drink', drinkSchema);

export default Drink;
