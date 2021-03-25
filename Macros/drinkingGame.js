let macroActor = actor;
let macroToken = canvas.tokens.controlled[0];
let player = macroActor.name;

let fails = 0;
let playerPoints = 0; 
let currentDrink = 0;
let conSave = actor.data.data.abilities.con.save;
let quit = false;
let win = 10;
let firstTime = true;
let justLost = false;

const wait = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: "",
};

let drinks = [
    {name: "Summer Breeze Ale", level: 10, points: 1, image: "<img src=\"icons/containers/kitchenware/mug-simple-wooden-brown.webp\" width=\"100\">"},
    {name: "Granite Tooth Porter", level: 14, points: 2, image: "<img src=\"icons/containers/kitchenware/mug-steel-wood-brown.webp\" width=\"100\">"},
    {name: "Frost Breath Liquor", level: 17, points: 3, image: "<img src=\"icons/containers/kitchenware/stein-empty.webp\" width=\"100\">"},
    {name: "Black Dragon\'s Piss", level: 20, points: 4, image: "<img src=\"icons/containers/kitchenware/mug-stein-grey.webp\" width=\"100\">"},
];

let dialogTexts = [
    `Time te drink! Choose yer poison...`,
    `Rack up 10 drinking points before 3 failures to be crowned a Pickfort drinking champion! <br> But beware, the more times you fail the harder it gets!`,
    `Ready, steady, chug!!`,
];

let chatTexts = [
    ` steps up to the bar with a `,
    ` downed it like a champion!`,
    ` failed to finish their drink.`,
];

let failTexts = [
    ` is looking a little woozy`,
    ` is absolutely wasted. (poisoned)`,
    ` threw up and passed out!`,
];

let bubbleTexts = [
    `call this a challenge?!`,
    `*belches*`,
    `ooer.. I don't feel too good`,
    `hic.. `,
    `screw this.. I quit!`,
];

