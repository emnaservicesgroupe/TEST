import React, { useState, useRef, useEffect } from "react";

const WHATSAPP_NUMBER = "21600000000"; // Replace with Emna Visa Services actual number

const quickReplies = [
  { id: "services", label: "خدماتنا", labelEn: "Our Services" },
  { id: "visa", label: "استفسار عن التأشيرة", labelEn: "Visa Inquiry" },
  { id: "jobs", label: "فرص العمل المتاحة", labelEn: "Available Jobs" },
  { id: "documents", label: "الوثائق المطلوبة", labelEn: "Required Documents" },
  { id: "status", label: "متابعة الملف", labelEn: "Track Application" },
  { id: "contact", label: "التواصل مع مستشار", labelEn: "Talk to Advisor" },
];

const botResponses = {
  services: {
    text: `مرحباً بك في شركة آمنة فيزا سيرفيس! 🏢

نحن نقدم الخدمات التالية:
• توفير فرص عمل في رومانيا وأوروبا
• إعداد ملفات التأشيرة والهجرة
• ترجمة الوثائق الرسمية
• متابعة إجراءات السفارة
• استشارات مجانية حول فرص العمل

📍 العنوان: Avenue Habib Bourguiba, Bardo, Tunisie - Tlili Centre 3ème étage

هل تحب تعرف أكثر على حاجة معينة؟`,
    followUp: ["visa", "jobs", "contact"],
  },
  visa: {
    text: `📋 معلومات التأشيرة:

نحن نساعدك في الحصول على تأشيرة عمل لرومانيا.

المراحل:
1️⃣ تقديم الملف الأولي
2️⃣ دفع الجزء الأول من المصاريف
3️⃣ استلام الملف من مكتب الهجرة
4️⃣ تحديد موعد مقابلة السفارة
5️⃣ دفع الجزء الثاني والحصول على عقد العمل
6️⃣ استلام التأشيرة والسفر

⏱ المدة التقديرية: 2-4 أشهر

هل تحب تعرف الوثائق المطلوبة؟`,
    followUp: ["documents", "status", "contact"],
  },
  jobs: {
    text: `💼 فرص العمل المتاحة حالياً:

🔨 البناء - رومانيا
🧹 التنظيف - رومانيا
👶 رعاية الأطفال - رومانيا
👴 رعاية المسنين - رومانيا
🪚 النجارة - رومانيا
🔧 السباكة - رومانيا
⚙️ الميكانيكا - رومانيا
🍽 المطاعم - رومانيا

✅ جميع الوظائف تشمل:
• عقد عمل رسمي
• تأمين صحي
• سكن مؤمن
• راتب شهري ثابت

هل تحب تقدّم على وظيفة؟`,
    followUp: ["documents", "visa", "contact"],
  },
  documents: {
    text: `📄 الوثائق المطلوبة:

1. جواز سفر ساري المفعول (6 أشهر على الأقل)
2. صور شخصية (4 صور بخلفية بيضاء)
3. شهادة ميلاد
4. شهادة حسن السيرة (S3)
5. شهادة طبية
6. شهادات العمل أو التكوين المهني
7. نسخة من بطاقة التعريف الوطنية

⚠️ جميع الوثائق يجب أن تكون مترجمة ومصادق عليها.

📍 يمكنك إحضار الملف إلى مكتبنا:
Avenue Habib Bourguiba, Bardo, Tunisie
Tlili Centre 3ème étage

هل تحتاج مساعدة أخرى؟`,
    followUp: ["visa", "status", "contact"],
  },
  status: {
    text: `📊 لمتابعة ملفك:

يرجى إرسال رقم الملف الخاص بك عبر الواتساب مباشرة لفريق الدعم.

سيقوم مستشارنا بالرد عليك خلال 24 ساعة بآخر مستجدات ملفك.

📱 اضغط على "التواصل مع مستشار" للتحدث مباشرة مع فريقنا.`,
    followUp: ["contact", "services"],
  },
  contact: {
    text: `📞 للتواصل المباشر مع مستشار:

سيتم تحويلك إلى الواتساب للتحدث مع أحد مستشارينا.

🕐 أوقات العمل:
الإثنين - الجمعة: 8:00 - 17:00
السبت: 8:00 - 13:00

اضغط على الزر أدناه للتواصل عبر الواتساب مباشرة. 👇`,
    followUp: [],
    action: "openWhatsApp",
  },
  default: {
    text: `شكراً على رسالتك! 😊

أنا المساعد الآلي لشركة آمنة فيزا سيرفيس.

يمكنني مساعدتك في:
• معلومات عن خدماتنا
• استفسارات التأشيرة
• فرص العمل المتاحة
• الوثائق المطلوبة
• متابعة ملفك

اختر من الخيارات أدناه أو اكتب سؤالك. 👇`,
    followUp: ["services", "visa", "jobs", "documents"],
  },
};

