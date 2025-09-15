import React from "react";
import { FiBattery } from "react-icons/fi";
import { FaCarSide } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import { MdOutlineSpeed } from "react-icons/md";
import { AiOutlineMail } from "react-icons/ai";
import Navbar from '../components/Navbar'

// AboutNIO.jsx
// Single-file responsive About page for NIO using Tailwind CSS and react-icons

export default function AboutNIO() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-gray-100 text-slate-900">
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        {/* Header / Hero */}
        <header className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">About <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-teal-400">NIO</span></h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl">
              NIO is a global smart electric vehicle company committed to designing and developing premium, high-performance EVs with a strong focus on user experience, sustainable mobility, and advanced battery and autonomy technologies.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#features"
                className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-3 rounded-lg shadow-md transition"
              >
                Learn our tech
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-slate-200 hover:bg-slate-50 px-4 py-3 rounded-lg transition"
              >
                <AiOutlineMail /> Contact
              </a>
            </div>

            <div className="mt-6 text-sm text-slate-500">Founded with a passion for electric mobility and a user-first mindset.</div>
          </div>

          <div className="relative">
            <div className="w-full aspect-[16/10] bg-gradient-to-tr from-indigo-50 to-teal-50 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden">
              {/* Decorative car illustration */}
              <svg viewBox="0 0 800 500" className="w-full h-full max-h-[360px]" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden>
                <defs>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0" stopColor="#6366f1" stopOpacity="0.85" />
                    <stop offset="1" stopColor="#14b8a6" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#g1)" opacity="0.08" />

                <g transform="translate(80,70)">
                  <path d="M40 220 L120 160 L560 160 L660 220 L680 240 L680 300 L40 300 Z" fill="#fff" opacity="0.12" />
                  <ellipse cx="180" cy="300" rx="40" ry="40" fill="#fff" opacity="0.14" />
                  <ellipse cx="540" cy="300" rx="40" ry="40" fill="#fff" opacity="0.14" />

                  <path d="M70 200 C120 140, 520 140, 580 200" stroke="#0ea5a4" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
                  <path d="M90 210 C140 160, 500 160, 560 210" stroke="#6366f1" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
                </g>
              </svg>
            </div>
          </div>
        </header>

        {/* Features */}
        <section id="features" className="mt-16">
          <h2 className="text-2xl font-semibold">What makes NIO special</h2>
          <p className="mt-2 text-slate-600 max-w-prose">A combination of engineering, battery innovation, and a community-first approach creates a distinctive EV brand.</p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard title="Battery as a Service" icon={<FiBattery size={28} />} desc="Flexible battery subscription and swap stations reduce upfront cost and refueling time." />
            <FeatureCard title="Elegant Design" icon={<FaCarSide size={28} />} desc="Sleek, aerodynamic forms with thoughtful interiors focused on comfort and intelligence." />
            <FeatureCard title="Electric Performance" icon={<MdOutlineSpeed size={28} />} desc="Acceleration and handling that rival sports cars while remaining emission-free." />
            <FeatureCard title="Smart Energy" icon={<GiElectric size={28} />} desc="Energy-efficient systems and predictive charge management for longer range and reliability." />
          </div>
        </section>

        {/* Story / Timeline */}
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-xl font-semibold">Our journey</h3>
            <p className="mt-3 text-slate-600">Since its inception, NIO has pushed on three pillars: innovation, community, and sustainability. From early EV models to modular battery services and a global user community, the company continues to iterate rapidly.</p>

            <ol className="mt-6 space-y-4">
              <li className="flex items-start gap-4">
                <div className="flex-none w-10 h-10 rounded-lg bg-indigo-600 text-white grid place-items-center">2014</div>
                <div>
                  <strong className="block">Founded</strong>
                  <span className="text-sm text-slate-500">The company was founded by a team focused on designing premium electric vehicles.</span>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex-none w-10 h-10 rounded-lg bg-teal-500 text-white grid place-items-center">2018</div>
                <div>
                  <strong className="block">First models</strong>
                  <span className="text-sm text-slate-500">Initial product launches established NIO in the premium EV segment.</span>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <div className="flex-none w-10 h-10 rounded-lg bg-indigo-700 text-white grid place-items-center">2020+</div>
                <div>
                  <strong className="block">Scale & services</strong>
                  <span className="text-sm text-slate-500">Battery swap, charging networks, and smart features expanded the ecosystem.</span>
                </div>
              </li>
            </ol>
          </div>

          <aside className="bg-white rounded-2xl p-6 shadow-md">
            <h4 className="font-semibold">Design philosophy</h4>
            <p className="mt-3 text-slate-600">Human-centered design at every step — from cockpit UX to over-the-air updates — ensures vehicles feel modern, responsive and continuously improving.</p>

            <div className="mt-6 grid grid-cols-1 gap-4">
              <Stat label="Global users" value="> 1M" />
              <Stat label="Battery swap stations" value="500+" />
              <Stat label="Models" value="SUVs & Sedans" />
            </div>
          </aside>
        </section>

        {/* Team / CTA */}
        <section className="mt-16 bg-gradient-to-r from-white to-slate-50 rounded-2xl p-8 shadow-sm">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold">Join the electric future</h3>
              <p className="mt-2 text-slate-600">Whether you're a driver, partner, or enthusiast, NIO's ecosystem is built to welcome and empower users worldwide.</p>
            </div>

            <div className="flex gap-3">
              <a className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-teal-600 text-white font-medium hover:bg-teal-700 transition" href="#">
                Get involved
              </a>
              <a className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-slate-200 hover:bg-slate-50 transition" href="#">
                Explore models
              </a>
            </div>
          </div>
        </section>

        {/* Contact */}
        <footer id="contact" className="mt-12 text-slate-700">
          <div className="border-t pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-sm">© {new Date().getFullYear()} NIO — Electric Mobility & Innovation</p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm hover:underline">Privacy</a>
              <a href="#" className="text-sm hover:underline">Terms</a>
            </div>
          </div>
        </footer>
      </section>
      <Navbar></Navbar>
    </main>
    
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <article className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 text-indigo-600">{icon}</div>
      <h4 className="mt-4 font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-slate-500">{desc}</p>
    </article>
  );
}

function Stat({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-sm text-slate-500">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );
}
