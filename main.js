// Desktop Menu

const resources = document.querySelector('.resources')
const chevronDown = document.querySelector('.chevron-down')
const childMenu = document.querySelector('.child-menu')
const hiddenChildMenuContainer = document.querySelector('.hidden-child-menu-container')

resources.addEventListener('mouseover', e => {
    chevronDown.setAttribute('src', 'img/Chevron-down-lightpurple.svg')
    childMenu.style.transform = 'translateY(8%)'
    hiddenChildMenuContainer.style.visibility = 'visible'
    childMenu.style.opacity = '1'
})

resources.addEventListener('mouseout', e => {
    chevronDown.setAttribute('src', 'img/Chevron-down-darkpurple.svg')
    childMenu.style.transform = 'translateY(28%)'
    hiddenChildMenuContainer.style.visibility = 'hidden'
    childMenu.style.opacity = '0'
})

// Mobile Menu

const navListMobileLi = document.querySelectorAll('.nav-list-mobile li')

navListMobileLi.forEach(listItem => {
    listItem.addEventListener('mouseover', e => { 
        const anchorTag = listItem.querySelector('.nav-list-mobile li a')
        anchorTag.style.paddingLeft = '17px'
    })
    listItem.addEventListener('mouseout', e => { 
        const anchorTag = listItem.querySelector('.nav-list-mobile li a')
        anchorTag.style.paddingLeft = '0'
    })
})

// Menu Btn open & close

const menuBtn = document.querySelector('.menu-btn')
const navMobile = document.querySelector('.nav-mobile')
const whiteCloseCross = document.querySelector('.white-close-cross')

menuBtn.addEventListener('click', e => {
    navMobile.style.left = '0'
    setTimeout(() => {
        whiteCloseCross.style.transform = 'scale(1) rotate(270deg)'
        whiteCloseCross.style.boxShadow = '0 0 11px 1px #7742E6'
    }, 575)
})

whiteCloseCross.addEventListener('click', e => {
    navMobile.style.left = '100%'
    whiteCloseCross.style.transform = 'scale(0) rotate(270deg)'
    setTimeout(() => {
        whiteCloseCross.style.transform = 'scale(0) rotate(0)'
    }, 575)
})

// Header Box Shadow on scroll

const mainHeader = document.querySelector('header')

window.addEventListener('scroll', e => {
    if(window.scrollY > 10) {
        mainHeader.style.boxShadow = '0 4px 30px 0 hsla(0, 30%, 20%, .2)'
    } else {
        mainHeader.style.boxShadow = 'none'
    }
})

// TryFreeBtn WP-Logo white on hover

const tryFreeBtn = document.querySelector('.cta-try-free')
const wpLogo = document.querySelector('.wp-logo')

tryFreeBtn.addEventListener('mouseover', e => {
    wpLogo.setAttribute('src', 'img/wordpress-logo-white.svg')
})
tryFreeBtn.addEventListener('mouseout', e => {
    wpLogo.setAttribute('src', 'img/wordpress-logo.svg')
})

// Testimonial Slider

const testiSection = document.querySelector('.testimonial-section')
const arrowLeft = document.querySelector('.arrow-left')
const arrowRight = document.querySelector('.arrow-right')
const sliderPoints = Array.from(document.querySelectorAll('.slider-point'))
const testiBoxesContainer = document.querySelector('.testimonial-container')
const testiBoxes = Array.from(document.querySelectorAll('.testimonial-box'))

const slideWidth = testiBoxes[0].getBoundingClientRect().width

testiBoxes.forEach((testiBox, index) => {
    testiBox.style.left = slideWidth * index + 'px'
})

arrowRight.addEventListener('click', e => {

    const activeSlide = document.querySelector('.active-slide')
    const targetSlide = activeSlide.nextElementSibling

    if(activeSlide !== testiBoxes[3]) {
        // move slides to left
        moveSlides(activeSlide, targetSlide)

        // move point to right
        const activePoint = document.querySelector('.active-point')
        const targetPoint = activePoint.nextElementSibling
        changeNavPointColor(activePoint, targetPoint)
    }
})

arrowLeft.addEventListener('click', e => {

    const activeSlide = document.querySelector('.active-slide')
    const targetSlide = activeSlide.previousElementSibling

    if(activeSlide !== testiBoxes[0]) {
        // move slides to right
        moveSlides(activeSlide, targetSlide)

        // move point to left
        const activePoint = document.querySelector('.active-point')
        const targetPoint = activePoint.previousElementSibling
        changeNavPointColor(activePoint, targetPoint)
    }
})

// Start Testimonial Slider when in Viewport

let executedFunc = false

