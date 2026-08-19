const startScreen = document.querySelector(".start-screen");
const mainMenu = document.querySelector(".main-menu");
const fadeOverlay = document.querySelector(".fade-overlay");
const aboutScreen = document.querySelector(".about-screen");
const aboutLink = document.querySelector("#about-link");
const aboutBack = document.querySelector("#about-back");
const musicScreen = document.querySelector(".music-screen");
const musicLink = document.querySelector("#music-link");
const musicBack = document.querySelector("#music-back");
const photosScreen = document.querySelector(".photos-screen");
const photosLink = document.querySelector("#photos-link");
const photosBack = document.querySelector("#photos-back");
const archiveScreen =
    document.querySelector(".archive-screen");

const archiveLink =
    document.querySelector("#archive-link");

const archiveBack =
    document.querySelector("#archive-back");


let hasEntered = false;


// ======================
// SOUNDS
// ======================

const enterSound = new Audio("sounds/entersound.mp3");
const hoverSound = new Audio("sounds/hoverswitch.mp3");
const sectionEnterSound = new Audio("sounds/intorazdeli.mp3");
const popSound = new Audio("sounds/popsound.mp3");
const backSound = new Audio("sounds/backtomenu.mp3");
const soundToggle =
    document.querySelector("#sound-toggle");

let soundEnabled =
    localStorage.getItem("oisinSoundEnabled") !== "false";

enterSound.preload = "auto";
hoverSound.preload = "auto";
sectionEnterSound.preload = "auto";
popSound.preload = "auto";
backSound.preload = "auto";

enterSound.volume = 0.6;
hoverSound.volume = 0.35;
sectionEnterSound.volume = 0.4;
popSound.volume = 0.25;
backSound.volume = 0.4;

function playSound(sound) {

    if (!soundEnabled) return;

    /*
       Если браузер ещё не успел получить
       достаточно аудио — НЕ ставим звук в очередь.
       Просто пропускаем его.
    */
    if (sound.readyState < 2) {
        return;
    }

    sound.currentTime = 0;

    sound.play().catch(() => {
        // Ignore playback errors.
    });
}

function updateSoundToggle() {

    soundToggle.classList.toggle(
        "is-muted",
        !soundEnabled
    );

    soundToggle.setAttribute(
        "aria-label",
        soundEnabled
            ? "Turn sound off"
            : "Turn sound on"
    );
}


soundToggle.addEventListener("click", () => {

    soundEnabled = !soundEnabled;

    localStorage.setItem(
        "oisinSoundEnabled",
        soundEnabled
    );

    updateSoundToggle();

    popSound.currentTime = 0;

    popSound.play().catch(() => {
        // Ignore audio playback errors.
    });
});


updateSoundToggle();

// ======================
// DESKTOP - PREVENT NATIVE DRAG
// ======================

const isDesktopDrag =
    window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

if (isDesktopDrag) {

    document.addEventListener(
        "dragstart",
        (event) => {
            event.preventDefault();
        }
    );

}


const mainMenuLinks = document.querySelectorAll(".menu a");

mainMenuLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
        playSound(hoverSound);
    });
});

mainMenuLinks.forEach((link) => {
    link.addEventListener("click", () => {

        const isMobile =
            window.matchMedia(
                "(max-width: 768px)"
            ).matches;

        const isIPadAir =
            window.matchMedia(
                "(min-width: 800px) and (max-width: 830px) and (pointer: coarse)"
            ).matches;

        const isIPadPro =
            window.matchMedia(
                "(min-width: 1000px) and (max-width: 1050px) and (pointer: coarse)"
            ).matches;


        if (
            !isMobile &&
            !isIPadAir &&
            !isIPadPro
        ) {
            playSound(sectionEnterSound);
        }

    });
});


function enterSite() {
    if (hasEntered) return;

    hasEntered = true;

    playSound(enterSound);

    fadeOverlay.classList.add("active");

    setTimeout(() => {
        startScreen.style.display = "none";
        mainMenu.style.display = "block";
        preloadMusicCoversInBackground();
        fadeOverlay.classList.remove("active");
    }, 600);
}

// ======================
// ENTER SITE INPUT
// ======================

const isMobileStart =
    window.matchMedia(
        "(max-width: 768px)"
    ).matches;

const isIPadAirStart =
    window.matchMedia(
        "(min-width: 800px) and (max-width: 830px) and (pointer: coarse)"
    ).matches;

const isIPadProStart =
    window.matchMedia(
        "(min-width: 1000px) and (max-width: 1050px) and (pointer: coarse)"
    ).matches;


if (
    isMobileStart ||
    isIPadAirStart ||
    isIPadProStart
) {

    startScreen.addEventListener(
        "click",
        enterSite
    );

} else {

    document.addEventListener(
        "pointerdown",
        enterSite
    );
}



// Keyboard for desktop
document.addEventListener(
    "keydown",
    enterSite
);


aboutLink.addEventListener("click", (event) => {
    event.preventDefault();

    fadeOverlay.classList.add("active");

    setTimeout(() => {
        mainMenu.style.display = "none";
        aboutScreen.style.display = "block";

        fadeOverlay.classList.remove("active");
    }, 600);
});

musicLink.addEventListener("click", (event) => {
    event.preventDefault();

    fadeOverlay.classList.add("active");

    setTimeout(() => {
        mainMenu.style.display = "none";
        musicScreen.style.display = "block";

        renderMusicCarousel();

        fadeOverlay.classList.remove("active");
    }, 600);
});



photosLink.addEventListener("click", (event) => {
    event.preventDefault();

    fadeOverlay.classList.add("active");

    setTimeout(() => {
        mainMenu.style.display = "none";
        photosScreen.style.display = "block";

        fadeOverlay.classList.remove("active");
    }, 600);
});

archiveLink.addEventListener("click", (event) => {

    event.preventDefault();

    fadeOverlay.classList.add("active");


    setTimeout(() => {

        mainMenu.style.display =
            "none";

        archiveScreen.style.display =
            "block";

        fadeOverlay.classList.remove(
            "active"
        );

    }, 600);

});

function returnToMainMenu() {

    const aboutIsOpen =
        aboutScreen.style.display === "block";

    const musicIsOpen =
        musicScreen.style.display === "block";

    const photosIsOpen =
        photosScreen.style.display === "block";

    const archiveIsOpen =
        archiveScreen.style.display === "block";


    if (
        !aboutIsOpen &&
        !musicIsOpen &&
        !photosIsOpen &&
        !archiveIsOpen
    ) {
        return;
    }

    playSound(backSound);

    fadeOverlay.classList.add("active");


    setTimeout(() => {

        aboutScreen.style.display = "none";
        musicScreen.style.display = "none";
        photosScreen.style.display = "none";
        archiveScreen.style.display = "none";

        mainMenu.style.display = "block";

        fadeOverlay.classList.remove("active");

    }, 600);
}

aboutBack.addEventListener("click", returnToMainMenu);
musicBack.addEventListener("click", returnToMainMenu);
photosBack.addEventListener("click", returnToMainMenu);
archiveBack.addEventListener(
    "click",
    returnToMainMenu
);

