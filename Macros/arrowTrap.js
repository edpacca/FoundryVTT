let contentText = "<p style=\"text-align:center;\">You take a step onto the next tile and feel it sink slightly beneath your weight...<br><br>\"shhhhtnkk!\"<br><br>Arrows suddenly fly out of small holes in the wall towards you!<br><br> <img src=\"images/Traps/icons/arrows.png\"></p> ";

let macroActor = actor;
let firstMessage = " stepped on a pressure plate.. \"Shhhttnk!\"";
let chatMessage1 = `${macroActor.name} ${firstMessage}`;

let chatData1 = 
{
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: chatMessage1
};

ChatMessage.create(chatData1, {});

new Dialog(
    {
        title: "Trap!",
        content: contentText,
        buttons: 
        {
            failure: 
            {
                label: "Roll...",
                icon: '<i class="fas fa-dice-d20"></i>',
            }
        },
        close: () => 
        {
            var hit = new Roll("1d20 + 3").roll();
            var damage = new Roll("1d6").roll();
            hit.toMessage();
            damage.toMessage();
        }
    }).render(true)
