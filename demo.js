var canvas = document.getElementById("renderCanvas");
 var timer;
 var timerclick;
 var timervideo;
 var timerButton;

var greenMat, redMat;
var scene, vrHelper;
var planChargement;

var createScene = function () {

/*------ Initialisation Scène & Camera ------*/     
scene = new BABYLON.Scene(engine);
var camera = new BABYLON.ArcRotateCamera("Camera", -Math.PI / 2,  Math.PI / 2, 5, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, true);
camera.inputs.attached.mousewheel.detachControl(canvas);


/*---------Ajout de la VR-------------------*/     

 vrHelper = scene.createDefaultVRExperience();

vrHelper.displayGaze = true ;
vrHelper.displayLaserPointer = true;
vrHelper.changeGazeColor(new BABYLON.Color3(1,1,1));
vrHelper.enableInteractions();
/*-------- Création Matériaux---------------*/
 greenMat = new BABYLON.StandardMaterial("green", scene);
    greenMat.diffuseColor = new BABYLON.Color3(0, 255, 0);
    greenMat.emissiveColor = new BABYLON.Color3(0, 255, 0);
    greenMat.specularColor = new BABYLON.Color3(0, 255, 0);

 redMat = new BABYLON.StandardMaterial("red", scene);
    redMat.diffuseColor = new BABYLON.Color3(255, 0, 0);
    redMat.emissiveColor = new BABYLON.Color3(255, 0, 0);
    redMat.specularColor = new BABYLON.Color3(255, 0, 0);

var matChargement = new BABYLON.StandardMaterial("dog", scene);
  
  //matChargement.diffuseTexture = new BABYLON.Texture("https://t3.ftcdn.net/jpg/00/68/01/94/240_F_68019468_6ipMN9UWrTqVeqrtkZmTo3rnfaYNSV5P.jpg", scene);
   matChargement.diffuseTexture = new BABYLON.Texture("./textures/chargement.png", scene);
   matChargement.diffuseTexture.hasAlpha = true;
  
var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1.5;

 planChargement = BABYLON.Mesh.CreatePlane("planeChargement", 1, scene);
 planChargement.material = matChargement;
 planChargement.scaling.x = 0.25;
 planChargement.scaling.y = 0.25;
 

 var angle = 0.05;
planChargement.isVisible = false;
    scene.registerBeforeRender(function() {
        planChargement.rotate(new BABYLON.Vector3(0,0, -1), angle, BABYLON.Space.WORLD);
    })

/*---------Création de la première photo ---------------*/
createPhoto1();


return scene;
};

var createPhoto1= function()
{
 //--------- Chargement de la photo 360°--------------
var dome = new BABYLON.PhotoDome(
   "testdome",
   "./textures/360photo.jpg",
   {
       resolution: 32,
       size: 1000
   },
   scene
);


//----------------------Création Sphère--------

var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);

// positionnement de la sphère
sphere.material = redMat;
sphere.position.x = 1;
sphere.position.y = 0;
sphere.position.z = 0; 

// Nécessaire si on veut utiliser BABYLON.GUI, variable dans laquelle 
// on va stocker les objets GUI utilisés (les étiquettes des sphères) 

var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
//Création de l'étiquette de la boule

var rect1 = new BABYLON.GUI.Rectangle();
rect1.width = 0.05;
rect1.height = "20px";
rect1.cornerRadius = 20;
rect1.color = "black";
rect1.thickness = 2;
rect1.background = "white";
advancedTexture.addControl(rect1);
var label = new BABYLON.GUI.TextBlock();
label.text = "Entrée";
rect1.addControl(label);

rect1.linkWithMesh(sphere);   // On lie l'étiquette à la sphère
rect1.linkOffsetY = -50;

//--------Création d'un manager: gère les actions relatives à la sphère------
sphere.actionManager = new BABYLON.ActionManager(scene);

//-------Trigger déclenché lors d'un survol de la sphère par le pointeur---------

