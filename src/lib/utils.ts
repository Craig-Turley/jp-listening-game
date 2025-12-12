import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type RandomDateSettings = {
  includeYear: boolean;
  minYear?: number;
  maxYear?: number;
  step?: number;
};

export const NOP_YEAR = new Date().getFullYear();

export function randomDate({ includeYear, minYear, maxYear, step }: RandomDateSettings): Date {
  const year = includeYear ? randomNumber({ min: minYear ?? 1900, max: maxYear ?? NOP_YEAR, step }) : NOP_YEAR;
  const month = randomNumber({ min: 0, max: 11 });
  const day = month == 1 ? randomNumber({ min: 1, max: 28 }) : month % 2 != 0 ? randomNumber({ min: 1, max: 31 }) : randomNumber({ min: 1, max: 30 });

  return new Date(
    year,
    month,
    day,
  );
}

export function dateToJp(date: Date, includeYear?: boolean): string {
  const year = includeYear ? `${date.getFullYear()}年` : "";
  const month = `${date.getMonth() + 1}月`;
  const day = `${date.getDate()}日`;

  return year + month + day;
}

export const sameYMD = (a: Date, b: Date, includeYear?: boolean) =>
  (includeYear ? a.getFullYear() === b.getFullYear() : true) &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();


/**
 * @param min Inclusive
 * @param max Inclusive
*/
export type RandomNumberSettings = {
  min: number;
  max: number;
  step?: number
}

export function randomNumber({ min, max, step = 1 }: RandomNumberSettings): number {
  const range = Math.floor((max - min) / step) + 1;
  return min + step * Math.floor(Math.random() * range);
}

export interface RandomTimeSettings {
  militaryTime?: boolean;
  step?: number;
}

export interface Time {
  hrs: number;
  minutes: number;
  seconds?: number; // NOTE: maybe support this idk
  meridian?: "AM" | "PM";
}

export function randomTime(settings?: RandomTimeSettings): Time {
  const isMilitary = settings?.militaryTime ?? false;

  if (isMilitary) {
    return {
      hrs: randomNumber({ min: 0, max: 23 }),
      minutes: randomNumber({ min: 0, max: 59, step: settings?.step }),
    };
  }

  return {
    hrs: randomNumber({ min: 1, max: 12 }),
    minutes: randomNumber({ min: 0, max: 59, step: settings?.step }),
    meridian: Math.random() < 0.5 ? "AM" : "PM",
  };
}

export function timeToJpString(time: Time) {
  const meridianStr =
    time.meridian === "AM" ? "午前" :
      time.meridian === "PM" ? "午後" :
        "";

  const minuteStr =
    time.minutes === 30 ? "半" : `${time.minutes}分`;

  return `${meridianStr}${time.hrs}時${minuteStr}`;
}

/**
 * @abstract Parses strings in the following input format "HH:MM AM/PM" with optional meridian tracker
 */
export function parseTime(inp: string): Time {
  if ((inp.length !== 8 && inp.length !== 5) || inp[2] !== ":") {
    throw new Error("Invalid format passed to parseTime");
  }

  if (inp.length === 5) {
    return {
      hrs: parseInt(inp.slice(0, 2)),
      minutes: parseInt(inp.slice(3, 5)),
    };
  }

  const meridian = inp.slice(6).toUpperCase();
  if (meridian !== "AM" && meridian !== "PM") {
    throw new Error(`Invalid meridian "${meridian}". Expected "AM" or "PM".`);
  }

  return {
    hrs: parseInt(inp.slice(0, 2)),
    minutes: parseInt(inp.slice(3, 5)),
    meridian,
  };
}

export function parseDate(inp: string, includeYear = true): Date {
  inp = inp.replace(/[^\d]/g, "");  // keep only digits

  const year = includeYear ? Number(inp.slice(0, 4)) : NOP_YEAR;
  const month = Number(inp.slice(includeYear ? 4 : 0, includeYear ? 6 : 2));
  const day = Number(inp.slice(includeYear ? 6 : 2, includeYear ? 8 : 4));

  return new Date(year, month - 1, day);
}

