"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { sendEmail } from "@/app/actions/sendEmail";

interface ChatProps {
  profile?: unknown;
}

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const QUICK_REPLIES = [
  "👋 Hi! I'd like to discuss a project",
  "💼 I'm interested in hiring you",
  "🤝 Let's collaborate!",
  "❓ I have a question",
];

export default function Chat({ profile }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content:
        "Hey there! 👋 I'm Rajat's assistant. I'd love to help connect you with him. Drop your message below and I'll make sure it reaches him! ✨",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [step, setStep] = useState<
    "chat" | "email" | "name" | "sending" | "sent"
  >("chat");
  const [isTyping, setIsTyping] = useState(false);
  const [pendingMessage, setPendingMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when message count changes
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, messages]);

  const addBotMessage = (content: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          type: "bot",
          content,
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  const addUserMessage = (content: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        type: "user",
        content,
        timestamp: new Date(),
      },
    ]);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const message = inputValue.trim();
    setInputValue("");

    if (step === "chat") {
      addUserMessage(message);
      setPendingMessage(message);
      setStep("email");
      addBotMessage(
        "That's great! 📧 To make sure Rajat can get back to you, could you share your email address?",
      );
    } else if (step === "email") {
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(message)) {
        addUserMessage(message);
        addBotMessage(
          "Hmm, that doesn't look like a valid email. Could you try again? 🤔",
        );
        return;
      }
      addUserMessage(message);
      setSenderEmail(message);
      setStep("name");
      addBotMessage(
        "Perfect! 👤 And what's your name? (Optional - just hit send to skip)",
      );
    } else if (step === "name") {
      if (message.trim()) {
        addUserMessage(message);
        setSenderName(message);
      }
      await submitMessage(message);
    }
  };

  const submitMessage = async (name: string) => {
    setStep("sending");
    addBotMessage("Sending your message... ✨");

    const formData = new FormData();
    formData.append("senderEmail", senderEmail);
    formData.append("senderName", name || senderName);
    formData.append("message", pendingMessage);

    const result = await sendEmail(formData);

    if (result.success) {
      setStep("sent");
      addBotMessage(
        "Message sent successfully! 🎉 Rajat will get back to you soon. Thanks for reaching out!",
      );
      // Reset for new conversation after delay
      setTimeout(() => {
        setStep("chat");
        setPendingMessage("");
        setSenderEmail("");
        setSenderName("");
      }, 3000);
    } else {
      setStep("chat");
      addBotMessage(
        `Oops! Something went wrong. 😅 ${result.error || "Please try again later."}`,
      );
    }
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);
    setPendingMessage(reply);
    setStep("email");
    addBotMessage(
      "Awesome! 📧 To make sure Rajat can get back to you, could you share your email address?",
    );
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (step === "name" && !inputValue.trim()) {
        submitMessage("");
      } else {
        handleSendMessage();
      }
    }
  };

  const getPlaceholder = () => {
    switch (step) {
      case "email":
        return "Enter your email...";
      case "name":
        return "Your name (optional)...";
      case "sending":
        return "Sending...";
      case "sent":
        return "Message sent!";
      default:
        return "Type your message...";
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-background via-background to-muted/20 overflow-hidden">
      {/* Chat Header */}
      <div className="flex-shrink-0 px-4 py-3 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/5 border-b border-border/50 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20">
              RS
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-background animate-pulse" />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-foreground">
              Chat with Rajat
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Usually responds within hours
            </p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                message.type === "user"
                  ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-br-md shadow-lg shadow-primary/20"
                  : "bg-muted/50 backdrop-blur-sm border border-border/50 text-foreground rounded-bl-md"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              <p
                className={`text-[10px] mt-1 ${message.type === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-200">
            <div className="bg-muted/50 backdrop-blur-sm border border-border/50 px-4 py-3 rounded-2xl rounded-bl-md">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.3s]" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce [animation-delay:-0.15s]" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies */}
      {step === "chat" && messages.length === 1 && (
        <div className="flex-shrink-0 px-4 pb-2">
          <div className="flex flex-wrap gap-2">
            {QUICK_REPLIES.map((reply) => (
              <button
                type="button"
                key={reply}
                onClick={() => handleQuickReply(reply)}
                className="px-3 py-1.5 text-xs rounded-full bg-muted/50 hover:bg-muted border border-border/50 hover:border-primary/30 text-foreground transition-all duration-200 hover:scale-105 active:scale-95"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="flex-shrink-0 p-3 bg-muted/30 backdrop-blur-xl border-t border-border/50">
        <div className="flex gap-2 items-center">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type={step === "email" ? "email" : "text"}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={getPlaceholder()}
              disabled={step === "sending" || step === "sent"}
              className="w-full px-4 py-2.5 rounded-xl bg-background/80 border border-border/50 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-200 text-sm placeholder:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              if (step === "name" && !inputValue.trim()) {
                submitMessage("");
              } else {
                handleSendMessage();
              }
            }}
            disabled={
              (step !== "name" && !inputValue.trim()) ||
              step === "sending" ||
              step === "sent"
            }
            aria-label="Send message"
            className="p-2.5 rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {step === "sending" ? (
              <svg
                className="w-5 h-5 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Sending"
              >
                <title>Sending message</title>
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : step === "sent" ? (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                role="img"
                aria-label="Sent"
              >
                <title>Message sent</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                role="img"
                aria-label="Send"
              >
                <title>Send message</title>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center mt-2 gap-1.5">
          {["chat", "email", "name"].map((s, i) => (
            <div
              key={s}
              className={`h-1 rounded-full transition-all duration-300 ${
                step === s ||
                (step === "sending" && s === "name") ||
                (step === "sent" && s === "name")
                  ? "w-6 bg-primary"
                  : ["chat", "email", "name"].indexOf(
                        step === "sending" || step === "sent" ? "name" : step,
                      ) > i
                    ? "w-2 bg-primary/60"
                    : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
