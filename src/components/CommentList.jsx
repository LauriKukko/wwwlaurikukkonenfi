import React from 'react';
import { useUI } from '../hooks/useContent';

function CommentList({ comments }) {
  const ui = useUI();
  const t = ui.blog;

  return (
    <div className="comments-section">
      <h2 className="comments-heading">{t.comments}</h2>

      {(!comments || comments.length === 0) ? (
        <p className="no-comments">{t.noComments}</p>
      ) : (
        comments.map((c, i) => (
          <div key={i} className="comment-item">
            <div className="comment-meta">
              <span className="comment-author">{c.name}</span>
              <span className="comment-date">
                {new Date(c.date).toLocaleDateString()}
              </span>
            </div>
            <p className="comment-body">{c.body}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CommentList;
