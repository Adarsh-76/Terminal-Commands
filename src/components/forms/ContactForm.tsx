import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2, Send, CheckCircle, AlertCircle, X } from 'lucide-react';

// Zod schema for strict validation
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address').max(100),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
  botcheck: z.boolean().refine(val => val === undefined || val === false, 'Spam detected').optional(),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('loading');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: `New Contact Form Submission from ${data.name}`,
          from_name: 'CmdReference App',
          name: data.name,
          email: data.email,
          message: data.message,
          botcheck: data.botcheck,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        reset();
        setTimeout(() => setSubmitStatus('idle'), 4000);
      } else {
        throw new Error(result.message || 'Failed to send');
      }
    } catch (err) {
      console.error('Contact form error:', err);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 4000);
    }
  };

  return (
    <>
      {/* Popup Notification */}
      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-0 left-1/2 z-[100] flex items-center gap-3 bg-accent-termux/10 backdrop-blur-lg border border-accent-termux/30 text-text-primary px-6 py-4 rounded-xl shadow-2xl"
          >
            <CheckCircle className="w-6 h-6 text-accent-termux" />
            <div>
              <p className="font-semibold text-text-primary">Message Sent Successfully!</p>
              <p className="text-sm text-text-secondary">We will get back to you soon.</p>
            </div>
            <button onClick={() => setSubmitStatus('idle')} className="ml-4 text-text-muted hover:text-text-primary">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
        
        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 20, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-0 left-1/2 z-[100] flex items-center gap-3 bg-red-500/10 backdrop-blur-lg border border-red-500/30 text-text-primary px-6 py-4 rounded-xl shadow-2xl"
          >
            <AlertCircle className="w-6 h-6 text-red-400" />
            <div>
              <p className="font-semibold text-text-primary">Failed to Send</p>
              <p className="text-sm text-text-secondary">Please try again later.</p>
            </div>
            <button onClick={() => setSubmitStatus('idle')} className="ml-4 text-text-muted hover:text-text-primary">
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Honeypot field (hidden from humans) */}
        <input 
          type="text" 
          className="hidden" 
          style={{ display: 'none' }} 
          {...register('botcheck')} 
          tabIndex={-1} 
          autoComplete="off" 
        />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-2">
            Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            disabled={submitStatus === 'loading'}
            className="w-full px-4 py-3 bg-background-subtle border border-white/10 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-termux/50 transition-colors disabled:opacity-50"
            placeholder="John Doe"
          />
          {errors.name && <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            disabled={submitStatus === 'loading'}
            className="w-full px-4 py-3 bg-background-subtle border border-white/10 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-termux/50 transition-colors disabled:opacity-50"
            placeholder="john@example.com"
          />
          {errors.email && <p className="mt-2 text-sm text-red-400">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            {...register('message')}
            disabled={submitStatus === 'loading'}
            className="w-full px-4 py-3 bg-background-subtle border border-white/10 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-termux/50 transition-colors disabled:opacity-50 resize-none"
            placeholder="How can we improve the reference?"
          />
          {errors.message && <p className="mt-2 text-sm text-red-400">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={submitStatus === 'loading'}
          className="flex items-center gap-2 px-6 py-3 bg-accent-termux text-background font-semibold rounded-lg hover:bg-accent-termux/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitStatus === 'loading' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Send Message
            </>
          )}
        </button>
      </form>
    </>
  );
}
