import React from 'react';
import { useContent } from '../hooks/useContent';
import ContentPage from './ContentPage';

function ContentPageRoute({ section }) {
  const content = useContent();
  const data = content[section];
  const tables = content.tables[section];

  return <ContentPage data={data} sectionId={section} tables={tables} />;
}

export default ContentPageRoute;