document.addEventListener("keydown", (event) => {


    /* PHOTO VIEWER - LEFT / RIGHT */

    if (photoViewer.classList.contains("open")) {

        if (event.key === "ArrowLeft") {

            event.preventDefault();

            changeViewerPhoto(-1);

            return;
        }


        if (event.key === "ArrowRight") {

            event.preventDefault();

            changeViewerPhoto(1);

            return;
        }

    }


    const isBackKey =
        event.key === "Escape" ||
        event.key === "Backspace";


    if (!isBackKey) return;

    /* SUPPORT WINDOW */

    if (supportOverlay.classList.contains("open")) {

        event.preventDefault();

        closeSupportWindow();

        return;
    }


    /* PHOTO VIEWER */

    if (photoViewer.classList.contains("open")) {

        event.preventDefault();

        closePhotoViewer();

        return;
    }



    /* ARCHIVE ITEM */

    if (archiveOverlay.classList.contains("open")) {

        event.preventDefault();

        closeArchiveItem();

        return;
    }

    /* LISTEN WINDOW */

    if (listenOverlay.classList.contains("open")) {

        event.preventDefault();

        closeListenWindow();

        return;
    }


    /* MORE WINDOW */

    if (moreOverlay.classList.contains("open")) {

        event.preventDefault();

        closeMoreWindow();

        return;
    }


    /* OPEN PHOTO COLLECTION */

    if (
        photosScreen.style.display === "block" &&
        currentPhotoCollection
    ) {

        event.preventDefault();

        closePhotoCollection();

        return;
    }


    /* ABOUT / MUSIC / PHOTOS */

    if (
        aboutScreen.style.display === "block" ||
        musicScreen.style.display === "block" ||
        photosScreen.style.display === "block" ||
        archiveScreen.style.display === "block"
    ) {

        event.preventDefault();

        returnToMainMenu();

    }

});


const menuLinks = document.querySelectorAll(".menu a");
const menuDescription = document.querySelector(".menu-description");

const canHover = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;

if (canHover) {

    menuLinks.forEach((link) => {

        link.addEventListener("mouseenter", () => {
            menuDescription.textContent =
                link.dataset.description;

            menuDescription.classList.add("visible");
        });

        link.addEventListener("mouseleave", () => {
            menuDescription.classList.remove("visible");
        });

    });

}




// ======================
// MUSIC CAROUSEL DATA
// ======================

