let contentText = "<p style=\"text-align:center;\">As you take a step forward you feel some resistance across your shin. Looking down you see a tripwire.. uh oh.<br><br> A grating nosie above draws yours eyes to the cieling.<br><br> Make a <strong>Dexterity Saving Throw</strong> <br>to avoid the falling spikes! <br><br><img src=\"images/Traps/icons/spikefall.png\"></p> ";

let macroActor = actor;
let firstMessage = " triggered a trap!";
let successMessage = " was skinned by the spikes, only taking ";
let failureMessage = " was impaled by the falling spikes, taking ";
let damageMessage = " points of piercing damage!";
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
                        var damage = new Roll("1d10").roll();
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

