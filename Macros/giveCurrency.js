
    let macroActor = canvas.tokens.controlled[0].actor;

    let chatData = {
        user: game.user._id,
        speaker: ChatMessage.getSpeaker(),
        content: ""
    };


    let images = [
        "icons/commodities/currency/coin-oval-rune-copper.webp",
        "icons/commodities/currency/coin-engraved-moon-silver.webp",
        "icons/commodities/currency/coin-inset-lightning-silver.webp",
        "icons/commodities/currency/coin-embossed-gold-stag.webp",
        "icons/commodities/currency/coin-embossed-unicorn-silver.webp",
    
        ]
    
        let dialogContent = `
        <h1> Select Transaction Amount </h1>
        <div style="text-align: center">
            <table>
                <tr>
                    <td><input id="copper" size="10"></input></td>
                    <td><input id="silver" size="10"></input></td>
                    <td><input id="electrum" size="10"></input></td>
                    <td><input id="gold" size="10"></input></td>
                    <td><input id="platinum" size="10"></input></td>
                </tr>
                <tr>
                    <td><image src=${images[0]} width="100"><br><strong>Copper</strong> (cp)</td>
                    <td><image src=${images[1]} width="100"><br><strong>Silver</strong> (sp)</td>
                    <td><image src=${images[2]} width="100"><br><strong>Electrum</strong> (ep)</td>
                    <td><image src=${images[3]} width="100"><br><strong>Gold</strong> (gp)</td>
                    <td><image src=${images[4]} width="100"><br><strong>Platinum</strong> (pp)</td>
                </tr>
            </table>
        </div>
        <br>`

    if (macroActor === undefined || macroActor === null)
    {
        ui.notifications.error("Please select a token");
    }
    else
    {
        let currencyDialog = new Dialog({
            title: "Modify Currency",
            content: dialogContent,
            buttons: {
                Pay: {
                    label: "Transfer Currency",
                    callback: (html) => {

                        let selectedCurrency = [
                            {coin: "cp", value: parseInt(html.find("#copper")[0].value)},
                            {coin: "sp", value: parseInt(html.find("#silver")[0].value)},
                            {coin: "ep", value: parseInt(html.find("#electrum")[0].value)},
                            {coin: "gp", value: parseInt(html.find("#gold")[0].value)},
                            {coin: "pp", value: parseInt(html.find("#platinum")[0].value)},
                        ]

                        for (let currency of selectedCurrency)
                        {
                            if (isNaN(currency.value))
                            {
                                continue;
                            }
                            else
                            {
                                actor.data.data.currency[currency.coin] += currency.value;
                                
                                let direction = currency.value < 1 ? "lost" : "gained";
                                let amount = currency.value < 1 ? -1 : 1;
                                
                                chatData.content = chatData.content + "<image src=\"" + images[selectedCurrency.indexOf(currency)] + "\"width=\"40\"></image>  " + direction + " " + (currency.value * amount) + " " + currency.coin + "<br>";                             }
                        }

                        ChatMessage.create(chatData, {});        
                    }
                },
                Cancel: {
                    label: "Cancel Transaction",
                },
            }
        });
    
        currencyDialog.position.width = 600;
        currencyDialog.position.height = 305;
        currencyDialog.render(true);
    }