const musicReleases = [
    {
    id: "allegory",

    title: "allegory for those who can't stand out",
    displayType: "single",
    year: "2024",

    artist: "Oisin Ocean",

    image: "images/allegory.jpg",

    listenUrl: "",

    listenLinks: {
    youtube: "https://www.youtube.com/watch?v=fFwSJJbOKZ4",
    soundcloud: "https://soundcloud.com/osheenocean/allegory-for-those-who-cant-stand-out"
},

    releaseDate: "December 30, 2024",

    credits: `Music and lyrics by Oisin Ocean
Performed by Oisin Ocean
Recorded and produced by Oisin Ocean
Mixed and mastered by Oisin Ocean
Artwork and design by Oisin Ocean`,

    story: "",

    lyrics: `everybody wants something from me
everyone imposes how i should live
am i blessed or am i cursed
only god knows which is worse

what have you done
something in forest that world's never shown
where it all goes
suddenly everything turns into stone
where is the end
little old house will be sold in a day

something's gone something comes back
something falls something will rise
something breaks something intact
something fades something survives

i don't know
i really don't know
if i die someone'll be born
if i stay someone must go
i don't know
i still don't know.`,

    relatedMaterial: [
        {
            label: "Music video",
            url: "https://www.youtube.com/watch?v=fFwSJJbOKZ4"
        }
    ]
},

{
    id: "kaos",

    title: "Kaos",
    displayType: "single",
    year: "2026",

    artist: "Oisin Ocean",

    image: "images/kaos.jpg",

    isReleased: false,

    listenUrl: "",

    releaseDate: "August 21, 2026",

    credits: `Music and lyrics by Oisin Ocean
Performed by Oisin Ocean
Recorded and produced by Oisin Ocean
Mixed and mastered by Oisin Ocean
Artwork and design by Oisin Ocean`,

    story: `This song is another perspective on Soak.`,

    lyrics: `they come from everywhere
yeah they want my spot
and im all alone
still hearin the shots

yeah im tryin to forget
again and again
rustle behind that wall
again and again

they wanna eat
but theres nothing no more
and i wanna smile
its not fun anymore`,

    relatedMaterial: []
},


    {
    id: "feelsawful",

    title: "Everything Feels Awful If You Look at It Too Long",
    displayType: "EP",
    year: "2026",

    artist: "Oisin Ocean",

    image: "images/feelsawful.jpg",

    listenUrl: "",

    listenLinks: {
    spotify: "https://open.spotify.com/album/7GOMH828klFnWUXB7nECDk?si=jrs6ecO_T5iRHFN-3SXa3w",
    youtube: "https://youtube.com/playlist?list=PL5pGIHSkkbHjVRmqgRd8PRYIRR9AHyZ4z",
    applemusic: "https://music.apple.com/us/album/everything-feels-awful-if-you-look-at-it-too-long-ep/1887711019",
    bandcamp: "https://oisinocean.bandcamp.com/album/everything-feels-awful-if-you-look-at-it-too-long"
},

    releaseDate: "April 24, 2026",

    credits: `Music and lyrics by Oisin Ocean
Performed by Oisin Ocean
Recorded and produced by Oisin Ocean
Mixed and mastered by Oisin Ocean
Artwork and design by Oisin Ocean`,

    story: `I planned to start writing this EP in the summer of 2025. Initially, it was supposed to have a complete summer vibe. But the process got complicated, and a lot changed inside me. As a result, the title "Everything Feels Awful If You Look at It Too Long" came to be, along with a slightly darker mood at the end of the EP. But I'm glad I made it through this journey and released this project.`,

    tracks: [
        {
            title: "Potpourri",

            lyrics: `down the river is my home
where i stayed
all my friends they made me sad
its just part of the world
and i think i still remember
how i lay in your bed
and my eyes stayed on your shoulder
glowing soft and angelic
but im losing it oh well
im turning blue im turning red

every smile
is dragging words and dragging them so hard
and this song
shouldnt be perfect shouldnt be perfect

why should i care when everything goes wrong

baby
hold me
break me
or maybe
save me
come with me
stay close
always`
        },

        {
            title: "Thoughts & Pines",

            lyrics: `old wooden houses
where no one lives
and you told me look down
at the flower by your side

truck in the sun
we are jumping on its roof
silence and shadows
they are always there

day night
almost
fade out
we dont speak right now

thoughts and pines
summer nights feel right
we are all alone
in this lost town

broken lights
with rusted signs
along this way
it fades away

i wanted to show you
this place holds a secret
and no one knows it
that there is something

i know we wont come back
those lakes in the morning
that look like a mirror
will tell us something`
        },

        {
            title: "Track 3",

            lyrics: `just hit me with a car
it wont be long
just make me feel my bones
im bambi coded
so hit me with a car
you did that before
im crossing again this road
so hit me so hard

one day and im gone
i still think about you
why do i feel cold
every time im around you
the fool on my card
its just how it works
you know im dumb
but im smarter than most

my dad drove us out
believe it or not
im fine where i am
i say that a lot

you guys want to play
but dont know how
ive learned my own games
im having some fun

everything seems to change
we fall apart to celebrate
its all just repeating, over and over
and then im just falling
im falling im falling`
        },

        {
            title: "Soak",

            lyrics: `they come from everywhere
yeah they want my spot
and im all alone
still hearin the shots

yeah im tryin to forget
again and again
rustle behind that wall
again and again

they wanna eat
but theres nothing no more
and i wanna smile
its not fun anymore`
        },

        {
            title: "Hauler",

            lyrics: `i am a hauler with all the baggage i know
mourn and sorrow and everything below
tell my mama that i will never come home
and you can rest now cause i will bear it down

by & by its getting closer
not my year written on the stone
not the end turn to bed hermes prays for you
leaves will fall cut the past nothing left to do

maybe youve forgotten who i really was
but i still recollect every one of us
empty motel room hat on a bed
always leaving soon when its all on me

strangely feels new
voices coming through
all the same for you
futile efforts prove

the sky it wont lie this time now
the moon and the sun forever

days are coming back
may i come around
stars will light the way
where i will never be found`
        }
    ],

    lyrics: "",

    relatedMaterial: [
        {
            label: "Soak — Music video",
            url: "https://www.youtube.com/watch?v=BiY1xJOMFPs"
        }
    ]
},
    {
    id: "flicker",

    title: "flicker",
    displayType: "single",
    year: "2024",

    artist: "Oisin Ocean",

    image: "images/flicker.jpg",

    listenUrl: "",

    listenLinks: {
    youtube: "https://www.youtube.com/watch?v=BuACr9HOSDw",
    soundcloud: "https://soundcloud.com/osheenocean/flicker"
},

    releaseDate: "December 7, 2024",

    credits: `Music and lyrics by Oisin Ocean
Performed by Oisin Ocean
Recorded and produced by Oisin Ocean
Mixed and mastered by Oisin Ocean
Artwork and design by Oisin Ocean`,

    story: `I wrote this song after visiting Italy. I feel like it carries something of the spirit of nature and beauty.`,

    lyrics: `i have never felt any discomfort
i guess i should leave my comfort zone
so i can fly like firefly
and you would see me clear from there
but what's the point of doing this
if our lives are preordained?

forget about this and come with me
we re so dependent so let it be
there are still thousands of miles ahead us
the heart will sense it but will be silent

and those lil moments that are so important
but no one cares and just ignore them
left unnoticed left behind
that's what i told her and she just cried`,

    relatedMaterial: [
        {
            label: "Music video",
            url: "https://www.youtube.com/watch?v=BuACr9HOSDw"
        }
    ]
},
    {
    id: "ghost",

    title: "Ghost",
    displayType: "single",
    year: "2024",

    artist: "Oisin Ocean",

    image: "images/ghost1.jpg",

    listenUrl: "",

    listenLinks: {
    spotify: "https://open.spotify.com/album/1oGagc70xsZN4jF2oruZoh?si=ifQdIv1LQAurTcBL2c0YpQ",
    youtube: "https://www.youtube.com/watch?v=9BwmfGxgJm4",
    applemusic: "https://music.apple.com/us/song/ghost/1828265246",
    bandcamp: "https://oisinocean.bandcamp.com/track/ghost"
},

    releaseDate: "November 19, 2024",

    credits: `Music and lyrics by Oisin Ocean
Performed by Oisin Ocean
Recorded and produced by Oisin Ocean
Mixed and mastered by Oisin Ocean
Artwork and design by Oisin Ocean`,

    story: `I wrote this song in August 2024. It was inspired by the 2017 film A Ghost Story. I wrote it on a warm evening and then spent some time just watching the mountains that appear on the cover.`,

    lyrics: `and i'm floating all alone
seeing all these lives pass by
and i'm asking why i'm still here
in a world that's not my own
watching stars light up the sky
and somebody used to love it too

i could tell you something more
different stories of this world
but my life is untold
memories are all i've got
of a life now long forgot
so everything just blended into one

i'm a ghost x4`,

    relatedMaterial: []
},
    {
    id: "huwufeel",

    title: "huw you feel",
    displayType: "single",
    year: "2025",

    artist: "Oisin Ocean",

    image: "images/huwufeel.jpg",

    listenUrl: "",

    listenLinks: {
    spotify: "https://open.spotify.com/album/58blLC6gA3olHNG4E7Z7n1?si=wDUTWWacRhqjb0PA_CMtIw",
    youtube: "https://www.youtube.com/watch?v=5u0xnjkBwaI",
    applemusic: "https://music.apple.com/us/song/huw-you-feel/6766847091",
    bandcamp: "https://oisinocean.bandcamp.com/track/huw-you-feel"
},

    releaseDate: "April 24, 2025",

    credits: `Music and lyrics by Oisin Ocean
Performed by Oisin Ocean
Recorded and produced by Oisin Ocean
Mixed and mastered by Oisin Ocean
Cover design by Oisin Ocean
Source photograph: photographer unknown, polaroid photograph of Ryan Gosling in The United States of Leland (2003)`,

    story: "",

    lyrics: `What's inside your tea?
What it's gonna be?

What's real? x3
How you feel?

What's inside your dream?
Is it a really big deal?

What's real? x3
And how you feel?`,

    relatedMaterial: [
        {
            label: "Visuals",
            url: "https://www.youtube.com/watch?v=5u0xnjkBwaI"
        }
    ]
},
    {
    id: "kindlingsun",

    title: "Kindling Sun (Reflection I)",
    displayType: "single",
    year: "2025",

    artist: "Oisin Ocean",

    image: "images/kindlingsun.jpg",

    listenUrl: "",

    listenLinks: {
    youtube: "https://www.youtube.com/watch?v=PiVgJZLuDcw",
    soundcloud: "https://soundcloud.com/osheenocean/kindling-sun-reflection-i"
},

    releaseDate: "June 27, 2025",

    credits: `Music and lyrics by Oisin Ocean
Performed by Oisin Ocean
Recorded and produced by Oisin Ocean
Mixed and mastered by Oisin Ocean
Artwork and design by Oisin Ocean`,

    story: "",

    lyrics: `i was born in a cave
i was making mistakes
it all goes around me
it all goes around me

why does it looks so unfair
little boy lost his faith
the field can no longer feed
and my car ran out of fuel

everything seems so quiet
i guess i've never felt it all
the walls are getting wider
i guess i wanna have some more

bring it back hurry up
bring the powder
there's none left anymore
bring it back and hurry up

flowers are falling from my ceiling
and it makes me wonder
why do their words feel hollow
i just wanna hear one answer`,

    relatedMaterial: []
},
    {
    id: "whereigo",

    title: "Where I Go",
    displayType: "single",
    year: "2024",

    artist: "Oisin Ocean",

    image: "images/whereigo.png",

    listenUrl: "",

    listenLinks: {
    youtube: "https://www.youtube.com/watch?v=5FpXwx3Vc88",
    soundcloud: "https://soundcloud.com/osheenocean/where-i-go"
},

    releaseDate: "November 10, 2024",

    credits: `Music and lyrics by Oisin Ocean
Performed by Oisin Ocean
Recorded and produced by Oisin Ocean
Mixed and mastered by Oisin Ocean
Additional vocals by sphnee
Artwork and design by Oisin Ocean`,

    story: "",

    lyrics: `the world cant stand its getting old 
    we know it all 2x
in my room its getting cold 
i ran too far 2x
explain it all without a doubt 
i know its hard 2x
but maybe there is way out too
of course there is ive been here before

i know where i go
the places i know
the sun is still here
i feel like im free
i know where i go
ive been here before
no stress and no time
just ease so divine

i know where i go
the places i know
its so so green
as if in a dream
the world opens wide
when air goes inside
a cerulean sky
above my eyes

theres something worse that i cant say
we should go home 2x
every day and every night
it must be there
cuz ive been here before`,

    relatedMaterial: [
        {
            label: "Visuals",
            url: "https://www.youtube.com/watch?v=5FpXwx3Vc88"
        }
    ]
}
];