sphere.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function () {

    // la sphère devient verte pour aider à la navigation de l'utilisateur et 
    //         à notifier que le pointeur est sur la sphère                   
        sphere.material = greenMat;
        planChargement.position.x = sphere.position.x;
        planChargement.position.y = sphere.position.y -0.7;

        //planChargement.parent = sphere;
        
        planChargement.isVisible = true;
        // Code à exécuter au bout de 2sec
        timer = setTimeout( function(){
    //-------Destruction de la photo actuelle-------
        
        advancedTexture.dispose();
        sphere.dispose();
        dome.dispose();

    //------Création de la prochaine photo 360-------
        createPhoto2();
        planChargement.isVisible = false;
        },1000);
}));
  

  
//-----Trigger du pointeur une fois qu'il quitte la sphere APRES l'avoir survolée------
sphere.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function () {
    
        clearTimeout(timer);
        sphere.material = redMat;
        planChargement.isVisible = false;
       
    
}));   

//-----Trigger du click SOURIS (non celui du controller casque)----------
sphere.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
    
    // On met un setTimeout de 0.4sec (et pas MOINS) car n'en mettant       
    // pas, si l'utilisateur commence directement à tourner la caméra alors 
    //         un bug d'image survient                                     
    timerclick = setTimeout( function(){
    //-------Destruction de la photo actuelle-------
        
        advancedTexture.dispose();
        sphere.dispose();
        dome.dispose();

    //------Création de la prochaine photo 360-------
        createPhoto2();
       planChargement.isVisible = false;
   
    },500);
    

}));



};

var createPhoto2= function()
{
//------Création de la photo 360° 
var dome = new BABYLON.PhotoDome(
   "testdome",
   "./textures/equirectangular.jpg",
   {
       resolution: 32,
       size: 1000
   },
   scene
);

// Nécessaire si on veut utiliser BABYLON.GUI, variable dans laquelle 
// on va stocker les objets GUI utilisés (les étiquettes des sphères) 
var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

//----------------------Création Sphère-------------

var sphere1 = BABYLON.Mesh.CreateSphere("sphere1", 16, 1, scene);
var sphere2 = BABYLON.Mesh.CreateSphere("sphere2", 16, 1, scene);
var sphere3 = BABYLON.Mesh.CreateSphere("sphere3", 16, 1, scene);


// positionnement + matériaux des sphères
sphere1.material = redMat;
sphere1.position.x = -3;
sphere1.position.y = 0;
sphere1.position.z = 0; 

sphere2.material = redMat;
sphere2.position.x = 3;
sphere2.position.y = 0;
sphere2.position.z = 0; 

sphere3.material = redMat;
sphere3.position.x = 0;
sphere3.position.y = 1;
sphere3.position.z = 0; 


// Création des étiquettes des sphères
var rect1 = new BABYLON.GUI.Rectangle();
rect1.width = 0.1;
rect1.height = "20px";
rect1.cornerRadius = 20;
rect1.color = "black";
rect1.thickness = 2;
rect1.background = "white";
advancedTexture.addControl(rect1);

var label1 = new BABYLON.GUI.TextBlock();
label1.text = "Vers 1ere Photo";
rect1.addControl(label1);
rect1.linkWithMesh(sphere1);  
rect1.linkOffsetY = -50;


var rect2 = new BABYLON.GUI.Rectangle();
rect2.width = 0.1;
rect2.height = "20px";
rect2.cornerRadius = 20;
rect2.color = "black";
rect2.thickness = 2;
rect2.background = "white";
advancedTexture.addControl(rect2);

var label2 = new BABYLON.GUI.TextBlock();
label2.text = "Vers 3e photo";
rect2.addControl(label2);
rect2.linkWithMesh(sphere2);  
rect2.linkOffsetY = -50;


var rect3 = new BABYLON.GUI.Rectangle();
rect3.width = 0.1;
rect3.height = "20px";
rect3.cornerRadius = 20;
rect3.color = "black";
rect3.thickness = 2;
rect3.background = "white";
advancedTexture.addControl(rect3);

var label3 = new BABYLON.GUI.TextBlock();
label3.text = "Vidéo";
rect3.addControl(label3);
rect3.linkWithMesh(sphere3);  
rect3.linkOffsetY = -50;


// Fabrication de la vidéo 

var show = false;

/*
var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1.5;
	*/
    // Create a material from the video
	var mat = new BABYLON.StandardMaterial("mat", scene);
	var videoTexture = new BABYLON.VideoTexture("video", ["./textures/babylonjs.mp4", "textures/babylonjs.webm"], scene, true, false);
	mat.diffuseTexture = videoTexture;

    // Attach the video material the a mesh
    var plan = BABYLON.Mesh.CreatePlane("plane1", 2, scene);
    plan.scaling.x = 1920/1080; // set aspect ratio
	plan.material = mat;
    plan.isVisible = false;
    plan.position.x = 1;
    plan.position.y =2.5;
    videoTexture.video.pause();
    videoTexture.video.loop = false;

    // Create the 3D UI manager
    var manager = new BABYLON.GUI.GUI3DManager(scene);

    // Let's add a button Reset
    var buttonReset = new BABYLON.GUI.HolographicButton("restart");
   
    manager.addControl(buttonReset);
   
    var outReset = true;
    
    buttonReset.position.x = 2.5;
    buttonReset.position.y = 1.25;
    buttonReset.scaling.x = 0.5;
    buttonReset.scaling.y = 0.5;
    buttonReset.isVisible = false;
    
    var image = new BABYLON.GUI.Image("reset", "./textures/Refresh.png");
    image.width = "65%";
    image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    buttonReset.content = image;

    // Let's add a button Pause
    var buttonPause = new BABYLON.GUI.HolographicButton("Pause");
   
    manager.addControl(buttonPause);
   
    var outPause = true;
    
    buttonPause.position.x = 1;
    buttonPause.position.y = 1.25;
    buttonPause.scaling.x = 0.5;
    buttonPause.scaling.y = 0.5;
    buttonPause.isVisible = false;
    
    var image = new BABYLON.GUI.Image("reset", "./textures/Pause.png");
    image.width = "65%";
    image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    buttonPause.content = image;


    // Let's add a button Pause
    var buttonPlay = new BABYLON.GUI.HolographicButton("Play");
   
    manager.addControl(buttonPlay);
   
    var outPlay = true;
    
    buttonPlay.position.x = 1;
    buttonPlay.position.y = 1.25;
    buttonPlay.scaling.x = 0.5;
    buttonPlay.scaling.y = 0.5;
    buttonPlay.isVisible = false;
    
    var image = new BABYLON.GUI.Image("reset", "./textures/Play.png");
    image.width = "65%";
    image.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
    buttonPlay.content = image;





//--------Création des managers: gèrent les actions relatives aux sphères------

sphere1.actionManager = new BABYLON.ActionManager(scene);
sphere2.actionManager = new BABYLON.ActionManager(scene);
sphere3.actionManager = new BABYLON.ActionManager(scene);


 //-----TRIGGER DU CLICK SOURIS (non celui du controller casque)----------

sphere1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
    timerclick = setTimeout( function(){
    //-------Destruction de la photo actuelle-------
        dome.dispose();
        
        sphere1.dispose();
        sphere2.dispose();
        sphere3.dispose();
	videoTexture.dispose();
        plan.dispose();
        manager.dispose();
        buttonReset.dispose();
        buttonPause.dispose();
        buttonPlay.dispose();
       advancedTexture.dispose();
        planChargement.isVisible = false;
   
    //------Création de la prochaine photo 360-------
        createPhoto1();
   
    },500);
}));


