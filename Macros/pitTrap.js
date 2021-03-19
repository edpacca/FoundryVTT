let contentText = "<p style=\"text-align:center;\">You take a step forward, but the ground gives way beneath you. <br><br> Make a <strong>Dexterity Saving Throw</strong> <br>to avoid falling 10ft into the hidden pit! <br><br> <img src=\"images/Traps/icons/pit.png\"></p> ";

let macroActor = actor;
let firstMessage = " triggered a trap!";
let successMessage = " made it out unscathed...";
let failureMessage1 = " fell into the trap and took ";
let failureMessage2 = " points of bludgeoning damage! ouch";
let failureDamage = 0;
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
                                var damage = new Roll("1d6").roll();
                                damage.toMessage();
                                failureDamage = damage.total;
                            }
                        },
                    },
                    close: () => 
                    {
                        if(success)
                        {
                            chatMessage2 = `${macroActor.name} ${successMessage}`;
                        } 
                        else 
                        {
                            chatMessage2 = `${macroActor.name} ${failureMessage1} ${failureDamage} ${failureMessage2}`;
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

