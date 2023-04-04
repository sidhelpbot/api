(async ()=> {
const request = require('request');
const { Scenes, session, Telegraf } = require('telegraf');
const { enter, leave } = Scenes.Stage;
let requestTgCodeGetRandomHash = require('./steps/step1')
let loginStepGetStelCookie = require('./steps/step2')
let scarp_tg_existing_app = require('./steps/step3')
let create_new_tg_app = require('./steps/stem44')
let accesshash;
let loginhash;
let mobile;
let e;
let app_platform = [
        "android",
        "ios",
        "wp",
        "bb",
        "desktop",
        "web",
        "ubp",
        "other"
    ]
  
// Greeter scene
const MoScene = new Scenes.BaseScene('entermobile');
MoScene.enter(ctx => {
  ctx.reply('Enter Mobile no.:');
  // ctx.scene.enter('enterAuthCode')
});

MoScene.on("message", async ctx => {
  mobile = ctx.message.text;
  ctx.reply('Enter Auth Code: ')
  accesshash = await requestTgCodeGetRandomHash(mobile)
  ctx.reply("" + accesshash)
  ctx.scene.enter('apisend')
});


const ApiSend = new Scenes.BaseScene('apisend');
ApiSend.enter((ctx) => {})
ApiSend.on("message", async ctx => {
 tok = await loginStepGetStelCookie(mobile, accesshash, ctx.message.text)
  
 let cookieString = tok[1][0];

  let sendlogin = {
    cookieString,
    accesshash,
  }
  ctx.reply(JSON.stringify(sendlogin))
  console.log(cookieString)
  ctx.scene.leave()
});

const api = new Scenes.BaseScene('api');
api.enter((ctx) => {ctx.reply("Enter String which you found by /start method")})
  
api.on("message", async (ctx) => {
  let cred = JSON.parse(ctx.message.text)
  let e = await scarp_tg_existing_app(cred.cookieString)
  if(e[0]){
    // console.log(e[0])
    ctx.reply("" + JSON.stringify(e[1]))
  } else {
  let tg_app_hash = e[1].tg_app_hash
    console.log(tg_app_hash)

   async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
await sleep(60000)
let app = await create_new_tg_app(cred.cookieString, tg_app_hash, "kuchohnhi", "kuchhnhiii", 'my.telegram.org', app_platform[0], "created")
    console.log(app)
  }

// console.log(await scarp_tg_existing_app(cred.cookieString))
})

const bot = new Telegraf(process.env.TOKEN);

const stage = new Scenes.Stage([MoScene, ApiSend, api], {
  ttl: 100,
});
  
bot.use(session());
bot.use(stage.middleware());
bot.command('start', ctx => ctx.scene.enter('entermobile'));
bot.command('api', ctx => ctx.scene.enter('api'));

bot.on('message', ctx => ctx.reply('Try /start or /api'));

bot.launch();









 


  let tok = [
  true,
  [
    'stel_token=be581081dadf2ff7da72f0ab5d4c0246be58108dbe5859f1c2382b7be304f21dac5b1; path=/; samesite=None; secure; HttpOnly'
  ]
]
  
 
  
// console.log(e[1]['App Configuration'])
  
})();


