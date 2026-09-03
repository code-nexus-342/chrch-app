import { useEffect, useState } from 'react';
import Button from './ui/Button';
import apiService from '../services/api';

const channels = [
  { value: 'all', label: 'Choose at checkout', detail: 'Cards, bank, USSD & mobile money', icon: '✦' },
  { value: 'card', label: 'Card', detail: 'Visa, Mastercard, Amex & more', icon: '▣' },
  { value: 'mobile_money', label: 'Mobile money', detail: 'Available providers in your country', icon: '◉' },
  { value: 'bank_transfer', label: 'Bank transfer', detail: 'Pay securely from your bank', icon: '↗' }
];

const PAYSTACK_SCRIPT_URL = 'https://js.paystack.co/v1/inline.js';

const loadPaystack = () => new Promise((resolve, reject) => {
  if (window.PaystackPop) {
    resolve(window.PaystackPop);
    return;
  }

  const existingScript = document.querySelector(`script[src="${PAYSTACK_SCRIPT_URL}"]`);
  if (existingScript) {
    existingScript.addEventListener('load', () => resolve(window.PaystackPop));
    existingScript.addEventListener('error', () => reject(new Error('Unable to load Paystack checkout.')));
    return;
  }

  const script = document.createElement('script');
  script.src = PAYSTACK_SCRIPT_URL;
  script.async = true;
  script.onload = () => window.PaystackPop ? resolve(window.PaystackPop) : reject(new Error('Paystack checkout is unavailable.'));
  script.onerror = () => reject(new Error('Unable to load Paystack checkout.'));
  document.body.appendChild(script);
});

const DonateModal = ({ open, onClose }) => {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [channel, setChannel] = useState('all');
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    setIsSuccessful(false);
    setStatus('');
    const handleKeyDown = (event) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('');
    setIsSubmitting(true);

    try {
      const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) {
        throw new Error('Paystack is not configured. Add VITE_PAYSTACK_PUBLIC_KEY to the client environment and rebuild.');
      }

      const PaystackPop = await loadPaystack();
      const checkout = PaystackPop.setup({
        key: publicKey,
        email: email.trim(),
        amount: Math.round(Number(amount) * 100),
        currency: import.meta.env.VITE_PAYSTACK_CURRENCY || 'KES',
        ...(channel !== 'all' ? { channels: [channel] } : {}),
        callback: async (transaction) => {
          try {
            setStatus('Confirming your donation securely…');
            const verified = await apiService.verifyDonation(transaction.reference);
            if (verified.status !== 'success') {
              throw new Error('The payment was not completed.');
            }
            setIsSuccessful(true);
            setStatus('');
          } catch (error) {
            setStatus(error.message);
          } finally {
            setIsSubmitting(false);
          }
        },
        onClose: () => {
          setIsSubmitting(false);
          setStatus('');
        }
      });

      checkout.openIframe();
    } catch (error) {
      setStatus(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="donate-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="relative max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl dark:bg-slate-900 sm:p-8">
        <button type="button" onClick={onClose} aria-label="Close donation form" className="absolute right-5 top-5 rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800">✕</button>
        {isSuccessful ? (
          <div className="py-8 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl text-emerald-600">✓</div>
            <h2 id="donate-title" className="text-3xl text-slate-900 dark:text-white">Donation received</h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400">Thank you for your generous support. Your payment has been confirmed securely.</p>
            <Button type="button" variant="gradient" size="md" className="mt-7 rounded-2xl px-8" onClick={onClose}>Done</Button>
          </div>
        ) : (
          <>
            <div className="mb-7 pr-8">
              <span className="mb-3 inline-flex rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Give with purpose</span>
              <h2 id="donate-title" className="text-3xl text-slate-900 dark:text-white">Support the work</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">Your generosity helps us serve people, grow in faith, and strengthen our community.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="donation-amount" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Donation amount</label>
            <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10 dark:border-slate-700 dark:bg-slate-800">
              <span className="text-lg font-bold text-slate-400">{import.meta.env.VITE_PAYSTACK_CURRENCY || 'KES'}</span>
              <input id="donation-amount" required min="1" step="0.01" type="number" inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" className="w-full border-0 bg-transparent px-3 py-4 text-2xl font-bold text-slate-900 outline-none dark:text-white" />
            </div>
          </div>

          <div>
            <label htmlFor="donor-email" className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email for your receipt</label>
            <input id="donor-email" required type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-primary/10 dark:border-slate-700 dark:bg-slate-800 dark:text-white" />
          </div>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-200">How would you like to pay?</legend>
            <div className="grid gap-2 sm:grid-cols-2">
              {channels.map((item) => (
                <label key={item.value} className={`cursor-pointer rounded-2xl border p-3 transition ${channel === item.value ? 'border-primary bg-primary/5 ring-2 ring-primary/10' : 'border-slate-200 hover:border-primary/40 dark:border-slate-700'}`}>
                  <input type="radio" name="payment-channel" value={item.value} checked={channel === item.value} onChange={(event) => setChannel(event.target.value)} className="sr-only" />
                  <span className="flex items-start gap-3"><span className="mt-0.5 text-lg text-secondary">{item.icon}</span><span><span className="block text-sm font-bold text-slate-800 dark:text-white">{item.label}</span><span className="mt-0.5 block text-xs leading-5 text-slate-500 dark:text-slate-400">{item.detail}</span></span></span>
                </label>
              ))}
            </div>
          </fieldset>

          {status && <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">{status}</p>}
          <Button type="submit" variant="gradient" size="lg" className="w-full rounded-2xl" disabled={isSubmitting}>{isSubmitting ? 'Opening secure checkout…' : 'Continue to secure checkout →'}</Button>
              <p className="text-center text-xs text-slate-400">Payments are securely processed by Paystack. We never see your card details.</p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default DonateModal;
