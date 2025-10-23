const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const {makeid} = require('./id');
const express = require('express');
const fs = require('fs');
let router = express.Router()
const pino = require("pino");
const {
    default: Dml_Tech,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers
} = require("@whiskeysockets/baileys");

function removeFile(FilePath){
    if(!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true })
 };
router.get('/', async (req, res) => {
    const id = makeid();
    let num = req.query.number;
        async function DML_TECH_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/'+id)
     try {
            let Pair_Code_By_Dml_Tech = Dml_Tech({
                auth: {
                    creds: state.creds,
                    keys: makeCacheableSignalKeyStore(state.keys, pino({level: "fatal"}).child({level: "fatal"})),
                },
                printQRInTerminal: false,
                logger: pino({ level: "fatal" }).child({ level: "fatal" }),
                browser: Browsers.macOS('Chrome')
             });
             if(!Pair_Code_By_Dml_Tech.authState.creds.registered) {
                await delay(1500);
                        num = num.replace(/[^0-9]/g,'');
                            const code = await Pair_Code_By_Dml_Tech.requestPairingCode(num)
                 if(!res.headersSent){
                 await res.send({code});
                     }
                 }
            Pair_Code_By_Dml_Tech.ev.on('creds.update', saveCreds)
            Pair_Code_By_Dml_Tech.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect
                } = s;
                if (connection == "open") {
                await delay(50000);
                let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                await delay(8000);
               let b64data = Buffer.from(data).toString('base64');
               let session = await Pair_Code_By_Dml_Tech.sendMessage(Pair_Code_By_Dml_Tech.user.id, { text: 'NAPPIER-XMD~'+ b64data });

               let DML_TECH_TEXT = ` YOUR SESSION IS SUCCESSFULLY GENERATED L! ✅ ✨

💪 Empowering Your Experience with kathara scripts 

👥 Connect & Chat with Friends
👉 Join Free https://whatsapp.com/channel/0029Vb6NveDBPzjPa4

🌟 Support Our Work
⭐ Give our repo a star & follow the developer here ⤵
🔗 GitHub – https://github.com/Nappier1

💭 Need Help or Updates?
📢 Join our official support channel:
WhatsApp Channel

📚 Learn & Explore with Tutorials
🪄 Check out our YouTube channel:
https://www.youtube.com/@napkis

🚀 Powered by kathara curiosity — Together, we build the future of automation! 🚀
`
 await Pair_Code_By_Dml_Tech.sendMessage(Pair_Code_By_Dml_Tech.user.id,{text:DML_TECH_TEXT},{quoted:session})
 

        await delay(100);
        await Pair_Code_By_Dml_Tech.ws.close();
        return await removeFile('./temp/'+id);
            } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10000);
                    DML_TECH_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restated");
            await removeFile('./temp/'+id);
         if(!res.headersSent){
            await res.send({code:"Service is Currently Unavailable"});
         }
        }
    }
    return await DML_TECH_PAIR_CODE()
});
module.exports = router
