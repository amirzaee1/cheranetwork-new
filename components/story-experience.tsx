"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowUpLeft,
  Award,
  Banknote,
  BriefcaseBusiness,
  Box,
  Check,
  CircleDollarSign,
  Factory,
  GraduationCap,
  HandHeart,
  HeartHandshake,
  House,
  Lightbulb,
  MessageCircle,
  Network,
  PackageCheck,
  Route,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Sprout,
  Store,
  Stethoscope,
  Tractor,
  TrendingUp,
  Users,
  Wheat,
  Wrench,
  Cog,
  X,
} from "lucide-react";

type CSSVars = CSSProperties &
  Record<`--${string}`, string | number | undefined>;

const publicAsset = (path: string) =>
  `https://masir-tahavol-eghtesad.gkib5361696559gspue6.chatgpt.site${path}`;

export function resolveSceneShot(
  title: string,
  text: string,
  shotCount: number,
) {
  if (shotCount < 2) return 0;
  if (
    title === "عصر کشاورزی" &&
    /تراکتور|بیست نفر|رانندگی|تعمیر تراکتور|فروش سوخت|حمل محصول/.test(text)
  )
    return 3;
  if (
    title === "عصر کشاورزی" &&
    /کالا را با کالا|گندم|لباس|دام با پارچه|تهاتر|مبادله/.test(text)
  )
    return 1;
  if (
    title === "عصر کشاورزی" &&
    /پول|سکه|اسکناس|طلا|نقره|دلار|ابزار مشترک/.test(text) &&
    !/کالا را با کالا|گندم|لباس|تهاتر/.test(text)
  )
    return 2;
  if (
    title === "عصر صنعت" &&
    /ربات|طراحی|برنامه‌ریزی|نگهداری|کامپیوتر|اینترنت|فناوری/.test(text)
  )
    return 1;
  if (
    title === "مسیر سنتی توزیع" &&
    /قیمت نهایی|مشتری فقط|هزینه تمام مسیر|افزایش قیمت/.test(text)
  )
    return 2;
  const rules: Record<string, RegExp[]> = {
    "عصر کشاورزی": [
      /زمین|کشاورز|محصول|جمعیت|شهرها|غذا|قدرت اقتصادی/,
      /کالا را با کالا|گندم|لباس|دام|پارچه|تهاتر|مبادله/,
      /پول|سکه|اسکناس|طلا|نقره|دلار|ابزار مشترک|ارزش کالا/,
    ],
    "عصر صنعت": [
      /کارخانه|ماشین|تولید|صنعتی|سرعت|استاندارد|شهرها/,
      /ربات|طراحی|برنامه‌ریزی|نگهداری|کامپیوتر|اینترنت|فناوری/,
    ],
    "مسیر سنتی توزیع": [
      /تولید می‌شود|کارخانه|محصول آماده|بسته‌بندی/,
      /عمده|پخش|انبار|فروشگاه|واسطه|حمل‌ونقل|اجاره/,
      /قیمت نهایی|مشتری فقط|هزینه تمام مسیر|افزایش قیمت/,
    ],
    "عصر ارتباطات": [
      /کامپیوتر|اینترنت|اطلاعات|اتصال|فناوری|سرعت تجارت/,
      /تجربه|اعتماد|معرفی|پیشنهاد|رضایت|انسان دیگر/,
    ],
    "فروش مستقیم": [
      /تجربه|اعتماد|معرفی|توصیه|گفت‌وگو|رابطه/,
      /تولیدکننده|واسطه|مشتری|توزیع|فروش مستقیم|محصول واقعی/,
    ],
    "چرخش سود": [
      /ارزش آزاد|کیفیت|تحقیق|مواد اولیه|تشویقی|گسترش شبکه|سرمایه‌گذاری/,
      /کارخانه|مشتری|قیمت مناسب|برنده|سود|فروش واقعی/,
    ],
    "نتورک سالم یا هرمی؟": [
      /هرمی|ورود افراد|افراد جدید|پول اصلی|ساختار پانزی|ناسالم/,
      /شبه‌نتورک|محصول فرمایشی|پوشش ظاهری|تمرکز بر عضوگیری/,
      /نتورک سالم|محصول واقعی|مصرف واقعی|فروش واقعی|توسعه بازار|مشتری واقعی/,
      /تاریخچه|ایران|دولت|قانونی|مجوز|سال ۱۳۸۴|سال ۱۳۸۷/,
    ],
  };
  const sceneRules = rules[title];
  if (!sceneRules) return 0;
  const matched = sceneRules.findIndex((rule) => rule.test(text));
  return matched < 0 ? 0 : Math.min(matched, shotCount - 1);
}
const banks = [
  {
    id: "money",
    title: "بانک مالی",
    icon: CircleDollarSign,
    color: "#eab65b",
    desc: "موجودی این بانک فقط پول نقد نیست؛ درآمد، پس‌انداز، دارایی و توان مدیریت هزینه‌هاست. درآمد بیشتر بدون مدیریت مالی الزاماً امنیت نمی‌سازد.",
    example:
      "مثال: از هر درآمد سهمی برای هزینه امروز، یادگیری و فرصت آینده کنار می‌گذاری.",
    full: [
      "این بانک با درآمد پر می‌شود، اما با شیوه نگهداری و تصمیم‌های مالی سالم می‌ماند.",
      "خرید هیجانی، بدهی بدون برنامه و نداشتن ذخیره اضطراری می‌تواند آن را خالی کند.",
    ],
    question:
      "این تصمیم فقط امروز پول می‌سازد یا امنیت مالی فردا را هم بیشتر می‌کند؟",
  },
  {
    id: "social",
    title: "بانک ارتباطی",
    icon: Users,
    color: "#5fc9ce",
    desc: "هر رابطه سالم یک سرمایه است؛ نه به‌معنی استفاده از آدم‌ها، بلکه اعتماد دوطرفه‌ای که با شنیدن، کمک‌کردن و خوش‌قولی ساخته می‌شود.",
    example:
      "مثال: کسی تو را معرفی می‌کند چون تجربه خوبی از رفتار و مسئولیت‌پذیری تو دارد، نه چون تحت فشار بوده است.",
    full: [
      "بانک ارتباطی با تعداد شماره‌های تلفن سنجیده نمی‌شود؛ کیفیت اعتماد و رابطه مهم است.",
      "قولی که انجام نمی‌شود، فشار برای خرید و نگاه ابزاری به آدم‌ها از موجودی این بانک کم می‌کند.",
    ],
    question: "بعد از این گفت‌وگو، اعتماد این آدم به من بیشتر می‌شود یا کمتر؟",
  },
  {
    id: "skill",
    title: "بانک مهارتی",
    icon: Wrench,
    color: "#a88af2",
    desc: "مهارت چیزی است که حتی با عوض‌شدن شغل و بازار همراهت می‌ماند. ارتباط، فروش، مذاکره، یادگیری و حل مسئله با تمرین به دارایی تبدیل می‌شوند.",
    example:
      "مثال: هر گفت‌وگو را فرصتی برای بهتر شنیدن، روشن‌تر توضیح‌دادن و دقیق‌تر حل‌کردن مسئله می‌بینی.",
    full: [
      "مطالعه بدون تمرین اطلاعات می‌سازد؛ مهارت زمانی ساخته می‌شود که اجرا کنی، بازخورد بگیری و اصلاح کنی.",
      "بازار تغییر می‌کند، اما توان یادگیری، ارتباط، فروش و حل مسئله در مسیرهای مختلف همراه تو می‌ماند.",
    ],
    question: "این تجربه دقیقاً کدام توانایی قابل استفاده من را قوی‌تر می‌کند؟",
  },
  {
    id: "meaning",
    title: "بانک معنایی",
    icon: Lightbulb,
    color: "#82c68c",
    desc: "وقتی چرایی روشنی داری، سختی مسیر فقط فشار نیست؛ بخشی از یک هدف بزرگ‌تر است. معنا کمک می‌کند رشد اقتصادی از کیفیت زندگی جدا نشود.",
    example:
      "مثال: می‌دانی محصول یا خدمت تو قرار است چه مسئله واقعی‌ای را برای یک انسان حل کند.",
    full: [
      "بانک معنایی پاسخ می‌دهد چرا این مسیر ارزش ادامه‌دادن دارد و قرار است چه تغییری ایجاد کند.",
      "اگر فعالیتی فقط پول داشته باشد اما با زندگی و هدف تو بی‌ارتباط باشد، فرسودگی زودتر سراغت می‌آید.",
    ],
    question:
      "اگر درآمد را کنار بگذارم، این کار چه معنایی برای من و دیگران دارد؟",
  },
  {
    id: "value",
    title: "بانک ارزشی",
    icon: HandHeart,
    color: "#ef8b84",
    desc: "صداقت، انصاف و مسئولیت‌پذیری موجودی این بانک‌اند. ساختنش زمان می‌برد و یک تصمیم نادرست می‌تواند بخش بزرگی از آن را از بین ببرد.",
    example:
      "مثال: درباره قیمت، محدودیت محصول، ریسک و نتیجه احتمالی کامل حرف می‌زنی؛ حتی اگر فروش سخت‌تر شود.",
    full: [
      "این بانک حاصل تصمیم‌هایی است که وقتی کسی نگاه نمی‌کند می‌گیری؛ همان‌جا که صداقت تبدیل به شخصیت می‌شود.",
      "پنهان‌کردن واقعیت، وعده قطعی و قربانی‌کردن اصول برای نتیجه سریع، اعتبار جمع‌شده را خرج می‌کند.",
    ],
    question:
      "اگر همه جزئیات این تصمیم آشکار شود، هنوز از انتخابم دفاع می‌کنم؟",
  },
];

