import React from 'react';

const RepoSortOptions = ({ sortOption, onSortChange }) => {
  return (
    <div className="repo-sort">
      <label className="sort-label">Сортировать по:</label>
      <select
        value={sortOption}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="alphabetical">Алфавиту (A-Z)</option>
        <option value="date">Дате обновления</option>
      </select>
    </div>
  );
};

export default RepoSortOptions;
