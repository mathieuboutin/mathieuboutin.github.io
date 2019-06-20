var canvas = document.getElementById("renderCanvas");
        {
        let scene;
        let vrHelper;
        let camera;
        var matIconeVideo,matHyperLink,matLink,matImage,matImageDisplay,matVideo,matClose,matreset,matplayPause,videoTexture;
        var createScene = function () {
        
        /*------ Initialisation Scène & Camera ------*/  
          
        scene = new BABYLON.Scene(engine);
        camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3 (0,0,-5), scene)
        camera.attachControl(canvas, true);
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
        light.intensity = 1.5;
        
        /*---------Ajout de la VR-------------------*/     
        
         vrHelper = scene.createDefaultVRExperience();
        
        vrHelper.displayGaze = true ;
        vrHelper.displayLaserPointer = true;
        vrHelper.changeGazeColor(new BABYLON.Color3(1,1,1));
        vrHelper.enableInteractions();
        
        vrHelper.onEnteringVR.add(()=> {
            setTimeout(()=>{scene.getEngine().isPointerLock = true},1000);
        })
        
        vrHelper.onExitingVR.add( ()=> {
            scene.getEngine().isPointerLock = false;
        })
        
        //----------------------MATERIAUX--------------------------------------------------------------
            matIconeVideo = new BABYLON.StandardMaterial( scene);
            matIconeVideo.diffuseTexture = new BABYLON.Texture("icon/iconeVideo.png",scene,true,false);    
            matIconeVideo.diffuseTexture.hasAlpha = true;
            matIconeVideo.backFaceCulling = false;

            matHyperLink = new BABYLON.StandardMaterial( scene);
            matHyperLink.diffuseTexture = new BABYLON.Texture("img/circle_red.png",scene,true,false);     
            matHyperLink.diffuseTexture.hasAlpha = true;
            matHyperLink.backFaceCulling = false;

            matLink = new BABYLON.StandardMaterial( scene);
            matLink.diffuseTexture = new BABYLON.Texture("icon/link.png",scene,true,false);
            matLink.diffuseTexture.hasAlpha = true;
            matLink.backFaceCulling = false;

            matImage = new BABYLON.StandardMaterial( scene);
            matImage.diffuseTexture = new BABYLON.Texture("img/chat2.jpg",scene,true,false);    
            matImage.diffuseTexture.hasAlpha = true;
            matImage.backFaceCulling = false;

            matImageDisplay = new BABYLON.StandardMaterial( scene);
            matImageDisplay.diffuseTexture = new BABYLON.Texture("img/chat2.jpg",scene,true,true);    
            matImageDisplay.diffuseTexture.hasAlpha = true;
            matImageDisplay.backFaceCulling = false;

            matInfo = new BABYLON.StandardMaterial( scene);
            matInfo.diffuseTexture = new BABYLON.Texture("icon/info2.svg",scene,true,false);    
            matInfo.diffuseTexture.hasAlpha = true;
            matInfo.backFaceCulling = false;

            matVideo = new BABYLON.StandardMaterial("mat", scene);
            videoTexture = new BABYLON.VideoTexture("video", "img/pub.mp4", scene, true, false);
            matVideo.diffuseTexture = videoTexture;
            videoTexture.video.pause();

            matClose = new BABYLON.StandardMaterial("dog", scene);
            matClose.diffuseTexture = new BABYLON.Texture("icon/close.png", scene);
            matClose.diffuseTexture.hasAlpha = true;

            matreset = new BABYLON.StandardMaterial("dog", scene);
            matreset.diffuseTexture = new BABYLON.Texture("icon/reset.png", scene);
            matreset.diffuseTexture.hasAlpha = true;

            matplayPause = new BABYLON.StandardMaterial("dog", scene);
            matplayPause.diffuseTexture = new BABYLON.Texture("icon/play_pause.png", scene);
            matplayPause.diffuseTexture.hasAlpha = true;
            let dome = new BABYLON.PhotoDome(
                "scene1",
                "./img/image1.png",
                {
                    resolution:32,
                    size: 1000,
                    faceForward: false
                },
                scene
            )
            dome.dispose();
            dome = null;
          dome = new BABYLON.PhotoDome(
                "scene1",
                "./img/image2.png",
                {
                    resolution:32,
                    size: 1000,
                    faceForward: false
                },
                scene
            )
            dome.dispose();
            dome = null;
            dome = new BABYLON.PhotoDome(
                "scene1",
                "./img/image3.png",
                {
                    resolution:32,
                    size: 1000,
                    faceForward: false
                },
                scene
            )
            dome.dispose();
            dome = null;
            dome = new BABYLON.PhotoDome(
                "scene1",
                "./img/image4.png",
                {
                    resolution:32,
                    size: 1000,
                    faceForward: false
                },
                scene
            )
            dome.dispose();
            dome = null;
        /*---------Création de la première photo ---------------*/
        createPhoto1();
        
        
        return scene;
        };

        var createPhoto1 = function()
        {
            let dome = new BABYLON.PhotoDome(
                "scene1",
                "./img/image1.png",
                {
                    resolution:32,
                    size: 1000,
                    faceForward: false
                },
                scene
            )
            
        
        //---------------------------------MESHES----------------------------------------

           //--------------------Link to switch scene--------------------------------

        var planGUILink = BABYLON.Mesh.CreatePlane("linkGui", 3);
        var planLink = BABYLON.Mesh.CreateDisc("link", 0.5, 60, scene, false, BABYLON.Mesh.DOUBLESIDE )
        planLink.position = new BABYLON.Vector3(-7.856177494195498, -7.575172191173865e-26,-11.002394108127689)
        
        planLink.material = matLink;
        planGUILink.position = planLink.position.add(planLink.position.subtract(camera.position).normalize().scale(0.5));

        
       
          //---------------------------HyperLink----------------------------------

        var planGUIHyperLink = BABYLON.Mesh.CreatePlane("hyperlinkGui", 3);
        var planHyperLink = BABYLON.Mesh.CreateDisc("Hyperlink", 0.5, 60, scene, false, BABYLON.Mesh.DOUBLESIDE )
        planHyperLink.position = new BABYLON.Vector3(-7.21516768075967,0,-14.081954471594145)
        
        planHyperLink.material = matHyperLink;
        planGUIHyperLink.position = planHyperLink.position.add(planHyperLink.position.subtract(camera.position).normalize().scale(0.5));

        var closeHyperLink = new BABYLON.Mesh.CreatePlane("closeVideo",2,scene);
        closeHyperLink.position = planGUIHyperLink.position.add(planGUIHyperLink.position.subtract(camera.position).normalize().scale(-0.5));
        closeHyperLink.position = closeHyperLink.position.add(new BABYLON.Vector3(0,1.5,1.5))
        
        closeHyperLink.isVisible = false;
        closeHyperLink.scaling.x = 0.25;
        closeHyperLink.scaling.y = 0.25;
        closeHyperLink.material = matClose;

            //----------------------------Image------------------------------------------

        var planGUIImage = BABYLON.Mesh.CreatePlane("hyperlinkGui", 3);
        var planImage = BABYLON.Mesh.CreateDisc("Hyperlink", 0.5, 60, scene, false, BABYLON.Mesh.DOUBLESIDE )
        planImage.position = new BABYLON.Vector3(-12.377351007646315,-1.4211785528481757e-24,-9.052478645879221)
        
        planImage.material = matImage;
        planGUIImage.position = planImage.position.add(planImage.position.subtract(camera.position).normalize().scale(0.5));
        
        
        var ImageDisplay = BABYLON.Mesh.CreatePlane("Image", 4);
        ImageDisplay.position = planImage.position.add(new BABYLON.Vector3(0,3,0));
        ImageDisplay.scaling.x = 1920/1080;
        ImageDisplay.material = matImageDisplay;
        ImageDisplay.isVisible = false;
        
        var closeImage = new BABYLON.Mesh.CreatePlane("closeVideo",2,scene);
        closeImage.position = ImageDisplay.position.add(ImageDisplay.position.subtract(camera.position).normalize().scale(-0.5));
        closeImage.position = closeImage.position.add(new BABYLON.Vector3(0,2.3,3))
       
        closeImage.isVisible = false;
        closeImage.scaling.x = 0.25;
        closeImage.scaling.y = 0.25;
        closeImage.material = matClose;
        
        

            //--------------------------Video-----------------------------------------------
        var planGUIVideo = BABYLON.Mesh.CreatePlane("hyperlinkGui", 3);
        var planVideo = BABYLON.Mesh.CreateDisc("Hyperlink", 0.5, 60, scene, false, BABYLON.Mesh.DOUBLESIDE )
        planVideo.position = new BABYLON.Vector3(-11.686181615057734,0,-5.300905990659318)
        planVideo.material = matIconeVideo;
        
        planGUIVideo.position = planVideo.position.add(planVideo.position.subtract(camera.position).normalize().scale(0.5));
        var Video = BABYLON.Mesh.CreatePlane("plane1", 3, scene);
        Video.position = planVideo.position.add(planVideo.position.subtract(camera.position).normalize().scale(-0.5));
        
        
         // Attach the video material the a mesh
        Video.scaling.x = 1920/1080; // set aspect ratio
        Video.material = matVideo;
        Video.isVisible = false;
        videoTexture.video.pause();
        videoTexture.video.loop = false;

        var closeVideo = new BABYLON.Mesh.CreatePlane("closeVideo",2,scene);
        closeVideo.position = Video.position.add(Video.position.subtract(camera.position).normalize().scale(-0.5));
        closeVideo.position = closeVideo.position.add(new BABYLON.Vector3(0,1.8,2.2))
        closeVideo.isVisible = false;
        closeVideo.scaling.x = 0.25;
        closeVideo.scaling.y = 0.25;
        
        closeVideo.material = matClose;

        var playPause = new BABYLON.Mesh.CreatePlane("playPause",2,scene);
        playPause.position = Video.position.add(Video.position.subtract(camera.position).normalize().scale(-0.5));
        playPause.position = playPause.position.add(new BABYLON.Vector3(0,-2,0))
        playPause.isVisible = false;
        playPause.scaling.x = 0.40;
        playPause.scaling.y = 0.40;
        playPause.hoverCursor = "pointer"
        
        playPause.material = matplayPause;

        var reset = new BABYLON.Mesh.CreatePlane("reset",2,scene);
        reset.position = Video.position.add(Video.position.subtract(camera.position).normalize().scale(-0.5));
        reset.position = reset.position.add(new BABYLON.Vector3(0,-2,2))
        reset.isVisible = false;
        reset.scaling.x = 0.40;
        reset.scaling.y = 0.40;
        
        reset.material = matreset;
            
        let observer= scene.onBeforeRenderObservable.add(()=>
        {
            var camPos = scene.activeCamera == vrHelper.webVRCamera ? vrHelper.webVRCamera.devicePosition : scene.activeCamera.position
            var dir1 = planGUILink.position.subtract(scene.activeCamera.position)
            var dir1_1 = planLink.position.subtract(scene.activeCamera.position)
            var dir2 = planGUIHyperLink.position.subtract(scene.activeCamera.position)
            var dir2_1 = planHyperLink.position.subtract(scene.activeCamera.position)
            var dir2_2 = closeHyperLink.position.subtract(scene.activeCamera.position)
            var dir3 = planGUIImage.position.subtract(scene.activeCamera.position)
            var dir3_1 = planImage.position.subtract(scene.activeCamera.position)
            var dir3_2 = ImageDisplay.position.subtract(scene.activeCamera.position)
            var dir3_3 = closeImage.position.subtract(scene.activeCamera.position)
            var dir4 = planGUIVideo.position.subtract(scene.activeCamera.position)
            var dir4_1 = planVideo.position.subtract(scene.activeCamera.position)
            var dir4_2 = Video.position.subtract(scene.activeCamera.position)
            var dir4_3 = closeVideo.position.subtract(scene.activeCamera.position)
            var dir4_4 = playPause.position.subtract(scene.activeCamera.position)
            var dir4_5 = reset.position.subtract(scene.activeCamera.position)
            planGUILink.lookAt(planGUILink.position.add(dir1))
            planLink.lookAt(planLink.position.add(dir1_1))
            planGUIHyperLink.lookAt(planGUIHyperLink.position.add(dir2))
            planHyperLink.lookAt(planHyperLink.position.add(dir2_1))
            closeHyperLink.lookAt(closeHyperLink.position.add(dir2_2))
            planGUIImage.lookAt(planGUIImage.position.add(dir3))
            planImage.lookAt(planImage.position.add(dir3_1))
            ImageDisplay.lookAt(ImageDisplay.position.add(dir3_2))
            closeImage.lookAt(closeImage.position.add(dir3_3))
            planGUIVideo.lookAt(planGUIVideo.position.add(dir4))
            planVideo.lookAt(planVideo.position.add(dir4_1))
            Video.lookAt(Video.position.add(dir4_2))
            closeVideo.lookAt(closeVideo.position.add(dir4_3))
            playPause.lookAt(playPause.position.add(dir4_4))
            reset.lookAt(reset.position.add(dir4_5))
           
           
            
        });
        
          
            
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(planGUILink);
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = 0.8;
        rect1.height = "200px";
        rect1.cornerRadius = 90;
        //rect1.color = "white";  //couleur des bordures du rectangle
        rect1.thickness = 2; 
        rect1.background = "purple";
        advancedTexture.addControl(rect1);
        var label = new BABYLON.GUI.TextBlock();
        label.text = "Vers sc2";
        label.fontSize = "150";
        label.color = "white";
        rect1.addControl(label);
        rect1.top = "-350px";
        rect1.isVisible = false;
       

       var advancedTextureHyperLink = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(planGUIHyperLink);
        var rectHyperLink = new BABYLON.GUI.Rectangle();
        rectHyperLink.width = 0.8;
        rectHyperLink.height = "200px";
        rectHyperLink.cornerRadius = 90;
        //rectHyperLink.color = "white";  //couleur des bordures du rectangle
        rectHyperLink.thickness = 2; 
        rectHyperLink.background = "purple";
        advancedTextureHyperLink.addControl(rectHyperLink);
        var labelHyperLink = new BABYLON.GUI.TextBlock();
        labelHyperLink.text = "HyperLink";
        labelHyperLink.fontSize = "150";
        labelHyperLink.color = "white";
        rectHyperLink.addControl(labelHyperLink);
        rectHyperLink.top = "-350px";
        rectHyperLink.isVisible = false;
        var rectHyperLinkHtml = new BABYLON.GUI.Rectangle();
            var labelHyperLinkHtml = new BABYLON.GUI.TextBlock();
            rectHyperLinkHtml.isVisible = false;
            
                    
            rectHyperLinkHtml.width = 1;
            rectHyperLinkHtml.height = "150px";
            rectHyperLinkHtml.cornerRadius = 90;
            rectHyperLinkHtml.thickness = 2;
            rectHyperLinkHtml.background = "purple";
            advancedTextureHyperLink.addControl(rectHyperLinkHtml);
            labelHyperLinkHtml.text = "https://www.google.fr/";
            labelHyperLinkHtml.fontSize = "100"
            labelHyperLinkHtml.color = "white"
            rectHyperLinkHtml.top = "-350px"
            labelHyperLinkHtml.hoverCursor = "pointer"
            rectHyperLinkHtml.addControl(labelHyperLinkHtml);
    



        var advancedTextureImage = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(planGUIImage);
        var rectImage = new BABYLON.GUI.Rectangle();
        rectImage.width = 0.8;
        rectImage.height = "200px";
        rectImage.cornerRadius = 90;
        //rectImage.color = "white";  //couleur des bordures du rectangle
        rectImage.thickness = 2; 
        rectImage.background = "purple";
        advancedTextureImage.addControl(rectImage);
        var labelImage = new BABYLON.GUI.TextBlock();
        labelImage.text = "Image";
        labelImage.fontSize = "150";
        labelImage.color = "white";
        rectImage.addControl(labelImage);
        rectImage.top = "-350px";
        rectImage.isVisible = false;



        var advancedTextureVideo = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(planGUIVideo);
        var rectVideo = new BABYLON.GUI.Rectangle();
        rectVideo.width = 0.8;
        rectVideo.height = "200px";
        rectVideo.cornerRadius = 90;
        //rectVideo.color = "white";  //couleur des bordures du rectangle
        rectVideo.thickness = 2; 
        rectVideo.background = "purple";
        advancedTextureVideo.addControl(rectVideo);
        var labelVideo = new BABYLON.GUI.TextBlock();
        labelVideo.text = "Video";
        labelVideo.fontSize = "150";
        labelVideo.color = "white";
        rectVideo.addControl(labelVideo);
        rectVideo.top = "-350px";
        rectVideo.isVisible = false;
       
        
        
        let out = true;
        var timerin;
        var timerout;
        var firstTimeIn = true;
        var play = false;
        var display = false;
        
      
      //--------Action Managers------------------------------
        
        planLink.actionManager = new BABYLON.ActionManager(scene);
        planHyperLink.actionManager = new BABYLON.ActionManager(scene);
        planImage.actionManager = new BABYLON.ActionManager(scene);
        planVideo.actionManager = new BABYLON.ActionManager(scene);
        closeVideo.actionManager = new BABYLON.ActionManager(scene);
        closeHyperLink.actionManager = new BABYLON.ActionManager(scene);
        closeImage.actionManager = new BABYLON.ActionManager(scene);
        reset.actionManager = new BABYLON.ActionManager(scene);
        playPause.actionManager = new BABYLON.ActionManager(scene);

     // ------------------TRIGGERS------------------------------------------------

           //-------------Link------------------------------------------   
        planLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,  () => 
            {
                
                if(!out)
            {
               clearTimeout(timerout);  
            }
            out = false;
            
            
            if(firstTimeIn)
            {
                rect1.isVisible = true;
                TweenLite.to(planLink.scaling,0.5,{x: 1.5, y:1.5, z: 1})
                
            timerin = setTimeout(()=> {
                
                scene.onBeforeRenderObservable.remove(observer);
                
                 out = null;
                 timerin = null;
                 timerout = null;
                 firstTimeIn = null;
                 play = null;
                 display = null;


                closeVideo.actionManager.dispose();
                closeVideo.actionManager = null;
                closeVideo.dispose();
                closeVideo = null;

                closeHyperLink.actionManager.dispose();
                closeHyperLink.actionManager = null;
                closeHyperLink.dispose();
                closeHyperLink = null;

                closeImage.actionManager.dispose();
                closeImage.actionManager = null;
                closeImage.dispose();
                closeImage = null;

                reset.actionManager.dispose();
                reset.actionManager = null;
                reset.dispose();
                reset = null;

                playPause.actionManager.dispose();
                playPause.actionManager = null;
                playPause.dispose();
                playPause = null;


                label.dispose();
                label = null;
                rect1.dispose();
                rect1 = null;
                advancedTexture.dispose();
                advancedTexture = null;
                planGUILink.dispose();
                planGUILink = null;
                planLink.actionManager.dispose();
                planLink.actionManager = null;
                planLink.dispose();
                planLink = null;
                
                labelHyperLink.dispose();
                labelHyperLink = null;
                rectHyperLink.dispose();
                rectHyperLink = null;
                labelHyperLinkHtml.dispose();
                labelHyperLinkHtml = null;
                rectHyperLinkHtml.dispose();
                rectHyperLinkHtml = null;
                advancedTextureHyperLink.dispose();
                advancedTextureHyperLink = null;
                planGUIHyperLink.dispose();
                planGUIHyperLink = null;
                planHyperLink.actionManager.dispose();
                planHyperLink.actionManager = null;
                planHyperLink.dispose();
                planHyperLink = null;
                
                labelImage.dispose();
                labelImage = null;
                rectImage.dispose();
                rectImage = null;
                advancedTextureImage.dispose();
                advancedTextureImage = null;
                planGUIImage.dispose();
                planGUIImage = null;
                ImageDisplay.dispose();
                ImageDisplay = null;
                planImage.actionManager.dispose();
                planImage.actionManager = null;
                planImage.dispose();
                planImage = null;
                

                labelVideo.dispose();
                labelVideo = null;
                rectVideo.dispose();
                rectVideo = null;
                advancedTextureVideo.dispose();
                advancedTextureVideo = null;
                planGUIVideo.dispose();
                planGUIVideo = null;
                Video.dispose();
                Video = null;
                planVideo.actionManager.dispose();
                planVideo.actionManager = null;
                planVideo.dispose();
                planVideo = null;
                
               dome.dispose();
               dome = null;

               createPhoto2();
            }, 3000)
        }
            firstTimeIn = false;
                
        
            }));
           planLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  () => 
            {
                clearTimeout(timerin);
                setTimeout(()=>
                {
                
                scene.onBeforeRenderObservable.remove(observer);
                
                 out = null;
                 timerin = null;
                 timerout = null;
                 firstTimeIn = null;
                 play = null;
                 display = null;


                closeVideo.actionManager.dispose();
                closeVideo.actionManager = null;
                closeVideo.dispose();
                closeVideo = null;

                closeHyperLink.actionManager.dispose();
                closeHyperLink.actionManager = null;
                closeHyperLink.dispose();
                closeHyperLink = null;

                closeImage.actionManager.dispose();
                closeImage.actionManager = null;
                closeImage.dispose();
                closeImage = null;

                reset.actionManager.dispose();
                reset.actionManager = null;
                reset.dispose();
                reset = null;

                playPause.actionManager.dispose();
                playPause.actionManager = null;
                playPause.dispose();
                playPause = null;


                label.dispose();
                label = null;
                rect1.dispose();
                rect1 = null;
                advancedTexture.dispose();
                advancedTexture = null;
                planGUILink.dispose();
                planGUILink = null;
                planLink.actionManager.dispose();
                planLink.actionManager = null;
                planLink.dispose();
                planLink = null;
                
                labelHyperLink.dispose();
                labelHyperLink = null;
                rectHyperLink.dispose();
                rectHyperLink = null;
                labelHyperLinkHtml.dispose();
                labelHyperLinkHtml = null;
                rectHyperLinkHtml.dispose();
                rectHyperLinkHtml = null;
                advancedTextureHyperLink.dispose();
                advancedTextureHyperLink = null;
                planGUIHyperLink.dispose();
                planGUIHyperLink = null;
                planHyperLink.actionManager.dispose();
                planHyperLink.actionManager = null;
                planHyperLink.dispose();
                planHyperLink = null;
                
                labelImage.dispose();
                labelImage = null;
                rectImage.dispose();
                rectImage = null;
                advancedTextureImage.dispose();
                advancedTextureImage = null;
                planGUIImage.dispose();
                planGUIImage = null;
                ImageDisplay.dispose();
                ImageDisplay = null;
                planImage.actionManager.dispose();
                planImage.actionManager = null;
                planImage.dispose();
                planImage = null;
                

                labelVideo.dispose();
                labelVideo = null;
                rectVideo.dispose();
                rectVideo = null;
                advancedTextureVideo.dispose();
                advancedTextureVideo = null;
                planGUIVideo.dispose();
                planGUIVideo = null;
                Video.dispose();
                Video = null;
                planVideo.actionManager.dispose();
                planVideo.actionManager = null;
                planVideo.dispose();
                planVideo = null;
                
               dome.dispose();
               dome = null;

                createPhoto2();

                },500)
                
        
            }));
            planLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,  () => 
            {
                timerout = setTimeout(()=>{
                    clearTimeout(timerin);
                    out = true;
                firstTimeIn = true;
                
                TweenLite.to(planLink.scaling,0.5,{x: 1, y:1, z: 1})
                setTimeout(()=>{rect1.isVisible = false},200);
                
               
                    },10)
               
        
            }));

            //------------------Hyperlink-----------------------
            
            planHyperLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,  () => 
            {
                
                if(!out)
            {
               clearTimeout(timerout);  
            }
            out = false;
            
            
            if(firstTimeIn)
            {
                rectHyperLink.isVisible = true;
            
            TweenLite.to(planHyperLink.scaling,0.5,{x: 1.5, y:1.5, z: 1})
            timerin = setTimeout(()=> {
                out = true;
                firstTimeIn = true;
                rectHyperLink.isVisible = false;
                rectHyperLinkHtml.isVisible = true;
                closeHyperLink.isVisible = true;
            }, 1000)
        }
            firstTimeIn = false;
                
        
            }));
           planHyperLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  () => 
            {
                clearTimeout(timerin);
                out = true;
                firstTimeIn = true;
                rectHyperLink.isVisible = false;
                rectHyperLinkHtml.isVisible = true;
                closeHyperLink.isVisible = true;
        
            }));
            planHyperLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,  () => 
            {
                timerout = setTimeout(()=>{
                    clearTimeout(timerin);
                    out = true;
                firstTimeIn = true;
                TweenLite.to(planHyperLink.scaling,0.5,{x: 1, y:1, z: 1})
                
                setTimeout(()=>{rectHyperLink.isVisible = false;},400);
                
               
                    },10)
               
        
            }));

            labelHyperLinkHtml.onPointerEnterObservable.add(()=>
            {
                labelHyperLinkHtml.color = "blue"
                if(!out)
                {
                    clearTimeout(timerout);  
                }
                out = false;
                
               if(firstTimeIn)
               {
                timerin = setTimeout(()=> {
                
                out = true; // on remet le pointeur à l'extérieur comme ça on n'est pas obligé de ressortir du GUI si on veut select à nouveau le GUI
                firstTimeIn = true; // de même
                labelHyperLinkHtml.color = "white"
                window.open(labelHyperLinkHtml.text);
            }, 2000)}
            firstTimeIn = false;
            })
            labelHyperLinkHtml.onPointerOutObservable.add(()=>
            {
                labelHyperLinkHtml.color = "white"
                timerout = setTimeout(()=>{
                out = true;
                firstTimeIn = true;
               clearTimeout(timerin);
                }, 10)
            })
            labelHyperLinkHtml.onPointerClickObservable.add(()=>
            {
                window.open(labelHyperLinkHtml.text);
                labelHyperLinkHtml.color = "white"
                clearTimeout(timerin);
                out = true;
                firstTimeIn = true;
            }) 

            closeHyperLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,  () => 
            {
                
                if(!out)
            {
               clearTimeout(timerout);  
            }
            out = false;
            
            
            if(firstTimeIn)
            {
            
            TweenLite.to(closeHyperLink.scaling,0.5,{x: 0.5, y:0.5, z: 0.25})
            timerin = setTimeout(()=> {
                
                closeHyperLink.isVisible = false;
                rectHyperLinkHtml.isVisible = false;
               out = true;
                firstTimeIn = true;
                display = false;
                
            }, 1000)
        }
            firstTimeIn = false;
                
        
            }));
           closeHyperLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  () => 
            {
                clearTimeout(timerin);
                closeHyperLink.isVisible = false;
                rectHyperLinkHtml.isVisible = false;
                out = true;
                firstTimeIn = true;
                display = false;
        
            }));
            closeHyperLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,  () => 
            {
                timerout = setTimeout(()=>{
                    clearTimeout(timerin);
                    out = true;
                    firstTimeIn = true;
                    TweenLite.to(closeHyperLink.scaling,0.5,{x: 0.25, y:0.25, z: 0.25});
               
                    },10)
               
            }));

            //----------------------Image-------------------------------
            planImage.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,  () => 
            {
                
                if(!out)
            {
               clearTimeout(timerout);  
            }
            out = false;
            
            
            if(firstTimeIn)
            {
                rectImage.isVisible = true;
            
            TweenLite.to(planImage.scaling,0.5,{x: 1.5, y:1.5, z: 1})
            timerin = setTimeout(()=> {
                out = true;
                firstTimeIn = true;
                if(!display)
                {
                    rectImage.isVisible = false;
                    ImageDisplay.isVisible = true;
                    display = !display;
                    closeImage.isVisible = true;
                }
            }, 1000)
        }
            firstTimeIn = false;
                
        
            }));
           planImage.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  () => 
            {
                clearTimeout(timerin);
                out = true;
                firstTimeIn = true;
                if(!display)
                {
                    rectImage.isVisible = false;
                    ImageDisplay.isVisible = true;
                    closeImage.isVisible = true;
                    display = !display;
                }
        
            }));
            planImage.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,  () => 
            {
                timerout = setTimeout(()=>{
                    clearTimeout(timerin);
                    out = true;
                firstTimeIn = true;
                TweenLite.to(planImage.scaling,0.5,{x: 1, y:1, z: 1})
                
                setTimeout(()=>{rectImage.isVisible = false;},400);
                
               
                    },10)
               
            }));

            closeImage.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,  () => 
            {
                
                if(!out)
            {
               clearTimeout(timerout);  
            }
            out = false;
            
            
            if(firstTimeIn)
            {
            
            TweenLite.to(closeImage.scaling,0.5,{x: 0.5, y:0.5, z: 0.25})
            timerin = setTimeout(()=> {
                
                closeImage.isVisible = false;
                ImageDisplay.isVisible = false;
               out = true;
                firstTimeIn = true;
                display = false;
                
            }, 1000)
        }
            firstTimeIn = false;
                
        
            }));
           closeImage.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  () => 
            {
                clearTimeout(timerin);
                closeImage.isVisible = false;
                ImageDisplay.isVisible = false;
                out = true;
                firstTimeIn = true;
                display = false;
        
            }));
            closeImage.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,  () => 
            {
                timerout = setTimeout(()=>{
                    clearTimeout(timerin);
                    out = true;
                    firstTimeIn = true;
                    TweenLite.to(closeImage.scaling,0.5,{x: 0.25, y:0.25, z: 0.25});
               
                    },10)
               
            }));

            //----------------------Video-------------------------------
            planVideo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,  () => 
            {
                
                if(!out)
            {
               clearTimeout(timerout);  
            }
            out = false;
            
            
            if(firstTimeIn)
            {
                rectVideo.isVisible = true;
            
            TweenLite.to(planVideo.scaling,0.5,{x: 1.5, y:1.5, z: 1})
            timerin = setTimeout(()=> {
                Video.isVisible = true;
               videoTexture.video.play();
               reset.isVisible= true;
               playPause.isVisible = true;
               closeVideo.isVisible = true;
               out = true;
                firstTimeIn = true;
                play = true;
                
            }, 2000)
        }
            firstTimeIn = false;
                
        
            }));
           planVideo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  () => 
            {
                clearTimeout(timerin);
               Video.isVisible = true;
               videoTexture.video.play();
               reset.isVisible= true;
               playPause.isVisible = true;
               closeVideo.isVisible = true;
               out = true;
                firstTimeIn = true;
                play = true;
        
            }));
            planVideo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,  () => 
            {
                timerout = setTimeout(()=>{
                    clearTimeout(timerin);
                    out = true;
                    firstTimeIn = true;
                    TweenLite.to(planVideo.scaling,0.5,{x: 1, y:1, z: 1})
                
                setTimeout(()=>{rectVideo.isVisible = false;},400);
                
               
                    },10)
               
            }));

            closeVideo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,  () => 
            {
                
                if(!out)
            {
               clearTimeout(timerout);  
            }
            out = false;
            
            
            if(firstTimeIn)
            {
            
            TweenLite.to(closeVideo.scaling,0.5,{x: 0.5, y:0.5, z: 0.25})
            timerin = setTimeout(()=> {
                videoTexture.video.pause();
                Video.isVisible = false;
               reset.isVisible= false;
               playPause.isVisible = false;
               closeVideo.isVisible = false;
               out = true;
                firstTimeIn = true;
                play = false;
                
            }, 1000)
        }
            firstTimeIn = false;
                
        
            }));
           closeVideo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  () => 
            {
                clearTimeout(timerin);
                videoTexture.video.pause();
                play = false;
                Video.isVisible = false;
                reset.isVisible= false;
                playPause.isVisible = false;
                closeVideo.isVisible = false;
                out = true;
                firstTimeIn = true;
        
            }));
            closeVideo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,  () => 
            {
                timerout = setTimeout(()=>{
                    clearTimeout(timerin);
                    out = true;
                    firstTimeIn = true;
                    TweenLite.to(closeVideo.scaling,0.5,{x: 0.25, y:0.25, z: 0.25});
               
                    },10)
               
            }));

            playPause.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,  () => 
            {
                
                if(!out)
            {
               clearTimeout(timerout);  
            }
            out = false;
            
            
            if(firstTimeIn)
            {
            
            TweenLite.to(playPause.scaling,0.5,{x: 0.8, y:0.8, z: 0.40})
            timerin = setTimeout(()=> {
                if(play)
                {
                    videoTexture.video.pause();
                    
                }
                else
                {
                    videoTexture.video.play();

                }
                play = !play
               out = true;
                firstTimeIn = true;
                
            }, 1000)
        }
            firstTimeIn = false;
                
        
            }));
           playPause.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  () => 
            {
                clearTimeout(timerin);
                if(videoTexture.video.played)
                {
                    videoTexture.video.pause();
                }
                else
                {
                    videoTexture.video.play();
                }
                play = !play
                out = true;
                firstTimeIn = true;
        
            }));
            playPause.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,  () => 
            {
                timerout = setTimeout(()=>{
                    clearTimeout(timerin);
                    out = true;
                    firstTimeIn = true;
                    TweenLite.to(playPause.scaling,0.5,{x: 0.40, y:0.40, z: 0.40});
               
                    },10)
               
            }));

            reset.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,  () => 
            {
                
                if(!out)
            {
               clearTimeout(timerout);  
            }
            out = false;
            
            
            if(firstTimeIn)
            {
            
            TweenLite.to(reset.scaling,0.5,{x: 0.8, y:0.8, z: 0.40})
            timerin = setTimeout(()=> {
                videoTexture.video.currentTime = 0;
                videoTexture.video.play();
                play = true;
                out = true;
                firstTimeIn = true;
                
            }, 1000)
        }
            firstTimeIn = false;
                
        
            }));
           reset.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  () => 
            {
                clearTimeout(timerin);
                videoTexture.video.currentTime = 0;
                videoTexture.video.play();
                play = true;
                out = true;
                firstTimeIn = true;
        
            }));
            reset.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,  () => 
            {
                timerout = setTimeout(()=>{
                    clearTimeout(timerin);
                    out = true;
                    firstTimeIn = true;
                    TweenLite.to(reset.scaling,0.5,{x: 0.40, y:0.40, z: 0.40});
               
                    },10)
               
            }));
        
      
    }
        var createPhoto2 = function()
        {
            let dome = new BABYLON.PhotoDome(
            "scene2",
            "./img/image2.png",
            {
                resolution:32,
                size: 1000,
                faceForward: false
            },
            scene
        )
        
        
        var planGUILink = BABYLON.Mesh.CreatePlane("linkGui", 3);
        var planLink = BABYLON.Mesh.CreateDisc("link", 0.5, 60, scene, false, BABYLON.Mesh.DOUBLESIDE )
        planLink.position = new BABYLON.Vector3(-1.6981479046085077,0,0)
        
        planLink.material = matLink;
        planGUILink.position = planLink.position.add(planLink.position.subtract(camera.position).normalize().scale(0.5));

        
        let observer=scene.onBeforeRenderObservable.add(()=>
            {
                var camPos = scene.activeCamera == vrHelper.webVRCamera ? vrHelper.webVRCamera.devicePosition : scene.activeCamera.position
                var dir1 = planLink.position.subtract(scene.activeCamera.position)
                var dir1_1 = planGUILink.position.subtract(scene.activeCamera.position)
                planLink.lookAt(planLink.position.add(dir1))
                planGUILink.lookAt(planGUILink.position.add(dir1_1))
                
            });
        
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(planGUILink);
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = 0.8;
        rect1.height = "200px";
        rect1.cornerRadius = 90;
        //rect1.color = "white";  //couleur des bordures du rectangle
        rect1.thickness = 2; 
        rect1.background = "purple";
        advancedTexture.addControl(rect1);
        var label = new BABYLON.GUI.TextBlock();
        label.text = "Vers sc3";
        label.fontSize = "150";
        label.color = "white";
        rect1.addControl(label);
        rect1.top = "-350px";
        rect1.isVisible = false;

        //--------Action Managers------------------------------
        
        planLink.actionManager = new BABYLON.ActionManager(scene);
        

     // ------------------TRIGGERS------------------------------------------------

        let out = true;
        var timerin;
        var timerout;
        var firstTimeIn = true;
           //-------------Link------------------------------------------   
        planLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,  () => 
            {
                
                if(!out)
            {
               clearTimeout(timerout);  
            }
            out = false;
            
            
            if(firstTimeIn)
            {
                rect1.isVisible = true;
                TweenLite.to(planLink.scaling,0.5,{x: 1.5, y:1.5, z: 1})
                
            timerin = setTimeout(()=> {
               
                scene.onBeforeRenderObservable.remove(observer);
                
                 out = null;
                 timerin = null;
                 timerout = null;
                 firstTimeIn = null;
                


                label.dispose();
                label = null;
                rect1.dispose();
                rect1 = null;
                advancedTexture.dispose();
                advancedTexture = null;
                planGUILink.dispose();
                planGUILink = null;
                planLink.actionManager.dispose();
                planLink.actionManager = null;
                planLink.dispose();
                planLink = null;
                
                
               dome.dispose();
               dome = null;

               createPhoto3()
            }, 3000)
        }
            firstTimeIn = false;
                
        
            }));
           planLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  () => 
            {
                clearTimeout(timerin);
                setTimeout(()=>
                {
                
                scene.onBeforeRenderObservable.remove(observer);
                
                 out = null;
                 timerin = null;
                 timerout = null;
                 firstTimeIn = null;
                 


                label.dispose();
                label = null;
                rect1.dispose();
                rect1 = null;
                advancedTexture.dispose();
                advancedTexture = null;
                planGUILink.dispose();
                planGUILink = null;
                planLink.actionManager.dispose();
                planLink.actionManager = null;
                planLink.dispose();
                planLink = null;
                
                
                
               dome.dispose();
               dome = null;

                createPhoto3();

                },500)
                
        
            }));
            planLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,  () => 
            {
                timerout = setTimeout(()=>{
                    clearTimeout(timerin);
                    out = true;
                firstTimeIn = true;
                
                TweenLite.to(planLink.scaling,0.5,{x: 1, y:1, z: 1})
                setTimeout(()=>{rect1.isVisible = false},200);
                
               
                    },10)
               
        
            }));
        }

        var createPhoto3 = function()
        {
            let dome = new BABYLON.PhotoDome(
            "scene2",
            "./img/image3.png",
            {
                resolution:32,
                size: 1000,
                faceForward: false
            },
            scene
        )
        
        
        var planGUILink = BABYLON.Mesh.CreatePlane("linkGui", 3);
        var planLink = BABYLON.Mesh.CreateDisc("link", 0.5, 60, scene, false, BABYLON.Mesh.DOUBLESIDE )
        planLink.position = new BABYLON.Vector3(7.892592315735419,0,-5.816237354590933)
        planLink.material = matLink;
        planGUILink.position = planLink.position.add(planLink.position.subtract(camera.position).normalize().scale(0.5));
        
        var planInfo = BABYLON.Mesh.CreateDisc("link", 0.5, 60, scene, false, BABYLON.Mesh.DOUBLESIDE )
        var planGUIInfo = BABYLON.Mesh.CreatePlane("linkGui", 3);
        planInfo.position = new BABYLON.Vector3(1.9047572433093785,0,2.995645484969945)
        planInfo.material = matInfo;
        planGUIInfo.position = planInfo.position.add(planInfo.position.subtract(camera.position).normalize().scale(0.5));
        var closeInfo = new BABYLON.Mesh.CreatePlane("closeInfo",2,scene);
        closeInfo.position = planGUIInfo.position.add(planGUIInfo.position.subtract(camera.position).normalize().scale(-0.5));
        closeInfo.position = closeInfo.position.add(new BABYLON.Vector3(1.5,2.8,0))
        closeInfo.isVisible = false;
        closeInfo.scaling.x = 0.25;
        closeInfo.scaling.y = 0.25;
        
        closeInfo.material = matClose;
        
        let observer=scene.onBeforeRenderObservable.add(()=>
            {
                var camPos = scene.activeCamera == vrHelper.webVRCamera ? vrHelper.webVRCamera.devicePosition : scene.activeCamera.position
                var dir1 = planLink.position.subtract(scene.activeCamera.position)
                var dir1_1 = planGUILink.position.subtract(scene.activeCamera.position)
                var dir2 = planGUIInfo.position.subtract(scene.activeCamera.position)
                var dir2_1 = planInfo.position.subtract(scene.activeCamera.position)
                var dir2_2 = closeInfo.position.subtract(scene.activeCamera.position)
                planLink.lookAt(planLink.position.add(dir1))
                planGUILink.lookAt(planGUILink.position.add(dir1_1))
                planGUIInfo.lookAt(planGUIInfo.position.add(dir2))
                planInfo.lookAt(planInfo.position.add(dir2_1));
                closeInfo.lookAt(closeInfo.position.add(dir2_2));
                
            });
        
        var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(planGUILink);
        var rect1 = new BABYLON.GUI.Rectangle();
        rect1.width = 0.8;
        rect1.height = "200px";
        rect1.cornerRadius = 90;
        //rect1.color = "white";  //couleur des bordures du rectangle
        rect1.thickness = 2; 
        rect1.background = "purple";
        advancedTexture.addControl(rect1);
        var label = new BABYLON.GUI.TextBlock();
        label.text = "Vers sc4";
        label.fontSize = "150";
        label.color = "white";
        rect1.addControl(label);
        rect1.top = "-350px";
        rect1.isVisible = false;

        var advancedTextureInfo = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(planGUIInfo);
            var rectInfo = new BABYLON.GUI.Rectangle();
            rectInfo.width = 0.8;
            rectInfo.height = "200px";
            rectInfo.cornerRadius = 90;
            //rectInfo.color = "white";
            rectInfo.thickness = 2;
            rectInfo.background = "purple";
            advancedTextureInfo.addControl(rectInfo);
            var labelInfo = new BABYLON.GUI.TextBlock();
            labelInfo.text = "Info";
            labelInfo.fontSize = "150"
            labelInfo.color ="white"
            rectInfo.addControl(labelInfo);
            rectInfo.top = "-350px";
            labelInfo.fontFamily = "Arial"
            rectInfo.isVisible = false;

            var sv = new BABYLON.GUI.ScrollViewer();
                sv.thickness = 7;
                sv.color = "#3A4454";
                sv.width = 0.6;
                sv.height = 0.6;
                sv.background = "#3A4454";
                sv.verticalBar.color = "black"
                
                

                advancedTextureInfo.addControl(sv);

                var tb = new BABYLON.GUI.TextBlock();
                tb.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
                tb.resizeToFit = true;
                tb.paddingTop = "5%";
                tb.paddingLeft = "30px";
                tb.paddingRight = "20px"
                tb.paddingBottom = "5%";
                tb.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                tb.verticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                tb.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
                tb.textVerticalAlignment = BABYLON.GUI.Control.VERTICAL_ALIGNMENT_TOP;
                tb.color = "white";
                tb.fontFamily = "Arial";
                
                tb.text = "The Oriente Station is one of the most important bus and train stations in the city. Designed by the Spanish architect and engineer Santiago Calatrava, it has an enormous metal skeleton that covers the eight train lines and its platforms. Finished in 1998 to serve the Expo’98 and, later, the Parque das Nações area, in its surroundings are companies, services, hotels, bars, animation, as well as the well known Vasco da Gama shopping centre.";

                tb.fontSize = "40";
                
                sv.addControl(tb);

    
                var header = new BABYLON.GUI.TextBlock();
                header.textWrapping = BABYLON.GUI.TextWrapping.WordWrap;
                header.text = "Information sur la gare";
                header.height = "100px";
                header.color = "white"
                header.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
                header.fontSize = "40px"
                header.fontFamily = "Arial"
                
               
                

                var headerContainer = new BABYLON.GUI.Rectangle()

            
                headerContainer.width = 0.6;
                headerContainer.height = "100px";
                headerContainer.cornerRadius = 20;
               // headerContainer.color = "#677383";
                headerContainer.thickness = 2;
                headerContainer.background = "#677383";
                headerContainer.top = "-360px";

                advancedTextureInfo.addControl(headerContainer);
                headerContainer.addControl(header);
                sv.isVisible = false;
                headerContainer.isVisible = false;

        //--------Action Managers------------------------------
        
        planLink.actionManager = new BABYLON.ActionManager(scene);
        planInfo.actionManager = new BABYLON.ActionManager(scene);
        closeInfo.actionManager = new BABYLON.ActionManager(scene);

     // ------------------TRIGGERS------------------------------------------------

        let out = true;
        var timerin;
        var timerout;
        var firstTimeIn = true;
        var timerinterval;
        var speed = 0.01;
           //-------------Link------------------------------------------   
        planLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,  () => 
            {
                
                if(!out)
            {
               clearTimeout(timerout);  
            }
            out = false;
            
            
            if(firstTimeIn)
            {
                rect1.isVisible = true;
                TweenLite.to(planLink.scaling,0.5,{x: 1.5, y:1.5, z: 1})
                
            timerin = setTimeout(()=> {
               
                scene.onBeforeRenderObservable.remove(observer);
                
                 out = null;
                 timerin = null;
                 timerout = null;
                 timerinterval = null;
                 firstTimeIn = null;
                 speed = null;

                
                label.dispose();
                label = null;
                rect1.dispose();
                rect1 = null;
                advancedTexture.dispose();
                advancedTexture = null;
                planGUILink.dispose();
                planGUILink = null;
                planLink.actionManager.dispose();
                planLink.actionManager = null;
                planLink.dispose();
                planLink = null;
                

                closeInfo.actionManager.dispose();
                closeInfo.actionManager = null;
                closeInfo.dispose();
                closeInfo = null;
                headerContainer.dispose();
                headerContainer = null;
                header.dispose();
                header = null;
                tb.dispose();
                tb= null;
                sv.dispose();
                sv = null;
                labelInfo.dispose();
                labelInfo = null;
                rectInfo.dispose();
                rectInfo = null;
                planGUIInfo.dispose();
                planGUIInfo = null;
                planInfo.actionManager.dispose();
                planInfo.actionManager = null;
                planInfo.dispose();
                planInfo = null;
                
               dome.dispose();
               dome = null;

               createPhoto4()
            }, 3000)
        }
            firstTimeIn = false;
                
        
            }));
           planLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  () => 
            {
                clearTimeout(timerin);
                setTimeout(()=>
                {
                    scene.onBeforeRenderObservable.remove(observer);
                    out = null;
                 timerin = null;
                 timerout = null;
                 timerinterval = null;
                 firstTimeIn = null;
                 speed = null;

                
                label.dispose();
                label = null;
                rect1.dispose();
                rect1 = null;
                advancedTexture.dispose();
                advancedTexture = null;
                planGUILink.dispose();
                planGUILink = null;
                planLink.actionManager.dispose();
                planLink.actionManager = null;
                planLink.dispose();
                planLink = null;
                

                closeInfo.actionManager.dispose();
                closeInfo.actionManager = null;
                closeInfo.dispose();
                closeInfo = null;
                headerContainer.dispose();
                headerContainer = null;
                header.dispose();
                header = null;
                tb.dispose();
                tb= null;
                sv.dispose();
                sv = null;
                labelInfo.dispose();
                labelInfo = null;
                rectInfo.dispose();
                rectInfo = null;
                planGUIInfo.dispose();
                planGUIInfo = null;
                planInfo.actionManager.dispose();
                planInfo.actionManager = null;
                planInfo.dispose();
                planInfo = null;
                
               dome.dispose();
               dome = null;

               createPhoto4();

                },500)
                
        
            }));
            planLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,  () => 
            {
                timerout = setTimeout(()=>{
                    clearTimeout(timerin);
                    out = true;
                firstTimeIn = true;
                
                TweenLite.to(planLink.scaling,0.5,{x: 1, y:1, z: 1})
                setTimeout(()=>{rect1.isVisible = false},200);
                
               
                    },10)
               
        
            }));


            planInfo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,  () => 
            {
                
                if(!out)
            {
               clearTimeout(timerout);  
            }
            out = false;
            
            
            if(firstTimeIn)
            {
                rectInfo.isVisible = true;
                TweenLite.to(planInfo.scaling,0.5,{x: 1.5, y:1.5, z: 1})
                
            timerin = setTimeout(()=> {
                out = true;
                firstTimeIn = true;
                rectInfo.isVisible = false;
                planGUIInfo.scaling = new BABYLON.Vector3(2,2,1);
                planInfo.isVisible = false;
                sv.isVisible = true;
                headerContainer.isVisible = true;
                closeInfo.isVisible = true;
                timerinterval = setInterval(function(){
                    if(sv.verticalBar.value < 1  )
                    {
                    sv.verticalBar.value +=0.01;
                    }
                   
                },100)
                
            }, 2000)
        }
            firstTimeIn = false;
                
        
            }));
           planInfo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  () => 
            {
                clearTimeout(timerin);
                out = true;
                firstTimeIn = true;
                rectInfo.isVisible = false;
                planGUIInfo.scaling = new BABYLON.Vector3(2,2,1);
                planInfo.isVisible = false;
                sv.isVisible = true;
                headerContainer.isVisible = true;
                closeInfo.isVisible = true;
                timerinterval = setInterval(function(){
                    if(sv.verticalBar.value < 1  )
                    {
                    sv.verticalBar.value +=speed;
                    }
                    
                },100)
                
        
            }));
            planInfo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,  () => 
            {
                timerout = setTimeout(()=>{
                    clearTimeout(timerin);
                    out = true;
                    firstTimeIn = true;
                
                    TweenLite.to(planInfo.scaling,0.5,{x: 1, y:1, z: 1})
                    setTimeout(()=>{rectInfo.isVisible = false},200);
                
               
                    },10)
               
        
            }));

            closeInfo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,  () => 
            {
                
                if(!out)
            {
               clearTimeout(timerout);  
            }
            out = false;
            
            
            if(firstTimeIn)
            {
            
            TweenLite.to(closeInfo.scaling,0.5,{x: 0.5, y:0.5, z: 0.25})
            timerin = setTimeout(()=> {
                
               out = true;
               firstTimeIn = true;
               clearInterval(timerinterval)
               closeInfo.isVisible = false;
                sv.isVisible = false;
                headerContainer.isVisible = false;
                planInfo.isVisible = true;
                planGUIInfo.scaling = new BABYLON.Vector3(1,1,1);
                sv.verticalBar.value = 0;
                
                
            }, 1000)
        }
            firstTimeIn = false;
                
        
            }));
           closeInfo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  () => 
            {
                clearTimeout(timerin);
                out = true;
                firstTimeIn = true;
                clearInterval(timerinterval)
                closeInfo.isVisible = false;
                sv.isVisible = false;
                headerContainer.isVisible = false;
                planInfo.isVisible = true;
                planGUIInfo.scaling = new BABYLON.Vector3(1,1,1);
                sv.verticalBar.value = 0;
                
        
            }));
            closeInfo.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,  () => 
            {
                timerout = setTimeout(()=>{
                    clearTimeout(timerin);
                    out = true;
                    firstTimeIn = true;
                    TweenLite.to(closeInfo.scaling,0.5,{x: 0.25, y:0.25, z: 0.25});
               
                    },10)
               
            }));
        }

        var createPhoto4 = function()
        {
            let dome = new BABYLON.PhotoDome(
                "scene4",
                "./img/image4.png",
                {
                    resolution:32,
                    size: 1000,
                    faceForward: false
                },
                scene
            )
            
            var planGUILink = BABYLON.Mesh.CreatePlane("linkGui", 3);
            var planLink = BABYLON.Mesh.CreateDisc("link", 0.5, 60, scene, false, BABYLON.Mesh.DOUBLESIDE )
            planLink.position = new BABYLON.Vector3(9.892592315735419,0,-4.816237354590933)
            planLink.material = matLink;
            planGUILink.position = planLink.position.add(planLink.position.subtract(camera.position).normalize().scale(0.5));
           
          
            var observer=scene.onBeforeRenderObservable.add(()=>
            {
                var camPos = scene.activeCamera == vrHelper.webVRCamera ? vrHelper.webVRCamera.devicePosition : scene.activeCamera.position
                var dir1 = planLink.position.subtract(scene.activeCamera.position)
                var dir1_1 = planGUILink.position.subtract(scene.activeCamera.position)
                planLink.lookAt(planLink.position.add(dir1))
                planGUILink.lookAt(planGUILink.position.add(dir1_1))
            });
            var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateForMesh(planGUILink);
            var rect1 = new BABYLON.GUI.Rectangle();
            rect1.width = 0.8;
            rect1.height = "200px";
            rect1.cornerRadius = 90;
            //rect1.color = "white";  //couleur des bordures du rectangle
            rect1.thickness = 2; 
            rect1.background = "purple";
            advancedTexture.addControl(rect1);
            var label = new BABYLON.GUI.TextBlock();
            label.text = "Vers sc1";
            label.fontSize = "150";
            label.color = "white";
            rect1.addControl(label);
            rect1.top = "-350px";
            rect1.isVisible = false;

            planLink.actionManager = new BABYLON.ActionManager(scene);


            let out = true;
            var timerin;
            var timerout;
            var firstTimeIn = true;


            planLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger,  () => 
            {
                
                if(!out)
            {
               clearTimeout(timerout);  
            }
            out = false;
            
            
            if(firstTimeIn)
            {
                rect1.isVisible = true;
                TweenLite.to(planLink.scaling,0.5,{x: 1.5, y:1.5, z: 1})
                
            timerin = setTimeout(()=> {
               
                scene.onBeforeRenderObservable.remove(observer);
                
                 out = null;
                 timerin = null;
                 timerout = null;
                 firstTimeIn = null;
               

                
                label.dispose();
                label = null;
                rect1.dispose();
                rect1 = null;
                advancedTexture.dispose();
                advancedTexture = null;
                planGUILink.dispose();
                planGUILink = null;
                planLink.actionManager.dispose();
                planLink.actionManager = null;
                planLink.dispose();
                planLink = null;
                

                
                
               dome.dispose();
               dome = null;

               createPhoto1()
            }, 3000)
        }
            firstTimeIn = false;
                
        
            }));
           planLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickUpTrigger,  () => 
            {
                clearTimeout(timerin);
                setTimeout(()=>
                {
                    scene.onBeforeRenderObservable.remove(observer);
                
                out = null;
                timerin = null;
                timerout = null;
                firstTimeIn = null;
              

               
               label.dispose();
               label = null;
               rect1.dispose();
               rect1 = null;
               advancedTexture.dispose();
               advancedTexture = null;
               planGUILink.dispose();
               planGUILink = null;
               planLink.actionManager.dispose();
               planLink.actionManager = null;
               planLink.dispose();
               planLink = null;
               

               
               
              dome.dispose();
              dome = null;

              createPhoto1()
                },500)
                
        
            }));
            planLink.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger,  () => 
            {
                timerout = setTimeout(()=>{
                    clearTimeout(timerin);
                    out = true;
                firstTimeIn = true;
                
                TweenLite.to(planLink.scaling,0.5,{x: 1, y:1, z: 1})
                setTimeout(()=>{rect1.isVisible = false},200);
                
               
                    },10)
               
        
            }));

        }
        }
        /*
         // Create utility layer the gizmo will be rendered on
            var utilLayer = new BABYLON.UtilityLayerRenderer(scene);

         // Create the position gizmo and attach to the sphere
            var gizmoPosition = new BABYLON.PositionGizmo(utilLayer);
            gizmoPosition.attachedMesh = planeInfo;

        // Keep the gizmo fixed to world rotation
        gizmoPosition.updateGizmoRotationToMatchAttachedMesh = false;
        gizmoPosition.updateGizmoPositionToMatchAttachedMesh = true;

        gizmoPosition.onDragEndObservable.add(() => {
            console.log(planeLink.position)
        })
        */
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
