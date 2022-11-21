var canvas = document.getElementById("renderCanvas");
var meshlist = [];
var startRenderLoop = function (engine, canvas) {
    engine.runRenderLoop(function () {
        if (sceneToRender && sceneToRender.activeCamera) {
            sceneToRender.render();
        }
    });
}

var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false }); };
var createScene = function () {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

    /*
    var newsphere = createSphere(-2, 1, -2, 2);
    newsphere.material = hexMat('#ff0000');


    var newbox = createBox(2, 1, 2, 2, 2, 2);
    newbox.material = hexMat('#00a86b');
    */

    var shark = new meshModel('shark.glb', 0.5, x=0, y=0 ,z=10);

    var fish = new meshModel('fish.glb', 0.5);


    /*
    var anim1 = {subj: newsphere.position, prop: 'y', val: 5};
    var anim2 = {subj: newsphere.material, prop: 'alpha', val: 0};

    var anim3 = {subj: newbox.rotation, prop: 'z', val: Math.PI/2};
    var anim4 = {subj: newbox.material, prop: 'alpha', val: 0};
    */

    var anim5 = {subj: shark.position, prop: 'z', val: -10};
    var anim6 = {subj: shark.position, prop: 'y', val: Math.PI*1.4}

    var anim7 = {subj: fish.position, prop: 'y', val: -3};

    var anims = [anim5, anim6, anim7];

    animate(anims, scene, 2, true);


    // Our built-in 'ground' shape.
    //var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);

    return scene;
};
window.initFunction = async function () {
    var asyncEngineCreation = async function () {
        try {
            return createDefaultEngine();
        } catch (e) {
            console.log("the available createEngine function failed. Creating the default engine instead");
            return createDefaultEngine();
        }
    }

    window.engine = await asyncEngineCreation();
    if (!engine) throw 'engine should not be null.';
    startRenderLoop(engine, canvas);
    window.scene = createScene();
};
initFunction().then(() => {
    sceneToRender = scene
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();
});


