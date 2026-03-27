/**
 * Emna Visa Services - WhatsApp Chatbot Widget
 *
 * HOW TO USE:
 * Add this to any HTML page before </body>:
 *
 *   <script src="chatbot-embed.js"></script>
 *   <script>
 *     EmnaChat.init({ whatsappNumber: "216XXXXXXXX" });
 *   </script>
 */
(function() {
  "use strict";

  var WA_NUMBER = "21600000000";
  var isOpen = false;
  var started = false;

  var QUICK_REPLIES = [
    { id: "services", label: "\u062e\u062f\u0645\u0627\u062a\u0646\u0627" },
    { id: "visa", label: "\u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0639\u0646 \u0627\u0644\u062a\u0623\u0634\u064a\u0631\u0629" },
    { id: "jobs", label: "\u0641\u0631\u0635 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062a\u0627\u062d\u0629" },
    { id: "documents", label: "\u0627\u0644\u0648\u062b\u0627\u0626\u0642 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629" },
    { id: "status", label: "\u0645\u062a\u0627\u0628\u0639\u0629 \u0627\u0644\u0645\u0644\u0641" },
    { id: "contact", label: "\u0627\u0644\u062a\u0648\u0627\u0635\u0644 \u0645\u0639 \u0645\u0633\u062a\u0634\u0627\u0631" }
  ];

  var RESPONSES = {
    services: {
      text: "\u0645\u0631\u062d\u0628\u0627\u064b \u0628\u0643 \u0641\u064a \u0634\u0631\u0643\u0629 \u0622\u0645\u0646\u0629 \u0641\u064a\u0632\u0627 \u0633\u064a\u0631\u0641\u064a\u0633! \u{1F3E2}\n\n\u0646\u062d\u0646 \u0646\u0642\u062f\u0645 \u0627\u0644\u062e\u062f\u0645\u0627\u062a \u0627\u0644\u062a\u0627\u0644\u064a\u0629:\n\u2022 \u062a\u0648\u0641\u064a\u0631 \u0641\u0631\u0635 \u0639\u0645\u0644 \u0641\u064a \u0631\u0648\u0645\u0627\u0646\u064a\u0627 \u0648\u0623\u0648\u0631\u0648\u0628\u0627\n\u2022 \u0625\u0639\u062f\u0627\u062f \u0645\u0644\u0641\u0627\u062a \u0627\u0644\u062a\u0623\u0634\u064a\u0631\u0629 \u0648\u0627\u0644\u0647\u062c\u0631\u0629\n\u2022 \u062a\u0631\u062c\u0645\u0629 \u0627\u0644\u0648\u062b\u0627\u0626\u0642 \u0627\u0644\u0631\u0633\u0645\u064a\u0629\n\u2022 \u0645\u062a\u0627\u0628\u0639\u0629 \u0625\u062c\u0631\u0627\u0621\u0627\u062a \u0627\u0644\u0633\u0641\u0627\u0631\u0629\n\u2022 \u0627\u0633\u062a\u0634\u0627\u0631\u0627\u062a \u0645\u062c\u0627\u0646\u064a\u0629 \u062d\u0648\u0644 \u0641\u0631\u0635 \u0627\u0644\u0639\u0645\u0644",
      followUp: ["visa", "jobs", "contact"]
    },
    visa: {
      text: "\u{1F4CB} \u0645\u0639\u0644\u0648\u0645\u0627\u062a \u0627\u0644\u062a\u0623\u0634\u064a\u0631\u0629:\n\n\u0627\u0644\u0645\u0631\u0627\u062d\u0644:\n1\uFE0F\u20E3 \u062a\u0642\u062f\u064a\u0645 \u0627\u0644\u0645\u0644\u0641 \u0627\u0644\u0623\u0648\u0644\u064a\n2\uFE0F\u20E3 \u062f\u0641\u0639 \u0627\u0644\u062c\u0632\u0621 \u0627\u0644\u0623\u0648\u0644 \u0645\u0646 \u0627\u0644\u0645\u0635\u0627\u0631\u064a\u0641\n3\uFE0F\u20E3 \u0627\u0633\u062a\u0644\u0627\u0645 \u0627\u0644\u0645\u0644\u0641 \u0645\u0646 \u0645\u0643\u062a\u0628 \u0627\u0644\u0647\u062c\u0631\u0629\n4\uFE0F\u20E3 \u0645\u0648\u0639\u062f \u0645\u0642\u0627\u0628\u0644\u0629 \u0627\u0644\u0633\u0641\u0627\u0631\u0629\n5\uFE0F\u20E3 \u0627\u0644\u062d\u0635\u0648\u0644 \u0639\u0644\u0649 \u0639\u0642\u062f \u0627\u0644\u0639\u0645\u0644\n6\uFE0F\u20E3 \u0627\u0633\u062a\u0644\u0627\u0645 \u0627\u0644\u062a\u0623\u0634\u064a\u0631\u0629 \u0648\u0627\u0644\u0633\u0641\u0631\n\n\u23F1 \u0627\u0644\u0645\u062f\u0629: 2-4 \u0623\u0634\u0647\u0631",
      followUp: ["documents", "status", "contact"]
    },
    jobs: {
      text: "\u{1F4BC} \u0641\u0631\u0635 \u0627\u0644\u0639\u0645\u0644 \u0627\u0644\u0645\u062a\u0627\u062d\u0629:\n\n\u{1F528} \u0627\u0644\u0628\u0646\u0627\u0621\n\u{1F9F9} \u0627\u0644\u062a\u0646\u0638\u064a\u0641\n\u{1F476} \u0631\u0639\u0627\u064a\u0629 \u0627\u0644\u0623\u0637\u0641\u0627\u0644\n\u{1F474} \u0631\u0639\u0627\u064a\u0629 \u0627\u0644\u0645\u0633\u0646\u064a\u0646\n\u{1FA9A} \u0627\u0644\u0646\u062c\u0627\u0631\u0629\n\u{1F527} \u0627\u0644\u0633\u0628\u0627\u0643\u0629\n\u2699\uFE0F \u0627\u0644\u0645\u064a\u0643\u0627\u0646\u064a\u0643\u0627\n\u{1F37D} \u0627\u0644\u0645\u0637\u0627\u0639\u0645\n\n\u2705 \u0639\u0642\u062f \u0631\u0633\u0645\u064a + \u062a\u0623\u0645\u064a\u0646 + \u0633\u0643\u0646 + \u0631\u0627\u062a\u0628 \u062b\u0627\u0628\u062a",
      followUp: ["documents", "visa", "contact"]
    },
    documents: {
      text: "\u{1F4C4} \u0627\u0644\u0648\u062b\u0627\u0626\u0642 \u0627\u0644\u0645\u0637\u0644\u0648\u0628\u0629:\n\n1. \u062c\u0648\u0627\u0632 \u0633\u0641\u0631 \u0633\u0627\u0631\u064a \u0627\u0644\u0645\u0641\u0639\u0648\u0644\n2. 4 \u0635\u0648\u0631 \u0634\u062e\u0635\u064a\u0629\n3. \u0634\u0647\u0627\u062f\u0629 \u0645\u064a\u0644\u0627\u062f\n4. \u0634\u0647\u0627\u062f\u0629 \u062d\u0633\u0646 \u0627\u0644\u0633\u064a\u0631\u0629 (S3)\n5. \u0634\u0647\u0627\u062f\u0629 \u0637\u0628\u064a\u0629\n6. \u0634\u0647\u0627\u062f\u0627\u062a \u0627\u0644\u0639\u0645\u0644/\u0627\u0644\u062a\u0643\u0648\u064a\u0646\n7. \u0628\u0637\u0627\u0642\u0629 \u0627\u0644\u062a\u0639\u0631\u064a\u0641 \u0627\u0644\u0648\u0637\u0646\u064a\u0629\n\n\u26A0\uFE0F \u064a\u062c\u0628 \u062a\u0631\u062c\u0645\u0629 \u0648\u0645\u0635\u0627\u062f\u0642\u0629 \u062c\u0645\u064a\u0639 \u0627\u0644\u0648\u062b\u0627\u0626\u0642",
      followUp: ["visa", "status", "contact"]
    },
    status: {
      text: "\u{1F4CA} \u0644\u0645\u062a\u0627\u0628\u0639\u0629 \u0645\u0644\u0641\u0643:\n\n\u0623\u0631\u0633\u0644 \u0631\u0642\u0645 \u0645\u0644\u0641\u0643 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062a\u0633\u0627\u0628 \u0644\u0641\u0631\u064a\u0642 \u0627\u0644\u062f\u0639\u0645.\n\u0633\u064a\u0631\u062f \u0645\u0633\u062a\u0634\u0627\u0631\u0646\u0627 \u062e\u0644\u0627\u0644 24 \u0633\u0627\u0639\u0629.",
      followUp: ["contact", "services"]
    },
    contact: {
      text: "\u{1F4DE} \u0644\u0644\u062a\u0648\u0627\u0635\u0644 \u0627\u0644\u0645\u0628\u0627\u0634\u0631:\n\n\u{1F550} \u0623\u0648\u0642\u0627\u062a \u0627\u0644\u0639\u0645\u0644:\n\u0627\u0644\u0625\u062b\u0646\u064a\u0646 - \u0627\u0644\u062c\u0645\u0639\u0629: 8:00 - 17:00\n\u0627\u0644\u0633\u0628\u062a: 8:00 - 13:00\n\n\u0627\u0636\u063a\u0637 \u0627\u0644\u0632\u0631 \u0644\u0644\u062a\u0648\u0627\u0635\u0644 \u0639\u0628\u0631 \u0627\u0644\u0648\u0627\u062a\u0633\u0627\u0628 \u{1F447}",
      followUp: [],
      action: "openWhatsApp"
    },
    default: {
      text: "\u0634\u0643\u0631\u0627\u064b \u0639\u0644\u0649 \u0631\u0633\u0627\u0644\u062a\u0643! \u{1F60A}\n\n\u0627\u062e\u062a\u0631 \u0645\u0646 \u0627\u0644\u062e\u064a\u0627\u0631\u0627\u062a \u0623\u062f\u0646\u0627\u0647:",
      followUp: ["services", "visa", "jobs", "documents"]
    }
  };

  var KEYWORDS = [
    { kw: ["\u062e\u062f\u0645", "service"], r: "services" },
    { kw: ["\u062a\u0623\u0634\u064a\u0631", "visa", "\u0641\u064a\u0632\u0627", "\u0633\u0641\u0631"], r: "visa" },
    { kw: ["\u0639\u0645\u0644", "job", "\u0648\u0638\u064a\u0641", "\u0634\u063a\u0644"], r: "jobs" },
    { kw: ["\u0648\u062b\u0627\u0626\u0642", "\u0648\u062b\u064a\u0642\u0629", "document", "\u0623\u0648\u0631\u0627\u0642"], r: "documents" },
    { kw: ["\u0645\u062a\u0627\u0628\u0639", "track", "status", "\u0645\u0644\u0641\u064a"], r: "status" },
    { kw: ["\u062a\u0648\u0627\u0635\u0644", "contact", "\u0627\u062a\u0635\u0644", "\u0645\u0633\u062a\u0634\u0627\u0631"], r: "contact" }
  ];

  // Inject CSS
  var style = document.createElement("style");
  style.textContent = '#emna-wa-btn{position:fixed;bottom:20px;right:20px;width:60px;height:60px;border-radius:50%;border:none;background:#25d366;color:#fff;cursor:pointer;box-shadow:0 4px 16px rgba(37,211,102,.4);display:flex;align-items:center;justify-content:center;z-index:9999;transition:transform .3s,box-shadow .3s;animation:emna-pulse 2s infinite}#emna-wa-btn:hover{transform:scale(1.1);box-shadow:0 6px 20px rgba(37,211,102,.6)}#emna-wa-badge{position:fixed;bottom:68px;right:16px;width:22px;height:22px;border-radius:50%;background:#ff4444;color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;border:2px solid #fff;z-index:10000;pointer-events:none}#emna-wa-chat{position:fixed;bottom:90px;right:20px;width:370px;height:550px;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,.15);display:none;flex-direction:column;z-index:9999;font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif}#emna-wa-chat.open{display:flex}.emna-header{background:linear-gradient(135deg,#075e54,#128c7e);color:#fff;padding:12px 16px;display:flex;align-items:center;gap:12px}.emna-avatar{width:42px;height:42px;border-radius:50%;background:#25d366;display:flex;align-items:center;justify-content:center;flex-shrink:0}.emna-hinfo{flex:1}.emna-hname{font-weight:700;font-size:15px}.emna-hstatus{font-size:12px;opacity:.9}.emna-close{background:0 0;border:none;color:#fff;cursor:pointer;padding:4px;border-radius:50%;display:flex;align-items:center}.emna-msgs{flex:1;overflow-y:auto;padding:12px;background-color:#e5ddd5}.emna-msg{display:flex;margin-bottom:8px}.emna-msg.user{justify-content:flex-start}.emna-msg.bot{justify-content:flex-end}.emna-bbl{max-width:85%;padding:8px 12px;box-shadow:0 1px 2px rgba(0,0,0,.1);direction:rtl;text-align:right}.emna-msg.user .emna-bbl{background:#fff;border-radius:12px 12px 12px 4px}.emna-msg.bot .emna-bbl{background:#dcf8c6;border-radius:12px 12px 4px 12px}.emna-btxt{font-size:14px;line-height:1.5;white-space:pre-line;color:#303030}.emna-btime{font-size:11px;color:#999;text-align:left;margin-top:4px}.emna-qrs{display:flex;flex-wrap:wrap;gap:6px;justify-content:flex-end;margin-bottom:10px;direction:rtl}.emna-qr{padding:6px 14px;border-radius:18px;border:1px solid #25d366;background:#fff;color:#075e54;font-size:13px;cursor:pointer;transition:all .2s;font-family:inherit}.emna-qr:hover{background:#25d366;color:#fff}.emna-act-wrap{display:flex;justify-content:flex-end;margin-bottom:10px}.emna-act{padding:10px 20px;border-radius:24px;border:none;background:#25d366;color:#fff;font-size:14px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:8px;font-family:inherit}.emna-typing{display:flex;justify-content:flex-end;margin-bottom:8px}.emna-typing-bbl{padding:12px 16px;border-radius:12px 12px 4px 12px;background:#dcf8c6;box-shadow:0 1px 2px rgba(0,0,0,.1);display:flex;gap:4px}.emna-dot{width:8px;height:8px;border-radius:50%;background:#128c7e;animation:emna-type 1.4s infinite ease-in-out}.emna-dot:nth-child(2){animation-delay:.2s}.emna-dot:nth-child(3){animation-delay:.4s}.emna-input-area{padding:8px 12px;background:#f0f0f0;display:flex;align-items:center;gap:8px}.emna-input{flex:1;padding:10px 14px;border-radius:24px;border:none;font-size:14px;outline:0;direction:rtl;font-family:inherit}.emna-send{width:40px;height:40px;border-radius:50%;border:none;background:#ccc;color:#fff;cursor:default;display:flex;align-items:center;justify-content:center;transition:background .2s}.emna-send.active{background:#128c7e;cursor:pointer}@keyframes emna-pulse{0%{box-shadow:0 4px 16px rgba(37,211,102,.4)}50%{box-shadow:0 4px 24px rgba(37,211,102,.7)}100%{box-shadow:0 4px 16px rgba(37,211,102,.4)}}@keyframes emna-type{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}}@media(max-width:420px){#emna-wa-chat{width:calc(100vw - 20px);height:calc(100vh - 120px);right:10px;bottom:80px}}';
  document.head.appendChild(style);

  var WA_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="SIZE" height="SIZE" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

  function waSvg(size) { return WA_SVG.replace(/SIZE/g, size); }

  function buildWidget() {
    var html = '';
    // Float button
    html += '<button id="emna-wa-btn" onclick="EmnaChat._toggle()">' + waSvg(30) + '</button>';
    html += '<div id="emna-wa-badge">1</div>';
    // Chat window
    html += '<div id="emna-wa-chat">';
    html += '<div class="emna-header"><div class="emna-avatar">' + waSvg(22) + '</div>';
    html += '<div class="emna-hinfo"><div class="emna-hname">\u0622\u0645\u0646\u0629 \u0641\u064a\u0632\u0627 \u0633\u064a\u0631\u0641\u064a\u0633</div>';
    html += '<div class="emna-hstatus">\u0645\u062a\u0635\u0644 \u0627\u0644\u0622\u0646 \u2022 \u064a\u0631\u062f \u0639\u0627\u062f\u0629 \u062e\u0644\u0627\u0644 \u062f\u0642\u0627\u0626\u0642</div></div>';
    html += '<button class="emna-close" onclick="EmnaChat._toggle()"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button></div>';
    html += '<div class="emna-msgs" id="emna-msgs"></div>';
    html += '<div class="emna-input-area"><input type="text" class="emna-input" id="emna-input" placeholder="\u0627\u0643\u062a\u0628 \u0631\u0633\u0627\u0644\u062a\u0643..." onkeydown="EmnaChat._key(event)" oninput="EmnaChat._inputChg()">';
    html += '<button class="emna-send" id="emna-send" onclick="EmnaChat._send()"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button></div>';
    html += '</div>';

    var container = document.createElement("div");
    container.innerHTML = html;
    document.body.appendChild(container);
  }

  function getTime() {
    var n = new Date();
    return n.getHours().toString().padStart(2, "0") + ":" + n.getMinutes().toString().padStart(2, "0");
  }

  function scroll() {
    var c = document.getElementById("emna-msgs");
    if (c) c.scrollTop = c.scrollHeight;
  }

  function addBot(text, qrs, action) {
    var c = document.getElementById("emna-msgs");
    var d = document.createElement("div");
    d.className = "emna-msg bot";
    d.innerHTML = '<div class="emna-bbl"><div class="emna-btxt">' + text.replace(/\n/g, "<br>") + '</div><div class="emna-btime">' + getTime() + '</div></div>';
    c.appendChild(d);
    if (qrs && qrs.length) {
      var qd = document.createElement("div");
      qd.className = "emna-qrs";
      qrs.forEach(function(id) {
        var r = QUICK_REPLIES.find(function(q) { return q.id === id; });
        if (!r) return;
        var b = document.createElement("button");
        b.className = "emna-qr";
        b.textContent = r.label;
        b.onclick = function() { addUser(r.label); respond(id); };
        qd.appendChild(b);
      });
      c.appendChild(qd);
    }
    if (action === "openWhatsApp") {
      var ad = document.createElement("div");
      ad.className = "emna-act-wrap";
      ad.innerHTML = '<button class="emna-act" onclick="EmnaChat._openWA()">' + waSvg(18) + ' \u0641\u062a\u062d \u0648\u0627\u062a\u0633\u0627\u0628</button>';
      c.appendChild(ad);
    }
    scroll();
  }

  function addUser(text) {
    var c = document.getElementById("emna-msgs");
    var d = document.createElement("div");
    d.className = "emna-msg user";
    d.innerHTML = '<div class="emna-bbl"><div class="emna-btxt">' + text.replace(/\n/g, "<br>") + '</div><div class="emna-btime">' + getTime() + '</div></div>';
    c.appendChild(d);
    scroll();
  }

  function showTyping() {
    var c = document.getElementById("emna-msgs");
    var d = document.createElement("div");
    d.className = "emna-typing";
    d.id = "emna-typing";
    d.innerHTML = '<div class="emna-typing-bbl"><div class="emna-dot"></div><div class="emna-dot"></div><div class="emna-dot"></div></div>';
    c.appendChild(d);
    scroll();
  }

  function hideTyping() {
    var el = document.getElementById("emna-typing");
    if (el) el.remove();
  }

  function detect(msg) {
    var l = msg.toLowerCase();
    for (var i = 0; i < KEYWORDS.length; i++) {
      for (var j = 0; j < KEYWORDS[i].kw.length; j++) {
        if (l.indexOf(KEYWORDS[i].kw[j]) !== -1) return KEYWORDS[i].r;
      }
    }
    return "default";
  }

  function respond(key) {
    showTyping();
    var r = RESPONSES[key] || RESPONSES["default"];
    setTimeout(function() {
      hideTyping();
      addBot(r.text, r.followUp, r.action);
      if (r.action === "openWhatsApp") setTimeout(function() { openWA(); }, 1500);
    }, 800 + Math.random() * 700);
  }

  function openWA(msg) {
    var m = encodeURIComponent(msg || "\u0645\u0631\u062d\u0628\u0627\u064b\u060c \u0623\u0631\u064a\u062f \u0627\u0644\u0627\u0633\u062a\u0641\u0633\u0627\u0631 \u0639\u0646 \u062e\u062f\u0645\u0627\u062a \u0627\u0644\u062a\u0623\u0634\u064a\u0631\u0629");
    window.open("https://wa.me/" + WA_NUMBER + "?text=" + m, "_blank");
  }

  // Public API
  window.EmnaChat = {
    init: function(opts) {
      if (opts && opts.whatsappNumber) WA_NUMBER = opts.whatsappNumber;
      buildWidget();
    },
    _toggle: function() {
      isOpen = !isOpen;
      document.getElementById("emna-wa-chat").classList.toggle("open", isOpen);
      document.getElementById("emna-wa-btn").style.display = isOpen ? "none" : "flex";
      document.getElementById("emna-wa-badge").style.display = isOpen ? "none" : "flex";
      if (isOpen && !started) {
        started = true;
        addBot("\u0645\u0631\u062d\u0628\u0627\u064b \u0628\u0643 \u0641\u064a \u0634\u0631\u0643\u0629 \u0622\u0645\u0646\u0629 \u0641\u064a\u0632\u0627 \u0633\u064a\u0631\u0641\u064a\u0633! \u{1F44B}\n\n\u0643\u064a\u0641 \u064a\u0645\u0643\u0646\u0646\u064a \u0645\u0633\u0627\u0639\u062f\u062a\u0643 \u0627\u0644\u064a\u0648\u0645\u061F\n\n\u0627\u062e\u062a\u0631 \u0645\u0646 \u0627\u0644\u062e\u064a\u0627\u0631\u0627\u062a:", QUICK_REPLIES.map(function(q) { return q.id; }));
      }
    },
    _send: function() {
      var inp = document.getElementById("emna-input");
      var t = inp.value.trim();
      if (!t) return;
      addUser(t);
      inp.value = "";
      this._inputChg();
      respond(detect(t));
    },
    _key: function(e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); this._send(); }
    },
    _inputChg: function() {
      var inp = document.getElementById("emna-input");
      var btn = document.getElementById("emna-send");
      btn.classList.toggle("active", !!inp.value.trim());
    },
    _openWA: function(msg) { openWA(msg); }
  };
})();
