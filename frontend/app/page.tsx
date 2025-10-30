'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '../lib/api';

interface Challenge {
  id: number;
  title: string;
  description: string;
  participants: number;
  createdAt: string;
}

export default function Home() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [health, setHealth] = useState<any>(null);
  const [newChallenge, setNewChallenge] = useState({ title: '', description: '' });
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(null);

  // Загрузка данных
  const loadData = async () => {
    try {
      const [healthData, challengesData] = await Promise.all([
        apiClient.getHealth(),
        apiClient.getChallenges()
      ]);
      
      setHealth(healthData);
      setChallenges(challengesData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Создать челлендж
  const createChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.createChallenge({
        title: newChallenge.title,
        description: newChallenge.description,
        participants: 0
      });
      
      setNewChallenge({ title: '', description: '' });
      await loadData();
    } catch (error) {
      console.error('Error creating challenge:', error);
    }
  };

  // Обновить челлендж
  const updateChallenge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChallenge) return;

    try {
      await apiClient.updateChallenge(editingChallenge.id, {
        title: editingChallenge.title,
        description: editingChallenge.description,
      });
      
      setEditingChallenge(null);
      await loadData();
    } catch (error) {
      console.error('Error updating challenge:', error);
    }
  };

  // Удалить челлендж
  const deleteChallenge = async (id: number) => {
    try {
      await apiClient.deleteChallenge(id);
      await loadData();
    } catch (error) {
      console.error('Error deleting challenge:', error);
    }
  };

  // Присоединиться к челленджу
  const joinChallenge = async (id: number) => {
    try {
      await apiClient.joinChallenge(id);
      await loadData();
    } catch (error) {
      console.error('Error joining challenge:', error);
    }
  };

  return (
    <main className="container mx-auto p-8 max-w-6xl">
      <h1 className="text-4xl font-bold text-center mb-8">
        🚀 Challenge App - CRUD Testing
      </h1>
      
      {/* Статус системы */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Статус системы</h2>
        {health ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-3 rounded-lg ${
              health.status === 'ok' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              <span className="font-medium">Статус:</span> {health.status}
            </div>
            <div className="bg-blue-100 text-blue-800 p-3 rounded-lg">
              <span className="font-medium">Сервис:</span> {health.service}
            </div>
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
              <span className="font-medium">Время:</span> {new Date(health.timestamp).toLocaleString()}
            </div>
          </div>
        ) : (
          <p>Загрузка...</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Форма создания/редактирования */}
        <div className="space-y-6">
          {/* Создание челленджа */}
          {!editingChallenge ? (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Создать челлендж</h2>
              <form onSubmit={createChallenge} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Название</label>
                  <input
                    type="text"
                    value={newChallenge.title}
                    onChange={(e) => setNewChallenge({...newChallenge, title: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Название челленджа"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Описание</label>
                  <textarea
                    value={newChallenge.description}
                    onChange={(e) => setNewChallenge({...newChallenge, description: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    placeholder="Описание челленджа"
                    rows={3}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Создать челлендж
                </button>
              </form>
            </div>
          ) : (
            /* Редактирование челленджа */
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Редактировать челлендж</h2>
              <form onSubmit={updateChallenge} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Название</label>
                  <input
                    type="text"
                    value={editingChallenge.title}
                    onChange={(e) => setEditingChallenge({...editingChallenge, title: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Описание</label>
                  <textarea
                    value={editingChallenge.description}
                    onChange={(e) => setEditingChallenge({...editingChallenge, description: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                    rows={3}
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                  >
                    Сохранить
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingChallenge(null)}
                    className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Информация о API */}
          {/* <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold mb-2">Доступные API endpoints:</h3>
            <ul className="text-sm space-y-1">
              <li>GET /api/challenges - список челленджей</li>
              <li>POST /api/challenges - создать челлендж</li>
              <li>PUT /api/challenges/:id - обновить челлендж</li>
              <li>DELETE /api/challenges/:id - удалить челлендж</li>
              <li>POST /api/challenges/:id/join - присоединиться</li>
              <li>NEXT_PUBLIC_API_URL: {process.env.NEXT_PUBLIC_API_URL}</li>
            </ul>
          </div> */}
        </div>

        {/* Список челленджей */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Челленджи ({challenges.length})</h2>
            <button
              onClick={loadData}
              className="bg-gray-500 text-white py-1 px-3 rounded-lg hover:bg-gray-600"
            >
              Обновить
            </button>
          </div>
          
          {challenges.length > 0 ? (
            <div className="space-y-4">
              {challenges.map(challenge => (
                <div key={challenge.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-lg">{challenge.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => joinChallenge(challenge.id)}
                        className="bg-green-500 text-white py-1 px-3 rounded text-sm hover:bg-green-600"
                      >
                        Присоединиться ({challenge.participants})
                      </button>
                      <button
                        onClick={() => setEditingChallenge(challenge)}
                        className="bg-blue-500 text-white py-1 px-3 rounded text-sm hover:bg-blue-600"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => deleteChallenge(challenge.id)}
                        className="bg-red-500 text-white py-1 px-3 rounded text-sm hover:bg-red-600"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2">{challenge.description}</p>
                  <div className="text-xs text-gray-500">
                    ID: {challenge.id} | Создан: {new Date(challenge.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">Нет челленджей. Создайте первый!</p>
          )}
        </div>
      </div>

      {/* <div className="mt-8 text-center text-gray-600">
        <p>Фронтенд: Next.js (localhost:3000) | Бэкенд: NestJS (localhost:3001)</p>
        <p className="text-sm mt-2">In-Memory база данных - данные сохраняются до перезапуска сервера</p>
      </div> */}
    </main>
  );
}