'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { MessageSafetyFilter, type SafetyScanResult } from '@/lib/safety/messageFilter';

export default function ClientMessagesPage() {
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'Dr. Arthur Vance',
      isMe: false,
      text: 'Good morning. I have uploaded the response spectrum verification models for Milestone 2.',
      time: '10:30 AM',
    },
    {
      id: 'm2',
      sender: 'You',
      isMe: true,
      text: 'Thank you, Dr. Vance. Our geotechnical team is conducting the peer review now.',
      time: '11:15 AM',
    }
  ]);

  const [input, setInput] = useState('');
  const [warning, setWarning] = useState<string | null>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Run Message Safety Scan
    const scan: SafetyScanResult = MessageSafetyFilter.scanMessage(input);
    if (!scan.isSafe) {
      setWarning(scan.flagReason);
      if (scan.severity === 'critical') {
        return; // Block completely
      }
    } else {
      setWarning(null);
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `m_${Date.now()}`,
        sender: 'You',
        isMe: true,
        text: scan.sanitizedContent,
        time: 'Just now',
      }
    ]);
    setInput('');
  };

  return (
    <div className="max-w-4xl h-[80vh] flex flex-col bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-primary text-sm">Dr. Arthur Vance, PE (Retired Chief Engineer)</h3>
          <span className="text-[11px] text-emerald-700 font-semibold">Active Contract: Seismic Stability Review</span>
        </div>
        <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-semibold">
          Escrow Protected
        </span>
      </div>

      {/* Message List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}
          >
            <span className="text-[10px] text-slate-400 mb-0.5">{m.sender} • {m.time}</span>
            <div
              className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                m.isMe
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-slate-100 text-slate-800 rounded-bl-none'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
      </div>

      {/* Safety Alert Warning */}
      {warning && (
        <div className="p-2.5 mx-4 mb-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center gap-2">
          <span>⚠️</span>
          <span>{warning}</span>
        </div>
      )}

      {/* Input Bar */}
      <form onSubmit={handleSend} className="p-3 border-t border-slate-200 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message... (Payments outside ZENITH escrow or credential requests are blocked)"
          className="flex-1 text-xs border border-slate-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <Button type="submit" size="sm">
          Send
        </Button>
      </form>
    </div>
  );
}
