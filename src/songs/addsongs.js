const mongoose = require('mongoose');
const fs = require('fs');

async function storeFile() {
  const uri = 'mongodb://127.0.0.1:27017/musicdetails';

  try {
    await mongoose.connect(uri);
    const database = mongoose.connection.db;
    const bucket = new mongoose.mongo.GridFSBucket(database);

    const filePath = 'C:\\Users\\bhunv\\OneDrive\\Desktop\\spotify\\src\\songs\\The Humma Song Ok Jaanu 128 Kbps.mp3';
    const readStream = fs.createReadStream(filePath);
    const uploadStream = bucket.openUploadStream('The Humma Song Ok Jaanu 128 Kbps.mp3');

    readStream.pipe(uploadStream);

    uploadStream.on('finish', () => {
      console.log('File stored successfully');
      mongoose.connection.close();
    });

    uploadStream.on('error', (error) => {
      console.error('Error storing file:', error);
      mongoose.connection.close();
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

storeFile();
