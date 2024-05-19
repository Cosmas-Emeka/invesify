// ------------------- declaring the variables(DOM) ------------------- //
const list = document.querySelectorAll(".list");

//fx for bottom nav active links
function activeLink() {
    list.forEach((item) =>
    item.classList.remove("active"));
    this.classList.add("active");
}

list.forEach((item) =>
item.addEventListener("click", activeLink));



// --------------------------- preloader fx ------------------------- //
const loader = document.getElementById("preloader");


window.addEventListener("load", function() {
    loader.style.display = "none";
})


//
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show")
        }
    });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));




// --------------------- Dropdown menu for skills section -----------------------//


const dropdowns = document.querySelectorAll(".dropdown");

//looping through all dropdown elements
dropdowns.forEach(dropdown => {
    //getting inner elements from each dropdown
    const select = dropdown.querySelector(".select");
    const caret = dropdown.querySelector(".caret");
    const menu = dropdown.querySelector(".menu");
    const options = dropdown.querySelector(".menu li");
    const selected = dropdown.querySelector(".selected");
    
    select.addEventListener("click", () => {
        select.classList.toggle("select-clicked");
        caret.classList.toggle("caret-rotate");
        menu.classList.toggle("menu-open");
    })
})