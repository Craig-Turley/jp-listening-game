import { createContext, useContext, useState, type ReactNode, useEffect } from "react";

interface CategoryStats {
  correct: number;
  total: number;
  currentStreak: number;
  bestStreak: number;
}

type Category = "dates" | "time" | "numbers";

interface ScoreContextType {
  stats: {
    dates: CategoryStats;
    time: CategoryStats;
    numbers: CategoryStats;
  };
  recordAnswer: (category: Category, isCorrect: boolean) => void;
  resetStats: () => void;
}

const initialStats = {
  dates: { correct: 0, total: 0, currentStreak: 0, bestStreak: 0 },
  time: { correct: 0, total: 0, currentStreak: 0, bestStreak: 0 },
  numbers: { correct: 0, total: 0, currentStreak: 0, bestStreak: 0 },
};

const ScoreContext = createContext<ScoreContextType | undefined>(undefined);

export const ScoreProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("japaneseGameStats");
    return saved ? JSON.parse(saved) : initialStats;
  });

  // useEffect(() => {
  //   localStorage.setItem("japaneseGameStats", JSON.stringify(stats));
  // }, [stats]);

  const recordAnswer = (category: Category, isCorrect: boolean) => {
    setStats((prev: any) => {
      const categoryStats = prev[category];
      const newStreak = isCorrect ? categoryStats.currentStreak + 1 : 0;

      return {
        ...prev,
        [category]: {
          correct: categoryStats.correct + (isCorrect ? 1 : 0),
          total: categoryStats.total + 1,
          currentStreak: newStreak,
          bestStreak: Math.max(categoryStats.bestStreak, newStreak),
        },
      };
    });
  };

  const resetStats = () => {
    setStats(initialStats);
    localStorage.removeItem("japaneseGameStats");
  };

  return (
    <ScoreContext.Provider value={{ stats, recordAnswer, resetStats }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  const context = useContext(ScoreContext);
  if (!context) {
    throw new Error("useScore must be used within ScoreProvider");
  }
  return context;
};

