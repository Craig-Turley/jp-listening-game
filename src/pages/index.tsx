import { CategoryCard } from "@/components/category-card";
import { Calendar, Clock, Hash } from "lucide-react";

const Index = () => {
  return (
    <main className="bg-background p-2">
      <header className="text-center mb-12 pt-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text">
          日付、時間、数字のゲーム
        </h1>
        <p className="text-xl text-muted-foreground">
          一緒に日本語の聞き取りを上達しよう
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <CategoryCard
          title="日付"
          icon={Calendar}
          path="/date"
        />

        <CategoryCard
          title="時間"
          icon={Clock}
          path="/time"
        />

        <CategoryCard
          title="数字"
          icon={Hash}
          path="/number"
        />
      </div>

    </main>
  );
};

export default Index;
