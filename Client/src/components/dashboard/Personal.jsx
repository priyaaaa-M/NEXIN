import React, { useState } from 'react';

const Personal = () => {
  // Goals state
  const [goals, setGoals] = useState([
    { id: 1, text: 'Learn React Advanced Concepts', completed: false, proof: null },
    { id: 2, text: 'Complete Fitness Challenge', completed: true, proof: 'fitness-cert.jpg' },
    { id: 3, text: 'Read 12 Books This Year', completed: false, progress: 4 }
  ]);

  const [newGoal, setNewGoal] = useState('');

  // Tasks state
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Call Mom at 9 PM', completed: false },
    { id: 2, text: 'Work on project for 2 hours', completed: false }
  ]);

  const [newTask, setNewTask] = useState('');

  // Wellness tracking
  const [wellness, setWellness] = useState({
    exercise: 30,
    meditation: 10,
    sleep: 7,
    water: 5
  });

  // Toggle goal completion
  const toggleGoal = (id) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  // Add new goal
  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, {
        id: Date.now(),
        text: newGoal,
        completed: false,
        proof: null
      }]);
      setNewGoal('');
    }
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Add new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask,
        completed: false
      }]);
      setNewTask('');
    }
  };

  // Update wellness metric
  const updateWellness = (metric, value) => {
    setWellness({ ...wellness, [metric]: Math.max(0, value) });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Personal Growth Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Goals Section */}
        <div className="md:col-span-2 bg-gray-50 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-4">My Goals</h2>

          <div className="mb-4 flex">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              placeholder="Add new goal..."
              className="flex-1 p-2 border rounded-l"
            />
            <button
              onClick={addGoal}
              className="bg-blue-500 text-white px-4 rounded-r"
            >
              Add
            </button>
          </div>

          <div className="space-y-3">
            {goals.map(goal => (
              <div key={goal.id} className="flex items-start p-3 bg-white rounded shadow-sm">
                <input
                  type="checkbox"
                  checked={goal.completed}
                  onChange={() => toggleGoal(goal.id)}
                  className="mt-1 mr-3"
                />
                <div className="flex-1">
                  <p className={`${goal.completed ? 'line-through text-gray-500' : ''}`}>
                    {goal.text}
                  </p>
                  {goal.progress && (
                    <div className="mt-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(goal.progress / 12) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{goal.progress}/12</span>
                    </div>
                  )}
                </div>
                {goal.completed && goal.proof && (
                  <span className="text-sm text-gray-500 ml-2">Proof uploaded</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Wellness Tracker */}
        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-4">Wellness Tracker</h2>

          <div className="space-y-4">
            <div>
              <label className="block mb-1">Exercise (minutes)</label>
              <input
                type="number"
                value={wellness.exercise}
                onChange={(e) => updateWellness('exercise', parseInt(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Meditation (minutes)</label>
              <input
                type="number"
                value={wellness.meditation}
                onChange={(e) => updateWellness('meditation', parseInt(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Sleep (hours)</label>
              <input
                type="number"
                value={wellness.sleep}
                onChange={(e) => updateWellness('sleep', parseFloat(e.target.value))}
                step="0.1"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block mb-1">Water (glasses)</label>
              <input
                type="number"
                value={wellness.water}
                onChange={(e) => updateWellness('water', parseInt(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Daily Tasks */}
        <div className="bg-gray-50 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>

          <div className="mb-4 flex">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add new task..."
              className="flex-1 p-2 border rounded-l"
            />
            <button
              onClick={addTask}
              className="bg-blue-500 text-white px-4 rounded-r"
            >
              Add
            </button>
          </div>

          <div className="space-y-2">
            {tasks.map(task => (
              <div key={task.id} className="flex items-center p-2 bg-white rounded">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="mr-3"
                />
                <span className={`${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Overview */}
        <div className="md:col-span-3 bg-gray-50 rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded shadow-sm">
              <h3 className="font-medium mb-2">Completed Goals</h3>
              <p className="text-2xl">
                {goals.filter(g => g.completed).length}/{goals.length}
              </p>
            </div>

            <div className="bg-white p-3 rounded shadow-sm">
              <h3 className="font-medium mb-2">Exercise</h3>
              <p className="text-2xl">{wellness.exercise} min</p>
            </div>

            <div className="bg-white p-3 rounded shadow-sm">
              <h3 className="font-medium mb-2">Meditation</h3>
              <p className="text-2xl">{wellness.meditation} min</p>
            </div>

            <div className="bg-white p-3 rounded shadow-sm">
              <h3 className="font-medium mb-2">Completed Tasks</h3>
              <p className="text-2xl">
                {tasks.filter(t => t.completed).length}/{tasks.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal;