import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useScore } from "@/contexts/score-context";
import { cn, randomNumber, speakJa } from "@/lib/utils";
import { ChevronRight, SettingsIcon, Volume2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const NumberPage = () => {
  const { stats, recordAnswer } = useScore();
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(100);
  const [step, setStep] = useState<number>(1);
  const [input, setInput] = useState<number>(0);
  const [answer, setAnswer] = useState<number>(randomNumber({ min, max, step }));
  const [answered, setAnswered] = useState<boolean>(false);

  const [settingsToggled, setSettingsToggled] = useState<boolean>(false);

  const handleListenButton = () => {
    speakJa(answer.toString());
  };

  const handleCheckAnswer = () => {
    const isCorrect = answer === input;
    isCorrect ? toast.success("正解！") : toast.error("不正解");
    recordAnswer("numbers", isCorrect);
    setAnswered(true);
  };

  const handleNext = () => {
    setAnswer(randomNumber({ min, max, step }));
    setAnswered(false);
    setInput(0);
  };

  return (
    <main className="bg-background p-8 border rounded-md flex flex-col items-center justify-center space-y-8">
      <div className="flex flex-row items-center justify-center gap-x-3">
        <Button
          onClick={() => setSettingsToggled(prev => !prev)}
        >
          <SettingsIcon />
        </Button>
        <h2 className="underline text-center text-2xl">Number Practice</h2>
      </div>

      <div className={cn("space-y-2", settingsToggled ? "" : "hidden")}>
        <h3>Settings</h3>
        <div className="flex flex-col gap-2 items-center">

          <div className="flex w-56 items-center gap-2">
            <Input
              type="number"
              min={0}
              max={max - 1}
              value={min}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMin(e.target.valueAsNumber)}
              className="flex-1"
            />
            <span className="w-16 text-right whitespace-nowrap">低</span>
          </div>

          <div className="flex w-56 items-center gap-2">
            <Input
              type="number"
              min={min + 1}
              max={999999999}
              value={max}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMax(e.target.valueAsNumber)}
              className="flex-1"
            />
            <span className="w-16 text-right whitespace-nowrap">高</span>
          </div>

          <div className="flex w-56 items-center gap-2">
            <Input
              type="number"
              min={1}
              value={step}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setStep(e.target.valueAsNumber)}
              className="flex-1"
            />
            <span className="w-16 text-right whitespace-nowrap">ステップ</span>
          </div>
        </div>
        <hr className="h-0.5 bg-border border-0 mt-7" />
      </div>

      <div className="flex flex-col items-center space-y-5">
        <div className="flex flex-col items-center space-y-2">
          <Button
            onClick={handleListenButton}
          >
            <Volume2 />
          </Button>
          <p className="text-xs">オーディオを聞いて答えをチェックしてみる</p>
        </div>

        <div className="w-45 flex flex-row items-center gap-2">
          <Input
            type="number"
            min={min}
            max={max}
            value={input}
            className="w-45"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.valueAsNumber)}
          />
          <label>入</label>
        </div>

        <div>
          答え:<span className={cn("text-accent", answered ? "" : "hidden")}>{answer}</span>
        </div>

        <div className="flex flex-row gap-2">
          <Button
            variant="accent"
            disabled={answered}
            onClick={handleCheckAnswer}
          >
            Check
          </Button>
          <Button
            disabled={!answered}
            onClick={handleNext}
          >
            <ChevronRight />
          </Button>
        </div>
        <p>スコア: {stats.numbers.correct} / {stats.numbers.total}</p>
      </div >


    </main >
  );
};

export default NumberPage;
