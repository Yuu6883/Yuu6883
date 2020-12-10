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
        await loadScript("assets/three.r95.min.js");
        console.log("Loading vanta.js");
        await loadScript("assets/vanta.net.min.js");

        VANTA.NET({
            el: document.body,
            mouseControls: true,
            touchControls: true,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 0.50,
            scaleMobile: 1.00,
            color: 0x7a478a,
            backgroundColor: 0x1e0626,
            points: 17.00,
            maxDistance: 16.00
        });
    } else {
        console.log("WebGL not supported");
    }
}, 500);