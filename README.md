# Emna Visa Services - شركة آمنة فيزا سيرفيس

Web application for Emna Visa Services, an international employment services company based in Tunisia that facilitates job placements abroad (primarily Romania).

## Features

- **Company Information** - About, address, social media links
- **Job Categories** - 8 employment categories (construction, cleaning, childcare, eldercare, carpentry, plumbing, mechanics, restaurants)
- **Worker Search** - Filterable worker directory
- **Notifications** - Application status updates
- **Contact Form** - Name, email, message
- **WhatsApp Chatbot** - Automated customer support chatbot with:
  - Quick replies for common inquiries (services, visa info, jobs, documents, application tracking)
  - Keyword detection for Arabic and English messages
  - Direct WhatsApp handoff to human advisors
  - Typing indicators and real-time chat UI

## Tech Stack

- **React** (hooks: useState, useEffect, useRef)
- **shadcn/ui** components (Card, Button, Input, Textarea)
- **lucide-react** icons
- **Tailwind CSS** for styling

## Project Structure

```
src/
├── App.jsx                          # Main app with WorkerList + WhatsApp Chatbot
├── components/
│   ├── WorkerList.jsx               # Company info, jobs, workers, contact form
│   └── WhatsAppChatbot.jsx          # WhatsApp chatbot widget
```

## WhatsApp Chatbot Configuration

Edit `src/components/WhatsAppChatbot.jsx` to configure:

- `WHATSAPP_NUMBER` - Your WhatsApp Business number (line 3)
- `quickReplies` - Quick reply buttons shown to users
- `botResponses` - Automated responses for each topic
- `keywordMap` - Keywords that trigger specific responses

## Getting Started

```bash
npm install
npm run dev
```

## Contact

- **Address**: Avenue Habib Bourguiba, Bardo, Tunisie - Tlili Centre 3ème étage
- **Facebook**: /emnavisaservices
- **Instagram**: @emnavisaservices
- **TikTok**: @emnaservicessltd
