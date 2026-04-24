document.addEventListener('DOMContentLoaded', () => {
    console.log("KM-LED Shared JS Loaded");

    // Create lightbox element
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.style.display = 'none'; // Ensure it starts hidden
    lightbox.innerHTML = '<img id="lightbox-img" src="" alt="Zoom">';
    document.body.appendChild(lightbox);

    const lightboxImg = document.getElementById('lightbox-img');

    // Add click event to all images in article bodies or technical cards
    const images = document.querySelectorAll('.article-body img, .cta-banner img');
    
    images.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log("Opening image:", img.src);
            lightboxImg.src = img.src;
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            document.body.style.overflow = 'hidden';
        });
    });

    // Close lightbox on click
    lightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
});