let drinkDialog = new Dialog(
    {
        title: "Pickfort drinking contest",
        content:` <p style=\"text-align:center;\"> 
        <strong>${dialogTexts[0]}</strong> <br>
        ${dialogTexts[1]} </p>
        <style>
    #drinkingGame .dialog-buttons {
        max-width: 900px;  }
        </style>
        `,
        buttons: 
        {
            Light: 
            {
                label: "<p style=\"text-align: center\"> <strong>" + drinks[0].name + "</strong><br> Challenge: " + drinks[0].level + "</p>" + drinks[0].image,
                callback: () => 
                {
                    currentDrink = 0;
                    chatData.content = player + chatTexts[0] + drinks[currentDrink].name;

                    let rollDialog = new Dialog({
                      title: "Chug!",
                      content:` <p style=\"text-align:center;\"> 
                      <strong>${dialogTexts[2]}</strong></p>
                      <style>
                    #rollingDialog .dialog-buttons {
                      height: 200px;  }
                      </style>
                      `,
                      buttons:
                      {
                          Drink:
                          {
                            label: "<p style=\"text-align: center\"> <strong>" + drinks[currentDrink].name + "</strong> <br> for " + drinks[currentDrink].points + " point</p>" + drinks[currentDrink].image,
                            callback: () => {
                                RollToDrink();
                            }
                          },
                          Cancel: 
                          {
                              label:  "<p style=\"text-align: center\"> <strong> Quit </strong></p><img src=\"icons/svg/bones.svg\" width=\"100\">",
                              callback: () => {
                                  quit = true;
                              }
                          }
                      },
                      default: "Drink",
                      close: () => {
                        Results();
                      }
                    }, {id: "rollingDialog"});
                    rollDialog.render(true);
                }
            },
            Medium: 
            {
                label: "<p style=\"text-align: center\"> <strong>" + drinks[1].name + "</strong><br> Challenge: " + drinks[1].level + "</p>" + drinks[1].image,
                callback: () => 
                {
                    currentDrink = 1;
                    chatData.content = player + chatTexts[0] + drinks[currentDrink].name;
                    ChatMessage.create(chatData, {});
                    let rollDialog = new Dialog({
                      title: "Chug!",
                      content:` <p style=\"text-align:center;\"> 
                      <strong>${dialogTexts[2]}</strong></p>
                      <style>
                    #rollingDialog .dialog-buttons {
                      height: 200px;  }
                      </style>
                      `,
                      buttons:
                      {
                          Drink:
                          {
                            label: "<p style=\"text-align: center\"> <strong>" + drinks[currentDrink].name + "</strong> <br> for " + drinks[currentDrink].points + " points</p>" + drinks[currentDrink].image,
                            callback: () =>
                            {
                                RollToDrink();
                            }
                          },
                          Cancel: 
                          {
                              label:  "<p style=\"text-align: center\"> <strong> Quit </strong></p><img src=\"icons/svg/bones.svg\" width=\"100\">",
                              callback: () => {
                                  quit = true;
                              }
                          }
                      },
                      default: "Drink",
                      close: () => {
                        Results();
                      }
                    }, {id: "rollingDialog"});
                    rollDialog.render(true);
                }
            },
            Heavy: 
            {
                label: "<p style=\"text-align: center\"> <strong>" + drinks[2].name + "</strong><br> Challenge: " + drinks[2].level + "</p>" + drinks[2].image,
                callback: () => 
                {
                    currentDrink = 2;
                    chatData.content = player + chatTexts[0] + drinks[currentDrink].name;
                    ChatMessage.create(chatData, {});
                    let rollDialog = new Dialog({
                      title: "Chug!",
                      content:` <p style=\"text-align:center;\"> 
                      <strong>${dialogTexts[2]}</strong></p>
                      <style>
                    #rollingDialog .dialog-buttons {
                      height: 200px;  }
                      </style>
                      `,
                      buttons:
                      {
                          Drink:
                          {
                            label: "<p style=\"text-align: center\"> <strong>" + drinks[currentDrink].name + "</strong> <br> for " + drinks[currentDrink].points + " points</p>" + drinks[currentDrink].image,
                            callback: () =>
                            {
                                RollToDrink();
                            }
                          },
                          Cancel: 
                          {
                              label:  "<p style=\"text-align: center\"> <strong> Quit </strong></p><img src=\"icons/svg/bones.svg\" width=\"100\">",
                              callback: () => {
                                  quit = true;
                              }
                          }
                      },
                      default: "Drink",
                      close: () => {
                        Results();
                      }
                    }, {id: "rollingDialog"});
                    rollDialog.render(true);
                }
            },
            Insane: 
            {
                label: "<p style=\"text-align: center\"> <strong>" + drinks[3].name + "</strong><br> Challenge: " + drinks[3].level + "</p>" + drinks[3].image,
                callback: () => 
                {
                    currentDrink = 3;
                    chatData.content = player + chatTexts[0] + drinks[currentDrink].name;
                    ChatMessage.create(chatData, {});
                    let rollDialog = new Dialog({
                      title: "Chug!",
                      content:` <p style=\"text-align:center;\"> 
                      <strong>${dialogTexts[2]}</strong></p>
                      <style>
                    #rollingDialog .dialog-buttons {
                      height: 200px;  }
                      </style>
                      `,
                      buttons:
                      {
                          Drink:
                          {
                            label: "<p style=\"text-align: center\"> <strong>" + drinks[currentDrink].name + "</strong> <br> for " + drinks[currentDrink].points + " points</p>" + drinks[currentDrink].image,
                            callback: () =>
                            {
                                RollToDrink();
                            }
                          },
                          Cancel: 
                          {
                              label:  "<p style=\"text-align: center\"> <strong> Quit </strong></p><img src=\"icons/svg/bones.svg\" width=\"100\">",
                              callback: () => {
                                  quit = true;
                              }
                          }
                      },
                      default: "Drink",
                      close: () => {
                        Results();
                      }
                    }, {id: "rollingDialog"});

                    rollDialog.render(true);
                }
            },
            Cancel: 
            {
                label:  "<p style=\"text-align: center\"> <strong> Quit </strong></p><img src=\"icons/svg/bones.svg\" width=\"100\">",
                callback: () => {
                    quit = true;
                }
            },
        },

        default: "Cancel",
        render: () => { 
            if (firstTime)
            {
                chatData.content = player + " has entered a drinking competition!";
                ChatMessage.create(chatData, {});
                AudioHelper.play({src: "audio/effects/drinking/drink_start.ogg", volume: 0.8, autoplay: true, loop: false}, true);
                firstTime = false;
            }
        },
        close: () => {
            if (quit === true)
            {
                var chat = new ChatBubbles();
                chat.say(macroToken, bubbleTexts[4], true);
                chatData.content = player + " quit the competition.";
                ChatMessage.create(chatData, {});
            }
        }
    }, {id: "drinkingGame"});

    drinkDialog.position.width = 900;
    drinkDialog.position.height = 300;
    drinkDialog.render(true);

