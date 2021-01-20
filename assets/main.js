const loadScript = url => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.onload = resolve;
    script.onabort = script.onerror = reject;
    script.src = url;
    document.body.appendChild(script);
});

document.body.onload = () => setTimeout(async () => {
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