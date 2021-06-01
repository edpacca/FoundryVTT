let macroTokens = canvas.tokens.controlled;

let lootTables = [
    "Currency CR 0",
    "Currency CR 1 - 4",
    "Currency CR 5 - 10",
    "Currency CR 11 - 16",
    "Currency CR 17+"
];

if (macroTokens.length === 0) {
    ui.notifications.warn("Please select tokens first");
}
else
{
    for (let token of macroTokens)
    {
  
        let cr = token.actor.data.data.details.cr;

        if (cr === null || cr === undefined)
        {
            ui.notifications.warn("Please only select npc tokens.");
        }
        else 
        {
            let macroActor = token.actor;
            let table = GetLootTable(cr);
            let currency = [];
                
            let result = table.roll().results;
        
            for (let r of result){
                let entity = game.items.get(r.resultId);
                console.log(entity);
                currency.push(entity);    
            }
        
            macroActor.createEmbeddedEntity("OwnedItem", currency, { noHook: true });
        }
    }
};


function GetLootTable(cr) {

    if (cr >= 17) {
        return game.tables.entities.find(t => t.name === lootTables[4]);
    }
    else if (cr >= 11) {
        return game.tables.entities.find(t => t.name === lootTables[3]);
    }
    else if (cr >= 5) {
        return game.tables.entities.find(t => t.name === lootTables[2]);
    }
    else if (cr >= 1) {
        return game.tables.entities.find(t => t.name === lootTables[1]);
    }
    else {
        return game.tables.entities.find(t => t.name === lootTables[0]);
    }
}
