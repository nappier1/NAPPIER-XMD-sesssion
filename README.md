SESSION START
Bot Name: Napier-XMD
Bot ID: NAP-XMD-S001

STEP 1: PAIRING
• Display QR code to user: “Scan the QR code to link your WhatsApp.”
• Generate Pairing Code: “Your pairing code is: 8A7B-XZ12”
• Wait for user to scan/link.
• On success → proceed to STEP 2. On failure → retry or show error.

STEP 2: WELCOME MESSAGE
• Bot sends:
  “👋 Hello! Welcome to Napier-XMD WhatsApp bot.
   I’m here to help you with queries, notifications and more.
   Type ‘help’ to get started.”

STEP 3: MAIN MENU
• The bot shows options:
   1. View Profile
   2. Send a Message
   3. Get Status
   4. Help & Support
   5. Logout

• User enters a choice (e.g., “2”).
• Bot acknowledges choice.

STEP 4: USER REQUEST HANDLING
• Example: If user chooses “2”:
   • Bot: “Please enter the recipient’s number (with country code):”
   • User: “+254712345678”
   • Bot: “Enter the message you’d like to send:”
   • User: “Hi there! Just checking in 🙂”
   • Bot: “Sending… ✅ Your message has been sent to +254100000008.”

STEP 5: STATUS & NOTIFICATIONS
• If user chooses “3”:
   • Bot: “Your session status: Active
     • Linked number: +2541000000
     • Messages sent: 24
     • Last sync: 2025-10-23 14:12 EAT”

STEP 6: HELP & SUPPORT
• If user types “4”:
   • Bot: “Here’s how I can help:
       • Profile — View/Edit your details
       • Message — Send WhatsApp messages
       • Status — Check your session info
       • Logout — End your session
     If you encounter any issues, reply with ‘support’ and I’ll connect you.”

STEP 7: LOGOUT
• If user selects “5” or types “logout”:
   • Bot: “Are you sure you want to logout? (yes/no)”
   • If user says “yes”: “Logging out… ✅ See you next time!”
   • Session ends.

STEP 8: ERROR HANDLING
• If any step fails (e.g., pairing code invalid), bot replies:
   “⚠️ Oops! Something went wrong. Please try again or type ‘help’ for assistance.”

SESSION END