// ترتیب بانک‌ها دقیقاً مطابق مسیر PDF:
// مالی، نوازشی/ارزشی، ارتباطی، معنایی، مهارتی
const banksInPdfOrder = [banks[0], banks[4], banks[1], banks[3], banks[2]];

const personas = [
  "پزشک یا درمانگر",
  "مهندس یا متخصص",
  "کارمند",
  "صاحب کسب‌وکار",
  "خانه‌دار",
  "دانشجو",
  "در جست‌وجوی کار",
] as const;
type Persona = (typeof personas)[number];
const personaIcons: Record<Persona, LucideIcon> = {
  "پزشک یا درمانگر": Stethoscope,
  "مهندس یا متخصص": Cog,
  کارمند: BriefcaseBusiness,
  "صاحب کسب‌وکار": Store,
  خانه‌دار: House,
  دانشجو: GraduationCap,
  "در جست‌وجوی کار": Search,
};
function getSavedPersona(): Persona | "" {
  if (typeof window === "undefined") return "";
  const saved = localStorage.getItem("economy-persona") as Persona | null;
  return saved && personas.includes(saved) ? saved : "";
}
const personaExamples: Record<Persona, Record<string, string>> = {
  "پزشک یا درمانگر": {
    change:
      "همان‌طور که ابزار تشخیص و درمان تغییر کرده، مدل ارائه و معرفی خدمات هم تغییر می‌کند.",
    direct:
      "اعتماد بیمار با تبلیغ ساخته نمی‌شود؛ از تجربه واقعی، توضیح مسئولانه و نتیجه قابل دفاع شکل می‌گیرد.",
    leverage:
      "تعداد ویزیت روزانه محدود است؛ آموزش، تیم و سیستم می‌توانند اثر دانش را فراتر از ساعت حضور ببرند.",
    banks:
      "رشد مالی بدون حفظ اعتماد بیمار و اخلاق حرفه‌ای، سه بانک ارتباطی، معنایی و ارزشی را خالی می‌کند.",
  },
  "مهندس یا متخصص": {
    change:
      "ابزارهای طراحی و اجرا کار را نابود نکردند؛ نوع مهارت ارزشمند را تغییر دادند.",
    direct:
      "مثل حذف رفت‌وبرگشت اضافی در یک فرایند است؛ مسیر کوتاه می‌شود اما کنترل کیفیت باید بماند.",
    leverage:
      "اگر هر پروژه فقط با حضور تو جلو برود، ظرفیت محدود است؛ مستندسازی، سیستم و تیم اهرم می‌سازند.",
    banks:
      "پروژه خوب فقط سود ندارد؛ مهارت، اعتبار حرفه‌ای، رابطه و معنای کار را هم رشد می‌دهد.",
  },
  کارمند: {
    change:
      "بخش زیادی از درآمد در برابر ساعت حضور پرداخت می‌شود؛ تغییر فناوری ممکن است شرح وظیفه را عوض کند.",
    direct:
      "تجربه واقعی تو از یک محصول می‌تواند از یک تبلیغ عمومی برای اطرافیانت قابل‌اعتمادتر باشد.",
    leverage:
      "افزایش حقوق مهم است، اما مهارتی که بیرون از یک عنوان شغلی هم ارزش دارد سقف انتخاب را بالاتر می‌برد.",
    banks:
      "یک فرصت خوب فقط حقوق بیشتر نیست؛ باید دید امنیت، یادگیری، رابطه و آرامش تو چه تغییری می‌کنند.",
  },
  "صاحب کسب‌وکار": {
    change:
      "وقتی بازار و رفتار مشتری عوض می‌شود، پافشاری روی روش قدیمی می‌تواند از خود تغییر پرهزینه‌تر باشد.",
    direct:
      "کوتاه‌شدن مسیر یعنی شنیدن سریع‌تر صدای مشتری؛ نه حذف بی‌فکر خدمات و پشتیبانی.",
    leverage:
      "اگر فروش، تصمیم و عملیات همگی به حضور تو وابسته باشند، کسب‌وکار هنوز یک شغل سنگین است.",
    banks:
      "سودی که اعتماد بازار، کیفیت تیم یا اعتبار برند را بسوزاند، رشد پایدار نیست.",
  },
  خانه‌دار: {
    change:
      "مدیریت خانه مجموعه‌ای از تصمیم، ارتباط، برنامه‌ریزی و حل مسئله است؛ حتی اگر فیش حقوقی نداشته باشد.",
    direct:
      "اعتماد اطرافیان سرمایه است؛ معرفی سالم فقط وقتی معنا دارد که خودت محصول را شناخته و تجربه واقعی داشته باشی.",
    leverage:
      "زمان تو میان چند مسئولیت تقسیم شده؛ مهارت و سیستم باید امکان رشد منعطف بسازند، نه فشار تازه.",
    banks:
      "فرصت مناسب باید هم‌زمان با درآمد، آرامش خانواده، ارزش‌های شخصی و رشد مهارت را حفظ کند.",
  },
  دانشجو: {
    change:
      "مدرک نقطه پایان یادگیری نیست؛ بازار بیشتر از گذشته به مهارت قابل اجرا و سازگاری پاداش می‌دهد.",
    direct:
      "شبکه ارتباطی سالم از کمک، یادگیری و تجربه مشترک شکل می‌گیرد؛ نه جمع‌کردن اسم افراد.",
    leverage:
      "زمان دوران دانشجویی می‌تواند به مهارتی تبدیل شود که سال‌ها نتیجه بدهد.",
    banks:
      "هر تجربه لازم نیست فوراً پول بسازد؛ گاهی موجودی بانک مهارتی و ارتباطی مهم‌تر است.",
  },
  "در جست‌وجوی کار": {
    change:
      "نداشتن شغل به معنی نداشتن سرمایه نیست؛ زمان، تجربه، ارتباط و توان یادگیری نقطه شروع‌اند.",
    direct:
      "قبل از هر وعده درآمد، محصول واقعی، مشتری واقعی و منبع پول را بررسی کن.",
    leverage:
      "هدف اول ساخت مهارت و جریان واقعی ارزش است؛ نمودار و وعده به‌تنهایی درآمد نمی‌سازند.",
    banks:
      "فشار مالی نباید باعث شود بانک ارزشی یا ارتباطی را برای یک نتیجه سریع خرج کنی.",
  },
};

