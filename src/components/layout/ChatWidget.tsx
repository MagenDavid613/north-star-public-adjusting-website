'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Phone } from 'lucide-react'
import { BRAND } from '@/lib/brand'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  isTyping?: boolean
}

let msgCounter = 0
const newId = () => String(++msgCounter)

const OPENING_MESSAGE: Message = {
  id: 'open',
  role: 'assistant',
  content: `Hi! Thank you so much for reaching out. My name is ${BRAND.chatAssistantName}. Who am I chatting with today?`,
}

function TypingDots() {
  return (
    <span className="flex gap-1 items-center py-0.5">
      <span className="w-1.5 h-1.5 rounded-full bg-forest-100 animate-bounce" style={{ animationDelay: '0ms' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-forest-100 animate-bounce" style={{ animationDelay: '150ms' }} />
      <span className="w-1.5 h-1.5 rounded-full bg-forest-100 animate-bounce" style={{ animationDelay: '300ms' }} />
    </span>
  )
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([OPENING_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const sessionIdRef = useRef<string>('')
  const messagesRef = useRef<Message[]>(messages)
  const lastFiredCountRef = useRef<number>(0)

  useEffect(() => {
    if (typeof window === 'undefined') return
    sessionIdRef.current =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `s_${Date.now()}_${Math.random().toString(36).slice(2)}`
  }, [])

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  const fireLeadToGHL = useCallback((useBeacon: boolean) => {
    if (typeof window === 'undefined') return

    const current = messagesRef.current
    const realMessages = current.filter(
      (m) => m.content && !m.isTyping && m.id !== 'open'
    )
    const hasUser = realMessages.some((m) => m.role === 'user')
    if (!hasUser) return
    if (current.length <= lastFiredCountRef.current) return

    lastFiredCountRef.current = current.length

    const payload = {
      sessionId: sessionIdRef.current,
      messages: realMessages.map((m) => ({ role: m.role, content: m.content })),
      pageUrl: window.location.href,
      userAgent: navigator.userAgent,
    }

    const json = JSON.stringify(payload)

    if (useBeacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
      const blob = new Blob([json], { type: 'application/json' })
      navigator.sendBeacon('/api/chat/close', blob)
      return
    }

    fetch('/api/chat/close', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: json,
      keepalive: true,
    }).catch(() => {})
  }, [])

  const closeChat = useCallback(() => {
    fireLeadToGHL(false)
    setOpen(false)
  }, [fireLeadToGHL])

  useEffect(() => {
    if (typeof window === 'undefined') return
    const onUnload = () => fireLeadToGHL(true)
    window.addEventListener('beforeunload', onUnload)
    window.addEventListener('pagehide', onUnload)
    return () => {
      window.removeEventListener('beforeunload', onUnload)
      window.removeEventListener('pagehide', onUnload)
    }
  }, [fireLeadToGHL])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: Message = { id: newId(), role: 'user', content: text }
    const history = messages.filter((m) => m.content && !m.isTyping)
    const apiMessages = [...history, userMsg].map((m) => ({ role: m.role, content: m.content }))

    setMessages((prev) => [...prev.filter((m) => !m.isTyping), userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      const data = await res.json()

      if (!res.ok || data.error) throw new Error(data.error || 'Request failed')

      const paragraphs = (data.text as string)
        .split(/\n\n+/)
        .map((p) => p.trim())
        .filter(Boolean)

      if (paragraphs.length === 0) return

      const firstDelay = Math.min(1800 + paragraphs[0].length * 25, 4500)
      await new Promise((r) => setTimeout(r, firstDelay))

      setLoading(false)

      setMessages((prev) => [...prev, { id: newId(), role: 'assistant', content: paragraphs[0] }])

      for (let i = 1; i < paragraphs.length; i++) {
        await new Promise((r) => setTimeout(r, 2000))
        const typingId = newId()
        setMessages((prev) => [...prev, { id: typingId, role: 'assistant', content: '', isTyping: true }])

        const delay = Math.min(3500 + paragraphs[i].length * 40, 8000)
        await new Promise((r) => setTimeout(r, delay))

        const para = paragraphs[i]
        setMessages((prev) =>
          prev.map((m) => (m.id === typingId ? { ...m, content: para, isTyping: false } : m))
        )
      }
    } catch (err: any) {
      console.error('Chat error:', err?.message)
      setLoading(false)
      setMessages((prev) => [
        ...prev,
        {
          id: newId(),
          role: 'assistant',
          content: `Sorry, I'm having trouble connecting right now. Please call us directly at ${BRAND.phone.display} and we'll be happy to help.`,
        },
      ])
    }
  }, [input, loading, messages])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 md:right-6 z-[9998] w-[calc(100vw-2rem)] max-w-sm
                       rounded-card border border-forest-100 bg-white shadow-floating overflow-hidden flex flex-col"
            style={{ height: '520px' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-forest-500 px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                  <MessageCircle size={15} className="text-white" />
                </div>
                <div>
                  <div className="text-sm font-semibold leading-tight text-white">{BRAND.name}</div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-forest-100 animate-pulse" />
                    <span className="text-[11px] font-medium text-white/70">Online now</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={BRAND.phone.href}
                  className="flex items-center gap-1 rounded-pill bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-white/25"
                >
                  <Phone size={11} />
                  Call
                </a>
                <button
                  onClick={closeChat}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-colors duration-200 hover:bg-white/25"
                >
                  <X size={14} className="text-white" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="mr-2 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-forest-500">
                        <MessageCircle size={11} className="text-white" />
                      </div>
                    )}
                    <div
                      className={`max-w-[78%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'rounded-br-sm bg-forest-500 text-white'
                          : 'rounded-bl-sm border border-forest-100 bg-forest-50 text-ink'
                      }`}
                    >
                      {msg.isTyping || (msg.role === 'assistant' && msg.content === '')
                        ? <TypingDots />
                        : msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="flex justify-start"
                  >
                    <div className="mr-2 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-forest-500">
                      <MessageCircle size={11} className="text-white" />
                    </div>
                    <div className="rounded-2xl rounded-bl-sm border border-forest-100 bg-forest-50 px-3.5 py-2.5">
                      <TypingDots />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex-shrink-0 border-t border-forest-100 bg-white px-3 py-3">
              <div className="flex items-center gap-2 rounded-pill border border-forest-100 bg-forest-50/60 px-3 py-2 transition-colors duration-200 focus-within:border-forest-400">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type your message..."
                  className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder-ink-muted focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-forest-500 transition-all duration-200 disabled:opacity-30"
                >
                  <Send size={14} className="text-white" />
                </button>
              </div>
              <p className="mt-2 text-center text-[10px] text-ink-muted">
                Or call us directly: <a href={BRAND.phone.href} className="font-semibold text-forest-500">{BRAND.phone.display}</a>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">
        <AnimatePresence>
          {!open && (
            <motion.button
              onClick={() => setOpen(true)}
              initial={{ opacity: 0, x: 12, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 12, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="hidden items-center gap-2.5 rounded-pill bg-forest-500 px-4 py-2.5 text-sm font-bold text-white shadow-floating transition-transform duration-300 hover:-translate-y-0.5 sm:flex"
            >
              <span className="relative flex-shrink-0">
                <span className="absolute inset-0 rounded-full bg-forest-100 animate-ping opacity-75" />
                <span className="relative block h-2.5 w-2.5 rounded-full bg-forest-100" />
              </span>
              Online now
            </motion.button>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => (open ? closeChat() : setOpen(true))}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="flex h-[60px] w-[60px] items-center justify-center rounded-full bg-forest-500 shadow-floating"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <X size={22} className="text-white" strokeWidth={2.5} />
              </motion.span>
            ) : (
              <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <MessageCircle size={24} className="text-white" strokeWidth={2} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  )
}
