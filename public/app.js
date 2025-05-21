document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('galleryGrid');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeLightbox = document.querySelector('.close-lightbox');

    let allImages = [];
    let currentCategory = 'all';

    // Fetch images from the server
    async function fetchImages() {
        try {
            const response = await fetch('/api/images');
            allImages = await response.json();
            displayImages(allImages);
        } catch (error) {
            console.error('Error fetching images:', error);
            galleryGrid.innerHTML = '<p class="error">Failed to load images. Please try again later.</p>';
        }
    }

    // Display images in the gallery
    function displayImages(images) {
        galleryGrid.innerHTML = '';
        
        images.forEach(image => {
            const category = getCategoryFromFilename(image.filename);
            if (currentCategory === 'all' || category === currentCategory) {
                const item = createGalleryItem(image);
                galleryGrid.appendChild(item);
            }
        });
    }

    // Create a gallery item element
    function createGalleryItem(image) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        const img = document.createElement('img');
        img.src = image.path;
        img.alt = image.description;
        img.loading = 'lazy';
        
        const description = document.createElement('div');
        description.className = 'description';
        description.textContent = image.description;

        item.appendChild(img);
        item.appendChild(description);

        // Add click event for lightbox
        item.addEventListener('click', () => {
            openLightbox(image);
        });

        return item;
    }

    // Open lightbox with image
    function openLightbox(image) {
        lightboxImg.src = image.path;
        lightboxCaption.textContent = image.description;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightboxHandler() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Get category from filename
    function getCategoryFromFilename(filename) {
        const categories = ['temple', 'wedding', 'traditional'];
        const lowerFilename = filename.toLowerCase();
        
        for (const category of categories) {
            if (lowerFilename.includes(category)) {
                return category;
            }
        }
        return 'all';
    }

    // Event Listeners
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update current category and display images
            currentCategory = button.dataset.category;
            displayImages(allImages);
        });
    });

    closeLightbox.addEventListener('click', closeLightboxHandler);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxHandler();
        }
    });

    // Close lightbox with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'block') {
            closeLightboxHandler();
        }
    });

    // Initial load
    fetchImages();
}); 