async function Results()
{
    await wait(2500);

    if (fails > 0 && justLost === true)
    {
        chatData.content = player + failTexts[fails - 1];
        ChatMessage.create(chatData, {});
        AudioHelper.play({src: `audio/effects/drinking/drink_fail.ogg`, volume: 0.8, autoplay: true, loop: false}, true);
        AudioHelper.play({src: `audio/effects/drinking/drink_fail${fails}.ogg`, volume: 0.8, autoplay: true, loop: false}, true);
        var chat = new ChatBubbles();
        chat.say(macroToken, bubbleTexts[fails], true);
        justLost = false;
    }
    else if (quit != true)
    {
        chatData.content = player + chatTexts[1];
        ChatMessage.create(chatData, {});
        AudioHelper.play({src: `audio/effects/drinking/drink_success.ogg`, volume: 0.8, autoplay: true, loop: false}, true);
        var chat = new ChatBubbles();
        chat.say(macroToken, bubbleTexts[0], true);
    }

    if (fails === 3)
    {
        chatData.content = player + " is out of the competition!";
        ChatMessage.create(chatData, {});
    }
    else if (playerPoints >= win)
    {
        AudioHelper.play({src: `audio/effects/drinking/drink_win.ogg`, volume: 0.8, autoplay: true, loop: false}, true);
        chatData.content = player + " is a drinking champion!";
        ChatMessage.create(chatData, {});
    }
    else if (quit === true)
    {
        var chat = new ChatBubbles();
        chat.say(macroToken, bubbleTexts[4], true);
        chatData.content = player + " quit the competition.";
        ChatMessage.create(chatData, {});
    }

    if (fails < 3)
    {
        chatData.content = player + " has " + playerPoints + " points, and " + fails + " failed attemps!";
        ChatMessage.create(chatData, {});
    }
}

function RollToDrink()
{
    AudioHelper.play({src: `audio/effects/drinking/glug.ogg`, volume: 0.8, autoplay: true, loop: false}, true);
    let roll;
                    
    if (fails === 1) 
    {
        roll = new Roll(`1d20 + ${conSave} - 2`).roll();
    }
    else if (fails === 2)
    {
        roll = new Roll(`2d20kl + ${conSave} - 2`).roll();
    }
    else
    {
        roll = new Roll(`1d20 + ${conSave}`).roll();
    }

    roll.toMessage();

    if (roll.total >= drinks[currentDrink].level)
    {
        playerPoints += drinks[currentDrink].points;
    }
    else
    {
        fails += 1;
        justLost = true;
    }

    if (fails < 3 && playerPoints < win)
    {
        drinkDialog.render(true);
    }
}
  