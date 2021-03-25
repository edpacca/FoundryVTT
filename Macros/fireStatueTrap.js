let contentText = "<p style=\"text-align:center;\">You take a step onto the next tile and feel it sink slightly beneath your weight...<br><br> A hot glow grows in the mouth of the statue adjacent to you. <br><br> Make a <strong>Dexterity Saving Throw</strong> <br>to try and dodge the gout of flame! <br><br><img src=\"images/Traps/icons/fireStatue.png\"></p> ";

let macroActor = actor;
let firstMessage = " triggered a trap!";
let successMessage = " was lightly charred by the fire trap, only taking ";
let failureMessage = " was roasted alive by the fire statue! taking ";
let damageMessage = " points of fire damage!";
let chatMessage1 = `${macroActor.name} ${firstMessage}`;
let chatMessage2 = "";
let success = false;

let chatData1 = 
{
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: chatMessage1
};

ChatMessage.create(chatData1, {});
game.togglePause(true, true);
new Dialog(
{
    title: "Trap!",
    content: contentText,
    buttons: 
    {
        DexSave: 
        {
            label: "Dex Save",
            callback: () => 
            {
                macroActor.rollAbilitySave("dex");
                new Dialog(
                {
                    icon: '<i class="fas fa-dice-d20"></i>',
                    content: "Dexterity Saving Throw",
                    buttons: 
                    {
                        success: 
                        {
                            icon: '<i class="fas fa-check"></i>',
                            label: "Success",
                            callback: () => 
                            {
                                success = true;
                            }
                        },
                        failure: 
                        {
                            icon: '<i class="fas fa-times"></i>',
                            label:"Failure",
                            callback: () => 
                            {
                                success = false;
                            }
                        },
                    },
                    close: () => 
                    {
                        var damage = new Roll("2d6").roll();
                        damage.toMessage();

                        if(success)
                        {
                            chatMessage2 = `${macroActor.name} ${successMessage}${parseInt(damage.total/2)}${damageMessage}`;
                        } 
                        else 
                        {
                            chatMessage2 = `${macroActor.name} ${failureMessage} ${damage.total}${damageMessage}`;
                        }
                        
                        let chatData2 = 
                        {
                            user: game.user._id,
                            speaker: ChatMessage.getSpeaker(),
                            content: chatMessage2
                        };

                            ChatMessage.create(chatData2, {});
                    }
                }).render(true)},
            }},
}).render(true)

