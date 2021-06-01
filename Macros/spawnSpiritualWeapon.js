function getMousePosition() {
  const mouse = canvas.app.renderer.plugins.interaction.mouse;
  return mouse.getLocalPosition(canvas.app.stage);
}
 
function getCenterGrid(point = {})
{
  const arr = canvas.grid.getCenter(point.x, point.y);
  return { x: arr[0], y : arr[1] };
}
 
let gNumSpawned = 0;
let gNeedSpawn = 1;
let gCurrentActor;
async function handleClick(event){
    if(gNumSpawned < gNeedSpawn && !!gCurrentActor){
        await spawnActor(gCurrentActor);
        gNumSpawned++
    }
}
 
function captureClick()
{
  $(document.body).on("click", handleClick);
}
 
function stopCapture() {
   $(document.body).off("click", handleClick); 
}
 
const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
 
async function sleepWhilePlacing(){
    while(gNumSpawned<gNeedSpawn){
        await wait(100);
    }
}
 
//global current token to spawn
 
async function spawnActor(actorName) {
     const scene = game.scenes.get(game.user.viewedScene);
     let protoToken = duplicate(game.actors.getName(actorName).data.token);
 
     let location = getCenterGrid(getMousePosition());
 
     protoToken.x = location.x;
     protoToken.y = location.y;
 
     // Increase this offset for larger summons
     protoToken.x -= (scene.data.grid/2+(protoToken.width-1)*scene.data.grid);
     protoToken.y -= (scene.data.grid/2+(protoToken.height-1)*scene.data.grid);
 
     return canvas.tokens.createMany(protoToken,{});
 }
 
(async () => {

    ui.notifications.info("Click to place Spiritual Weapon");

    await wait(500);
 
    captureClick();
 
    gCurrentActor = "Spiritual Weapon";
    gNumSpawned = 0;
    gNeedSpawn = 1
 
    await sleepWhilePlacing();
 
    stopCapture();
 
    ui.notifications.info("Done!");
 
})();