let jaVoice: SpeechSynthesisVoice | null = null;

function initVoices() {
  const voices = window.speechSynthesis.getVoices();

  const jaVoices = voices.filter(v =>
    v.lang && v.lang.toLowerCase().startsWith('ja')
  );

  // TODO: pick a good voice
  jaVoice = jaVoices.find(v => v.name.includes('Kyoko')) || jaVoices[0] || null;
}

initVoices();

if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = initVoices;
}

export function speakJa(text: string) {
  if (!jaVoice) {
    console.warn('No Japanese voice available');
    return;
  }

  const u = new SpeechSynthesisUtterance(text);
  u.voice = jaVoice;
  u.lang = 'ja-JP';
  u.rate = 1.0; // NOTE: this could be a difficulty adjustment
  u.pitch = 1.0;

  speechSynthesis.cancel();
  speechSynthesis.speak(u);
}

export const formatDate = (prev: string, inp: string, includeYear?: boolean) => {
  const isDeleting = (inp.length - prev.length) < 0;
  const pos = inp.length;
  const offset = includeYear ? 6 : 0; //2025年 //123456[7]
  const normalizedPos = pos - offset;
  const curNum = Number(inp[inp.length - 1]);
  if (Number.isNaN(curNum) && !isDeleting) {
    return prev;
  }

  if (includeYear) {
    if (pos == 1 && curNum != 1 && curNum != 2) {
      return prev;
    }

    if (pos == 4 && !isDeleting) {
      inp += "年 "
    }

    if (pos == 5 && isDeleting) {
      inp = inp.slice(0, pos - 2);
    }
  }

  if (normalizedPos == 1 && curNum > 1) {
    return prev;
  }


  if (normalizedPos == 2 && !isDeleting) {
    if (curNum > 2 && Number(inp[0]) == 1) {
      return prev;
    }

    inp += "月 "
  }

  if (normalizedPos == 3 && isDeleting) {
    inp = inp.slice(0, pos - 2);
  }

  if ((normalizedPos == 5) && curNum > 3 && !isDeleting) {
    return prev;
  }

  if (normalizedPos == 6 && !isDeleting) {
    if (curNum > 1 && Number(inp[normalizedPos - 2]) == 3) {
      return prev;
    }

    inp += "日"
  }

  if (normalizedPos == 6 && isDeleting) {
    inp = inp.slice(0, pos - 1);
  }

  if (normalizedPos == 8) {
    return prev;
  }

  return inp;
}

export const formatTime = (prev: string, inp: string, isMilitaryTime?: boolean) => {
  const isDeleting = (inp.length - prev.length) < 0;
  const pos = inp.length;
  if (pos <= 5 && !isDeleting) {
    const num = parseInt(inp[inp.length - 1], 10);
    if (Number.isNaN(num) || num < 0) {
      return prev;
    }

    switch (pos) {
      case 1:
        if (num > (isMilitaryTime ? 2 : 1)) {
          return prev;
        }
        break;
      case 4:
        if (num > 5) {
          return prev;
        }
        break;
    }
  }

  if (pos == 2 && !isDeleting) {
    inp += ":";
  } else if (pos == 2 && isDeleting) {
    inp = inp.slice(0, 2);
  }

  if (isMilitaryTime && pos == 6) {
    return prev
  }

  if (pos >= 6 && isMilitaryTime) {
    return prev;
  }

  if (pos == 5 && !isDeleting && !isMilitaryTime) {
    inp += " ";
  } else if (pos == 5 && isDeleting) {
    inp = inp.slice(0, 4);
  }


  if (pos === 7 && !["A", "P"].includes(inp[6])) {
    return prev;
  } else if (pos === 7 && ["A", "P"].includes(inp[6]) && !isDeleting) {
    inp += "M"
  }

  if (pos === 7 && isDeleting) {
    inp = inp.slice(0, 5);
  }

  if (pos == 9) {
    return prev;
  }

  return inp;
};
