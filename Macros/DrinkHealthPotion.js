main()

async function main(){
    if (canvas.tokens.controlled.length != 1){
        ui.notifications.error("Please select a single token");
        return;
    }

    let actor = canvas.tokens.controlled[0].actor;
    let potions = actor.data.items.filter(item => item.data.consumableType == "potion" && item.name.toLowerCase().includes("healing"));

    if (potions.length == 0){
        ui.notifications.warn("No Healing Potions in inventory");
        return;
    }
    else{

        let potionOptions = ""

        for(let potion of potions){
            potionOptions += `<option value=${potion.name}>${potion.name}: ${potion.data.quantity} remaining</option>`
          }
        
          let dialogTemplate = `
          <h1> Choose a Potion </h1>
          <div>
            <div><select id="potion">${potionOptions}</select></div>
            </div>
          `

          let potionDialog = new Dialog({
            title: "Drink Healing Potion",
            content: dialogTemplate,
            buttons: {
                drink: {
                    label: "Drink Potion",
                    callback: (html) => {
                        console.log(html.find("#potion")[0].value);
                        // let potionType = html.find("#potion")[0].value;
                        // let selectedPotion = actor.data.items.find(item => item.name = potionType)

                        // console.log(selectedPotion);
                        
                        // let formula = selectedPotion.data.damage.parts[0][0];

                        // let roll = new Roll(formula).toMessage();
                    }
                }
            }
        });
    
        // potionDialog.position.width = 900;
        // potionDialog.position.height = 300;
        potionDialog.render(true);
    }



    
}

function CreatePotionButton(potion){

    let potionButton = {
        [potion.name]: {
            label: potion.name + "<img src=\"" + potion.img + "\" width=\"50\">",
            callback:() => {console.log(potion.name)}
        }
    }

    return potionButton;
}