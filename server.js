const express = require('express');
const multer = require('multer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        const email = req.body.customerEmail.replace(/[^a-zA-Z0-9]/g, '');
        const extension = file.originalname.split('.').pop();
        cb(null, `${email}.${extension}`);
    }
});

const upload = multer({ storage: storage });

app.post('/submit-order', upload.single('imageUpload'), (req, res) => {
    console.log('Order received for:', req.body.customerEmail);
    // Add any additional processing here
    res.json({ message: 'Order received successfully' });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
