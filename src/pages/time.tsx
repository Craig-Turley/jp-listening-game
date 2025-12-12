import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useScore } from "@/contexts/score-context";
import { cn, formatTime, parseTime, randomTime, speakJa, timeToJpString, type Time } from "@/lib/utils";
import { ChevronRight, SettingsIcon, Volume2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const TimePage = () => {
  const { stats, recordAnswer } = useScore();
  const [militaryTime, setMilitaryTime] = useState<boolean>(false);
  const [step, setStep] = useState<number>(15);
  const [input, setInput] = useState<string>("");
  const [answer, setAnswer] = useState<Time>(randomTime({ militaryTime: militaryTime, step: step }));
  const [answered, setAnswered] = useState<boolean>(false);

  const [settingsToggled, setSettingsToggled] = useState<boolean>(false);

  const handleListenButton = () => {
    speakJa(timeToJpString(answer));
  };

  const handleCheckAnswer = () => {
    const formattedInput = parseTime(input);
    const isCorrect = JSON.stringify(answer) === JSON.stringify(formattedInput);
    isCorrect ? toast.success("正解！") : toast.error("不正解");
    recordAnswer("numbers", isCorrect);
    setAnswered(true);
  };

  const handleNext = () => {
    setAnswer(randomTime({ militaryTime: militaryTime, step: step }));
    setAnswered(false);
    setInput("");
  };;

  return (
    <main className="bg-background p-8 border rounded-md flex flex-col items-center justify-center space-y-8">
      <div className="flex flex-row items-center justify-center gap-x-3">
        <Button
          onClick={() => setSettingsToggled(prev => !prev)}
        >
          <SettingsIcon />
        </Button>
        <h2 className="underline text-center text-2xl">Time Practice</h2>
      </div>

      <div className={cn("space-y-2", settingsToggled ? "" : "hidden")}>
        <h3>Settings</h3>
        <div className="flex flex-col gap-2 items-center justify-center">

          <div className="flex items-center gap-2">
            <Switch
              checked={militaryTime}
              onCheckedChange={(checked) => {
                setAnswer(randomTime({ militaryTime: checked, step: step }));
                setMilitaryTime(checked);
              }}
            />
            <span className="whitespace-nowrap">24時</span>
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
            type="text"
            inputMode="numeric"
            value={input}
            className="w-45"
            pattern=""
            step={step}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(prev => formatTime(prev, e.target.value, militaryTime))}
          />
          <label>入</label>
        </div>

        <div>
          答え:<span className={cn("text-accent", answered ? "" : "hidden")}>{timeToJpString(answer)}</span>
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

export default TimePage;
