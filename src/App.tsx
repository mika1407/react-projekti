import { useState } from "react";
import { HabitForm } from "./components/HabitForm";
import { HabitList, type Habit } from "./components/HabitList";
import { Header } from "./components/Header";
import { isSameDay } from "date-fns";

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([])

  function addHabit(name: string) {
    setHabits(curr => [...curr, { id: Date.now(), name, completions: [] }]);
  }

    function deleteHabit(id: number) {
    setHabits(curr => curr.filter(habit => habit.id !== id));
  }

    function toggleHabit(id: number, date: Date) {
    setHabits(curr => (
      curr.map(h => {
        if (h.id !== id) return h

        const alreadyDone = h.completions.some(c => isSameDay(c, date))
        const completions = alreadyDone
          ? h.completions.filter(c => !isSameDay(c, date))
          : [...h.completions, date]

        return { ...h, completions }
      })
    ))
  }

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <Header/>
      <HabitForm addHabit={addHabit}/>
      <HabitList deleteHabit={deleteHabit} toggleHabit={toggleHabit} habits={habits} />
    </div>
  )
}



