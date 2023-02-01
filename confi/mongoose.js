const express= require("express");
const mongoose = require('mongoose');

main().then(()=>console.log("mongodb connected successfully!")
).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/note');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}