let musicCoversPreloadStarted = false;


function preloadMusicImage(src) {

    const img = new Image();

    img.decoding = "async";
    img.src = src;

    if (img.decode) {
        img.decode().catch(() => {});
    }
}


function preloadMusicCoversInBackground() {

    if (musicCoversPreloadStarted) return;

    musicCoversPreloadStarted = true;


    const startPreloading = () => {

        musicReleases.forEach((release) => {
            preloadMusicImage(release.image);
        });

    };


    if ("requestIdleCallback" in window) {

        requestIdleCallback(
            startPreloading,
            { timeout: 1500 }
        );

    } else {

        setTimeout(
            startPreloading,
            300
        );

    }
}

const farPrevCover = document.querySelector(".music-cover-far-prev");
const prevCover = document.querySelector(".music-cover-prev");
const currentCover = document.querySelector(".music-cover-current");
const nextCover = document.querySelector(".music-cover-next");
const farNextCover = document.querySelector(".music-cover-far-next");

const releaseTitle = document.querySelector(".release-title");
const releaseArtist = document.querySelector(".release-artist");

const filterButtons = document.querySelectorAll(".music-filter");
const prevArrow = document.querySelector(".carousel-arrow-left");
const nextArrow = document.querySelector(".carousel-arrow-right");

const listenButton = document.querySelector(".listen-button");
const listenOverlay =
    document.querySelector(".music-listen-overlay");

const listenClose =
    document.querySelector(".music-listen-close");

const listenTitle =
    document.querySelector(".music-listen-title");

const listenPlatforms =
    document.querySelector(".music-listen-platforms");
const moreButton = document.querySelector(".more-button");


listenButton.addEventListener("mouseenter", () => {
    playSound(popSound);
});

moreButton.addEventListener("mouseenter", () => {
    playSound(popSound);
});


const moreOverlay =
    document.querySelector(".music-more-overlay");

const moreClose =
    document.querySelector(".music-more-close");

const moreWindow =
    document.querySelector(".music-more-window");


const moreCover =
    document.querySelector(".music-more-cover");

const moreDetails =
    document.querySelector(".music-more-details");

const moreTitle =
    document.querySelector(".more-title");

const moreCredits =
    document.querySelector(".more-credits");

const moreStory =
    document.querySelector(".more-story");

const moreLyrics =
    document.querySelector(".more-lyrics");

const moreReleaseDate =
    document.querySelector(".more-release-date");

const moreRelated =
    document.querySelector(".more-related");

const moreCreditsSection =
    document.querySelector(".more-credits-section");

const moreStorySection =
    document.querySelector(".more-story-section");

const moreTracklistSection =
    document.querySelector(".more-tracklist-section");

const moreTracklist =
    document.querySelector(".more-tracklist");

const moreTrackLyricsSection =
    document.querySelector(".more-track-lyrics-section");

const moreTrackLyrics =
    document.querySelector(".more-track-lyrics");


const moreLyricsSection =
    document.querySelector(".more-lyrics-section");

const moreReleaseDateSection =
    document.querySelector(".more-release-date-section");

const moreRelatedSection =
    document.querySelector(".more-related-section");

const coverStage = document.querySelector(".cover-stage");

let currentMusicFilter = "all";
let filteredMusicReleases = [...musicReleases];
let currentMusicIndex = 0;
let isMusicAnimating = false;

function wrapIndex(index, length) {
    return (index + length) % length;
}

function getCurrentRelease() {
    return filteredMusicReleases[currentMusicIndex];
}

function setCoverImage(cover, release) {

    if (!release) {
        cover.removeAttribute("src");
        cover.alt = "";
        cover.style.visibility = "hidden";
        return;
    }

    const newSrc = release.image;

    cover.alt = release.title;


    // If this exact image is already loaded,
    // show it immediately.
    if (
        cover.getAttribute("src") === newSrc &&
        cover.complete &&
        cover.naturalWidth > 0
    ) {
        cover.style.visibility = "visible";
        return;
    }


    // Do not leave the previous cover visible
    // while the next one is still loading.
    cover.style.visibility = "hidden";


    cover.onload = () => {

        if (
            cover.getAttribute("src") === newSrc
        ) {
            cover.style.visibility = "visible";
        }

    };


    cover.onerror = () => {

        if (
            cover.getAttribute("src") === newSrc
        ) {
            cover.style.visibility = "hidden";
        }

    };


    cover.src = newSrc;
}

function setCarouselArrowState(button, disabled) {
    button.disabled = disabled;
    button.classList.toggle("is-disabled", disabled);
}


function renderMusicCarousel() {
    if (filteredMusicReleases.length === 0) return;

    const total = filteredMusicReleases.length;
    const current = filteredMusicReleases[currentMusicIndex];

    let farPrev = null;
    let prev = null;
    let next = null;
    let farNext = null;


    // Только один релиз

    if (total === 1) {
        farPrev = null;
        prev = null;
        next = null;
        farNext = null;
    }


    // Только два релиза

    else if (total === 2) {

        if (currentMusicIndex === 0) {
            prev = null;
            next = filteredMusicReleases[1];
        } else {
            prev = filteredMusicReleases[0];
            next = null;
        }

    }


    // Три и больше

    else {

        farPrev =
            filteredMusicReleases[
                wrapIndex(currentMusicIndex - 2, total)
            ];

        prev =
            filteredMusicReleases[
                wrapIndex(currentMusicIndex - 1, total)
            ];

        next =
            filteredMusicReleases[
                wrapIndex(currentMusicIndex + 1, total)
            ];

        farNext =
            filteredMusicReleases[
                wrapIndex(currentMusicIndex + 2, total)
            ];
    }


    setCoverImage(farPrevCover, farPrev);
    setCoverImage(prevCover, prev);
    setCoverImage(currentCover, current);
    setCoverImage(nextCover, next);
    setCoverImage(farNextCover, farNext);


    releaseTitle.textContent =
        `${current.title} (${current.displayType})`;

    releaseArtist.textContent = current.artist;


    if (total === 1) {

        setCarouselArrowState(prevArrow, true);
        setCarouselArrowState(nextArrow, true);

    }

    else if (total === 2) {

        setCarouselArrowState(
            prevArrow,
            currentMusicIndex === 0
        );

        setCarouselArrowState(
            nextArrow,
            currentMusicIndex === total - 1
        );

    }

    else {

        setCarouselArrowState(prevArrow, false);
        setCarouselArrowState(nextArrow, false);

    }
}

function changeRelease(direction) {
    if (isMusicAnimating) return;

    const total = filteredMusicReleases.length;

    if (total <= 1) return;


    // При двух релизах не переходим через край

    if (total === 2) {

        if (
            direction === -1 &&
            currentMusicIndex === 0
        ) {
            return;
        }

        if (
            direction === 1 &&
            currentMusicIndex === total - 1
        ) {
            return;
        }
    }


    isMusicAnimating = true;


    const animationClass =
        direction === 1
            ? "is-moving-next"
            : "is-moving-prev";


    const arrivingCover =
        direction === 1
            ? nextCover
            : prevCover;


    coverStage.classList.add(animationClass);


    function finishAnimation(event) {

        // Ждём именно пока закончится движение,
        // а не какое-то заранее установленное время

        if (
            event.target !== arrivingCover ||
            event.propertyName !== "transform"
        ) {
            return;
        }


        arrivingCover.removeEventListener(
            "transitionend",
            finishAnimation
        );


        if (total === 2) {

            currentMusicIndex += direction;

        } else {

            currentMusicIndex = wrapIndex(
                currentMusicIndex + direction,
                total
            );

        }


        // Переставляем картинки мгновенно,
        // пока transition временно отключён

        coverStage.classList.add("no-transition");

        coverStage.classList.remove(
            "is-moving-next",
            "is-moving-prev"
        );

        renderMusicCarousel();


        // заставляем браузер применить новое состояние

        void coverStage.offsetWidth;


        requestAnimationFrame(() => {

            coverStage.classList.remove("no-transition");

            isMusicAnimating = false;

        });
    }


    arrivingCover.addEventListener(
        "transitionend",
        finishAnimation
    );
}

