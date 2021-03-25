let macroActor;

if(actor === null) 
{
    ui.notifications.error('You must target at least one token');
}
else
{
    macroActor = actor;
    let chatData0 = {
        user: game.user._id,
        speaker: ChatMessage.getSpeaker(),
        content: actor.name + " is keeping a lookout.",
    };
    ChatMessage.create(chatData0, {});
    
    let rollDialog = new Dialog({
        title: "Perception check",
        content: "Make a perception check to keep a look-out as you travel...",
        buttons: {
            perecptionCheck: {
                icon: '<i class="fas fa-dice-d20"></i>',
                label: "<strong>Perception Check</strong>",
                callback: () => {
                    actor.rollSkill("prc");
                }
            }
        }
    
    }).render(true);
}