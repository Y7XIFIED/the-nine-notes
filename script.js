import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(Flip, SplitText);

const setupTextSplitting = () => {
  const textElements = document.querySelectorAll("h1, h2, p, a");
  textElements.forEach((element) => {
    SplitText.create(element, {
      type: "lines",
      linesClass: "line",
    });

    const lines = element.querySelectorAll(".line");
    lines.forEach((line) => {
      const textContent = line.textContent;
      line.innerHTML = `<span>${textContent}</span>`;
    });
  });
};

const createCounterDigits = () => {
  const counter1 = document.querySelector(".counter-1");
  const num0 = document.createElement("div");
  num0.className = "num";
  num0.textContent = "0";
  counter1.appendChild(num0);

  const num1 = document.createElement("div");
  num1.className = "num num1offset1";
  num1.textContent = "1";
  counter1.appendChild(num1);

  const counter2 = document.querySelector(".counter-2");
  for (let i = 0; i <= 10; i++) {
    const numDiv = document.createElement("div");
    numDiv.className = i === 1 ? "num num1offset2" : "num";
    numDiv.textContent = i === 10 ? "0" : i;
    counter2.appendChild(numDiv);
  }

  const counter3 = document.querySelector(".counter-3");
  for (let i = 0; i < 30; i++) {
    const numDiv = document.createElement("div");
    numDiv.className = "num";
    numDiv.textContent = i % 10;
    counter3.appendChild(numDiv);
  }
  const finalNum = document.createElement("div");
  finalNum.className = "num";
  finalNum.textContent = "0";
  counter3.appendChild(finalNum);
};

const animateCounter = (counter, duration, delay = 0) => {
  const numHeight = counter.querySelector(".num").clientHeight;
  const totalDistance =
    (counter.querySelectorAll(".num").length - 1) * numHeight;
  gsap.to(counter, {
    y: -totalDistance,
    duration: duration,
    delay: delay,
    ease: "power2.inOut",
  });
};

function animateImages() {
  const images = document.querySelectorAll(".img");

  images.forEach((img) => {
    img.classList.remove("animate-out");
  });

  const state = Flip.getState(images);

  images.forEach((img) => img.classList.add("animate-out"));

  const mainTimeline = gsap.timeline();

  mainTimeline.add(
    Flip.from(state, {
      duration: 1,
      stagger: 0.1,
      ease: "power3.inOut",
    })
  );

  images.forEach((img, index) => {
    const scaleTimeline = gsap.timeline();

    scaleTimeline
      .to(
        img,
        {
          scale: 2.5,
          duration: 0.45,
          ease: "power3.in",
        },
        0.025
      )
      .to(
        img,
        {
          scale: 1,
          duration: 0.45,
          ease: "power3.out",
        },
        0.5
      );

    mainTimeline.add(scaleTimeline, index * 0.1);
  });

  return mainTimeline;
}

document.addEventListener("DOMContentLoaded", () => {
  setupTextSplitting();
  createCounterDigits();

  animateCounter(document.querySelector(".counter-3"), 2.5);
  animateCounter(document.querySelector(".counter-2"), 3);
  animateCounter(document.querySelector(".counter-1"), 2, 1.5);

  const tl = gsap.timeline();
  gsap.set(".img", { scale: 0 });

  tl.to(".hero-bg", {
    scaleY: "100%",
    duration: 3,
    ease: "power2.inOut",
    delay: 0.25,
  });

  tl.to(
    ".img",
    {
      scale: 1,
      duration: 1,
      stagger: 0.125,
      ease: "power3.out",
    },
    "<"
  );

  tl.to(".counter", {
    opacity: 0,
    duration: 0.3,
    ease: "power3.out",
    delay: 0.3,
    onStart: () => {
      animateImages();
    },
  });

  tl.to(".sidebar .divider", {
    scaleY: "100%",
    duration: 1,
    ease: "power3.inOut",
    delay: 1.25,
  });

  tl.to(
    ["nav .divider"],
    {
      scaleX: "100%",
      duration: 1,
      stagger: 0.5,
      ease: "power3.inOut",
    },
    "<"
  );

  tl.to(
    ".logo",
    {
      scale: 1,
      duration: 1,
      ease: "power4.inOut",
    },
    "<"
  );

  tl.to(
    [".logo-name a span", ".nav-right a span"],
    {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      delay: 0.5,
    },
    "<"
  );

  tl.to(
    [".header span", ".signature span"],
    {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
    },
    "<"
  );

  const singersData = [
    {
      name: "Ariana Grande",
      desc: "Dangerous Woman",
      img: "/assets/ariana grande.jpg"
    },
    {
      name: "Don Toliver",
      desc: "Cactus Jack's Secret Weapon",
      img: "/assets/Don Toliver.jpg"
    },
    {
      name: "Drake",
      desc: "6 God",
      img: "/assets/Drake.jpg"
    },
    {
      name: "Lana Del Rey",
      desc: "Queen of Alt-Pop",
      img: "/assets/Lana Del Rey.jpg"
    },
    {
      name: "Sabrina Carpenter",
      desc: "Pop's Newest Princess",
      img: "/assets/Sabrina Carpenter.jpg"
    },
    {
      name: "Travis Scott",
      desc: "La Flame",
      img: "/assets/Travis Scott.jpg"
    },
    {
      name: "The Weeknd",
      desc: "Starboy",
      img: "/assets/Weeknd.jpg"
    },
    {
      name: "Kendrick Lamar",
      desc: "King Kendrick",
      img: "/assets/kendrick lamar.jpg"
    },
    {
      name: "Playboi Carti",
      desc: "King Vamp",
      img: "/assets/playboy carti.jpg"
    }
  ];

  let currentIndex = 0;
  let isAnimating = true;

  tl.to(".images-container", {
    opacity: 0,
    duration: 1,
    ease: "power2.inOut",
  }, "+=0.2");

  tl.to(".active-singer-poster", {
    opacity: 1,
    duration: 1,
    ease: "power2.inOut",
  }, "<");

  tl.to(
    ".site-info .divider",
    {
      scaleX: "100%",
      duration: 1,
      ease: "power3.inOut",
    },
    "+=0.2"
  );

  tl.to(
    ".site-info span",
    {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      onComplete: () => {
        isAnimating = false;
      }
    },
    "<0.2"
  );

  let wheelTimeout;
  window.addEventListener("wheel", (e) => {
    if (isAnimating) return;
    
    // basic debounce
    if (wheelTimeout) clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
      const direction = e.deltaY > 0 ? 1 : -1;
      
      let nextIndex = currentIndex + direction;
      // Do not loop: stop at the boundaries
      if (nextIndex >= singersData.length) {
        isAnimating = false;
        return;
      }
      if (nextIndex < 0) {
        isAnimating = false;
        return;
      }

      isAnimating = true;

      const transitionTl = gsap.timeline();
      
      transitionTl.to([".active-singer-poster", "#active-name", "#active-desc"], {
        opacity: 0,
        y: -20,
        duration: 0.6,
        ease: "power2.inOut",
        onComplete: () => {
          document.getElementById("active-image").src = singersData[nextIndex].img;
          document.getElementById("active-name").innerHTML = singersData[nextIndex].name;
          document.getElementById("active-desc").innerHTML = `<p>${singersData[nextIndex].desc}</p>`;
          gsap.set([".active-singer-poster", "#active-name", "#active-desc"], { y: 20 });
        }
      });

      transitionTl.to([".active-singer-poster", "#active-name", "#active-desc"], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        onComplete: () => {
          currentIndex = nextIndex;
          isAnimating = false;
        }
      });

    }, 50);
  });
});
