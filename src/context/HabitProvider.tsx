import { isSameDay } from "date-fns";
import { createContext, useContext, useState, type ReactNode } from "react";

export type Habit = {id: number; name: string; completions: Date[]};

type Context = {
    habits: Habit[]
    addHabit: (name: string) => void;
    deleteHabit: (id: number) => void;
    toggleHabit: (id: number, date: Date) => void;    
}

type HabitProviderProps = {
    children: ReactNode;
}

export const HabitContext = createContext< null | Context>(null);

export function HabitProvider({ children }: HabitProviderProps) {
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


    return <HabitContext value={{ habits, addHabit, deleteHabit, toggleHabit }}>  
    {children} </HabitContext>
}

export function useHabits() {
  const habitContext = useContext(HabitContext);
  if (habitContext === null) throw new Error("Null context");
  
  return habitContext;
}