sphere2.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
    
    // On met un setTimeout de 0.4sec (et pas MOINS) car n'en mettant       
    // pas, si l'utilisateur commence directement à tourner la caméra alors 
    //         un bug d'image survient                                     
    timerclick = setTimeout( function(){
    
        dome.dispose();
        advancedTexture.dispose();
        sphere1.dispose();
        sphere2.dispose();
        sphere3.dispose();
	videoTexture.dispose();
        plan.dispose();
        manager.dispose();
        buttonReset.dispose();
        buttonPause.dispose();
        buttonPlay.dispose();
       planChargement.isVisible = false;
   
      
        
        createPhoto3();
   
    },500);
    

}));
    

sphere3.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () 
{
    if(!show)
    {
        plan.isVisible = true;
        buttonReset.isVisible = true;
        buttonPause.isVisible = true;
        videoTexture.video.play();    
        
    }
    else
    {
        buttonPause.isVisible = false;
        buttonPlay.isVisible = false;
        plan.isVisible = false;
        buttonReset.isVisible = false;
        videoTexture.video.pause();
    }
    show = !show;
    planChargement.isVisible = false;
}));


buttonReset.onPointerUpObservable.add(function(){
        videoTexture.video.currentTime =0;
        planChargement.isVisible = false;
   
    });

