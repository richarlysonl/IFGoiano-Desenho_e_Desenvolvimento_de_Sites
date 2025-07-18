// Gallery functionality
let currentImageIndex = 0;
let galleryImages = [];

// Initialize gallery
document.addEventListener('DOMContentLoaded', function() {
    // Collect all gallery images
    const images = document.querySelectorAll('.gallery-item img');
    galleryImages = Array.from(images);
    
    // Add click event to each image
    images.forEach((img, index) => {
        img.addEventListener('click', () => openModal(img, index));
        img.style.cursor = 'pointer';
    });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('imageModal');
        if (modal && modal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (e.key === 'ArrowRight') {
                changeImage(1);
            }
        }
    });
    
    // Close modal when clicking outside the image
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});

// Open modal with image
function openModal(img, index = null) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    
    if (!modal || !modalImg || !caption) return;
    
    // Find index if not provided
    if (index === null) {
        index = galleryImages.findIndex(image => image.src === img.src);
    }
    
    currentImageIndex = index;
    
    modal.style.display = 'block';
    modalImg.src = img.src;
    caption.innerHTML = img.alt;
    
    // Disable body scroll
    document.body.style.overflow = 'hidden';
    
    // Add fade in animation
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    if (!modal) return;
    
    // Add fade out animation
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Change image in modal
function changeImage(direction) {
    if (galleryImages.length === 0) return;
    
    currentImageIndex += direction;
    
    // Loop around if at beginning or end
    if (currentImageIndex >= galleryImages.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = galleryImages.length - 1;
    }
    
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    const currentImg = galleryImages[currentImageIndex];
    
    if (!modalImg || !caption || !currentImg) return;
    
    // Add transition effect
    modalImg.style.opacity = '0';
    setTimeout(() => {
        modalImg.src = currentImg.src;
        caption.innerHTML = currentImg.alt;
        modalImg.style.opacity = '1';
    }, 150);
}

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const modal = document.getElementById('imageModal');
    if (modal.style.display === 'block') {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next image
                changeImage(1);
            } else {
                // Swipe right - previous image
                changeImage(-1);
            }
        }
    }
}

// Preload images for better performance
function preloadImages() {
    galleryImages.forEach(img => {
        const preloadImg = new Image();
        preloadImg.src = img.src;
    });
}

// Call preload after page load
window.addEventListener('load', preloadImages);

// Smooth scroll animations for gallery items
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe gallery items for animation
document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    galleryObserver.observe(item);
});

// Lazy loading for gallery images
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        }
    });
});

// Apply lazy loading to images
document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add loading animation
function showLoading() {
    const modalImg = document.getElementById('modalImage');
    modalImg.style.opacity = '0.5';
}

function hideLoading() {
    const modalImg = document.getElementById('modalImage');
    modalImg.style.opacity = '1';
}

// Enhanced image loading with loading states
document.getElementById('modalImage').addEventListener('load', hideLoading);
document.getElementById('modalImage').addEventListener('loadstart', showLoading);