function applyMusicFilter(year) {
    currentMusicFilter = year;

    if (year === "all") {
        filteredMusicReleases = [...musicReleases];
    } else {
        filteredMusicReleases = musicReleases.filter((release) => release.year === year);
    }

    currentMusicIndex = 0;

    filterButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.year === year);
    });

    renderMusicCarousel();
}

prevArrow.addEventListener("click", () => {
    changeRelease(-1);
});

nextArrow.addEventListener("click", () => {
    changeRelease(1);
});

// ======================
// MUSIC MOBILE SWIPE
// ======================

let musicTouchStartX = 0;
let musicTouchStartY = 0;

coverStage.addEventListener(
    "touchstart",
    (event) => {

        const touch = event.changedTouches[0];

        musicTouchStartX = touch.clientX;
        musicTouchStartY = touch.clientY;

    },
    { passive: true }
);


coverStage.addEventListener(
    "touchend",
    (event) => {

        const touch = event.changedTouches[0];

        const deltaX =
            touch.clientX - musicTouchStartX;

        const deltaY =
            touch.clientY - musicTouchStartY;


        // Игнорируем слишком короткое движение
        if (Math.abs(deltaX) < 45) {
            return;
        }


        // Это должен быть именно горизонтальный свайп
        if (Math.abs(deltaX) <= Math.abs(deltaY)) {
            return;
        }


        // Палец ушёл влево → следующая обложка
        if (deltaX < 0) {
            changeRelease(1);
        }

        // Палец ушёл вправо → предыдущая обложка
        else {
            changeRelease(-1);
        }

    },
    { passive: true }
);


filterButtons.forEach((button) => {
    button.addEventListener("click", () => {

        playSound(hoverSound);

        applyMusicFilter(button.dataset.year);
    });
});




function toggleMoreSection(section, hasContent) {
    section.style.display =
        hasContent
            ? "block"
            : "none";
}


function openMoreWindow() {

    const current =
        getCurrentRelease();


    moreCover.src =
        current.image;

    moreCover.alt =
        current.title;


    moreTitle.textContent =
        `${current.title} (${current.year})`;


    /* CREDITS */

    const hasCredits =
        Boolean(current.credits);

    toggleMoreSection(
        moreCreditsSection,
        hasCredits
    );

    moreCredits.textContent =
        current.credits || "";


    /* STORY */

    const hasStory =
        Boolean(current.story);

    toggleMoreSection(
        moreStorySection,
        hasStory
    );

    moreStory.textContent =
        current.story || "";


    /* TRACKLIST + EP LYRICS */

const tracks =
    current.tracks || [];


/* TRACKLIST */

moreTracklist.innerHTML = "";

const hasTracklist =
    tracks.length > 0;

toggleMoreSection(
    moreTracklistSection,
    hasTracklist
);


tracks.forEach((track) => {

    const item =
        document.createElement("li");

    item.textContent =
        track.title;

    moreTracklist.appendChild(item);

});


/* INDIVIDUAL TRACK LYRICS */

moreTrackLyrics.innerHTML = "";

const tracksWithLyrics =
    tracks.filter(
        (track) =>
            track.lyrics &&
            track.lyrics.trim() !== ""
    );


toggleMoreSection(
    moreTrackLyricsSection,
    tracksWithLyrics.length > 0
);


tracksWithLyrics.forEach((track) => {

    const details =
        document.createElement("details");

    details.className =
        "track-lyrics-item";


    const summary =
        document.createElement("summary");

    summary.textContent =
        `Lyrics for ${track.title}`;


    const lyrics =
        document.createElement("p");

    lyrics.className =
        "track-lyrics-text";

    lyrics.textContent =
        track.lyrics;


    details.appendChild(summary);
    details.appendChild(lyrics);


    /* only one lyric block open at once */

    details.addEventListener(
        "toggle",
        () => {

            if (!details.open) return;

            moreTrackLyrics
                .querySelectorAll("details")
                .forEach((otherDetails) => {

                    if (otherDetails !== details) {
                        otherDetails.open = false;
                    }

                });

        }
    );


    moreTrackLyrics.appendChild(details);

});
    
    
        /* SINGLE LYRICS */

const hasSingleLyrics =
    Boolean(current.lyrics) &&
    tracks.length === 0;

toggleMoreSection(
    moreLyricsSection,
    hasSingleLyrics
);

moreLyrics.textContent =
    current.lyrics || "";


    /* RELEASE DATE */

    const hasReleaseDate =
        Boolean(current.releaseDate);

    toggleMoreSection(
        moreReleaseDateSection,
        hasReleaseDate
    );

    moreReleaseDate.textContent =
        current.releaseDate || "";


    /* RELATED MATERIAL */

    moreRelated.innerHTML = "";

    const relatedMaterial =
        current.relatedMaterial || [];

    toggleMoreSection(
        moreRelatedSection,
        relatedMaterial.length > 0
    );


    relatedMaterial.forEach((item) => {

        if (item.url) {

            const link =
                document.createElement("a");

            link.href =
                item.url;

            link.target =
                "_blank";

            link.rel =
                "noopener noreferrer";

            link.textContent =
                item.label;

            moreRelated.appendChild(link);

        }

        else {

            const text =
                document.createElement("span");

            text.className =
                "related-no-link";

            text.textContent =
                item.label;

            moreRelated.appendChild(text);

        }

    });


    /* Always begin at the top */

    moreDetails.scrollTop = 0;
    moreWindow.scrollTop = 0;


    moreOverlay.classList.add("open");

    musicScreen.classList.add("more-open");

    moreOverlay.setAttribute(
        "aria-hidden",
        "false"
    );
}


function closeMoreWindow() {

    moreOverlay.classList.remove("open");

    musicScreen.classList.remove("more-open");

    moreOverlay.setAttribute(
        "aria-hidden",
        "true"
    );
}


moreButton.addEventListener(
    "click",
    openMoreWindow
);


moreClose.addEventListener(
    "click",
    closeMoreWindow
);


moreOverlay.addEventListener(
    "pointerdown",
    (event) => {

        if (event.target === moreOverlay) {
            closeMoreWindow();
        }

    }
);






// ======================
// LISTEN WINDOW
// ======================

const platformData = {
    spotify: {
        label: "Spotify",
        icon: "images/spotify.png"
    },

    youtube: {
        label: "YouTube",
        icon: "images/youtube.png"
    },

    applemusic: {
        label: "Apple Music",
        icon: "images/applemusic.png"
    },

    bandcamp: {
        label: "Bandcamp",
        icon: "images/bandcamp.png"
    },

    soundcloud: {
        label: "SoundCloud",
        icon: "images/soundcloud.png"
    }
};


const unofficialReleaseIds = [
    "allegory",
    "flicker",
    "whereigo",
    "kindlingsun"
];