buttonPause.onPointerUpObservable.add(function(){
        videoTexture.video.pause();
        buttonPause.isVisible = false;
        buttonPlay.isVisible = true;
        planChargement.isVisible = false;
   
       
     
        
    });


buttonPlay.onPointerUpObservable.add(function(){
        videoTexture.video.play();
        buttonPlay.isVisible = false;
        buttonPause.isVisible = true;
        planChargement.isVisible = false;
   
       
        
    });



/*  // à coder pour le headSet
sphere1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (mesh) {
    var gamepadManager = new BABYLON.GamepadManager();
    gamepadManager.onGamepadConnectedObservable.add((gamepad, state)=>{
    gamepad.onButtonDownObservable.add((button, state)=>{
    //Button has been pressed
    var scene= createScene();
    engine.stopRenderLoop();
    engine.runRenderLoop(function(){
           advancedTexture.dispose();
           advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI", true, scene);
           scene.render();
        });
   scene1.autoclear = true;
   scene1.dispose();
   scene1 = null; 

    })});
}));*/




//---------------Triggers liés au survol des sphères par le pointeur---------


sphere1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function () {
    
    sphere1.material = greenMat;
    planChargement.position.x = sphere1.position.x;
    planChargement.position.y = sphere1.position.y-0.7;
    planChargement.isVisible = true;
    timer = setTimeout( function(){
    //-------Destruction de la photo actuelle-------
        dome.dispose();
        advancedTexture.dispose();
        advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        sphere1.dispose();
        sphere2.dispose();
        sphere3.dispose();
	    videoTexture.dispose();
        buttonReset.dispose();
        buttonPause.dispose();
        buttonPlay.dispose();
        plan.dispose();
        planChargement.isVisible = false;
   
    //------Création de la prochaine photo 360-------
        createPhoto1();
   
    },1000);
  
}));


sphere2.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function () {
   
   sphere2.material = greenMat;
   planChargement.position.x = sphere2.position.x;
   planChargement.position.y = sphere2.position.y-0.7;
   planChargement.isVisible = true;
    timer = setTimeout( function(){
    //-------Destruction de la photo actuelle-------
        dome.dispose();
        advancedTexture.dispose();
        advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
        sphere1.dispose();
        sphere2.dispose();
        sphere3.dispose();
	    videoTexture.dispose();
        buttonReset.dispose();
        buttonPause.dispose();
        buttonPlay.dispose();
        plan.dispose();
        planChargement.isVisible = false;
   
    //------Création de la prochaine photo 360-------
        createPhoto3();
   
    },1000);
  
   
}));

sphere3.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function () {

    // la sphère devient verte pour aider à la navigation de l'utilisateur et 
    //         à notifier que le pointeur est sur la sphère                   
        sphere3.material = greenMat;
    planChargement.position.x = sphere3.position.x;
        planChargement.position.y = sphere3.position.y-0.7;
        planChargement.isVisible = true;
       
        // Code à exécuter au bout de 2sec
        timer = setTimeout( function(){
    if(!show)
    {
        plan.isVisible = true;
         buttonReset.isVisible = true;
         buttonPause.isVisible = true;
        videoTexture.video.play();
        
    }

    else
    {
        plan.isVisible = false;
         buttonReset.isVisible = false;
         buttonPause.isVisible = false;
        videoTexture.video.pause();
    }
    
    show = !show;
    planChargement.isVisible = false;
   
   },1000);
}));

buttonReset.onPointerMoveObservable.add(function(){
        outReset = false;
        planChargement.position.x = buttonReset.position.x;
        planChargement.position.y = buttonReset.position.y-0.5;
        planChargement.isVisible = true;
    
        timervideo = setTimeout(function(){ 
            //On test si on est en dehors du bouton reset
            // Si on est sur le bouton alors on reset
            // Sinon on ne fait rien
            if (!outReset) {videoTexture.video.currentTime =0;
            planChargement.isVisible = false;
   }},2000);
      
       
    });

buttonPause.onPointerMoveObservable.add(function(){
        outPause = false;
        planChargement.position.x = buttonPause.position.x;
        planChargement.position.y = buttonPause.position.y-0.5;
        planChargement.isVisible = true;
   
        timervideo = setTimeout(function(){ 
            //On test si on est en dehors du bouton reset
            // Si on est sur le bouton alors on reset
            // Sinon on ne fait rien
            if (!outPause) {
                videoTexture.video.pause();
                buttonPause.isVisible = false;
                buttonPlay.isVisible = true;
                planChargement.isVisible = false;
   
                }
            },2000);
      
      
       
    });