window.addEventListener('scroll', triggerSliderAnimation)

function triggerSliderAnimation() {
    if(testiBoxesContainer.getBoundingClientRect().top < window.innerHeight / 2) {

        if(executedFunc === true) {
            window.removeEventListener('scroll', triggerSliderAnimation)
            return
        }

            // Stop Slider when user clicks slider Btn
            const allSliderButtons = document.querySelectorAll('.slider-btn')
            allSliderButtons.forEach(sliderButton => {
                sliderButton.addEventListener('click', e => {
                    clearInterval(moveSlidesAutomatically)
                })
            })

            const moveSlidesAutomatically = setInterval(() => {
                const activeSlide = document.querySelector('.active-slide')
                const targetSlide = activeSlide.nextElementSibling
    
                // move slides to left until last
                if(activeSlide !== testiBoxes[3]) {
                    moveSlides(activeSlide, targetSlide)
    
                    // move point to right
                    const activePoint = document.querySelector('.active-point')
                    const targetPoint = activePoint.nextElementSibling
                    changeNavPointColor(activePoint, targetPoint)
                }
    
                // reset last slide to first
                if(activeSlide === testiBoxes[3]) {
                    testiBoxes.forEach(testiBox => {
                        testiBox.style.transform = 'translateX(0)'
                        testiBox.style.animationName = 'blendAnimation'
                        setTimeout(() => {
                            testiBox.style.animationName = ''
                        }, 500)
                    })
                    activeSlide.classList.remove('active-slide')
                    testiBoxes[0].classList.add('active-slide')
    
                    // reset point to first
                    const activePoint = document.querySelector('.active-point')
                    const targetPoint = document.querySelector('.slider-nav').children[0]
                    changeNavPointColor(activePoint, targetPoint)
                }
            }, 6000)
    executedFunc = true
    }
}

function moveSlides(activeSlide, targetSlide) {
    testiBoxes.forEach(testiBox => {
        testiBox.style.transform = 'translateX(-' + targetSlide.style.left + ')'
    })
    activeSlide.classList.remove('active-slide')
    targetSlide.classList.add('active-slide')
}

function changeNavPointColor(activePoint, targetPoint) {
    activePoint.style.backgroundColor = 'lightgrey'
    targetPoint.style.backgroundColor = '#7742E6'

    activePoint.classList.remove('active-point')
    targetPoint.classList.add('active-point')
}

sliderPoints.forEach(sliderPoint => {
    sliderPoint.addEventListener('click', e => {
        // change Point Color
        const activePoint = document.querySelector('.active-point')
        const targetPoint = e.target
        changeNavPointColor(activePoint, targetPoint)

        // move slides
        const activeSlide = document.querySelector('.active-slide')
        const clickedPointIndex = sliderPoints.findIndex(point => point === targetPoint)
        const targetSlide = testiBoxes[clickedPointIndex]
        moveSlides(activeSlide, targetSlide)
    })
})

// No left/right arrow hover effect on first/last slide

arrowLeft.addEventListener('mouseover', e => {
    if(testiSection.querySelector('.active-point') === sliderPoints[0]) {
        arrowLeft.classList.remove('hover')
    }
})
arrowLeft.addEventListener('mouseleave', e => {
        arrowLeft.classList.add('hover')
})

arrowRight.addEventListener('mouseover', e => {
    if(testiSection.querySelector('.active-point') === sliderPoints[3]) {
        arrowRight.classList.remove('hover')
    }
})
arrowRight.addEventListener('mouseleave', e => {
        arrowRight.classList.add('hover')
})

// FAQ Accordion

const faqQuestion = document.querySelectorAll('.faq-question')

faqQuestion.forEach(question => {
    question.addEventListener('click', e => {

        const faqAnswer = question.nextElementSibling
        const faqChevron = question.querySelector('.faq-question img')

        if(!question.classList.contains('faq-open')) {
            faqAnswer.style.maxHeight = faqAnswer.scrollHeight + 1 + 'px'
            faqChevron.style.transform = 'rotate(180deg)'
            question.style.borderBottomLeftRadius = '0'
            question.style.borderBottomRightRadius = '0'
            question.parentElement.style.boxShadow = '0 4px 22px 0 hsla(0, 20%, 20%, .2)'
            question.classList.add('faq-open')

        } else {
            faqAnswer.style.maxHeight = '0'
            faqChevron.style.transform = 'rotate(0)'
            question.style.borderBottomLeftRadius = '9px'
            question.style.borderBottomRightRadius = '9px'
            question.parentElement.style.boxShadow = 'none'
            question.classList.remove('faq-open')
        }
    })
})