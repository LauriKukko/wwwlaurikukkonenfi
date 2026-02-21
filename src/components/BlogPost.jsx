import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useContent, useUI } from '../hooks/useContent';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import '../styles/Blog.css';

function BlogPost() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const content = useContent();
  const ui = useUI();
  const t = ui.blog;
  const post = content.blog.posts[slug];
  const [comments, setComments] = useState([]);

  // Load comments from data/comments/{slug}/ at runtime
  useEffect(() => {
    let cancelled = false;
    async function loadComments() {
      try {
        const base = import.meta.env.BASE_URL.replace(/\/$/, '');
        const res = await fetch(`${base}/data/comments/${slug}/index.json`);
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setComments(data);
        }
      } catch {
        // No comments yet — that's fine
      }
    }
    loadComments();
    return () => { cancelled = true; };
  }, [slug]);

  // F3 to go back
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'F3') {
        e.preventDefault();
        navigate('/blog');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);

  if (!post) {
    return (
      <article className="blog-page">
        <div className="blog-panel">
          <div className="blog-title-bar">
            <span>{t.titleBar}</span>
            <span>www.laurikukkonen.fi</span>
          </div>
          <div className="blog-body">
            <p className="blog-no-posts">Post not found.</p>
            <div className="blog-nav-buttons">
              <button className="blog-back-btn" onClick={() => navigate('/blog')}>
                {t.backToBlog}
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="blog-page" aria-labelledby="post-title">
      <div className="blog-panel">
        <div className="blog-title-bar">
          <span>{t.titleBar}</span>
          <span>www.laurikukkonen.fi</span>
        </div>
        <div className="blog-body">
          <h1 className="blog-post-title" id="post-title">
            {post.title}
          </h1>
          <p className="blog-post-date">{post.date}</p>

          <div className="blog-post-content">
            {post.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <CommentList comments={comments} />
          <CommentForm slug={slug} />

          <div className="blog-nav-buttons">
            <button className="blog-back-btn" onClick={() => navigate('/blog')}>
              {t.backToBlog}
            </button>
            <button className="blog-back-btn" onClick={() => navigate('/menu')}>
              {t.backToMenu}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogPost;
