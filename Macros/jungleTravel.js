let macroActor = actor;
const navTable = game.tables.entities.find(t => t.name === "Jungle Navigation Consequences");
const weatherTable = game.tables.entities.find(t => t.name === "Weather");

let chatData = {
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: "",
};

let messages = [
    actor.name + " is helming the navigation.",
    actor.name + " seems to have navigated successfully",
    actor.name + " looks a little bit lost.",
]

weatherTable.draw();

let rollDialog = new Dialog({
    title: "Navigation check",
    content: "Make a survival check to navigate the jungle paths...",
    buttons: {
        survivalCheck: {
            icon: '<i class="fas fa-dice-d20"></i>',
            label: "<strong>Survival Check</strong>",
            callback: () => {
                actor.rollSkill("sur");
                chatData.content = messages[0];
                ChatMessage.create(chatData, {});
                
                resultDialog.render(true);
            }
        }
    }

}).render(true);

let resultDialog = new Dialog({
    title: "Navigation check",
    content: "Make a survival check to navigate the jungle paths...",
    buttons: {
        success: {
            icon: '<i class="fas fa-check"></i>',
            label: "Success",
            callback: () => {
                chatData.content = messages[1];
                ChatMessage.create(chatData, {});
            }
        },
        failure: {
            icon: '<i class="fas fa-check"></i>',
            label: "Fail",
            callback: () => {
                chatData.content = messages[2];
                ChatMessage.create(chatData, {});

                navTable.draw();
            }
        }
    }
});
