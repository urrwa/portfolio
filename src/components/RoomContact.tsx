/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useAudio } from './AudioEngine';
import { ArrowLeft, Send, Sparkles, AlertCircle, CheckCircle, Linkedin, MapPin, Mail, FileText, Globe } from 'lucide-react';
import PencilHoverText from './PencilHoverText';

interface RoomContactProps {
  onBack: () => void;
}

export default function RoomContact({ onBack }: RoomContactProps) {
  const { playClick, playScratch, playType, playWhoosh } = useAudio();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMsg('All entries are required to dispatch your message.');
      playScratch();
      return;
    }
    setErrorMsg('');
    setIsSending(true);
    playWhoosh();

    try {
      const response = await fetch('/api/contact/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await response.json();
      if (data.success) {
        setIsSent(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMsg(data.error || 'Failed to dispatch message.');
      }
    } catch (err) {
      setErrorMsg('Cannot reach the email service. Please use the direct mail link or try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#F9F8F6] p-4 sm:p-6 md:p-10 flex flex-col justify-between overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 bg-neutral-900/[0.012] pointer-events-none mix-blend-overlay bg-[radial-gradient(#1c1c1c_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Header controls */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between z-10 border-b border-dashed border-neutral-300 pb-4 select-none">
        <button
          onClick={() => {
            playClick();
            onBack();
          }}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500 hover:text-indigo-600 cursor-none interactive-obj group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>
            <PencilHoverText strokeColor="#4f46e5" underlineHeight={4}>
              Go Back to Hub
            </PencilHoverText>
          </span>
        </button>
        <div className="font-mono text-xs text-neutral-400 uppercase tracking-widest flex items-center gap-1.5">
          <span>☕ Creative Cafe & Contact</span>
        </div>
      </div>

      {/* Main Cafe Workspace */}
      <div className="w-full max-w-5xl mx-auto my-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6 select-none relative">
        
        {/* LEFT COLUMN: Poetical Invitation & Direct Link Badges */}
        <div className="lg:col-span-5 bg-white border-2 border-neutral-800 rounded-xl p-6 sm:p-8 shadow-[6px_6px_0px_rgba(28,28,28,0.12)] sketch-element flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4 border-b border-dashed border-neutral-200 pb-2">
              <Sparkles className="w-5 h-5 text-rose-500 animate-pulse" />
              <span className="font-mono text-xs font-bold text-neutral-400 uppercase tracking-widest">
                Creative Studio Cafe
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-neutral-800 leading-snug mb-4">
              Let's build something meaningful.
            </h2>

            <div className="font-serif text-neutral-600 text-sm leading-relaxed space-y-2 mb-8">
              <p>Whether it's a product,</p>
              <p>an idea,</p>
              <p>or just a conversation—</p>
              <p className="font-bold text-neutral-800 pt-2">I'd love to hear from you.</p>
            </div>

            {/* Quick Action Link Cards */}
            <div className="space-y-2.5">
              <a
                href="mailto:urwahimtiaz857@gmail.com"
                className="p-3 bg-neutral-50 border-2 border-neutral-800 rounded-xl flex items-center justify-between hover:bg-indigo-50 hover:border-indigo-600 transition-all cursor-none interactive-obj group"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-indigo-600" />
                  <span className="font-mono text-xs font-bold text-neutral-800">✉ Send a Message</span>
                </div>
                <span className="font-mono text-[9px] text-neutral-400 uppercase">Direct Mail →</span>
              </a>

              <a
                href="https://www.linkedin.com/in/urwahimtiaz/?skipRedirect=true"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral-50 border-2 border-neutral-800 rounded-xl flex items-center justify-between hover:bg-sky-50 hover:border-sky-600 transition-all cursor-none interactive-obj group"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-sky-600" />
                  <span className="font-mono text-xs font-bold text-neutral-800">🌐 LinkedIn</span>
                </div>
                <span className="font-mono text-[9px] text-neutral-400 uppercase">Connect →</span>
              </a>

              <a
                href="https://behance.net"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-neutral-50 border-2 border-neutral-800 rounded-xl flex items-center justify-between hover:bg-blue-50 hover:border-blue-600 transition-all cursor-none interactive-obj group"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="font-mono text-xs font-bold text-neutral-800">🎨 Behance</span>
                </div>
                <span className="font-mono text-[9px] text-neutral-400 uppercase">Portfolio →</span>
              </a>

              <a
                href="/resume.docx"
                target="_blank"
                rel="noopener noreferrer"
                download
                className="p-3 bg-neutral-50 border-2 border-neutral-800 rounded-xl flex items-center justify-between hover:bg-amber-50 hover:border-amber-600 transition-all cursor-none interactive-obj group"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span className="font-mono text-xs font-bold text-neutral-800">💼 Resume</span>
                </div>
                <span className="font-mono text-[9px] text-neutral-400 uppercase">PDF Download →</span>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-dashed border-neutral-200 flex items-center justify-between font-mono text-xs text-neutral-500">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>📍 Pakistan</span>
            </span>
            <span className="text-[10px] text-neutral-400">PKT (UTC +5)</span>
          </div>
        </div>

        {/* RIGHT COLUMN: Notebook Letter Form */}
        <div className="lg:col-span-7 bg-white border-2 border-neutral-800 rounded-xl p-6 sm:p-8 shadow-[8px_8px_0px_rgba(28,28,28,0.15)] sketch-element relative overflow-hidden flex flex-col justify-between">
          
          {/* Lined Notebook background lines */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-rose-200 pointer-events-none" />

          <div className="relative pl-6">
            <div className="flex items-center justify-between border-b border-dashed border-neutral-200 pb-3 mb-6">
              <h3 className="font-serif text-xl font-bold text-neutral-800">✉ Send a Handwritten Note</h3>
              <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">* Response &lt; 24h *</span>
            </div>

            {isSent ? (
              <div className="py-12 text-center animate-in fade-in duration-300">
                <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4 animate-bounce" />
                <h4 className="font-serif text-xl font-bold text-neutral-800">Message Dispatched!</h4>
                <p className="font-serif text-neutral-600 text-sm max-w-sm mx-auto mt-2 leading-relaxed">
                  "Your handwritten message has been folded into a paper airplane and sent to Urwah in Pakistan."
                </p>
                <button
                  onClick={() => {
                    playClick();
                    setIsSent(false);
                  }}
                  className="mt-6 px-5 py-2 border-2 border-neutral-800 hover:bg-neutral-50 text-xs font-mono font-bold uppercase tracking-wider rounded cursor-none interactive-obj"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        if (Math.random() > 0.6) playType();
                      }}
                      className="w-full bg-transparent border-b-2 border-neutral-300 focus:border-indigo-600 text-neutral-800 font-serif text-sm p-1.5 focus:outline-none cursor-none"
                      placeholder="Jane Doe"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (Math.random() > 0.6) playType();
                      }}
                      className="w-full bg-transparent border-b-2 border-neutral-300 focus:border-indigo-600 text-neutral-800 font-serif text-sm p-1.5 focus:outline-none cursor-none"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-neutral-400 uppercase tracking-widest mb-1">Your Message</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (Math.random() > 0.6) playType();
                    }}
                    rows={4}
                    className="w-full bg-transparent border-b-2 border-neutral-300 focus:border-indigo-600 text-neutral-800 font-serif text-sm p-1.5 focus:outline-none resize-none cursor-none"
                    placeholder="Tell me about your project, idea, or just say hello..."
                  />
                </div>

                {errorMsg && (
                  <div className="flex items-center gap-2 p-3 bg-rose-50 text-rose-600 rounded text-xs font-mono border border-rose-200">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3">
                  <span className="font-mono text-[9px] text-neutral-400 uppercase tracking-widest">
                    * Paper Airplane Dispatch *
                  </span>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center gap-2 rounded-lg cursor-none interactive-obj hover:scale-105 active:scale-95 transition-all disabled:bg-neutral-400 shadow"
                  >
                    <span>Dispatch Paper Airplane</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

      <div className="w-full text-center text-neutral-400 font-mono text-[10px] mt-8 select-none">
        Urwah Imtiaz Studio • Faisalabad, Pakistan
      </div>
    </div>
  );
}
