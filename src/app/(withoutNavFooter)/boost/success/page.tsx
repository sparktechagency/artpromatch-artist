import Link from 'next/link';
import {
  CheckCircle2,
  Loader2,
  AlertCircle,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { artistVerifyBoostProfile } from '@/services/Artists';

type VerifyResponse = {
  success?: boolean;
  message?: string;
  data: {
    paymentStatus?: string;
    startTime?: string;
    endTime?: string;
    isActive?: boolean;
  };
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const BoostSuccessPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  const { session_id } = await searchParams;
  const res: VerifyResponse = session_id
    ? await artistVerifyBoostProfile(session_id as string)
    : {
        success: false,
        message: 'Missing session information. Please try again.',
      };

  const isSuccess = !!res?.success;
  const hasDetails =
    !!res &&
    (res.message ||
      res?.data?.paymentStatus ||
      res?.data?.startTime ||
      res?.data?.endTime ||
      typeof res?.data?.isActive === 'boolean');

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/80 border border-slate-800 rounded-3xl shadow-2xl shadow-slate-950/60 p-8 space-y-6">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium uppercase tracking-wide text-emerald-200/80">
              Boost Status
            </span>
          </div>
          <Sparkles className="h-5 w-5 text-slate-500" />
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800">
            {isSuccess ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
            ) : (
              <AlertCircle className="h-6 w-6 text-rose-400" />
            )}
          </div>
          <div className="space-y-2">
            <h1 className="text-xl font-semibold tracking-tight text-slate-50">
              {isSuccess
                ? "Your profile boost is live  you're on top!"
                : "We couldn't confirm your boost"}
            </h1>
            <p className="text-sm leading-relaxed text-slate-400">
              {isSuccess
                ? 'Your profile is now boosted and showing at the top for clients. Make sure your portfolio and availability are updated to get the most from this boost.'
                : res?.message ||
                  'Something went wrong while confirming your boost. Please try again.'}
            </p>
          </div>
        </div>

        {hasDetails && (
          <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Boost details
            </p>
            <div className="space-y-1.5 text-sm text-slate-300">
              {res.message && <p className="text-slate-300">{res.message}</p>}
              {res?.data?.paymentStatus && (
                <p className="text-slate-400 text-xs">
                  Payment:{' '}
                  <span className="text-slate-200 font-medium uppercase">
                    {res?.data?.paymentStatus}
                  </span>
                </p>
              )}
              {res?.data?.startTime && (
                <p className="text-slate-400 text-xs">
                  Start time:{' '}
                  <span className="text-slate-200 font-medium">
                    {new Date(res?.data?.startTime).toLocaleString()}
                  </span>
                </p>
              )}
              {res?.data?.endTime && (
                <p className="text-slate-400 text-xs">
                  End time:{' '}
                  <span className="text-slate-200 font-medium">
                    {new Date(res?.data?.endTime).toLocaleString()}
                  </span>
                </p>
              )}
              {typeof res?.data?.isActive === 'boolean' && (
                <p className="text-slate-400 text-xs">
                  Status:{' '}
                  <span className="text-slate-200 font-medium">
                    {res?.data?.isActive ? 'Running now' : 'Finished'}
                  </span>
                </p>
              )}
              {!res.message &&
                !res?.data?.paymentStatus &&
                !res?.data?.startTime &&
                !res?.data?.endTime &&
                typeof res?.data?.isActive !== 'boolean' &&
                isSuccess && (
                  <p className="text-slate-400 text-xs">
                    Your boost has been confirmed successfully.
                  </p>
                )}
            </div>
          </div>
        )}

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

export default BoostSuccessPage;
