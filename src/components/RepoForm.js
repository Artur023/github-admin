import React, { useState } from 'react';

const RepoForm = ({ initialData = {}, onSubmit, onCancel, mode = 'create' }) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [visibility, setVisibility] = useState(initialData.visibility || 'public');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === 'create' && !name.trim()) {
      alert("Имя репозитория обязательно");
      return;
    }
    onSubmit({ name, description, visibility });
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
      {mode === 'create' && (
        <div>
          <label>Имя репозитория:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}
      <div>
        <label>Описание:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div>
        <label>Видимость:</label>
        <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
          <option value="public">Публичный</option>
          <option value="private">Приватный</option>
        </select>
      </div>
      <button type="submit">{mode === 'create' ? 'Создать' : 'Обновить'}</button>
      <button type="button" onClick={onCancel}>Отмена</button>
    </form>
  );
};

export default RepoForm;