buttonPlay.onPointerMoveObservable.add(function(){
        outPlay = false;
        planChargement.position.x = buttonPlay.position.x;
        planChargement.position.y = buttonPlay.position.y-0.5;
        planChargement.isVisible = true;
   
        timervideo = setTimeout(function(){ 
            //On test si on est en dehors du bouton reset
            // Si on est sur le bouton alors on reset
            // Sinon on ne fait rien
            if (!outPlay) {
                videoTexture.video.play();
                buttonPlay.isVisible = false;
                buttonPause.isVisible = true;
                planChargement.isVisible = false;
   }
            },2000);
      
       
       
    });

    //---------Trigger une fois le pointeur hors du mesh ----------------
sphere1.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function () {
    
    sphere1.material = redMat;
    clearTimeout(timer);
    planChargement.isVisible = false;
  
}));

sphere2.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function () {
    
    sphere2.material = redMat;
    clearTimeout(timer);
     planChargement.isVisible = false;
  
}));

sphere3.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function () {
    
    sphere3.material = redMat;
    clearTimeout(timer);
     planChargement.isVisible = false;
  
}));

 buttonReset.onPointerOutObservable.add(function(){
        //Dès qu'on franchit le contour du bouton pour aller à l'extérieur
        // on met à jour la variable out
        outReset =true;
        planChargement.isVisible = false;
   
        
    });

    buttonPause.onPointerOutObservable.add(function(){
        //Dès qu'on franchit le contour du bouton pour aller à l'extérieur
        // on met à jour la variable out
        outPause =true;
        planChargement.isVisible = false;
   
        
    });

    buttonPlay.onPointerOutObservable.add(function(){
        //Dès qu'on franchit le contour du bouton pour aller à l'extérieur
        // on met à jour la variable out
        outPlay =true;
        planChargement.isVisible = false;
   
        
    });

}




var createPhoto3= function()
{
//------Création de la photo 360° 
var dome = new BABYLON.PhotoDome(
   "testdome",
   "./textures/puydesancy.jpg",
   {
       resolution: 32,
       size: 1000
   },
   scene
);

var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    light.intensity = 1.5;
	var mat = new BABYLON.StandardMaterial("dog", scene);
   //mat.diffuseTexture = new BABYLON.Texture("https://upload.wikimedia.org/wikipedia/commons/3/33/Info_icon_002.svg", scene);
   mat.diffuseTexture = new BABYLON.Texture("./textures/Info.svg", scene);
    mat.diffuseTexture.hasAlpha = true;
    mat.backFaceCulling = false;
 
var plan = BABYLON.Mesh.CreatePlane("plane1", 2, scene);
    //plan.scaling.x = 1920/1080; // set aspect ratio
	plan.material = mat;
    plan.position.x = 1;
    plan.scaling.x = 0.25;
    plan.scaling.y = 0.25;
     var angle = 0.01;

    scene.registerBeforeRender(function() {
        plan.rotate(new BABYLON.Vector3(0,1, 0), angle, BABYLON.Space.WORLD);
    })



    var show = false;
    var plan2 = BABYLON.Mesh.CreatePlane("plane2", 2, scene);
    
    plan2.isVisible = false;
   plan.actionManager = new BABYLON.ActionManager(scene);
    plan.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger, function () {
            if(!show){
                plan2.isVisible = true;
            }
            else{
            plan2.isVisible = false;
            }
            show = !show;
            planChargement.isVisible = false;
   
        }));
    
    plan.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function () {
            planChargement.position.x = plan.position.x;
        planChargement.position.y = plan.position.y-0.7;
        planChargement.isVisible = true;
            timerinfo = setTimeout( function(){
           if(!show){
                plan2.isVisible = true;
            }
            else{
            plan2.isVisible = false;
            }
            show = !show;
            planChargement.isVisible = false;
   
            }, 500);

        }));

        plan.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function () {
            
            clearTimeout(timerinfo);
             planChargement.isVisible = false;

        }));



}


         
      
      
       var engine = new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
       var scene = createScene();

       engine.runRenderLoop(function () {
           if (scene) {
               scene.render();
           }
       });

       // Resize
       window.addEventListener("resize", function () {
           engine.resize();
       });
