const contentText = "<p style=\"text-align:center;\">As you take a step forward you feel some resistance across your shin. You have triggered a tripwire releasing a net covering a 10ft square around you! <br><br> You are restrained. Make a <strong>Strength Saving Throw</strong> to avoid being knocked prone.<br><br> <img src=\"images/Traps/icons/net.png\"></p> ";

const restrainedReferenceId = "@Compendium[dnd5e.rules.QRKWz3p6v9Rl1Tzh]";
const restrainedIconPath = "modules/combat-utility-belt/icons/restrained.svg";
const proneReferenceId = "@Compendium[dnd5e.rules.ZkXz0qdkNBkKE6tN]";
const proneIconPath = "modules/combat-utility-belt/icons/prone.svg";

let macroActor = actor;
let macroToken = token;
let firstMessage = " triggered a trap!";
let successMessage = " is " + restrainedReferenceId +"  but still standing...";
let failureMessage = "was knocked " + proneReferenceId + " by the falling net, and is " + restrainedReferenceId;
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
            label: "Strength Save",
            callback: () => 
            {
                macroActor.rollAbilitySave("str");
                new Dialog(
                {
                    content: "Strength Saving Throw",
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
                        if(success)
                        {
                            chatMessage2 = `${macroActor.name} ${successMessage}`;
                        } 
                        else 
                        {
                            chatMessage2 = `${macroActor.name} ${failureMessage}`;
                            macroToken.toggleEffect(proneIconPath);  
                        }

                        macroToken.toggleEffect(restrainedIconPath);  

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

