document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('section');
    const content = document.querySelector('.content');

    // Function to update active button
    function updateActiveButton(sectionId) {
        buttons.forEach(button => {
            if (button.dataset.section === sectionId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }

    // Handle button clicks
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.dataset.section;
            const section = document.getElementById(sectionId);
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Handle scroll
    let isScrolling = false;
    content.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                const scrollPosition = content.scrollTop;
                const windowHeight = content.clientHeight;
                const fullHeight = content.scrollHeight;
            
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                
                    if (
                        (sectionTop <= scrollPosition && sectionTop + sectionHeight > scrollPosition) ||
                        (section === sections[sections.length - 1] && scrollPosition + windowHeight >= fullHeight - 10)
                    ) {
                        updateActiveButton(section.id);
                    }
                });
                isScrolling = false;
            });
        }
        isScrolling = true;
    });

    // Initialize first button as active
    updateActiveButton('section1');
});
