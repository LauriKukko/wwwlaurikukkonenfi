import React, { useState, useEffect, useCallback } from 'react';
import { useUI } from '../hooks/useContent';

const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';
const STATICMAN_URL = import.meta.env.VITE_STATICMAN_URL || '';

function CommentForm({ slug }) {
  const ui = useUI();
  const t = ui.blog.commentForm;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [recaptchaReady, setRecaptchaReady] = useState(false);

  // Load reCAPTCHA v3 script
  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY) return;
    if (document.querySelector('script[src*="recaptcha/api.js"]')) {
      setRecaptchaReady(true);
      return;
    }
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.onload = () => setRecaptchaReady(true);
    document.head.appendChild(script);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!name.trim() || !email.trim() || !body.trim()) return;
      if (!STATICMAN_URL) {
        setStatus('error');
        return;
      }

      setStatus('sending');

      try {
        let recaptchaToken = '';
        if (RECAPTCHA_SITE_KEY && recaptchaReady && window.grecaptcha) {
          recaptchaToken = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, {
            action: 'comment',
          });
        }

        const payload = {
          fields: {
            name: name.trim(),
            email: email.trim(),
            body: body.trim(),
            slug,
          },
          options: {},
        };
        if (recaptchaToken) {
          payload.options.reCaptcha = {
            siteKey: RECAPTCHA_SITE_KEY,
            token: recaptchaToken,
          };
        }

        const response = await fetch(STATICMAN_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setStatus('success');
          setName('');
          setEmail('');
          setBody('');
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    },
    [name, email, body, slug, recaptchaReady]
  );

  const isSending = status === 'sending';

  return (
    <div className="comment-form-section">
      <h3 className="comment-form-heading">{t.heading}</h3>

      <div className="comment-instructions">
        <p className="comment-instructions-title">{t.instructions}</p>
        <p>&gt; {t.captchaNote}</p>
        <p>&gt; {t.emailNote}</p>
        <p>&gt; {t.privacyNote}</p>
      </div>

      <form className="comment-form" onSubmit={handleSubmit}>
        <div className="comment-field">
          <label htmlFor="comment-name">{t.name}</label>
          <input
            id="comment-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.namePlaceholder}
            required
            disabled={isSending}
          />
        </div>

        <div className="comment-field">
          <label htmlFor="comment-email">{t.email}</label>
          <input
            id="comment-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.emailPlaceholder}
            required
            disabled={isSending}
          />
        </div>

        <div className="comment-field">
          <label htmlFor="comment-body">{t.body}</label>
          <textarea
            id="comment-body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={t.bodyPlaceholder}
            required
            disabled={isSending}
          />
        </div>

        <button
          type="submit"
          className="comment-submit-btn"
          disabled={isSending || !name.trim() || !email.trim() || !body.trim()}
        >
          {isSending ? t.sending : t.submit}
        </button>

        {status === 'success' && (
          <p className="comment-status success">{t.success}</p>
        )}
        {status === 'error' && (
          <p className="comment-status error">{t.error}</p>
        )}

        <p className="recaptcha-badge-notice">
          Protected by reCAPTCHA v3 &middot; Google{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-dim)' }}
          >
            Privacy
          </a>{' '}
          &amp;{' '}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--text-dim)' }}
          >
            Terms
          </a>
        </p>
      </form>
    </div>
  );
}

export default CommentForm;
