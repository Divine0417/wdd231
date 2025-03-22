document.querySelector(".more-button").addEventListener("click", function(event) {
    event.stopPropagation();
    document.querySelector(".more-nav").classList.toggle("show");
});

// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
    let dropdown = document.querySelector(".more-nav");
    if (!event.target.closest(".more")) {
        dropdown.classList.remove("show");
    }
});
