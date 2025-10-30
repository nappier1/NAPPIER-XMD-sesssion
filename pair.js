const PastebinAPI = require('pastebin-js');
const pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL');
const { makeid } = require('./id');
const express = require('express');
const fs = require('fs');
const pino = require('pino');

const {
  default: Michal_Tech,
  useMultiFileAuthState,
  delay,
  makeCacheableSignalKeyStore,
  Browsers,
} = require('@whiskeysockets/baileys');

const router = express.Router();

// 🧹 Helper — Remove temporary session folder
function removeFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.rmSync(filePath, { recursive: true, force: true });
  }
}

// ⚙️ Main Route — Generate Pairing Code
router.get('/', async (req, res) => {
  const id = makeid();
  const num = req.query.number;

  if (!num) {
    return res.status(400).send({ error: 'Number parameter is required!' });
  }

  async function NAPPIER_XMD_PAIR_CODE() {
    const { state, saveCreds } = await useMultiFileAuthState(`./temp/${id}`);

    try {
      const Nappier = Michal_Tech({
        auth: {
          creds: state.creds,
          keys: makeCacheableSignalKeyStore(
            state.keys,
            pino({ level: 'fatal' }).child({ level: 'fatal' })
          ),
        },
        printQRInTerminal: false,
        logger: pino({ level: 'fatal' }).child({ level: 'fatal' }),
        browser: Browsers.macOS('Chrome'),
      });

      // ⚡ Request Pairing Code
      if (!Nappier.authState.creds.registered) {
        await delay(1500);
        const cleanNum = num.replace(/[^0-9]/g, '');
        const code = await Nappier.requestPairingCode(cleanNum);

        if (!res.headersSent) {
          res.send({ code });
        }
      }

      // Save credentials
      Nappier.ev.on('creds.update', saveCreds);

      // 🧠 Connection Event
      Nappier.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === 'open') {
          await delay(5000);

          const filePath = `${__dirname}/temp/${id}/creds.json`;
          if (!fs.existsSync(filePath)) {
            console.error('❌ Credentials file missing:', filePath);
            return;
          }

          // Encode creds file to base64
          const data = fs.readFileSync(filePath);
          const base64Data = Buffer.from(data).toString('base64');
          const sessionMsg = await Nappier.sendMessage(Nappier.user.id, {
            text: 'NAPPIER-XMD~' + base64Data,
          });

          // 📩 Informational message
          const infoText = `
✅ *YOUR SESSION IS READY!*
✨ Powered by *NAPPIER-XMD*

💪 Empowering your experience with Kathara scripts.

👥 Connect & Chat:
👉 [Join Free](https://whatsapp.com/channel/0029Vb6NveDBPzjPa4)

⭐ *Support Our Work*:
🔗 GitHub: https://github.com/Nappier1

📢 *Get Help & Updates*:
WhatsApp Channel: [Click Here](https://whatsapp.com/channel/0029Vb6NveDBPzjPa4)

🎥 Tutorials:
YouTube: https://www.youtube.com/@napkis

🚀 Designed & Developed by Kathara (NapKid)
          `;

          await Nappier.sendMessage(
            Nappier.user.id,
            { text: infoText },
            { quoted: sessionMsg }
          );

          await delay(500);
          await Nappier.ws.close();
          removeFile(`./temp/${id}`);
        } else if (
          connection === 'close' &&
          lastDisconnect &&
          lastDisconnect.error &&
          lastDisconnect.error.output?.statusCode !== 401
        ) {
          console.log('🔄 Connection closed. Retrying...');
          await delay(10000);
          NAPPIER_XMD_PAIR_CODE();
        }
      });
    } catch (err) {
      console.error('⚠️ Service restarted due to error:', err);
      removeFile(`./temp/${id}`);

      if (!res.headersSent) {
        res.send({ code: 'Service is currently unavailable' });
      }
    }
  }

  await NAPPIER_XMD_PAIR_CODE();
});

module.exports = router;
