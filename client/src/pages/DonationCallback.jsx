import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import apiService from '../services/api';

const DonationCallback = () => {
  const [searchParams] = useSearchParams();
  const [state, setState] = useState({ loading: true, paid: false, message: '' });

  useEffect(() => {
    const reference = searchParams.get('reference');
    if (!reference) {
      setState({ loading: false, paid: false, message: 'We could not find a payment reference.' });
      return;
    }
    apiService.verifyDonation(reference)
      .then((transaction) => setState({ loading: false, paid: transaction.status === 'success', message: transaction.status === 'success' ? 'Thank you for your generous support.' : 'This payment was not completed.' }))
      .catch((error) => setState({ loading: false, paid: false, message: error.message }));
  }, [searchParams]);

  return <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950"><div className="w-full max-w-md rounded-[2rem] bg-white p-8 text-center shadow-xl dark:bg-slate-900"><div className={`mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full text-2xl ${state.loading ? 'animate-pulse bg-primary/10' : state.paid ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>{state.loading ? '…' : state.paid ? '✓' : '!'}</div><h1 className="text-2xl text-slate-900 dark:text-white">{state.loading ? 'Confirming your gift' : state.paid ? 'Donation received' : 'Payment update'}</h1><p className="mt-3 text-slate-500 dark:text-slate-400">{state.loading ? 'Please wait while we verify your payment securely.' : state.message}</p>{!state.loading && <Link to="/" className="mt-7 inline-flex rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary-dark">Return home</Link>}</div></main>;
};

export default DonationCallback;
