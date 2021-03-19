let ability = "";

let savingThrowDialog = new Dialog({
    title: "Saving Throws",
    content: `<style>
    #savingThrowSelector .dialog-buttons {
        flex-direction: column;
        max-width: 200px;
    
    }
    </style>`,
    buttons: 
    {
        Str:
        {
            label: "Strength",
            callback: () => {
                ability = "str";
            }
        },
        Dex:
        {
            label: "Dexterity",
            callback: () => {
                ability = "dex";
            }
        },
        Con:
        {
            label: "Constitution",
            callback: () => {
                ability = "con";
            }
        },
        Int:
        {
            label: "Intelligence",
            callback: () => {
                ability = "int";
            }
        },
        Wis:
        {
            label: "Wisdom",
            callback: () => {
                ability = "wis";
            }
        },
        Cha:
        {
            label: "Charisma",
            callback: () => {
                ability = "cha";
            }
        }
    },
    close: () => {
        for (const token of canvas.tokens.controlled)
        {
          token.actor.rollAbilitySave(ability);
        }
    }
}, {id: "savingThrowSelector"});

savingThrowDialog.options.width = 200;
savingThrowDialog.position.width = 200;
savingThrowDialog.render(true);