function getPlatformsForRelease(release) {

    if (unofficialReleaseIds.includes(release.id)) {

        return [
            "youtube",
            "soundcloud"
        ];

    }

    return [
        "spotify",
        "youtube",
        "applemusic",
        "bandcamp"
    ];
}



function openListenWindow() {

    const current =
        getCurrentRelease();


    /* SONG / EP TITLE */

    if (
        current.displayType &&
        current.displayType.toLowerCase() === "ep"
    ) {

        listenTitle.textContent =
            "Listen to this EP on:";

    } else {

        listenTitle.textContent =
            "Listen to this song on:";

    }


    /* CLEAN OLD BUTTONS */

    listenPlatforms.innerHTML = "";


    /* WHICH PLATFORMS TO SHOW */

    const platforms =
        getPlatformsForRelease(current);


    const links =
        current.listenLinks || {};


    platforms.forEach((platformKey) => {

        const platform =
            platformData[platformKey];


        const button =
            document.createElement("a");


        button.className =
            "listen-platform-button";


        const url =
            links[platformKey] || "";


        if (url) {

            button.href = url;

            button.target = "_blank";

            button.rel =
                "noopener noreferrer";

        } else {

            button.classList.add(
                "is-disabled"
            );

            button.addEventListener(
                "click",
                (event) => {
                    event.preventDefault();
                }
            );

        }


        const icon =
            document.createElement("img");

        icon.src =
            platform.icon;

        icon.alt =
            "";


        const label =
            document.createElement("span");

        label.textContent =
            platform.label;


        button.appendChild(icon);
        button.appendChild(label);

        listenPlatforms.appendChild(button);

    });


    listenOverlay.classList.add("open");

    musicScreen.classList.add("listen-open");

    listenOverlay.setAttribute(
        "aria-hidden",
        "false"
    );
}



function closeListenWindow() {

    listenOverlay.classList.remove("open");

    musicScreen.classList.remove("listen-open");

    listenOverlay.setAttribute(
        "aria-hidden",
        "true"
    );
}


listenButton.addEventListener(
    "click",
    openListenWindow
);


listenClose.addEventListener(
    "click",
    closeListenWindow
);


listenOverlay.addEventListener(
    "pointerdown",
    (event) => {

        if (event.target === listenOverlay) {
            closeListenWindow();
        }

    }
);



// ======================
// PHOTOS
// ======================

const allPhotos = [
    "bird.jpg",
    "branches.jpg",
    "brokentree.jpg",
    "budka.jpg",
    "convers.jpg",
    "darktrees.jpg",
    "electro.jpg",
    "forest.jpg",
    "forest2.jpg",
    "housenew.jpg",
    "house2.jpg",
    "koragich.jpg",
    "kreslo.jpg",
    "lake.jpg",
    "lilfrog.jpg",
    "miniriver.jpg",
    "nighttime.jpg",
    "oldhouse.jpg",
    "pine.jpg",
    "scarypine.jpg",
    "sky1.jpg",
    "sky2.jpg",
    "sky3.jpg",
    "sun.jpg",
    "sunlake.jpg",
    "treesnsky.jpg",
    "weirdtree.jpg",
    "wowzakat1.jpg",
    "wowzakat2.jpg",
    "zakatbirch.jpg"
];


const photosTabs =
    document.querySelectorAll(".photos-tab");

const photosCollections =
    document.querySelector(".photos-collections");

const photosAllGrid =
    document.querySelector(".photos-all-grid");

const photoCollectionButtons =
    document.querySelectorAll(".photo-collection");

const photosCollectionView =
    document.querySelector(".photos-collection-view");

const photosCollectionTitle =
    document.querySelector(".photos-collection-title");

const photosCollectionBack =
    document.querySelector(".photos-collection-back");

const photosCollectionGrid =
    document.querySelector(".photos-collection-grid");


const photoViewer =
    document.querySelector(".photo-viewer");

const photoViewerImage =
    document.querySelector(".photo-viewer-image");

const photoViewerClose =
    document.querySelector(".photo-viewer-close");

const photoViewerPrev =
    document.querySelector(".photo-viewer-prev");

const photoViewerNext =
    document.querySelector(".photo-viewer-next");

const photoViewerCounter =
    document.querySelector(".photo-viewer-counter");





function createPhotoButton(fileName, photoList) {

    const button =
        document.createElement("button");

    button.className =
        "all-photo-item";


    const image =
        document.createElement("img");

    image.loading = "lazy";
    image.alt = "";
    image.src = `images/photos/${fileName}`;


    button.appendChild(image);

    button.addEventListener("mouseenter", () => {
        playSound(popSound);
    });

    button.addEventListener("click", () => {

        const index =
            photoList.indexOf(fileName);

        openPhotoViewer(
            photoList,
            index
        );

    });


    return button;
}



function buildAllPhotos() {

    photosAllGrid.innerHTML = "";


    allPhotos.forEach((fileName) => {

        const button =
            createPhotoButton(
                fileName,
                allPhotos
            );

        photosAllGrid.appendChild(button);

    });

}


buildAllPhotos();


let currentPhotoCollection = null;


function openPhotoCollection(collectionKey) {

    const collection =
        photoCollections[collectionKey];

    if (!collection) return;


    currentPhotoCollection =
        collectionKey;


    photosCollections.style.display =
        "none";

    photosAllGrid.style.display =
        "none";


    photosTabs.forEach((tab) => {

        tab.classList.remove("active");

    });


    photosCollectionTitle.textContent =
        collection.title;


    photosCollectionGrid.innerHTML = "";


    collection.photos.forEach((fileName) => {

        const button =
            createPhotoButton(
                fileName,
                collection.photos
            );

        photosCollectionGrid.appendChild(button);

    });


    photosCollectionGrid.scrollTop = 0;

    photosCollectionView.style.display =
        "block";
}


photoCollectionButtons.forEach((button) => {

    const image = button.querySelector("img");

    image.addEventListener("mouseenter", () => {
        playSound(popSound);
    });

    button.addEventListener("click", () => {

        openPhotoCollection(
            button.dataset.collection
        );

    });

});

photosCollectionBack.addEventListener("click", () => {
    closePhotoCollection();
});


function closePhotoCollection() {

    currentPhotoCollection = null;

    photosCollectionView.style.display =
        "none";

    switchPhotosView("collections");
}


function switchPhotosView(view) {

    currentPhotoCollection = null;

    photosCollectionView.style.display =
        "none";

    photosTabs.forEach((tab) => {

        tab.classList.toggle(
            "active",
            tab.dataset.view === view
        );

    });


    if (view === "all") {

        photosCollections.style.display =
            "none";

        photosAllGrid.style.display =
            "block";

        photosAllGrid.scrollTop = 0;

    }

    else {

        photosAllGrid.style.display =
            "none";

        photosCollections.style.display =
            "";

    }

}


photosTabs.forEach((tab) => {

    tab.addEventListener("click", () => {

        playSound(hoverSound);

        switchPhotosView(
            tab.dataset.view
        );

    });

});





