// Collect images from the DOM
const photoButtons = Array.from(document.querySelectorAll('.photo-btn'));
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

// Build an array of image data from the gallery
const images = photoButtons.map((btn, i) => {
  const img = btn.querySelector('img');
  const caption = btn.parentElement.querySelector('.caption')?.textContent || '';
  return {
    src: img.getAttribute('src'),
    alt: img.getAttribute('alt') || '',
    caption: caption,
    index: i
  };
});

// Open lightbox
function openLightbox(index){
  const item = images[index];
  if(!item) return;
  currentIndex = index;
  lightboxImage.src = item.src;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = item.caption;
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  // focus management
  closeBtn.focus();
}

// Close lightbox
function closeLightbox(){
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lightboxImage.src = '';
}

// Navigate
function showNext(){
  const next = (currentIndex + 1) % images.length;
  openLightbox(next);
}
function showPrev(){
  const prev = (currentIndex - 1 + images.length) % images.length;
  openLightbox(prev);
}

// Attach events
photoButtons.forEach((btn, i) => {
  btn.addEventListener('click', () => openLightbox(i));
  btn.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(i);
    }
  });
});

closeBtn.addEventListener('click', closeLightbox);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Close on backdrop click
lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox) closeLightbox();
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if(lightbox.getAttribute('aria-hidden') === 'false'){
    if(e.key === 'Escape') closeLightbox();
    if(e.key === 'ArrowRight') showNext();
    if(e.key === 'ArrowLeft') showPrev();
  }
});
