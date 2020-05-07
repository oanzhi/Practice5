let slideIndex = 0;
let currentSlideIndex = 0;
const slideArray = [];

function Slide(title, subtitle, background, link) {
    this.title = title;
    this.subtitle = subtitle;
    this.background = background;
    this.link = link;
    this.id = "slide" + slideIndex;
    slideIndex++;
    slideArray.push(this);
}

const sea = new Slide(
    "Sea",
    "Black sea",
    "public/images/sea.jpg",
    "https://www.google.com/url?sa=i&url=http%3A%2F%2Freview-planet.ru%2F2012%2F03%2Fchernoe-more-foto%2F&psig=AOvVaw0SmNBDl-w7qMVSUMuguO5o&ust=1588788486010000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKCv3suonekCFQAAAAAdAAAAABAD"
);


const mountains = new Slide(
    "Carpathians",
    "Carpathian mountains",
    "public/images/mountains.jpg",
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vpoxod.ru%2Fpage%2Ftoponym%2Fkarpaty_info&psig=AOvVaw28-Ufu0H2C_VuIXs8Mxw7E&ust=1588788660441000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKCZq5apnekCFQAAAAAdAAAAABAJ"
);


const lake = new Slide(
    "Lake",
    "Lake Synevir",
    "public/images/lake.jpg",
    ""
);


function buildSlider() {
    let myHTML = "";
    for (let i = 0; i < slideArray.length; i++) {
        myHTML += "<div id='" + slideArray[i].id +
            "' class='singleSlide' style='background-image:url(" +
            slideArray[i].background +
            ");'>" +
            "<div class='slideOverlay'>" +
            "<h1>" + slideArray[i].title + "</h1>" +
            "<h4>" + slideArray[i].subtitle + "</h4>" +
            "<a class='slider' href='" + slideArray[i].link + "' target='_blank'>Open Link</a>" +
            "</div>" +
            "</div>";
    }

    // Print our HTML to the web page
    document.getElementById("mySlider").innerHTML = myHTML;
    // Display the first slide
    document.getElementById("slide" + currentSlideIndex).style.left = "0";
    document.getElementById("slide" + (slideArray.length - 1)).style.left = "-100%";
}

function buildChecked() {
    let mHTML = '';
    for (let i = 0; i < slideArray.length; i++) {
        mHTML += "<span class='dot' onclick='currentSlide(" + i + ")'></span>";
    }

    document.getElementById("sliderNav").innerHTML = mHTML;
    document.getElementsByClassName("dot").item(currentSlideIndex).id = "active";
}

buildSlider();
buildChecked();


function currentSlide(number) {
    if (number > currentSlideIndex) {
        document.getElementById("slide" + number).style.left = "0";
        for (let i = currentSlideIndex; i < number; i++) {
            document.getElementById("slide" + i).style.left = "-100%";
            document.getElementById("slide" + i).setAttribute("class", "singleSlide slideOutLeft");
        }
        document.getElementById("slide" + number).setAttribute("class", "singleSlide slideInRight");

        currentSlideIndex = number;
        document.getElementById("active").id = '';
        document.getElementsByClassName("dot").item(currentSlideIndex).id = 'active';
    } else if (number < currentSlideIndex) {
        document.getElementById("slide" + number).style.left = "0";
        for (let j = number+1; j < currentSlideIndex+1; j++) {
            document.getElementById("slide" + j).style.left = "100%";
            document.getElementById("slide" + j).setAttribute("class", "singleSlide slideOutRight");
        }
        document.getElementById("slide" + number).setAttribute("class", "singleSlide slideInLeft");

        currentSlideIndex = number;
        document.getElementById("active").id = '';
        document.getElementsByClassName("dot").item(currentSlideIndex).id = 'active';
    }
}

// Navigates to the previous slide in the list​
function prevSlide() {
    // Figure out what the previous slide is    ​
    let nextSlideIndex;
    // If we are at zero go to the last slide in the list    ​
    if (currentSlideIndex === 0) {
        nextSlideIndex = slideArray.length - 1;
    } else {
        // Otherwise the next one is this slide minus 1
        nextSlideIndex = currentSlideIndex - 1;
    }
    document.getElementById("slide" + nextSlideIndex).style.left = "0";
    document.getElementById("slide" + currentSlideIndex).style.left = "100%";

    // Add the appropriate animation class to the slide
    document.getElementById("slide" + nextSlideIndex).setAttribute("class", "singleSlide slideInLeft");
    document.getElementById("slide" + currentSlideIndex).setAttribute("class", "singleSlide slideOutRight");

    // Set current slide to the new current slide
    currentSlideIndex = nextSlideIndex;

    document.getElementById("active").id = '';
    document.getElementsByClassName("dot").item(currentSlideIndex).id = 'active';
}


function nextSlide() {
    let nextSlideIndex;
    if (currentSlideIndex === (slideArray.length - 1)) {
        nextSlideIndex = 0;
    } else {
        nextSlideIndex = currentSlideIndex + 1;
    }

    // Setup the next slide and current slide for animations
    document.getElementById("slide" + nextSlideIndex).style.left = "0";
    document.getElementById("slide" + currentSlideIndex).style.left = "-100%";

    // Add the appropriate animation class to the slide
    document.getElementById("slide" + nextSlideIndex).setAttribute("class", "singleSlide slideInRight");
    document.getElementById("slide" + currentSlideIndex).setAttribute("class", "singleSlide slideOutLeft");

    // Set current slide to the new current slide
    currentSlideIndex = nextSlideIndex;


    document.getElementById("active").id = '';
    document.getElementsByClassName("dot").item(currentSlideIndex).id = 'active';
}

document.getElementById("sliderPrev").addEventListener('click', function () {
    prevSlide();
});
document.getElementById("sliderNext").addEventListener('click', function () {
    nextSlide();
});


