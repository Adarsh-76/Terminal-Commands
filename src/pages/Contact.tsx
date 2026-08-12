import GlassCard from '../components/ui/GlassCard';
import ContactForm from '../components/forms/ContactForm';
import { Mail, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">Get in Touch</h1>
        <p className="text-text-secondary">
          Found a bug, have a suggestion, or want to contribute a command? Let us know.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <GlassCard className="p-6 flex items-start gap-4">
          <div className="p-3 bg-accent-termux/10 rounded-lg">
            <Mail className="w-6 h-6 text-accent-termux" />
          </div>
          <div>
            <h3 className="text-text-primary font-medium mb-1">Direct Message</h3>
            <p className="text-text-secondary text-sm">Use the form below to send us a quick message securely.</p>
          </div>
        </GlassCard>
        
        <GlassCard className="p-6 flex items-start gap-4">
          <div className="p-3 bg-accent-linux/10 rounded-lg">
            <MessageSquare className="w-6 h-6 text-accent-linux" />
          </div>
          <div>
            <h3 className="text-text-primary font-medium mb-1">Command Discussions</h3>
            <p className="text-text-secondary text-sm">Each command page has a comment section for specific questions.</p>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6 md:p-8">
        <ContactForm />
      </GlassCard>
    </div>
  );
}