const photoCollections = {

    woods: {
        title: "Woods",

        photos: [
            "branches.jpg",
            "brokentree.jpg",
            "darktrees.jpg",
            "forest.jpg",
            "forest2.jpg",
            "lilfrog.jpg",
            "miniriver.jpg",
            "pine.jpg",
            "scarypine.jpg",
            "weirdtree.jpg"
        ]
    },


    evenings: {
        title: "Evenings",

        photos: [
            "bird.jpg",
            "koragich.jpg",
            "lake.jpg",
            "nighttime.jpg",
            "sun.jpg",
            "sunlake.jpg",
            "wowzakat1.jpg",
            "wowzakat2.jpg",
            "zakatbirch.jpg"
        ]
    },


    sky: {
        title: "Sky",

        photos: [
            "sky1.jpg",
            "sky2.jpg",
            "sky3.jpg",
            "treesnsky.jpg",
            "electro.jpg"
        ]
    },


    "human-traces": {
        title: "Human Traces",

        photos: [
            "budka.jpg",
            "convers.jpg",
            "electro.jpg",
            "housenew.jpg",
            "house2.jpg",
            "kreslo.jpg",
            "oldhouse.jpg"
        ]
    }

};



let viewerPhotos = [];
let viewerPhotoIndex = 0;


function openPhotoViewer(photoList, index) {

    viewerPhotos =
        photoList;

    viewerPhotoIndex =
        index;

    renderPhotoViewer();

    photoViewer.classList.add("open");

    photosScreen.classList.add("viewer-open");

    photoViewer.setAttribute(
        "aria-hidden",
        "false"
    );
}


function renderPhotoViewer() {

    if (viewerPhotos.length === 0) return;


    const fileName =
        viewerPhotos[viewerPhotoIndex];


    photoViewerImage.src =
        `images/photos/${fileName}`;


    photoViewerCounter.textContent =
        `${viewerPhotoIndex + 1} / ${viewerPhotos.length}`;


    /* preload neighbours */

    const previousIndex =
        (
            viewerPhotoIndex - 1 +
            viewerPhotos.length
        ) % viewerPhotos.length;

    const nextIndex =
        (
            viewerPhotoIndex + 1
        ) % viewerPhotos.length;


    [
        viewerPhotos[previousIndex],
        viewerPhotos[nextIndex]
    ].forEach((file) => {

        const preload =
            new Image();

        preload.src =
            `images/photos/${file}`;

    });
}


function closePhotoViewer() {

    photoViewer.classList.remove("open");

    photosScreen.classList.remove("viewer-open");

    photoViewer.setAttribute(
        "aria-hidden",
        "true"
    );
}


function changeViewerPhoto(direction) {

    viewerPhotoIndex =
        (
            viewerPhotoIndex +
            direction +
            viewerPhotos.length
        ) % viewerPhotos.length;

    renderPhotoViewer();
}


photoViewerPrev.addEventListener(
    "click",
    () => {
        changeViewerPhoto(-1);
    }
);


photoViewerNext.addEventListener(
    "click",
    () => {
        changeViewerPhoto(1);
    }
);

// ======================
// PHOTO VIEWER - TOUCH SWIPE
// ======================

let photoSwipeStartX = 0;
let photoSwipeStartY = 0;


photoViewerImage.addEventListener(
    "pointerdown",
    (event) => {

        // Ignore mouse on desktop
        if (event.pointerType === "mouse") {
            return;
        }

        photoSwipeStartX = event.clientX;
        photoSwipeStartY = event.clientY;
    }
);


photoViewerImage.addEventListener(
    "pointerup",
    (event) => {

        // Ignore mouse on desktop
        if (event.pointerType === "mouse") {
            return;
        }

        const deltaX =
            event.clientX - photoSwipeStartX;

        const deltaY =
            event.clientY - photoSwipeStartY;


        // It must be a real horizontal swipe,
        // not an accidental tap or vertical movement
        if (
            Math.abs(deltaX) < 50 ||
            Math.abs(deltaX) < Math.abs(deltaY)
        ) {
            return;
        }


        // Swipe left = next photo
        if (deltaX < 0) {

            changeViewerPhoto(1);

        }

        // Swipe right = previous photo
        else {

            changeViewerPhoto(-1);

        }

    }
);



photoViewerClose.addEventListener(
    "click",
    closePhotoViewer
);


photoViewer.addEventListener(
    "click",
    (event) => {

        if (event.target === photoViewer) {

            event.preventDefault();
            event.stopPropagation();

            closePhotoViewer();
        }

    }
);



// ======================
// ARCHIVE
// ======================

const archiveItems = [

    {
        id: "A-001",

        type: "visual",

        title: "Unused Hauler Cover",

        year: "2026",

        file: "images/archive/haulerme.jpg",

        description:
            "An unused cover design for the song Hauler."
    },


    {
        id: "A-002",

        type: "visual",

        title:
            "Early Cover Concept for allegory for those who can't stand out",

        year: "2025",

        file:
            "images/archive/allegoryunusedcover.jpg",

        description:
            "The first cover concept and an unused design for allegory for those who can't stand out."
    },


    {
        id: "A-003",

        type: "audio",

        title: "Keepsake - Fragment",

        year: "2026",

        file:
            "images/archive/keepsakemoment.mp3",

        description:
            "A fragment of Keepsake with instrumental and delayed vocals."
    },


    {
        id: "A-004",

        type: "audio",

        title: "Hauler - Instrumental",

        year: "2025",

        file:
            "images/archive/haulerinstrumental.mp3",

        description:
            "An instrumental recording of Hauler without drums."
    },


    {
        id: "A-005",

        type: "audio",

        title: "That Time - Slowed",

        year: "2025",

        file:
            "images/archive/thattimeslowed.mp3",

        description:
            "A slowed and slightly pitched-down version of That Time."
    },


    {
        id: "A-006",

        type: "writing",

        title: "Long-lived Being",

        year: "2026",

        description:
            "An unreleased song originally planned as part of a two-track EP titled Valmara, alongside Keepsake. Only Keepsake was ultimately released. The project was dedicated to my beloved grandmother.",

        text: `[Chorus]

Where is my home?
Where should I go?
I don't know nothing.
I don't know nothing.

I can't feel,
I can't hear,
something's wrong,
something's wrong.

My heart made this,
all these places.
I think I'm trying,
at least I'm trying.

So, should I stay?
Should I pray?
What do I know?
Just what do I know?


[Verse 1]

Water runs,
seasons change,
and I’m still here.

Taking time,
it’s all I wanted,
but it moves so fast.

At least for an hour,
you always came back.
I took it for granted,
Now it's gone.

And now I'm searching,
For what you gave me.
My blue eyes are
Wide open.


[Bridge]

Great sea ships,
Unfold their graceful sails.
Heading out,
Into the vast unknown.`
    },

    {
    id: "A-007",

    type: "writing",

    title: "Untitled Lyrics Draft",

    year: "2023",

    description:
        "An early unused lyrics draft from 2023. The song was never completed and never received a title.",

    text: `I wish I couldn't feel fear,
I wish that I could speak,
Instead of being a freak.

Time is a gift to me,
I'll show 'em what it could be
...

I wish I could be real
...

I wish I could run away,
Away from this hell,
With you and my old friend.
We had to stay till the end.`
    },


    {
    id: "A-008",

    type: "audio",

    title: "Ghost - Unused Piano & Parts",

    year: "2024",

    file:
        "images/archive/ghostpiano.mp3",

    description:
        "Unused piano and additional musical parts recorded during the creation of Ghost."
    },


    {
    id: "A-009",

    type: "audio",

    title: "Where I Go - Early Version",

    year: "2024",

    file:
        "images/archive/oisinsoceanwhereigo.mp3",

    description:
        "The earliest recorded version of Where I Go."
    },

    {
        id: "A-010",

        type: "visual",

        title:
            "Everything Feels Awful If... - Poster Set",

        year: "2026",

        files: [
            "images/archive/bunnyposter.jpg",
            "images/archive/houseposter.jpg",
            "images/archive/treesposter.jpg"
        ],

        description:
            "Three posters made for the release of the five-track EP Everything Feels Awful If You Look at It Too Long. Versions with QR codes were printed and put up around the city."
    }
    


];



