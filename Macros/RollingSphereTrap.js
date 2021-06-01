let contentText = "<p style=\"text-align:center;\">You step forward but the tile beneath your foot sinks down with a *clrrrnnnnk* <br><br> You hear something release up the corridor ahead of you and a huge, 20 ft spherical object crashes to the floor and begins to roll towards you! Filling the corridor completely <br><br><img src=\"images/Traps/sphere.png\" width=\"100\"></p> ";

let macroActor = actor;
let firstMessage = " triggered a trap!";
let secondMessage = "run for your lives!!!!";
let chatMessage1 = `${macroActor.name} ${firstMessage}`;

let chatData = 
{
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: chatMessage1
};

ChatMessage.create(chatData, {});
game.togglePause(true, true);
new Dialog(
{
    title: "Trap!",
    content: contentText,
    buttons: 
    {
        Ok:
        {
          label: "Shit...",
          callback: () =>
          {
              chatData.content = secondMessage;
              ChatMessage.create(chatData, {});
          }
        }
    },
}).render(true)

d.position.height = 100;
d.render(true)