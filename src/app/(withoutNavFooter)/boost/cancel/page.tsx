'use client';

import { XCircle, ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';

const BoostCancelPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl shadow-slate-950/60 p-8 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wide text-rose-200/80">
              Boost Canceled
            </span>
          </div>
          <Sparkles className="h-5 w-5 text-slate-500" />
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800">
            <XCircle className="h-6 w-6 text-rose-400" />
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold tracking-tight text-slate-50">
              Your profile boost has been canceled
            </h1>
            <p className="text-sm leading-relaxed text-slate-400">
              You&apos;ve successfully stopped this boost session. You can boost again
              anytime to push your profile back to the top and reach more
              clients.
            </p>
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
            What happens now
          </p>
          <ul className="space-y-1.5 text-sm text-slate-400">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
              Your profile will return to normal visibility in the feed.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
              Any remaining boost time for this session won&apos;t be used.
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500" />
              You can start a fresh boost when you&apos;re ready.
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between pt-1">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-slate-50 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
            ArtPro Boost
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoostCancelPage;
