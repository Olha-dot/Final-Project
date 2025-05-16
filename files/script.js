// Slideshow functionality
let slideIndex = 1;

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

function initSlideshow() {
    const images = [
        'https://www.bailasociety.com/wp-content/uploads/2014/01/classes-tuesday-ailey-01.jpg', // Salsa
        'https://media.istockphoto.com/id/1339701353/photo/black-female-athlete-doing-stretching-exercises-while-warming-up-with-group-of-women-at.jpg?s=612x612&w=0&k=20&c=BaVbYMYo1qMm_aLZQgCX3marK8VV5gHmMCuOe9xjHoQ=', // Yoga
        'https://media.istockphoto.com/id/970126044/photo/group-of-women-kickboxing-together-at-gym.jpg?s=612x612&w=0&k=20&c=os1aYHebfFg1AA5g--yQxt5hfq7z-W6Ek5XG8roPTJU=', // Kickboxing (FIXED)
        'https://scholarblogs.emory.edu/spirituality/files/2022/04/group-of-women-performing-tai-chi-on-grass.jpg'  // Tai Chi
    ];

    const slideshow = document.querySelector('.slideshow-container');
    const dotContainer = document.querySelector('.dot-container');

    images.forEach((img, index) => {
        // Create slide
        const slide = document.createElement('div');
        slide.className = 'mySlides';
        slide.innerHTML = `<img src="${img}" alt="Class ${index + 1}">`;
        slideshow.insertBefore(slide, dotContainer);
        
        // Create dot
        const dot = document.createElement('span');
        dot.className = 'dot';
        dot.onclick = () => currentSlide(index + 1);
        dotContainer.appendChild(dot);
    });

    showSlides(1);
}

// Membership page functionality
function initMembershipPage() {
    // Phone validation
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        if (this.value.length !== 10 || !/^\d+$/.test(this.value)) {
            this.setCustomValidity('Please enter a 10-digit phone number');
        } else {
            this.setCustomValidity('');
        }
    });
    
    // Plan selection
    const planBoxes = document.querySelectorAll('.plan-box');
    planBoxes.forEach(box => {
        box.addEventListener('click', function() {
            planBoxes.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    
    // Form submission
    const form = document.querySelector('.membership-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const selectedPlan = document.querySelector('.plan-box.selected');
            if (!selectedPlan) {
                alert('Please select a membership plan');
                return;
            }
            
            const mainContent = document.querySelector('.main-content .content');
            mainContent.innerHTML = `
                <div style="text-align: center; padding: 3rem;">
                    <h2 style="font-size: 2rem; margin-bottom: 1rem;">WELCOME!</h2>
                    <p style="font-size: 1.2rem;">You will be getting an email with next step directions shortly</p>
                </div>
            `;
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.slideshow-container')) {
        initSlideshow();
    }
    
    if (document.querySelector('.membership-form')) {
        initMembershipPage();
    }
    
    window.plusSlides = plusSlides;
    window.currentSlide = currentSlide;
});