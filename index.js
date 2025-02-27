require('dotenv').config();
const { mintKingdomNFT } = require('./kingdom.js');
const { mintMagicNFT } = require('./magic.js');
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

// Store user states
const userStates = {};

bot.command("start", (ctx) => {
    ctx.reply("Welcome to NFT Minting Bot! Choose your NFT minting platform:", {
        reply_markup: {
            inline_keyboard: [
                [{text: 'Magic Eden', callback_data: 'magic'}],
                [{text: 'Kingdomly', callback_data: 'kingdom'}],
            ]
        }
    })
})

bot.on('callback_query', (ctx) => {
    const action = ctx.callbackQuery.data;
    const userId = ctx.from.id;
    if(action === 'kingdom') {
        userStates[userId] = {action : 'kingdom'};
    } else if(action === 'magic') {
        userStates[userId] = {action : 'magic'};
    }

    ctx.reply("Please enter your wallet private key");
})

bot.on('text', async (ctx) => {
    const userId = ctx.from.id;
    const userState = userStates[userId];

    if(!userState) return;
    if (!userState.privateKey) {
        userState.privateKey = ctx.message.text;
        ctx.reply("Please enter the contract address for NFT minting");
    } else if(!userState.contractAddress) {
        userState.contractAddress = ctx.message.text;
        ctx.reply("Please enter the quantity of NFTs to mint");
    } else if(!userState.quantity) {
        userState.quantity = ctx.message.text;
        if(userState.action === 'kingdom') {
            let result = mintKingdomNFT(userState);
            ctx.reply(await result);
        } else if(userState.action === 'magic') {
            let result = mintMagicNFT(userState);

            ctx.reply(await result);
        }
    }
})

bot.launch()