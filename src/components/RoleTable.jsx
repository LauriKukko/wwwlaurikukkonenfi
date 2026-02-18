import React from 'react';
import '../styles/RoleTable.css';

/**
 * Renders a styled table from a JSON data file.
 *
 * Expected JSON shape:
 *   {
 *     "tableTitle": "THEATRE ROLES",
 *     "columns": ["Theatre", "Production", ...],
 *     "rows": [["Vaasan KT", "Billy Elliot", ...], ...]
 *   }
 *
 * To update: edit the JSON file directly — no React code changes needed.
 */

function getTypeBadgeClass(type) {
  const t = (type || '').toLowerCase();
  if (t.includes('film') || t.includes('elokuva')) return 'role-type-badge--film';
  if (t.includes('tv') || t.includes('sarja')) return 'role-type-badge--tv';
  if (t.includes('commercial') || t.includes('mainos')) return 'role-type-badge--commercial';
  return 'role-type-badge--film';
}

function RoleTable({ data }) {
  if (!data || !data.rows || data.rows.length === 0) return null;

  const hasTypeBadge = data.columns.some(
    (col) => col.toLowerCase() === 'type' || col.toLowerCase() === 'tyyppi'
  );

  return (
    <div className="role-table-block">
      <h3 className="role-table-title">{data.tableTitle}</h3>
      <p className="role-table-scroll-hint">
        &#8592; Scroll horizontally to see full table &#8594;
      </p>
      <div className="role-table-wrapper">
        <table className="role-table" role="table">
          <thead>
            <tr>
              {data.columns.map((col, i) => (
                <th key={i} scope="col">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => {
                  // Render type badges for the last column if it's a "Type" column
                  const isTypeCol =
                    hasTypeBadge && cellIndex === row.length - 1;

                  return (
                    <td key={cellIndex}>
                      {isTypeCol && cell ? (
                        <span
                          className={`role-type-badge ${getTypeBadgeClass(
                            cell
                          )}`}
                        >
                          {cell}
                        </span>
                      ) : (
                        cell || '\u2014'
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {data.extraSection && (
        <div className="role-extra-section">
          <h4 className="role-extra-title">{data.extraSection.title}</h4>
          <ul className="role-extra-list">
            {data.extraSection.items.map((item, i) => (
              <li key={i} className="role-extra-item">{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default RoleTable;
