import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent, useUI } from '../hooks/useContent';
import '../styles/Blog.css';

function BlogPreview() {
  const navigate = useNavigate();
  const content = useContent();
  const ui = useUI();
  const t = ui.blog;
  const posts = content.blog.index;

  const sorted = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <article
      className="blog-page"
      style={{ paddingTop: 0, minHeight: 'auto' }}
    >
      <div className="blog-panel">
        <div className="blog-body">
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
        </div>
      </div>
    </article>
  );
}

export default BlogPreview;
