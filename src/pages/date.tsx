import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useScore } from "@/contexts/score-context";
import { cn, dateToJp, formatDate, NOP_YEAR, parseDate, randomDate, sameYMD, speakJa } from "@/lib/utils";
import { ChevronRight, SettingsIcon, Volume2 } from "lucide-react";
import { useState, type ChangeEvent } from "react";
import { toast } from "sonner";

const Date = () => {
  const { stats, recordAnswer } = useScore();
  const [includeYear, setIncludeYear] = useState<boolean>(true);
  const [minYear, setMinYear] = useState<number>(1900);
  const [answer, setAnswer] = useState<Date>(randomDate({ includeYear })); //XXXX年XX月XX日
  const [answered, setAnswered] = useState<boolean>(false);
  const [input, setInput] = useState("");

  const [settingsToggled, setSettingsToggled] = useState<boolean>(false);

  const handleListenButton = () => {
    console.log(dateToJp(answer, includeYear));
    speakJa(dateToJp(answer, includeYear));
  };

  const handleCheckAnswer = () => {
    const isCorrect = sameYMD(answer, parseDate(input, includeYear));
    isCorrect ? toast.success("正解！") : toast.error("不正解");
    recordAnswer("dates", isCorrect);
    setAnswered(true);
  };

  const handleNext = () => {
    setAnswer(randomDate({ includeYear, minYear, maxYear: 2025 }));
    setAnswered(false);
    setInput("");
  };

  return (
    <main className="bg-background p-8 border rounded-md flex flex-col items-center justify-center space-y-8">
      <div className="flex flex-row items-center justify-center gap-x-3">
        <Button
          onClick={() => setSettingsToggled(prev => !prev)}
        >
          <SettingsIcon />
        </Button>
        <h2 className="underline text-center text-2xl">Date Practice</h2>
      </div>

      <div className={cn("space-y-2", settingsToggled ? "" : "hidden")}>
        <h3>Settings</h3>
        <div className="flex flex-col gap-2 items-center justify-center">

          <div className="flex items-center gap-2">
            <Switch
              checked={includeYear}
              onCheckedChange={setIncludeYear}
            />
            <span className="whitespace-nowrap">年入</span>
          </div>

          <div className="flex items-center gap-2">
            <Input
              type="number"
              min={0}
              max={NOP_YEAR}
              value={minYear}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMinYear(e.target.valueAsNumber)}
              className="flex-1"
            />
            <span className="text-right whitespace-nowrap">低年</span>
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(prev => formatDate(prev, e.target.value, includeYear))}
          />
          <label>入</label>
        </div>

        <div>
          答え:<span className={cn("text-accent", answered ? "" : "hidden")}>{}</span>
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
        <p>スコア: {stats.dates.correct} / {stats.dates.total}</p>
      </div >


    </main >
  );
};

export default Date;
