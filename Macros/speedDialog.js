let speedTexts = [
    "The Gangbangers are travelling at a <strong>slow and stealthy</strong> pace. <br> <img src=\"images/Icons/speed/slow.png\"  width=\"75\">",
    "The Gangbangers are travelling at at an <strong>normal</strong> pace. <br> <img src=\"icons/equipment/feet/boots-collared-leather.webp\"  width=\"75\">",
    "The Gangbangers are travelling at a <strong>fast and hurried</strong> pace. <br> <img src=\"images/Icons/speed/fast.png\"  width=\"75\">",
]

let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: "",
};

let speeds = [
    {name: "slow", modifier: 0.6},
    {name: "average", modifier: 1},
    {name: "fast", modifier: 1.4},
]

let terrains = [
    {terrain: "standard", modifier: 1},
    {terrain: "jungle", modifier: 0.5},
    {terrain: "mountain", modifier: 0.75},
]

const normalDistance = 20;
const normalTime = 8;
const normalSpeed = 2.5;

let distance = 20;
let terrainSpeed = 2.5;
let time = 8;

let distanceDialog = new Dialog({
        title: "Travel speed",
        content: `
        <p style = \"text-align: center\">You can travel for 8 hours a day before risking exhaustion. <br> How many miles do you wish to travel?</p>
         <form>
          <div class="form-group">
           <input id="distance-value" name="distance-value"></input>
          </div>
         </form>
         <br>
         <p style = \"text-align: center\">What is the terrain like?</p>
         `,
         buttons: {
            standard: {
                icon: '<i class="fas fa-shoe-prints"></i>',
                label: "Standard",
                callback: html => {
                    distance = parseInt(html.find('[name=distance-value]')[0].value);
                    terrainSpeed = normalSpeed * terrains[0].modifier;
                }
            },
            jungle: {
                icon: '<i class="fas fa-shoe-prints"></i>',
                label: "Jungle",
                callback: html => {
                    distance = parseInt(html.find('[name=distance-value]')[0].value);
                    terrainSpeed = normalSpeed * terrains[1].modifier;
                }
            },
            mountain: {
                icon: '<i class="fas fa-shoe-prints"></i>',
                label: "Mountain",
                callback: html => {
                    distance = parseInt(html.find('[name=distance-value]')[0].value);
                    terrainSpeed = normalSpeed * terrains[2].modifier;
                }
            }
        },
        default: "standard",

        close: () => {

            new Dialog({
                title: "Travel speed",
                content: "<p style=\"text-align: center\">How fast do you wish to travel?</p>",
                buttons: {
                    slow: {
                        icon: '<i class="fas fa-shoe-prints"></i>',
                        label: "<strong>Slow pace</strong> <br>" + distance + " mi in " + parseInt((distance / (speeds[0].modifier * terrainSpeed))) + "h. <br>" +  parseInt((8 * (speeds[0].modifier * terrainSpeed))) + " mi in 8h",
                        callback: () => {
                            chatData.content = speedTexts[0];
                            ChatMessage.create(chatData, {});
                        }
                    },
                    average: {
                        icon: '<i class="fas fa-hiking"></i>',
                        label: "<strong>Normal pace</strong> <br>" + distance + " mi in " + parseInt((distance / (speeds[1].modifier * terrainSpeed))) + "h. <br>" +  parseInt((8 * (speeds[1].modifier * terrainSpeed))) + " mi in 8h",
                        callback: () => {
                            chatData.content = speedTexts[1];
                            ChatMessage.create(chatData, {});
                        }
                    },
                    fast: {
                        icon: '<i class="fas fa-running"></i>',
                        label: "<strong>Fast pace</strong> <br>" + distance + " mi in " + parseInt((distance / (speeds[2].modifier * terrainSpeed))) + "h. <br>" +  parseInt((8 * (speeds[2].modifier * terrainSpeed))) + " mi in 8h",
                        callback: () => {
                            chatData.content = speedTexts[2];
                            ChatMessage.create(chatData, {});
                        }
                    }
                },
            }).render(true);
        }

}).render(true);