function Reveal({
  children,
  className = "",
  visualIndex,
}: {
  children: React.ReactNode;
  className?: string;
  visualIndex?: number;
}) {
  return (
    <div className={`reveal ${className}`} data-visual-index={visualIndex}>
      {children}
    </div>
  );
}
function Label({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="chapter-label">
      <span>{n}</span>
      {children}
    </div>
  );
}
function StoryBeats({
  title,
  beats,
  accent = "gold",
  visuals,
}: {
  title: string;
  beats: string[];
  accent?: string;
  visuals?: number[];
}) {
  return (
    <div
      className={`story-beats ${accent}`}
      data-visual-index={visuals?.[0]}
    >
      <Reveal>
        <h3>{title}</h3>
      </Reveal>
      {beats.map((beat, i) => (
        <Reveal key={beat}>
          <article data-visual-index={visuals?.[i]}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <p>
              {(beat.match(/[^.!؟؛]+[.!؟؛]?\s*/gu) || [beat]).map(
                (sentence, sentenceIndex) => (
                  <i key={`${sentenceIndex}-${sentence}`}>{sentence}</i>
                ),
              )}
            </p>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
function PersonaBridge({
  persona,
  topic,
}: {
  persona: Persona | "";
  topic: string;
}) {
  if (!persona) return null;
  return (
    <Reveal>
      <aside className="persona-bridge">
        <span>برای تو که {persona} هستی</span>
        <p>{personaExamples[persona][topic]}</p>
        <small>متن اصلی تغییر نکرده؛ این فقط پل فهم توست.</small>
      </aside>
    </Reveal>
  );
}
function Scene({
  icon: Icon,
  title,
  n,
  tone = "amber",
  children,
}: {
  icon: LucideIcon;
  title: string;
  n: string;
  tone?: string;
  children: React.ReactNode;
}) {
  const sceneImages: Record<string, string[]> = {
    "عصر کشاورزی": [
      publicAsset("/scene-v10-agriculture-land.webp"),
      publicAsset("/scene-v2-barter.webp"),
      publicAsset("/scene-v10-barter-market.webp"),
      publicAsset("/scene-v3-money.webp"),
      publicAsset("/scene-v10-agriculture-demand.webp"),
      publicAsset("/scene-v10-agriculture-industry-transition.webp"),
      publicAsset("/scene-v10-tractor-before-after.webp"),
      publicAsset("/scene-v3-tractor.webp"),
      publicAsset("/scene-v10-tractor-change.webp"),
      publicAsset("/scene-v2-industry.webp"),
      publicAsset("/scene-v3-factory.webp"),
    ],
    "عصر صنعت": [
      publicAsset("/scene-v10-industry-factory.webp"),
      publicAsset("/scene-v10-industry-city.webp"),
      publicAsset("/scene-v10-industry-wage.webp"),
      publicAsset("/scene-v10-industry-robot.webp"),
      publicAsset("/scene-v10-industry-training.webp"),
      publicAsset("/scene-v3-robot.webp"),
      publicAsset("/scene-v6-industry-learning.webp"),
    ],
    "مسیر سنتی توزیع": [
      publicAsset("/scene-v3-product.webp"),
      publicAsset("/scene-v10-distribution-warehouse.webp"),
      publicAsset("/scene-v10-distribution-chain.webp"),
      publicAsset("/scene-v3-price-chain.webp"),
    ],
    "عصر ارتباطات": [
      publicAsset("/scene-v10-communication-radio.webp"),
      publicAsset("/scene-v10-communication-tv.webp"),
      publicAsset("/scene-v10-communication-computer.webp"),
      publicAsset("/scene-v10-communication-internet.webp"),
      publicAsset("/scene-v10-customer-experience.webp"),
      publicAsset("/scene-v10-communication-trust.webp"),
      publicAsset("/scene-v2-communication.webp"),
      publicAsset("/scene-v3-trust.webp"),
    ],
    "فروش مستقیم": [
      publicAsset("/scene-v10-direct-route.webp"),
      publicAsset("/scene-v10-direct-maker.webp"),
      publicAsset("/scene-v2-distribution.webp"),
      publicAsset("/scene-v10-direct-sale.webp"),
    ],
    "چرخش سود": [
      publicAsset("/scene-v10-profit-quality.webp"),
      publicAsset("/scene-v10-profit-incentive.webp"),
      publicAsset("/scene-v10-profit-referral.webp"),
      publicAsset("/scene-v3-profit.webp"),
      publicAsset("/scene-v3-winwin.webp"),
      publicAsset("/scene-v2-direct.webp"),
      publicAsset("/scene-v10-profit-packaging.webp"),
      publicAsset("/scene-v10-profit-winwin.webp"),
    ],
    "نتورک سالم یا هرمی؟": [
      publicAsset("/scene-v10-network-pressure.webp"),
      publicAsset("/scene-v10-network-pyramid.webp"),
      publicAsset("/scene-v10-network-loss.webp"),
      publicAsset("/scene-v2-network.webp"),
      publicAsset("/scene-v10-network-real-product.webp"),
      publicAsset("/scene-v3-healthy-network.webp"),
      publicAsset("/scene-v10-network-team-product.webp"),
      publicAsset("/scene-v10-team-network.webp"),
      publicAsset("/scene-v10-network-decision.webp"),
      publicAsset("/scene-v5-network-check.webp"),
      publicAsset("/scene-v10-network-audit.webp"),
      publicAsset("/scene-v6-transparent-contract.webp"),
      publicAsset("/scene-v10-transparent-consultation.webp"),
      publicAsset("/scene-v4-banks-overview.webp"),
      publicAsset("/scene-v4-network-healthy.webp"),
      publicAsset("/scene-v6-real-sale.webp"),
      publicAsset("/scene-v7-recruitment-dependency.webp"),
    ],
  };
  const sceneShots = sceneImages[title];
  return (
    <section
      className={`story-section era ${tone}`}
      data-chapter={title}
      data-scene-title={title}
      data-scene-number={n.replace("فصل ", "")}
    >
      {sceneShots && (
        <>
          <div className="scene-photo" aria-hidden="true">
            {sceneShots.map((shot, index) => (
              <Image
                className={`depth-back scene-shot ${index === 0 ? "is-active" : ""}`}
                src={shot}
                data-visual-src={shot}
                alt=""
                fill
                sizes="100vw"
                loading={index === 0 ? "eager" : "lazy"}
                unoptimized
                key={shot}
              />
            ))}
            <span className="depth-mid" />
            <span className="depth-front" />
          </div>
          <div className="scene-reading-fade" aria-hidden="true" />
        </>
      )}
      <div className="scene-orb" aria-hidden="true">
        <Icon />
      </div>
      <div className="story-witness" aria-hidden="true">
        <span />
        <small>همراه مسیر</small>
      </div>
      <div className="content-shell">
        <Reveal>
          <Label n={n}>{title}</Label>
        </Reveal>
        <Reveal>
          <h2>{title}</h2>
        </Reveal>
        {children}
      </div>
    </section>
  );
}

function FixedScenePhoto({
  src,
  priority = false,
}: {
  src: string | string[];
  priority?: boolean;
}) {
  const sources = Array.isArray(src) ? src : [src];
  return (
    <>
      <div className="scene-photo" aria-hidden="true">
        {sources.map((source, index) => (
          <Image
            className={`depth-back scene-shot ${index === 0 ? "is-active" : ""}`}
            src={publicAsset(source)}
            data-visual-src={publicAsset(source)}
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, 1180px"
            unoptimized
            priority={priority && index === 0}
            loading={priority && index === 0 ? "eager" : "lazy"}
            key={source}
          />
        ))}
        <span className="depth-mid" />
        <span className="depth-front" />
      </div>
      <div className="scene-reading-fade" aria-hidden="true" />
    </>
  );
}

function BankStoryCard({
  bank,
  index,
}: {
  bank: (typeof banks)[number];
  index: number;
}) {
  const Icon = bank.icon;
  return (
    <Reveal>
      <article
        className="bank-story-card"
        data-visual-index={Math.max(0, index - 1)}
        style={{ "--bank": bank.color } as CSSVars}
      >
        <header>
          <Icon />
          <p className="bank-index">۰{index + 1}</p>
          <h3>{bank.title}</h3>
        </header>
        <p className="bank-definition">{bank.desc}</p>
        <div className="bank-full-story">
          {bank.full.map((paragraph, paragraphIndex) => (
            <article key={paragraph}>
              <span>۰{paragraphIndex + 1}</span>
              <p>{paragraph}</p>
            </article>
          ))}
        </div>
        <p className="bank-example">{bank.example}</p>
        <blockquote className="bank-question">
          <small>سؤال تصمیم‌گیری</small>
          {bank.question}
        </blockquote>
      </article>
    </Reveal>
  );
}

export default function StoryExperience() {
  const root = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [chapter, setChapter] = useState("آغاز");
  const [persona, setPersona] = useState<Persona | "">("");
  const [personaOpen, setPersonaOpen] = useState(true);
  const [currentVisual, setCurrentVisual] = useState(
    publicAsset("/scene-v2-opening.webp"),
  );
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const saved = getSavedPersona();
      if (saved) {
        setPersona(saved);
        setPersonaOpen(false);
      }
    });
    return () => cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let onScroll = () => {};
    let scrollFrame = 0;
    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([gm, sm]) => {
        const gsap = gm.gsap,
          ScrollTrigger = sm.ScrollTrigger;
        gsap.registerPlugin(ScrollTrigger);
        let displayedVisual = publicAsset("/scene-v2-opening.webp");
        let requestedVisual = displayedVisual;
        const visualPreloads = new Map<string, HTMLImageElement>();
        document
          .querySelectorAll<HTMLElement>("[data-visual-src]")
          .forEach((image) => {
            const src =
              image.dataset.visualSrc || image.getAttribute("src") || "";
            if (!src || visualPreloads.has(src)) return;
            const preloader = new window.Image();
            preloader.src = src;
            visualPreloads.set(src, preloader);
          });
        const showVisual = (next: string) => {
          if (!next || next === displayedVisual || next === requestedVisual)
            return;
          requestedVisual = next;
          const commit = () => {
            if (requestedVisual !== next || displayedVisual === next) return;
            displayedVisual = next;
            setCurrentVisual(next);
          };
          const preloader = visualPreloads.get(next) || new window.Image();
          if (!visualPreloads.has(next)) {
            preloader.src = next;
            visualPreloads.set(next, preloader);
          }
          if (preloader.complete && preloader.naturalWidth > 0) commit();
          else preloader.addEventListener("load", commit, { once: true });
        };
        ctx = gsap.context(() => {
          gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
            gsap.fromTo(
              el,
              { y: 34, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              },
            ),
          );
          gsap.utils.toArray<HTMLElement>(".scene-orb").forEach((el) =>
            gsap.fromTo(
              el,
              { scale: 0.76, rotate: -8 },
              {
                scale: 1,
                rotate: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: el.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1.2,
                },
              },
            ),
          );
          gsap.utils.toArray<HTMLElement>(".scene-photo").forEach((scene) => {
            const back = scene.querySelector<HTMLElement>(".depth-back");
            const middle = scene.querySelector<HTMLElement>(".depth-mid");
            const front = scene.querySelector<HTMLElement>(".depth-front");
            if (!back || !middle || !front) return;
            const timeline = gsap.timeline({
              scrollTrigger: {
                trigger: scene.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.65,
              },
            });
            timeline
              .fromTo(
                back,
                { yPercent: -1.2, scale: 1.025 },
                { yPercent: 1.2, scale: 1.035, ease: "none" },
                0,
              )
              .fromTo(
                middle,
                { yPercent: -3, xPercent: -1.5 },
                { yPercent: 3, xPercent: 1.5, ease: "none" },
                0,
              )
              .fromTo(
                front,
                { yPercent: 4, xPercent: 2 },
                { yPercent: -4, xPercent: -2, ease: "none" },
                0,
              );
          });
          gsap.utils
            .toArray<HTMLElement>(".story-section")
            .forEach((scene) => {
            const beats = scene.querySelectorAll<HTMLElement>(
              ".story-beats article",
            );
            const shots = scene.querySelectorAll<HTMLElement>(".scene-shot");
            if (!beats.length || !shots.length) return;
            const showMatchingShot = (beat: HTMLElement) => {
              const title = scene.dataset.sceneTitle || "";
              const requestedIndex = Number(beat.dataset.visualIndex);
              const shotIndex = Number.isFinite(requestedIndex)
                ? Math.max(0, Math.min(requestedIndex, shots.length - 1))
                : resolveSceneShot(
                    title,
                    beat.textContent || "",
                    shots.length,
                  );
              shots.forEach((shot, index) =>
                shot.classList.toggle("is-active", index === shotIndex),
              );
              syncVisual(shots[shotIndex]);
            };
            beats.forEach((beat) => {
              ScrollTrigger.create({
                trigger: beat,
                start: "top 80%",
                end: "bottom 34%",
                toggleClass: { targets: beat, className: "is-active" },
              });
            });
            if (scene.dataset.sceneTitle === "عصر کشاورزی") {
              const moneyMoment =
                scene.querySelector<HTMLElement>(".answer-pill");
              if (moneyMoment) {
                const showMoneyShot = () => {
                  shots.forEach((shot, index) =>
                    shot.classList.toggle("is-active", index === 3),
                  );
                  syncVisual(shots[3]);
                };
                ScrollTrigger.create({
                  trigger: moneyMoment,
                  start: "top 80%",
                  onEnter: showMoneyShot,
                  onEnterBack: showMoneyShot,
                });
              }
            }
            });
          gsap.utils.toArray<HTMLElement>(".chain-step").forEach((el, i) =>
            gsap.fromTo(
              el,
              { x: 42, opacity: 0.28 },
              {
                x: 0,
                opacity: 1,
                scrollTrigger: {
                  trigger: el,
                  start: "top 82%",
                  end: "center 55%",
                  scrub: 0.7,
                },
                delay: i * 0.04,
              },
            ),
          );
          gsap.utils
            .toArray<HTMLElement>(".truth-compare article")
            .forEach((el, i) =>
              gsap.fromTo(
                el,
                { xPercent: i ? -22 : 22, opacity: 0.25 },
                {
                  xPercent: 0,
                  opacity: 1,
                  scrollTrigger: {
                    trigger: el.parentElement,
                    start: "top 78%",
                    end: "center 46%",
                    scrub: 1,
                  },
                },
              ),
            );
        }, root);
        const updateScrollState = () => {
          const max = document.documentElement.scrollHeight - innerHeight;
          const v = max ? Math.min(100, (scrollY / max) * 100) : 0;
          setProgress(v);
          localStorage.setItem("economy-journey-progress", String(v));
          const stageBottom =
            document
              .querySelector<HTMLElement>(".cinematic-stage")
              ?.getBoundingClientRect().bottom || innerHeight * 0.3;
          const readingEdge = stageBottom + Math.min(240, innerHeight * 0.25);
          const secs = [
            ...document.querySelectorAll<HTMLElement>("[data-chapter]"),
          ].sort(
            (a, b) =>
              a.getBoundingClientRect().top - b.getBoundingClientRect().top,
          );
          const activeIndex = secs.reduce(
            (best, el, i) =>
              el.getBoundingClientRect().top <= stageBottom + 36 ? i : best,
            0,
          );
          const activeSection = secs[activeIndex];
          setChapter(activeSection?.dataset.chapter || "آغاز");
          if (!activeSection) return;
          const shots = [
            ...activeSection.querySelectorAll<HTMLElement>(
              ".scene-photo .scene-shot",
            ),
          ];
          if (!shots.length) return;
          const cues = [
            ...activeSection.querySelectorAll<HTMLElement>(
              "[data-visual-index]",
            ),
          ];
          const shotIndex = cues.reduce((selected, cue) => {
            if (cue.getBoundingClientRect().top > readingEdge) return selected;
            const index = Number.parseInt(cue.dataset.visualIndex || "", 10);
            return Number.isFinite(index) ? index : selected;
          }, 0);
          const safeIndex = Math.max(0, Math.min(shotIndex, shots.length - 1));
          shots.forEach((shot, index) =>
            shot.classList.toggle("is-active", index === safeIndex),
          );
          const next =
            shots[safeIndex]?.dataset.visualSrc ||
            shots[safeIndex]?.getAttribute("src") ||
            "";
          showVisual(next);
        };
        onScroll = () => {
          if (scrollFrame) return;
          scrollFrame = requestAnimationFrame(() => {
            scrollFrame = 0;
            updateScrollState();
          });
        };
        addEventListener("scroll", onScroll, { passive: true });
        updateScrollState();
        ScrollTrigger.refresh();
      },
    );
    return () => {
      removeEventListener("scroll", onScroll);
      cancelAnimationFrame(scrollFrame);
      ctx?.revert();
    };
  }, []);
  return (
    <main ref={root} dir="rtl">
      <div className="cinematic-stage" aria-hidden="true">
        <Image
          key={`current-${currentVisual}`}
          className="cinematic-stage-image cinematic-stage-image--current"
          src={currentVisual}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 1180px"
          unoptimized
          priority
        />
        <span className="depth-mid" />
        <span className="depth-front" />
      </div>
      <div className="cinematic-reading-mask" aria-hidden="true" />
      <header className="topbar">
        <div className="brand">
          <Route />
          <span>مسیر تحول اقتصاد</span>
        </div>
      </header>
      <aside className="progress-rail" aria-label="پیشرفت مسیر">
        <span style={{ height: `${progress}%` }} />
        <b>{Math.round(progress)}٪</b>
      </aside>
      <div className="chapter-chip">{chapter}</div>
      <section className="hero story-section" data-chapter="آغاز">
        <FixedScenePhoto src="/scene-v2-opening.webp" priority />
        <div className="hero-vignette" />
        <div className="content-shell hero-content">
          <Reveal>
            <p className="kicker">
              <Sparkles /> یک سفر از زمین تا شبکه
            </p>
          </Reveal>
          <Reveal>
            <h1>
              اقتصاد همیشه
              <br />
              <em>در حال تغییر</em> بوده است.
            </h1>
          </Reveal>
          <Reveal>
            <p className="hero-question">اما چرا؟</p>
          </Reveal>
          <Reveal>
            <div className="persona-entry">
              <button onClick={() => setPersonaOpen((v) => !v)}>
                {persona
                  ? `مثال‌ها برای: ${persona}`
                  : "مثال‌ها را برای زندگی من تنظیم کن"}
              </button>
              {personaOpen && (
                <div className="persona-panel">
                  <div className="persona-glow" aria-hidden="true" />
                  <p>
                    <span>۰۱</span> کدام مسیر به زندگی تو نزدیک‌تر است؟
                  </p>
                  <div className="persona-options">
                    {personas.map((item) => {
                      const Icon = personaIcons[item];
                      return (
                        <button
                          key={item}
                          className={persona === item ? "selected" : ""}
                          onClick={() => {
                            setPersona(item);
                            setPersonaOpen(false);
                            localStorage.setItem("economy-persona", item);
                          }}
                        >
                          <Icon />
                          <span>{item}</span>
                        </button>
                      );
                    })}
                  </div>
                  <small>فقط مثال‌های همراه متن برای تو تنظیم می‌شوند.</small>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </section>
      <section className="story-section thesis" data-chapter="مقدمه">
        <FixedScenePhoto src="/scene-v10-economy-journey.webp" />
        <div className="content-shell centered">
          <Reveal>
            <p>در هر دوره، مردم با یک مسئله تازه روبه‌رو شدند.</p>
          </Reveal>
          <Reveal>
            <h2>
              وقتی ابزار قدیمی دیگر کافی نبود،
              <br />
              <span>مدل تازه‌ای متولد شد.</span>
            </h2>
          </Reveal>
          <Reveal>
            <div className="era-line">
              <span>
                <Wheat />
                زمین
              </span>
              <ArrowLeft />
              <span>
                <Factory />
                تولید
              </span>
              <ArrowLeft />
              <span>
                <Network />
                ارتباط
              </span>
            </div>
          </Reveal>
          <Reveal>
            <p className="note">
              تقریباً هر مدل تازه‌ای در آغاز با مقاومت روبه‌رو شده؛ اما چیزی که
              مسئله واقعی مردم را حل کرده، ماندگار شده است.
            </p>
          </Reveal>
        </div>
      </section>
      <div id="agriculture" />
      <Scene icon={Sprout} title="عصر کشاورزی" n="فصل‌های ۱ و ۲">
        <Reveal>
          <p className="lead">
            در اولین دوره‌های اقتصادی، بیشتر مردم کشاورز بودند و زندگی به زمین
            وابسته بود. اقتصاد بر پایه کِشت و برداشت می‌چرخید و زمین، هم ابزار
            کار بود و هم نشانه امنیت و قدرت.
          </p>
        </Reveal>
        <StoryBeats
          title="وقتی زمین یعنی ثروت"
          visuals={[0, 1, 2]}
          beats={[
            "درآمد، مستقیم یا غیرمستقیم از زمین به دست می‌آمد. هرکس زمین بیشتری داشت، محصول بیشتری تولید می‌کرد و قدرت اقتصادی بیشتری داشت.",
            "پول به شکل امروزی همه‌جا وجود نداشت. مردم بیشتر کالا را با کالا عوض می‌کردند؛ گندم با لباس، دام با پارچه یا کار و خدمت با محصول.",
            "این روش فقط زمانی جواب می‌داد که هر دو نفر، هم‌زمان کالای یکدیگر را بخواهند. اگر نیازها با هم جور نبود، معامله متوقف می‌شد.",
          ]}
        />
        <Reveal visualIndex={2}>
          <div className="barter-card">
            <div>
              <Wheat />
              <b>گندم</b>
            </div>
            <span>↔</span>
            <div>
              <PackageCheck />
              <b>لباس</b>
            </div>
          </div>
        </Reveal>
        <Reveal visualIndex={2}>
          <blockquote>اگر طرف مقابل چیزی را که تو داری نخواهد، چه؟</blockquote>
        </Reveal>
        <Reveal visualIndex={3}>
          <div className="answer-pill">
            <Banknote /> پول، ابزار مشترکی شد که این گره را باز کرد.
          </div>
        </Reveal>
        <Reveal visualIndex={3}>
          <div className="mini-grid">
            <article>
              <b>وابستگی به طبیعت</b>
              <small>
                خشکسالی، آفت و تغییر فصل مستقیماً زندگی و درآمد را تهدید می‌کرد.
              </small>
            </article>
            <article>
              <b>تولید محدود</b>
              <small>
                توان انسان و حیوان سقف داشت و افزایش محصول بسیار آهسته بود.
              </small>
            </article>
            <article>
              <b>امکان انتخاب کم</b>
              <small>
                بیشتر مردم ناچار بودند همان کاری را ادامه دهند که خانواده انجام
                می‌داد.
              </small>
            </article>
          </div>
        </Reveal>
        <StoryBeats
          title="چرا این دوره تغییر کرد؟"
          visuals={[4, 5, 6]}
          beats={[
            "جمعیت بیشتر شد و شهرها رشد کردند. جامعه به غذای بیشتر، ابزار بهتر و تولید سریع‌تر نیاز داشت.",
            "مدل کشاورزی به‌تنهایی پاسخگوی این حجم از نیاز نبود. مسئله تازه، ابزار تازه‌ای می‌خواست.",
            "همین فشار آرام‌آرام بشر را به دوره‌ای برد که در آن، قدرت نه فقط از زمین، بلکه از ماشین و تولید می‌آمد.",
          ]}
        />
        <StoryBeats
          title="داستان تراکتور"
          visuals={[6, 7, 8, 9, 10]}
          beats={[
            "فرض کنید یک کشاورز زمینی بزرگ دارد. پیش از آمدن ماشین، بیست نفر باید از صبح تا شب روی آن زمین کار کنند.",
            "روزی کشاورز یک تراکتور می‌خرد. کاری که بیست نفر در چند روز انجام می‌دادند، حالا یک نفر در زمانی کوتاه‌تر انجام می‌دهد.",
            "اولین واکنش کارگران طبیعی است: ترس، خشم و مقاومت. آن‌ها تراکتور را دشمن کار و درآمد خود می‌بینند.",
            "اما نیاز جامعه به شغل از بین نمی‌رود؛ شکل شغل عوض می‌شود. رانندگی و تعمیر تراکتور، ساخت قطعات، فروش سوخت، حمل محصول و مدیریت تولید به وجود می‌آید.",
            "درس تراکتور این نیست که هر فناوری بی‌هزینه است؛ درسش این است که ایستادن مقابل تغییر، فرصت‌های مرحله بعد را از ما پنهان می‌کند.",
          ]}
        />
      </Scene>
      <Scene icon={Factory} title="عصر صنعت" n="فصل‌های ۳ و ۴" tone="steel">
        <Reveal>
          <p className="lead">
            با انقلاب صنعتی، ماشین‌آلات وارد زندگی شدند. قدرت اقتصادی از زمین به
            تولید منتقل شد و کارخانه به مرکز ثروت، اشتغال و تصمیم‌گیری تبدیل شد.
          </p>
        </Reveal>
        <PersonaBridge persona={persona} topic="change" />
        <StoryBeats
          title="تغییر بزرگ چه بود؟"
          visuals={[0, 1, 2]}
          beats={[
            "ماشین می‌توانست کاری را که انسان در ساعت‌ها یا روزها انجام می‌داد، سریع‌تر و با حجم بیشتر انجام دهد.",
            "مردم برای کار از روستاها به شهرها رفتند. کارخانه‌ها نیروی کار خواستند و مدل تازه‌ای شکل گرفت: زمان بده، دستمزد بگیر.",
            "پول کم‌کم جای زمین را به‌عنوان ابزار اصلی قدرت اقتصادی گرفت؛ اما درآمد بسیاری از مردم همچنان به حضور و ساعت کارشان وابسته ماند.",
          ]}
        />
        <Reveal visualIndex={2}>
          <div className="before-after">
            <article>
              <span>قبل</span>
              <Wheat />
              <b>زمان زیاد</b>
              <small>تولید کم</small>
            </article>
            <ArrowLeft />
            <article className="active">
              <span>بعد</span>
              <Tractor />
              <b>زمان کمتر</b>
              <small>تولید بیشتر</small>
            </article>
          </div>
        </Reveal>
        <StoryBeats
          title="داستان ربات؛ همان سؤال، یک قرن بعد"
          accent="red"
          visuals={[3, 4, 5, 6]}
          beats={[
            "حالا همین کارخانه را تصور کنید. بیست نفر یک کار تکراری را انجام می‌دهند و یک ربات می‌تواند آن کار را سریع‌تر، دقیق‌تر و بدون خستگی انجام دهد.",
            "دوباره همان ترس ظاهر می‌شود: آیا ربات شغل انسان را می‌گیرد؟ بخشی از کارهای قدیمی کم می‌شوند، اما طراحی، برنامه‌ریزی، نگهداری، فروش و خدمات تازه رشد می‌کنند.",
            "سال‌ها قبل نیز مردم با تلویزیون، کامپیوتر و اینترنت همین نگرانی را داشتند. فناوری منتظر آمادگی ما نماند؛ کسانی جلو افتادند که آن را شناختند و مهارت لازم را ساختند.",
            "در برابر تغییر دو انتخاب داریم: مقاومت کنیم و دیرتر سازگار شویم، یا آن را بفهمیم و جای خودمان را در فرصت‌های تازه پیدا کنیم.",
          ]}
        />
      </Scene>
      <Scene icon={Store} title="مسیر سنتی توزیع" n="فصل ۶" tone="coal">
        <Reveal>
          <p className="lead">
            کارخانه‌ها توانستند هزاران محصول تولید کنند؛ اما مسئله تازه این بود:
            این همه کالا چگونه به دست مشتری برسد؟
          </p>
        </Reveal>
        <StoryBeats
          title="داستان یک محصول"
          visuals={[0, 1, 2, 3]}
          beats={[
            "محصول از خط تولید بیرون می‌آید، اما کارخانه معمولاً نمی‌تواند به تک‌تک مشتریان در شهرهای مختلف دسترسی داشته باشد.",
            "عمده‌فروش حجم زیادی کالا می‌خرد. پخش‌کننده آن را میان مناطق توزیع می‌کند. فروشگاه محصول را نگهداری، معرفی و در دسترس مشتری قرار می‌دهد.",
            "هر کدام از این واسطه‌ها کار واقعی انجام می‌دهند و هزینه واقعی دارند: انبار، حمل‌ونقل، حقوق، اجاره، تبلیغات و ریسک فروش‌نرفتن.",
            "در نتیجه، فاصله میان هزینه تولید و قیمت نهایی بیشتر می‌شود. مشتری فقط خودِ محصول را نمی‌خرد؛ هزینه تمام مسیر را هم می‌پردازد.",
          ]}
        />
        <Reveal visualIndex={3}>
          <div className="supply-chain">
            {(
              [
                [Factory, "کارخانه", "۲۰۰"],
                [Box, "عمده‌فروش", "+۸۰"],
                [Route, "پخش", "+۷۰"],
                [Store, "فروشگاه", "+۱۵۰"],
                [Users, "مشتری", "۵۰۰"],
              ] as [LucideIcon, string, string][]
            ).map(([I, t, p], i) => (
              <div className="chain-step" key={t}>
                <span>{i + 1}</span>
                <I />
                <b>{t}</b>
                <small>{p} هزار تومان</small>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal visualIndex={3}>
          <div className="mini-grid">
            <article>
              <b>افزایش قیمت</b>
              <small>هزینه و سود هر مرحله به قیمت نهایی اضافه می‌شود.</small>
            </article>
            <article>
              <b>فاصله از مشتری</b>
              <small>
                تولیدکننده بازخورد واقعی مصرف‌کننده را دیرتر می‌شنود.
              </small>
            </article>
            <article>
              <b>تبلیغات گران</b>
              <small>
                برای دیده‌شدن در بازار شلوغ، بودجه زیادی مصرف می‌شود.
              </small>
            </article>
          </div>
        </Reveal>
        <Reveal visualIndex={3}>
          <blockquote>
            آیا می‌شود بخشی از این مسیر را کوتاه کرد، بدون اینکه ارزش واقعی حذف
            شود؟
          </blockquote>
        </Reveal>
      </Scene>
      <Scene icon={Network} title="عصر ارتباطات" n="فصل ۵" tone="blue">
        <Reveal>
          <p className="lead">
            بعد از گسترش کارخانه‌ها، دنیا دوباره تغییر کرد. این بار فقط تولید
            مهم نبود؛ سرعت انتقال اطلاعات و قدرت ارتباط، شکل زندگی و تجارت را
            عوض کرد.
          </p>
        </Reveal>
        <StoryBeats
          title="از صدا تا اتصال جهانی"
          visuals={[0, 1, 2, 3]}
          beats={[
            "برق و رادیو نخستین امکان ارتباط هم‌زمان با جمع بزرگی از مردم را فراهم کردند.",
            "تلویزیون ارتباط تصویری را به خانه‌ها آورد و یک پیام توانست در مقیاس ملی دیده شود.",
            "کامپیوتر پردازش و نگهداری اطلاعات را از ساعت‌ها و روزها به چند دقیقه رساند.",
            "اینترنت فاصله جغرافیایی را شکست. انسان‌ها، تجربه‌ها و بازارها در چند ثانیه به هم متصل شدند.",
          ]}
        />
        <Reveal visualIndex={3}>
          <div className="signal-story">
            <div className="avatar">من</div>
            <MessageCircle />
            <div className="avatar">تو</div>
            <MessageCircle />
            <div className="avatar">ما</div>
          </div>
        </Reveal>
        <Reveal visualIndex={4}>
          <h3 className="big-statement">
            اطلاعات شد سرمایه.
            <br />
            <span>اعتماد شد قدرت.</span>
          </h3>
        </Reveal>
        <StoryBeats
          title="وقتی تجربه سفر می‌کند"
          visuals={[4, 5, 6, 7]}
          beats={[
            "فرض کن محصولی استفاده کرده‌ای و واقعاً از آن راضی هستی. پیش‌تر تجربه تو شاید فقط به خانواده و چند دوست نزدیک می‌رسید.",
            "حالا یک پیام، تماس یا شبکه اجتماعی می‌تواند تجربه تو را به ده‌ها یا هزاران نفر منتقل کند.",
            "تجارت الکترونیک نیز سفارش، پرداخت، مقایسه و رساندن کالا را ساده‌تر کرد. تولیدکننده برای پیدا کردن مشتری فقط به ویترین فیزیکی وابسته نماند.",
            "در این اقتصاد تازه، کسی که اعتماد ساخته و اطلاعات مفید منتقل می‌کند، بخشی از فرآیند توزیع و معرفی ارزش می‌شود.",
          ]}
        />
      </Scene>
      <Scene icon={HeartHandshake} title="فروش مستقیم" n="فصل ۷" tone="teal">
        <Reveal>
          <p className="lead">
            فروش مستقیم از دل همین تغییر بیرون آمد: کوتاه‌کردن فاصله تولیدکننده
            و مصرف‌کننده و استفاده از ارتباط انسانی به‌جای بخشی از مسیر سنتی.
          </p>
        </Reveal>
        <PersonaBridge persona={persona} topic="direct" />
        <StoryBeats
          title="چه چیزی واقعاً تغییر می‌کند؟"
          visuals={[0, 1, 2, 3]}
          beats={[
            "در مدل سنتی، بخش بزرگی از قیمت صرف واسطه‌ها، ویترین، انبار و تبلیغات عمومی می‌شود.",
            "در فروش مستقیم، شرکت می‌کوشد محصول را با واسطه‌های کمتر به مشتری برساند و معرفی را به تجربه مصرف‌کنندگان و فروشندگان مستقل نزدیک کند.",
            "حذف واسطه به معنی حذف همه هزینه‌ها نیست. ارسال، پشتیبانی، آموزش، فناوری، مالیات و خدمات هنوز هزینه دارند؛ فقط ترکیب هزینه‌ها تغییر می‌کند.",
            "پس فروش مستقیم یک میان‌بُر جادویی نیست؛ یک مدل توزیع متفاوت است که باید با محصول واقعی، قیمت منطقی و خدمت واقعی سنجیده شود.",
          ]}
        />
        <Reveal visualIndex={3}>
          <div className="route-compare">
            <article>
              <small>مدل سنتی</small>
              <div>
                <Factory />
                <span className="long-line" />
                <Store />
                <span className="long-line" />
                <Users />
              </div>
              <b>مسیر طولانی‌تر</b>
            </article>
            <article className="direct">
              <small>فروش مستقیم</small>
              <div>
                <Factory />
                <span />
                <HeartHandshake />
                <span />
                <Users />
              </div>
              <b>ارتباط کوتاه‌تر</b>
            </article>
          </div>
        </Reveal>
        <Reveal visualIndex={3}>
          <div className="numbers">
            <article>
              <small>هزینه فرضی تولید</small>
              <b>۲۰۰</b>
            </article>
            <article>
              <small>قیمت سنتی برای مشتری</small>
              <b>۵۰۰</b>
            </article>
            <article>
              <small>قیمت فرضی مستقیم</small>
              <b>۳۵۰</b>
            </article>
          </div>
        </Reveal>
        <Reveal visualIndex={3}>
          <p className="fine">
            اعداد فقط برای فهم سازوکارند؛ نتیجه واقعی به محصول، شرکت، هزینه‌ها و
            بازار وابسته است.
          </p>
        </Reveal>
      </Scene>
      <Scene icon={TrendingUp} title="چرخش سود" n="فصل ۸" tone="gold">
        <Reveal>
          <p className="lead">
            پولی که پیش‌تر در مسیر طولانی توزیع خرج می‌شد، در مدل فروش مستقیم
            می‌تواند هوشمندانه‌تر تقسیم شود و به یک چرخه رشد برگردد.
          </p>
        </Reveal>
        <StoryBeats
          title="این ارزش آزادشده کجا می‌رود؟"
          visuals={[0, 1, 2, 3]}
          beats={[
            "بخشی می‌تواند صرف تحقیق، مواد اولیه بهتر، بسته‌بندی، خدمات و ارتقای کیفیت محصول شود. کیفیت بالاتر رضایت می‌سازد و رضایت، معرفی طبیعی را بیشتر می‌کند.",
            "بخشی می‌تواند به طرح‌های تشویقی اختصاص یابد؛ پاداشی که باید در مقابل فروش واقعی و ایجاد بازار واقعی پرداخت شود، نه صرفاً آوردن نام‌های تازه.",
            "بخشی نیز برای توسعه شبکه توزیع انسانی استفاده می‌شود. مشتری راضی تجربه‌اش را منتقل می‌کند و اگر فروش ایجاد شود، می‌تواند سهمی از ارزش ساخته‌شده بگیرد.",
            "وقتی این سه بخش درست کار کنند، چرخه شکل می‌گیرد: محصول بهتر، رضایت بیشتر، معرفی معتبرتر و بازار بزرگ‌تر.",
          ]}
        />
        <Reveal visualIndex={3}>
          <div className="value-wheel">
            <article>
              <PackageCheck />
              <b>ارتقای کیفیت</b>
              <p>سرمایه‌گذاری بیشتر روی محصول و تجربه مشتری.</p>
            </article>
            <article>
              <Award />
              <b>طرح‌های تشویقی</b>
              <p>انگیزه در برابر فروش و ارزش واقعی.</p>
            </article>
            <article>
              <Network />
              <b>گسترش شبکه</b>
              <p>مشتری راضی، کانال انسانی معرفی می‌شود.</p>
            </article>
          </div>
        </Reveal>
        <StoryBeats
          title="چرا به آن برنده ـ برنده می‌گویند؟"
          visuals={[4, 5, 6, 7]}
          beats={[
            "کارخانه به‌جای وابستگی کامل به تبلیغات و زنجیره بلند واسطه‌ها، به بازار نزدیک‌تر می‌شود و بازخورد سریع‌تری می‌گیرد.",
            "مشتری می‌تواند محصول را با مسیر توزیع کوتاه‌تر دریافت کند و از تجربه یک فرد قابل اعتماد کمک بگیرد.",
            "معرفی‌کننده فقط زمانی ارزش اقتصادی می‌سازد که محصول واقعی به مصرف‌کننده واقعی برسد.",
            "این رابطه فقط وقتی برنده ـ برنده می‌ماند که قیمت، کیفیت، پاداش و رفتار شبکه همگی منطقی و شفاف باشند.",
          ]}
        />
        <Reveal visualIndex={7}>
          <div className="winwin">
            <h3>رابطه برنده ـ برنده</h3>
            <div>
              <span>
                <Check /> کارخانه: ارتباط نزدیک‌تر با بازار
              </span>
              <span>
                <Check /> مشتری: انتخاب آگاهانه‌تر
              </span>
              <span>
                <Check /> محصول: سرمایه‌گذاری بیشتر روی کیفیت
              </span>
              <span>
                <Check /> معرفی‌کننده: سهم از فروش واقعی
              </span>
            </div>
          </div>
        </Reveal>
      </Scene>
      <section
        className="story-section economic-summary"
        data-chapter="جمع‌بندی مسیر تحول اقتصادی"
      >
        <FixedScenePhoto src="/scene-v2-evolution.webp" />
        <div className="content-shell centered">
          <Reveal>
            <Label n="جمع‌بندی فصل">مسیر تحول اقتصادی</Label>
          </Reveal>
          <Reveal>
            <h2>از زمین تا اعتماد</h2>
          </Reveal>
          <Reveal>
            <p className="lead">
              در این فصل، مسیر تحول اقتصاد بشر را از دوران کشاورزی تا فروش
              مستقیم دنبال کردیم. هر عصر با ابزار و مدل خاص خود آمد و هر بار با
              مقاومت اولیه روبه‌رو شد، اما در نهایت پذیرفته شد و جای خود را در
              تاریخ اقتصاد باز کرد.
            </p>
          </Reveal>
          <Reveal>
            <div className="final-timeline" aria-label="جمع‌بندی مسیر تحول">
              <span><Wheat />کشاورزی</span>
              <span><Factory />صنعت</span>
              <span><Network />ارتباطات</span>
              <span><HeartHandshake />فروش مستقیم</span>
            </div>
          </Reveal>
          <Reveal>
            <p className="note">
              هر دوره ابزار مخصوص خودش را دارد. کسی که تغییر را می‌شناسد و با
              آن همراه می‌شود، پیشرفت می‌کند. فروش مستقیم ابزار عصر ارتباطات
              است.
            </p>
          </Reveal>
        </div>
      </section>
      <Scene icon={Scale} title="نتورک سالم یا هرمی؟" n="فصل‌های ۹ و ۱۰" tone="warning">
        <Reveal>
          <p className="honest">اما یک سؤال مهم را نباید دور بزنیم…</p>
        </Reveal>
        <Reveal>
          <h3 className="big-statement">
            ظاهر ممکن است شبیه باشد،
            <br />
            <span>اما منبع پول همه‌چیز را روشن می‌کند.</span>
          </h3>
        </Reveal>
        <StoryBeats
          title="داستان شرکت هرمی"
          accent="red"
          visuals={[0, 1, 2, 3]}
          beats={[
            "یک شرکت ممکن است در ظاهر نام محصول، آموزش یا تجارت داشته باشد؛ اما اگر پول اصلی از ورود اعضای جدید بیاید، محصول فقط پوشش ماجراست.",
            "تمرکز اصلی چنین سیستمی جذب نفر و گردش پول بین اعضاست. تا زمانی که افراد تازه وارد شوند، پول حرکت می‌کند؛ اما فروش پایدار و بازار مصرف واقعی وجود ندارد.",
            "ساختار برای ادامه‌دادن، دائماً به جمعیت تازه نیاز دارد. چون تعداد انسان‌ها نامحدود نیست، لایه‌های پایین‌تر دیر یا زود با زیان روبه‌رو می‌شوند.",
            "وعده درآمد آسان، فشار برای تصمیم سریع و اهمیت‌دادن به عضوگیری بیش از مشتری واقعی، علامت‌های هشدارند.",
          ]}
        />
        <StoryBeats
          title="نتورک سالم چه تفاوتی دارد؟"
          visuals={[4, 5, 6, 7]}
          beats={[
            "ستون اصلی، محصول واقعی است: محصولی که مصرف واقعی، قیمت منطقی و کیفیت قابل دفاع دارد و حتی بدون فرصت درآمدی هم مشتری می‌خواهد آن را بخرد.",
            "درآمد از فروش کالا یا خدمت می‌آید، نه از پول ثبت‌نام. عضوگیری می‌تواند برای توسعه بازار باشد، اما خودش منبع درآمد نیست.",
            "درآمد تضمینی نیست و به فروش، مهارت، استمرار و شرایط بازار وابسته است. توضیح ریسک‌ها و ندادن وعده غیرواقعی بخشی از رفتار سالم است.",
            "شبکه سالم با قانون، قرارداد روشن، امکان بررسی و حق انتخاب مشتری سازگار است. فشار، فریب و پنهان‌کردن واقعیت با این منطق تناقض دارد.",
          ]}
        />
        <Reveal visualIndex={8}>
          <div className="truth-compare">
            <article className="bad">
              <X />
              <h3>مسیر ناسالم</h3>
              <ul>
                <li>درآمد از ورود افراد</li>
                <li>پول عضو جدید، منبع اصلی</li>
                <li>محصول صوری یا کم‌ارزش</li>
                <li>بدون عضوگیری فرو می‌ریزد</li>
              </ul>
            </article>
            <article className="good">
              <ShieldCheck />
              <h3>مسیر سالم</h3>
              <ul>
                <li>محصول واقعی و قابل دفاع</li>
                <li>مصرف و فروش واقعی</li>
                <li>درآمد از فروش کالا</li>
                <li>عضوگیری فقط برای توسعه بازار</li>
              </ul>
            </article>
          </div>
        </Reveal>
        <Reveal visualIndex={8}>
          <div className="source-test">
            <b>آزمون یک‌خطی</b>
            <p>اگر عضوگیری متوقف شود، آیا فروش واقعی محصول هنوز ادامه دارد؟</p>
            <span>تفاوت اصلی در «منبع درآمد» است.</span>
          </div>
        </Reveal>
        <StoryBeats
          title="تاریخچه فروش شبکه‌ای در ایران"
          visuals={[9, 10, 11, 12]}
          beats={[
            "در اواخر دهه هفتاد، مدل‌های شبکه‌ای وارد ایران شدند؛ اما بیشتر آن‌ها شرکت‌های هرمی و بدون فروش واقعی محصول بودند. تمرکز اصلی بر ورود پول افراد بود.",
            "در سال ۱۳۸۴، به دلیل خروج ارز و ماهیت ناسالم بسیاری از این شرکت‌ها، دولت فعالیت آن‌ها را ممنوع اعلام کرد.",
            "در سال ۱۳۸۷، نگاه از مقابله صرف به بررسی دقیق مدل تغییر کرد. تیم‌های تحقیقاتی مأمور شدند فروش مستقیم را بررسی کنند.",
            "پس از آن، فروش مستقیم تحت نظارت و مجوز رسمی آغاز شد تا مدل قانونی با ساختار مشخص از مدل‌های ناسالم جدا شود.",
          ]}
        />
        <StoryBeats
          title="چرا دولت فروش مستقیم را قانونی کرد؟"
          visuals={[13, 14, 15, 16]}
          beats={[
            "مثل پدری که ابتدا فرزندش را از رفتن به خانه همسایه منع می‌کند، اما وقتی می‌فهمد همسایه وسیله جذابی مثل پلی‌استیشن دارد، همان وسیله را برای خانه خودش تهیه می‌کند تا فرزند در خانه خودش بماند.",
            "دولت هم فروش مستقیم را بررسی کرد و نتیجه گرفت اگر قانونی اجرا شود، می‌تواند فرصت‌های شغلی گسترده ایجاد کند و تولید ملی را افزایش دهد.",
            "گردش مالی داخل کشور می‌ماند و از خروج سرمایه جلوگیری می‌شود؛ مالیات نیز به‌درستی پرداخت می‌شود و درآمد دولت افزایش می‌یابد.",
            "مجوز برای جداکردن فعالیت قابل نظارت از مدل هرمی مهم است؛ اما محصول، قیمت، قرارداد و روش پرداخت پاداش نیز باید بررسی شوند.",
          ]}
        />
      </Scene>
      <section
        className="story-section bank-overview"
        data-chapter="پنج بانک تصمیم‌گیری"
      >
        <FixedScenePhoto src="/scene-v10-banks-overview.webp" />
        <div className="content-shell">
          <Reveal>
            <Label n="فصل ۱۱">پنج بانک تصمیم‌گیری</Label>
          </Reveal>
          <Reveal>
            <h2>هر تصمیم از پنج بانک عبور می‌کند</h2>
            <p className="lead">
              یک فرصت فقط با عدد درآمد سنجیده نمی‌شود. باید ببینی هم‌زمان با
              پول، روی رابطه‌ها، مهارت، معنا و ارزش‌های تو چه اثری می‌گذارد.
            </p>
          </Reveal>
          <Reveal>
            <div className="decision-orbit">
              {banksInPdfOrder.map((bank) => {
                const Icon = bank.icon;
                return (
                  <span
                    key={bank.id}
                    style={{ "--bank": bank.color } as CSSVars}
                  >
                    <Icon />
                    {bank.title}
                  </span>
                );
              })}
            </div>
          </Reveal>
          <Reveal>
            <p className="note">
              ابتدا بانک مالی را کامل می‌شناسیم؛ سپس وارد درآمد خطی، اهرم و
              تصاعد می‌شویم و بعد چهار بانک دیگر را به‌ترتیب PDF ادامه می‌دهیم.
            </p>
          </Reveal>
          <div className="bank-journey single-bank">
            <BankStoryCard bank={banksInPdfOrder[0]} index={0} />
          </div>
        </div>
      </section>
      <section
        className="story-section leverage"
        data-chapter="هوش مالی، زمان و اهرم"
      >
        <FixedScenePhoto
          src={[
            "/scene-v10-income-linear.webp",
            "/scene-v2-leverage.webp",
            "/scene-v10-income-monthly-zero.webp",
            "/scene-v10-knowledge-leverage.webp",
            "/scene-v10-system-collaboration.webp",
            "/scene-v2-banks.webp",
          ]}
        />
        <div className="content-shell">
          <Reveal>
            <Label n="فصل ۱۲">بانک مالی، زمان و اهرم</Label>
          </Reveal>
          <Reveal>
            <h2>تله «صفر» و درآمد خطی</h2>
          </Reveal>
          <PersonaBridge persona={persona} topic="leverage" />
          <StoryBeats
            title="چرخه‌ای که هر ماه تکرار می‌شود"
            visuals={[0, 1, 2, 3]}
            beats={[
              "بسیاری از ما در خانواده‌هایی بزرگ شدیم که کار و درآمد یک مسیر مشخص داشت: کارکن، حقوق بگیر و هزینه‌های زندگی را پرداخت کن.",
              "با پایان ماه، بخش بزرگی از درآمد خرج می‌شود و ماه بعد دوباره همان چرخه از نقطه نزدیک به صفر آغاز می‌شود.",
              "مشکل کارکردن نیست؛ مسئله این است که اگر درآمد کاملاً به حضور شخصی وابسته باشد، بیماری، توقف کار یا کمبود زمان مستقیماً درآمد را محدود می‌کند.",
              "همه انسان‌ها فقط ۲۴ ساعت در شبانه‌روز دارند. پس فروش زمان، یک سقف طبیعی دارد؛ حتی اگر مهارت و دستمزد بیشتر شود.",
            ]}
          />
          <Reveal visualIndex={3}>
            <div className="linear-loop">
              <span>کار کن</span>
              <ArrowLeft />
              <span>پول بگیر</span>
              <ArrowLeft />
              <span>خرج کن</span>
              <ArrowLeft />
              <span>از صفر</span>
            </div>
          </Reveal>
          <StoryBeats
            title="اهرم یعنی چه؟"
            visuals={[4, 4, 4, 5]}
            beats={[
              "اهرم یعنی نتیجه فقط از ساعت کار مستقیم یک نفر نیاید. ابزار، دانش ثبت‌شده، سیستم، فناوری و همکاری می‌توانند اثر یک واحد زمان را بیشتر کنند.",
              "در یک ساختار قابل تکرار، تجربه و مهارتی که یک‌بار ساخته‌ای به دیگران منتقل می‌شود و هر نفر می‌تواند همان فرآیند را مستقل اجرا کند.",
              "تصاعد زمانی رخ می‌دهد که رشد فقط روی تلاش یک نفر سوار نباشد؛ افراد متعددی در یک سیستم مشترک ارزش واقعی ایجاد کنند.",
              "اما نمودار تصاعد، وعده ثروت نیست. اگر فروش واقعی، مهارت، استمرار و تقاضای بازار وجود نداشته باشد، هیچ عددی روی کاغذ درآمد نمی‌سازد.",
            ]}
          />
          <Reveal visualIndex={5}>
            <div className="leverage-card">
              <div>
                <b>درآمد خطی</b>
                <p>یک واحد زمان ← یک واحد نتیجه</p>
              </div>
              <div>
                <b>اهرم و تصاعد</b>
                <p>مهارت + سیستم + همکاری ← نتیجه‌ای فراتر از زمان فردی</p>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <p className="fine">
              نتیجه افراد یکسان نیست و به فروش واقعی، مهارت، زمان، تلاش، انتخاب
              شرکت و شرایط بازار بستگی دارد.
            </p>
          </Reveal>
        </div>
      </section>
      <section
        className="story-section banks"
        data-chapter="پنج بانک تصمیم‌گیری و رشد"
      >
        <div className="scene-photo bank-scene" aria-hidden="true">
          {[
            "/scene-v4-bank-values.webp",
            "/scene-v3-bank-social.webp",
            "/scene-v7-bank-meaning.webp",
            "/scene-v3-bank-skill.webp",
          ].map((shot, index) => (
            <Image
              className={`depth-back scene-shot ${index === 0 ? "is-active" : ""}`}
              src={publicAsset(shot)}
              data-visual-src={publicAsset(shot)}
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 1180px"
              loading={index === 0 ? "eager" : "lazy"}
              unoptimized
              key={shot}
            />
          ))}
          <span className="depth-mid" />
          <span className="depth-front" />
        </div>
        <div className="scene-reading-fade" aria-hidden="true" />
        <div className="content-shell">
          <Reveal>
            <Label n="پایان مسیر PDF">بانک‌های رشد</Label>
          </Reveal>
          <Reveal>
            <h2>پنج بانک زندگی</h2>
            <p className="lead">
              رشد فقط عدد حساب نیست. پنج ایستگاه را به‌ترتیب پایین برو و ببین در
              هرکدام چه چیزی ذخیره می‌کنی.
            </p>
          </Reveal>
          <PersonaBridge persona={persona} topic="banks" />
          <div className="bank-journey">
            {banksInPdfOrder.slice(1).map((bank, index) => (
              <BankStoryCard
                bank={bank}
                index={index + 1}
                key={bank.id}
              />
            ))}
          </div>
          <Reveal>
            <p className="note">
              تصمیم‌های روزانه، موجودی این پنج بانک را می‌سازند. رشد پایدار یعنی
              هیچ‌کدام را به قیمت نابودی دیگری پر نکنی.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="finale story-section" data-chapter="جمع‌بندی">
        <FixedScenePhoto src="/scene-v2-finale.webp" />
        <div className="content-shell centered">
          <Reveal>
            <Sprout className="final-icon" />
          </Reveal>
          <Reveal>
            <p>
              دوباره همان زمین را می‌بینی؛
              <br />
              اما حالا تمام مسیر پشت آن پیداست.
            </p>
          </Reveal>
          <Reveal>
            <h2>
              در هر دوره، کسانی موفق شدند که <span>تغییر را شناختند.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="lead">
              امروز در عصر ارتباطات، اعتماد و رابطه به قدرت تبدیل شده‌اند؛ به
              شرط آن‌که پشت آن‌ها ارزش واقعی، فروش واقعی و رفتار سالم باشد.
            </p>
          </Reveal>
          <Reveal>
            <div className="final-timeline" aria-label="مسیر طی‌شده">
              <span>
                <Wheat />
                زمین
              </span>
              <span>
                <Factory />
                تولید
              </span>
              <span>
                <Store />
                توزیع
              </span>
              <span>
                <Network />
                ارتباط
              </span>
              <span>
                <HandHeart />
                رشد
              </span>
            </div>
          </Reveal>
          <Reveal>
            <button
              className="cta"
              onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
            >
              شروع مسیر رشد <ArrowUpLeft />
            </button>
          </Reveal>
          <Reveal>
            <div className="closing-stats">
              <span>
                <Check /> تمام فصل‌های PDF
              </span>
              <span>
                <Check /> ذخیره پیشرفت
              </span>
              <span>
                <Check /> تجربه کامل
              </span>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
