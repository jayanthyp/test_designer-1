const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// API endpoint to get all images
app.get('/api/images', (req, res) => {
    const uploadsDir = path.join(__dirname, 'uploads');
    
    try {
        const files = fs.readdirSync(uploadsDir);
        const images = files
            .filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file))
            .map(file => ({
                filename: file,
                path: `/uploads/${file}`,
                description: getDescriptionFromFilename(file)
            }));
        
        res.json(images);
    } catch (error) {
        console.error('Error reading uploads directory:', error);
        res.status(500).json({ error: 'Failed to read images' });
    }
});

// Helper function to generate description from filename
function getDescriptionFromFilename(filename) {
    // Remove file extension and replace hyphens/underscores with spaces
    return filename
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 