const keywordMap = [
  { keywords: ["خدم", "service", "نقدم", "تعمل"], response: "services" },
  { keywords: ["تأشير", "visa", "فيزا", "سفر"], response: "visa" },
  { keywords: ["عمل", "job", "وظيف", "خدمة", "شغل"], response: "jobs" },
  { keywords: ["وثائق", "وثيقة", "document", "ملف", "أوراق", "ورق"], response: "documents" },
  { keywords: ["متابع", "track", "status", "وين وصل", "ملفي"], response: "status" },
  { keywords: ["تواصل", "contact", "اتصل", "رقم", "هاتف", "مستشار"], response: "contact" },
];

function detectIntent(message) {
  const lower = message.toLowerCase();
  for (const { keywords, response } of keywordMap) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return response;
    }
  }
  return "default";
}

function WhatsAppIcon({ size = 24 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="white"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export default function WhatsAppChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendWelcomeMessage();
    }
  }, [isOpen]);

  const sendWelcomeMessage = () => {
    const welcome = {
      id: Date.now(),
      type: "bot",
      text: `مرحباً بك في شركة آمنة فيزا سيرفيس! 👋

أنا المساعد الآلي، كيف يمكنني مساعدتك اليوم؟

اختر من الخيارات أدناه:`,
      timestamp: new Date(),
      quickReplies: quickReplies.map((qr) => qr.id),
    };
    setMessages([welcome]);
  };

  const openWhatsApp = (message = "") => {
    const encodedMsg = encodeURIComponent(
      message || "مرحباً، أريد الاستفسار عن خدمات التأشيرة"
    );
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`,
      "_blank"
    );
  };

  const addBotResponse = (responseKey) => {
    setIsTyping(true);
    const response = botResponses[responseKey] || botResponses.default;

    setTimeout(() => {
      const botMsg = {
        id: Date.now(),
        type: "bot",
        text: response.text,
        timestamp: new Date(),
        quickReplies: response.followUp || [],
        action: response.action,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);

      if (response.action === "openWhatsApp") {
        setTimeout(() => openWhatsApp(), 1500);
      }
    }, 800 + Math.random() * 700);
  };

  const handleQuickReply = (replyId) => {
    const reply = quickReplies.find((qr) => qr.id === replyId);
    if (!reply) return;

    const userMsg = {
      id: Date.now(),
      type: "user",
      text: reply.label,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    addBotResponse(replyId);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now(),
      type: "user",
      text: input.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    const intent = detectIntent(input.trim());
    setInput("");
    addBotResponse(intent);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("ar-TN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
      {/* Chat Window */}
      {isOpen && (
        <div
          style={{
            width: "370px",
            height: "550px",
            marginBottom: "12px",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#e5ddd5",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #075e54 0%, #128c7e 100%)",
              color: "white",
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                backgroundColor: "#25d366",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <WhatsAppIcon size={22} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                آمنة فيزا سيرفيس
              </div>
              <div style={{ fontSize: "12px", opacity: 0.9 }}>
                متصل الآن • يرد عادة خلال دقائق
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "white",
                cursor: "pointer",
                padding: "4px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
              }}
              aria-label="إغلاق"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px",
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width=\'400\' height=\'400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cdefs%3E%3Cpattern id=\'p\' width=\'60\' height=\'60\' patternUnits=\'userSpaceOnUse\'%3E%3Cpath d=\'M30 5 L35 15 L30 25 L25 15Z\' fill=\'%23d4ccb5\' opacity=\'0.3\'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill=\'%23e5ddd5\' width=\'400\' height=\'400\'/%3E%3Crect fill=\'url(%23p)\' width=\'400\' height=\'400\'/%3E%3C/svg%3E")',
            }}
          >
            {messages.map((msg) => (
              <div key={msg.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent:
                      msg.type === "user" ? "flex-start" : "flex-end",
                    marginBottom: "8px",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "85%",
                      padding: "8px 12px",
                      borderRadius:
                        msg.type === "user"
                          ? "12px 12px 12px 4px"
                          : "12px 12px 4px 12px",
                      backgroundColor:
                        msg.type === "user" ? "#ffffff" : "#dcf8c6",
                      boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      direction: "rtl",
                      textAlign: "right",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "14px",
                        lineHeight: "1.5",
                        whiteSpace: "pre-line",
                        color: "#303030",
                      }}
                    >
                      {msg.text}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#999",
                        textAlign: "left",
                        marginTop: "4px",
                      }}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>

                {/* Quick Replies */}
                {msg.type === "bot" &&
                  msg.quickReplies &&
                  msg.quickReplies.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                        justifyContent: "flex-end",
                        marginBottom: "10px",
                        direction: "rtl",
                      }}
                    >
                      {msg.quickReplies.map((replyId) => {
                        const reply = quickReplies.find(
                          (qr) => qr.id === replyId
                        );
                        if (!reply) return null;
                        return (
                          <button
                            key={replyId}
                            onClick={() => handleQuickReply(replyId)}
                            style={{
                              padding: "6px 14px",
                              borderRadius: "18px",
                              border: "1px solid #25d366",
                              backgroundColor: "white",
                              color: "#075e54",
                              fontSize: "13px",
                              cursor: "pointer",
                              transition: "all 0.2s",
                              fontFamily: "inherit",
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.backgroundColor = "#25d366";
                              e.target.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.backgroundColor = "white";
                              e.target.style.color = "#075e54";
                            }}
                          >
                            {reply.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                {/* WhatsApp Action Button */}
                {msg.action === "openWhatsApp" && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: "10px",
                    }}
                  >
                    <button
                      onClick={() => openWhatsApp()}
                      style={{
                        padding: "10px 20px",
                        borderRadius: "24px",
                        border: "none",
                        backgroundColor: "#25d366",
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "bold",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        fontFamily: "inherit",
                      }}
                    >
                      <WhatsAppIcon size={18} />
                      فتح واتساب
                    </button>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "8px",
                }}
              >
                <div
                  style={{
                    padding: "12px 16px",
                    borderRadius: "12px 12px 4px 12px",
                    backgroundColor: "#dcf8c6",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                  }}
                >
                  <div style={{ display: "flex", gap: "4px" }}>
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "#128c7e",
                          animation: `typing 1.4s infinite ease-in-out`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div
            style={{
              padding: "8px 12px",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب رسالتك..."
              style={{
                flex: 1,
                padding: "10px 14px",
                borderRadius: "24px",
                border: "none",
                fontSize: "14px",
                outline: "none",
                direction: "rtl",
                fontFamily: "inherit",
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                border: "none",
                backgroundColor: input.trim() ? "#128c7e" : "#ccc",
                color: "white",
                cursor: input.trim() ? "pointer" : "default",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background-color 0.2s",
              }}
              aria-label="إرسال"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "#25d366",
            color: "white",
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(37, 211, 102, 0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.3s, box-shadow 0.3s",
            animation: "pulse 2s infinite",
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = "scale(1.1)";
            e.target.style.boxShadow = "0 6px 20px rgba(37, 211, 102, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.boxShadow = "0 4px 16px rgba(37, 211, 102, 0.4)";
          }}
          aria-label="فتح المحادثة"
        >
          <WhatsAppIcon size={30} />
        </button>
      )}

      {/* Notification Badge */}
      {!isOpen && (
        <div
          style={{
            position: "absolute",
            top: "-4px",
            right: "-4px",
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            backgroundColor: "#ff4444",
            color: "white",
            fontSize: "12px",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid white",
            pointerEvents: "none",
          }}
        >
          1
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4); }
          50% { box-shadow: 0 4px 24px rgba(37, 211, 102, 0.7); }
          100% { box-shadow: 0 4px 16px rgba(37, 211, 102, 0.4); }
        }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
