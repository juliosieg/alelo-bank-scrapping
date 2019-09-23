const puppeteer = require('puppeteer');

exports.consulta = async function(req, res, next) {
    
    const browser = await puppeteer.launch();
    
    const page = await browser.newPage();

    await page.goto('https://www.meualelo.com.br/');
    await page.type('#cpf', req.body.cpf);
    await page.type('[name=pass]', req.body.password);
    await page.click('.col-12.button-big');
    await page.waitForNavigation();
    await page.waitForSelector('.cards');

    const cards = await page.$$('.card');

    var cardsArray = [];

    for (i = 0; i < cards.length; i++) {

        var cardNumber = '';
        var cardName = '';
        var cardSaldo = '';
        
        try{
            cardNumber = await cards[i].$eval('.card-number', node => node.innerText);
        }catch(error){
            console.log("Error: "+error);
        }

        try{
            cardName = await cards[i].$eval('.card-name', node => node.innerText);
        }catch(error){
            console.log("Error: "+error);
        }
        
        try{
            await cards[i].$eval('.card-buttons .button-balance', node => node.click());
            await page.waitForSelector('.card-buttons .card-balance .card-balance-value');
            cardSaldo = await cards[i].$eval('.card-buttons .card-balance .card-balance-value', node => node.innerText);
        }catch(error){
            console.log("Error: "+error);
        }

        if(cardName){
            cardsArray.push({
                'nome': cardName,
                'numero': cardNumber,
                'saldo': cardSaldo
            })
        }

        try{
            await cards[i].$eval('.card-buttons .button.button-empty.button-clear', node => node.click());
            await page.waitForSelector('.transactions');

            const infos = await page.$$('.stm-info-item > span');

            var infosArray = [];

            infosArray.push({
                'gastoDiarioSugerido': await (await infos[2].getProperty('innerText')).jsonValue(),
                'gastoMedioPeriodo': await (await infos[3].getProperty('innerText')).jsonValue(),
                'ultimoBeneficio': await (await infos[4].getProperty('innerText')).jsonValue(),
                'proximoBeneficio': await (await infos[5].getProperty('innerText')).jsonValue()
            })

            await page.select('.select-style > select', 'LAST_FOUR_MONTHS');

            await page.waitForSelector('.transactions');

            await page.evaluate(async () => {
                await new Promise((resolve, reject) => {
                const interval = setInterval(() => {
                    const button = document.querySelector('.btn-pagination');
                    if (button !== null) {
                        button.click();
                    } else {
                        clearInterval(interval);
                        resolve();
                    }
                }, 100);
                });
            });

            const transactions = await page.$$('.transaction-container');

            var transactionsArray = [];
                
            for (i = 0; i < transactions.length; i++) {

                await page.waitForSelector('.transactions');

                const transactions = await page.$$('.transaction-container');

                var description = '';
                var date = '';
                var value = '';
            
                try{
                    description = await transactions[i].$eval('.description', node => node.innerText);
                }catch(error){
                    console.log("Error: "+error);
                }

                try{
                    date = await transactions[i].$eval('.date', node => node.innerText);
                }catch(error){
                    console.log("Error: "+error);
                }

                try{
                    value = await transactions[i].$eval('.value-container .value', node => node.innerText);
                }catch(error){
                    console.log("Error: "+error);
                }

                transactionsArray.push({
                    'descricao': description,
                    'data': date,
                    'valor': value
                })

            }
        
        }catch(error){
            console.log("Error: "+error);
        }

        var arrayResposta = {
            'cpf': req.body.cpf,
            'cartao': cardsArray,
            'infos': infosArray,
            'transacoes': transactionsArray
        }

        res.render('index', { data : arrayResposta });
    
    }

};