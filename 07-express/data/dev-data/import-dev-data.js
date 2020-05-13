const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './.env' });

const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    // console.log(con.connections);
    console.log('DB connection succefull...');
  });

//   Read Json File
const tour = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// import data in DB

const importData = async () => {
  try {
    await Tour.create(tour);
    console.log('data successfully lodaded....');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//DELETE DAT FROM DBconst importData = async () => {
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data successfully deleted....');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
console.log(process.argv, '+++');
