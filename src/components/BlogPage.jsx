import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent, useUI } from '../hooks/useContent';
import '../styles/Blog.css';

function BlogPage() {
  const navigate = useNavigate();
  const content = useContent();
  const ui = useUI();
  const t = ui.blog;
  const posts = content.blog.index;

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'F3') {
        e.preventDefault();
        navigate('/menu');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);

  const sorted = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <article className="blog-page" aria-labelledby="blog-title">
      <div className="blog-panel">
        <div className="blog-title-bar">
          <span>{t.titleBar}</span>
          <span>www.laurikukkonen.fi</span>
        </div>
        <div className="blog-body">
          <h1 className="blog-heading" id="blog-title">
            {t.title}
          </h1>

          {sorted.length === 0 ? (
            <p className="blog-no-posts">{t.noPosts}</p>
          ) : (
            <ul className="blog-post-list">
              {sorted.map((post) => (
                <li key={post.slug} className="blog-post-item">
                  <div className="blog-post-item-header">
                    <h2 className="blog-post-item-title">{post.title}</h2>
                    <span className="blog-post-item-date">{post.date}</span>
                  </div>
                  <p className="blog-post-item-excerpt">{post.excerpt}</p>
                  <button
                    className="blog-post-item-link"
                    onClick={() => navigate(`/blog/${post.slug}`)}
                  >
                    {t.readMore}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="blog-nav-buttons">
            <button
              className="blog-back-btn"
              onClick={() => navigate('/menu')}
            >
              {t.backToMenu}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default BlogPage;
