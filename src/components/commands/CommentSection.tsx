import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import GlassCard from '../ui/GlassCard';
import { Loader2, Send, MessageSquare } from 'lucide-react';
import DOMPurify from 'dompurify';

interface Comment {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

interface CommentSectionProps {
  commandId: string;
}

export default function CommentSection({ commandId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Fetch comments when the component loads or commandId changes
  useEffect(() => {
    fetchComments();
  }, [commandId]);

  const fetchComments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('comments')
      .select('id, author, content, created_at')
      .eq('command_id', commandId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching comments:', error);
    } else {
      setComments(data || []);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (content.trim().length < 3) {
      setError("Comment must be at least 3 characters long.");
      return;
    }
    if (author.trim().length < 2) {
      setError("Please provide a valid name.");
      return;
    }

    setSubmitting(true);
    
    // Sanitize inputs to prevent XSS attacks before sending to database
    const safeAuthor = DOMPurify.sanitize(author.trim());
    const safeContent = DOMPurify.sanitize(content.trim());

    const { data, error } = await supabase
      .from('comments')
      .insert([
        { command_id: commandId, author: safeAuthor, content: safeContent }
      ])
      .select('id, author, content, created_at');

    if (error) {
      console.error('Error posting comment:', error);
      setError("Failed to post comment. Please try again.");
    } else if (data) {
      // Add new comment to the top of the list
      setComments([data[0], ...comments]);
      setAuthor('');
      setContent('');
    }
    setSubmitting(false);
  };

  return (
    <div className="mt-12 pt-8 border-t border-white/5">
      <h2 className="flex items-center gap-2 text-xl font-semibold text-text-primary mb-6">
        <MessageSquare className="w-5 h-5 text-accent-termux" />
        Discussion ({comments.length})
      </h2>

      {/* Comment Form */}
      <GlassCard className="p-5 mb-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              disabled={submitting}
              className="w-full px-4 py-2.5 bg-background-subtle border border-white/10 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-termux/50 transition-colors disabled:opacity-50"
              placeholder="Your name (e.g., AnonDev)"
            />
          </div>
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={3}
              disabled={submitting}
              className="w-full px-4 py-2.5 bg-background-subtle border border-white/10 rounded-lg text-text-primary placeholder-text-muted focus:outline-none focus:border-accent-termux/50 transition-colors disabled:opacity-50 resize-none"
              placeholder="Share a tip, ask a question, or suggest an improvement..."
            />
          </div>
          
          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-4 py-2 bg-accent-termux text-background font-medium rounded-lg hover:bg-accent-termux/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Post Comment
                </>
              )}
            </button>
          </div>
        </form>
      </GlassCard>

      {/* Comments List */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 text-text-muted animate-spin" />
        </div>
      ) : comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <GlassCard key={comment.id} className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-accent-termux/20 flex items-center justify-center text-accent-termux font-semibold text-sm">
                  {comment.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-text-primary text-sm">{comment.author}</p>
                  <p className="text-text-muted text-xs">
                    {new Date(comment.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
              <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-wrap break-words">
                {comment.content}
              </p>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-text-muted text-sm border border-dashed border-white/10 rounded-xl">
          No comments yet. Be the first to share your thoughts!
        </div>
      )}
    </div>
  );
}
