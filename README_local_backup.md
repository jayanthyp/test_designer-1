# Designer Blouse Gallery

A beautiful web application showcasing designer wear blouses with traditional Indian aesthetics. The gallery features a responsive grid layout with category filtering and interactive image viewing.

## Features

- Responsive grid-based image layout
- Category filtering (Temple Inspired, Wedding Collection, Traditional)
- Interactive lightbox for image viewing
- Dynamic image loading from the uploads folder
- Traditional Indian-inspired design elements
- Mobile-friendly interface

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd designer-blouse-gallery
```

2. Install dependencies:
```bash
npm install
```

3. Create an `uploads` directory in the project root:
```bash
mkdir uploads
```

4. Add your blouse images to the `uploads` directory. For proper categorization, name your files with the appropriate category prefix:
   - `temple-*` for temple-inspired designs
   - `wedding-*` for wedding collection
   - `traditional-*` for traditional designs

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
designer-blouse-gallery/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── app.js
├── uploads/
│   └── (your images here)
├── server.js
├── package.json
└── README.md
```

## Adding New Images

To add new images to the gallery:

1. Place your image files in the `uploads` directory
2. Name your files with the appropriate category prefix (e.g., `temple-design1.jpg`, `wedding-collection1.jpg`)
3. The images will automatically appear in the gallery without requiring any code changes

## Development

- The frontend is built with vanilla HTML, CSS, and JavaScript
- The backend uses Node.js with Express
- Images are served dynamically from the `uploads` directory
- No database is required - the system uses the filesystem for image management

## Contributing

Feel free to submit issues and enhancement requests!

# Image Data Generator

This Python script generates a dataset of sample images and creates a CSV file with their metadata. It uses the Picsum Photos API to download random images.

## Features

- Downloads sample images from Picsum Photos
- Creates a CSV file with image metadata
- Organizes images in a dedicated directory
- Handles various image categories (Abstract, Mountain, Beach, etc.)

## Requirements

- Python 3.x
- requests library

## Installation

1. Clone this repository
2. Install the required package:
```bash
pip install requests
```

## Usage

Run the script:
```bash
python generate_data.py
```

The script will:
1. Create an `images` directory
2. Download sample images
3. Generate a `data.csv` file with image metadata

## Output

- Images are saved in the `./images/` directory
- A `data.csv` file is generated with columns:
  - image_name
  - path
  - description 