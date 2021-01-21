const loadScript = url => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.onload = resolve;
    script.onabort = script.onerror = reject;
    script.src = url;
    document.body.appendChild(script);
});

const ids = ["home", "skills", "projects"];

/** @type {[string, string, string, boolean, boolean][]} */
const SkillSVGs = [
    // Path          BG Color   Name           Light  Web
    ["node-dot-js",  "#339933", "NodeJS",      true,  true],
    ["amazonaws",    "#232F3E", "AWS",         true,  true],
    ["cloudflare",   "#F38020", "Cloudflare",  true,  true],
    ["cplusplus",    "#00599C", "C/C++",       true,  false],
    ["mongodb",      "#47A248", "MongoDB",     true,  true],
    ["electron",     "#47848F", "Electron",    true,  false],
    ["express",      "#000000", "ExpressJS",   true,  true],
    ["firebase",     "#FFCA28", "Firebase",    false, true],
    ["html5",        "#E34F26", "HTML",        true,  true],
    ["java",         "#007396", "Java",        true,  false],
    ["opengl",       "#5586A4", "OpenGL",      true,  false],
    ["react",        "#61DAFB", "React",       false, true],
    ["nginx",        "#269539", "NGINX",       true,  true],
    ["sqlite",       "#003B57", "SQLite",      true,  true],
    ["unity",        "#000000", "Unity",       true,  false],
    ["webassembly",  "#654FF0", "WebAssembly", true,  true],
    ["webgl",        "#990000", "WebGL",       true,  true],
    ["ffmpeg",       "#FFFFFF", "FFMPEG",      true,  false],
    ["python",       "#3776AB", "Python",      true,  false],
    ["tensorflow",   "#FF6F00", "TensorFlow",  true,  false]
]

document.body.onload = () => setTimeout(async () => {
    
    const elements = ids.map(id => document.getElementById(id));

    const onscroll = () => elements.forEach(e => 
        e.parentElement.style.pointerEvents = e.style.opacity > 0 ? "" : "none");

    window.addEventListener("scroll", onscroll);
    onscroll();

    const webList = document.getElementById("web-skills");
    const swList = document.getElementById("software-skills")

    for (const [path, color, name, isLight, isWeb] of SkillSVGs) {
        const elem = document.createElement("div");
        elem.classList.add("skill-icon");
        elem.setAttribute("uk-tooltip", `title: ${name}; container: #${isWeb ? "web-skills" : "software-skills"}`);
        elem.style.backgroundColor = color;
        (async() => {
            const res = await fetch(`assets/icons/${path}.svg`);
            const svg = await res.text();
            elem.innerHTML = svg;
            elem.classList.add(isLight ? "light-icon" : "dark-icon");
        })();
        (isWeb ? webList : swList).appendChild(elem);
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("webgl");
    
    if (ctx) {

        console.log("Loading three.js");
        await loadScript("assets/three.min.js");

        console.log("Loading vanta.waves.js");
        await loadScript("assets/vanta.waves.min.js");

        VANTA.WAVES({
            el: document.getElementById("canvas"),
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x1b1226,
            shininess: 20.00,
            waveHeight: 33.00,
            waveSpeed: 0.25,
            zoom: 0.86
        });

        // console.log(rings);
    } else {
        console.log("WebGL not supported");
    }
}, 500);