const archiveList =
    document.querySelector(".archive-list");

const archiveFilters =
    document.querySelectorAll(".archive-filter");

const archiveOverlay =
    document.querySelector(".archive-item-overlay");

const archiveItemClose =
    document.querySelector(".archive-item-close");

const archiveItemCode =
    document.querySelector(".archive-item-code");

const archiveItemType =
    document.querySelector(".archive-item-type");

const archiveItemYear =
    document.querySelector(".archive-item-year");

const archiveItemTitle =
    document.querySelector(".archive-item-title");

const archiveItemDescription =
    document.querySelector(".archive-item-description");

const archiveItemContent =
    document.querySelector(".archive-item-content");


let currentArchiveFilter = "all";

let activeArchiveAudio = null;


function renderArchive() {

    archiveList.innerHTML = "";


    const items =
        currentArchiveFilter === "all"
            ? archiveItems
            : archiveItems.filter(
                (item) =>
                    item.type === currentArchiveFilter
            );


    items.forEach((item) => {

        const row =
            document.createElement("button");

        row.className =
            "archive-row";


        row.innerHTML = `
            <span class="archive-code">
                ${item.id}
            </span>

            <span class="archive-type">
                [${item.type.toUpperCase()}]
            </span>

            <span class="archive-name">
                ${item.title}
            </span>

            <span class="archive-year">
                ${item.year}
            </span>
        `;


        row.addEventListener(
            "click",
            () => {
                openArchiveItem(item);
            }
        );

        row.addEventListener(
            "mouseenter",
            () => {
                playSound(popSound);
            }
        );

        archiveList.appendChild(row);

    });

}



function formatArchiveTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }


    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        Math.floor(seconds % 60)
            .toString()
            .padStart(2, "0");


    return `${minutes}:${remainingSeconds}`;
}




function openArchiveItem(item) {

    if (activeArchiveAudio) {

        activeArchiveAudio.pause();

        activeArchiveAudio = null;

    }


    archiveItemCode.textContent =
        item.id;

    archiveItemType.textContent =
        `[${item.type.toUpperCase()}]`;

    archiveItemYear.textContent =
        item.year;

    archiveItemTitle.textContent =
        item.title;

    archiveItemDescription.textContent =
        item.description || "";

    archiveItemContent.innerHTML = "";


    /* VISUAL */

    /* VISUAL */

if (item.type === "visual") {

    if (item.files && item.files.length > 0) {

        const visualSet =
            document.createElement("div");

        visualSet.className =
            "archive-visual-set";


        item.files.forEach((file) => {

            const image =
                document.createElement("img");

            image.className =
                "archive-visual archive-visual-set-image";

            image.src =
                file;

            image.alt =
                item.title;

            visualSet.appendChild(image);

        });


        archiveItemContent.appendChild(
            visualSet
        );

    } else {

        const image =
            document.createElement("img");

        image.className =
            "archive-visual";

        image.src =
            item.file;

        image.alt =
            item.title;

        archiveItemContent.appendChild(
            image
        );

    }

}


    /* WRITING */

    else if (item.type === "writing") {

        const writing =
            document.createElement("p");

        writing.className =
            "archive-writing";

        writing.textContent =
            item.text;

        archiveItemContent.appendChild(
            writing
        );

    }


    /* AUDIO */

    else if (item.type === "audio") {

        const audio =
            new Audio(item.file);

        audio.preload =
            "metadata";

        activeArchiveAudio =
            audio;


        const player =
            document.createElement("div");

        player.className =
            "archive-audio-player";


        const play =
            document.createElement("button");

        play.className =
            "archive-audio-play";

        play.type =
            "button";

        play.textContent =
            "▶";


        const progress =
            document.createElement("input");

        progress.className =
            "archive-audio-progress";

        progress.type =
            "range";

        progress.min =
            "0";

        progress.max =
            "100";

        progress.value =
            "0";


        const time =
            document.createElement("span");

        time.className =
            "archive-audio-time";

        time.textContent =
            "0:00 / 0:00";


        play.addEventListener(
            "click",
            () => {

                if (audio.paused) {

                    audio.play();

                    play.textContent =
                        "❚❚";

                } else {

                    audio.pause();

                    play.textContent =
                        "▶";

                }

            }
        );


        audio.addEventListener(
            "loadedmetadata",
            () => {

                time.textContent =
                    `0:00 / ${formatArchiveTime(audio.duration)}`;

            }
        );


        audio.addEventListener(
            "timeupdate",
            () => {

                if (audio.duration) {

                    progress.value =
                        (
                            audio.currentTime /
                            audio.duration
                        ) * 100;

                }


                time.textContent =
                    `${formatArchiveTime(audio.currentTime)} / ${formatArchiveTime(audio.duration)}`;

            }
        );


        progress.addEventListener(
            "input",
            () => {

                if (!audio.duration) return;

                audio.currentTime =
                    (
                        progress.value / 100
                    ) * audio.duration;

            }
        );


        audio.addEventListener(
            "ended",
            () => {

                play.textContent =
                    "▶";

            }
        );


        player.appendChild(play);
        player.appendChild(progress);
        player.appendChild(time);

        archiveItemContent.appendChild(
            player
        );

    }


    archiveOverlay.classList.add(
        "open"
    );

    archiveScreen.classList.add("archive-item-open");

    archiveOverlay.setAttribute(
        "aria-hidden",
        "false"
    );
}




function closeArchiveItem() {

    if (activeArchiveAudio) {

        activeArchiveAudio.pause();

        activeArchiveAudio = null;

    }


    archiveOverlay.classList.remove(
        "open"
    );

    archiveScreen.classList.remove("archive-item-open");

    archiveOverlay.setAttribute(
        "aria-hidden",
        "true"
    );
}


archiveItemClose.addEventListener(
    "click",
    closeArchiveItem
);


archiveOverlay.addEventListener(
    "click",
    (event) => {

        if (event.target === archiveOverlay) {

            event.preventDefault();
            event.stopPropagation();

            closeArchiveItem();
        }

    }
);



archiveFilters.forEach((button) => {

    button.addEventListener("click", () => {

        playSound(hoverSound);

        currentArchiveFilter =
            button.dataset.type;


        archiveFilters.forEach(
            (otherButton) => {

                otherButton.classList.toggle(
                    "active",
                    otherButton === button
                );

            }
        );


        renderArchive();

    });

});


renderArchive();



// ======================
// SUPPORT / KO-FI
// ======================

const supportOpen =
    document.querySelector("#support-open");

supportOpen.addEventListener("mouseenter", () => {
    playSound(popSound);
});

const supportOverlay =
    document.querySelector(".support-overlay");

const supportClose =
    document.querySelector(".support-close");


function openSupportWindow() {

    supportOverlay.classList.add("open");

    supportOverlay.setAttribute(
        "aria-hidden",
        "false"
    );
}


function closeSupportWindow() {

    supportOverlay.classList.remove("open");

    supportOverlay.setAttribute(
        "aria-hidden",
        "true"
    );
}


supportOpen.addEventListener(
    "click",
    openSupportWindow
);


supportClose.addEventListener(
    "click",
    closeSupportWindow
);


/* Click on dark background */

supportOverlay.addEventListener(
    "pointerdown",
    (event) => {

        if (event.target === supportOverlay) {

            closeSupportWindow();

        }

    }
);