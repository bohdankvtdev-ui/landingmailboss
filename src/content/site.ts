/**
 * Store links. The Play package matches the app id in app.json.
 * Swap the Apple URL for the live App Store listing after approval.
 */
export const APP_STORE_URL =
  "https://apps.apple.com/search?term=MAIL%20BOSS%3A%20Survival";

export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.mailboss.survival";

export const SITE = {
  name: "MAIL BOSS: Survival",
  shortName: "Mail Boss",
  description:
    "An inbox survival game. Reply, star, archive, and report spam before office money hits $0 or 100 messages are still waiting.",
} as const;

export const NAV = [
  { href: "/#play", label: "Play" },
  { href: "/#shift", label: "The shift" },
  { href: "/#rules", label: "Rules" },
  { href: "/#office", label: "Office" },
] as const;

export const TICKER = [
  "Elena Vasquez",
  "Lisa Hartmann",
  "James Whitfield",
  "Sarah Chen",
  "Alex Morgan",
  "David Kim",
  "Priya Nair",
  "Marcus Webb",
  "John Okonkwo",
  "Netflix",
  "Stripe",
  "Spotify",
  "Amazing Deal",
  "LinkedIn",
  "Notion",
  "Amazon",
  "Airbnb",
] as const;

export type PhoneAction = "reply" | "star" | "archive" | "spam" | "heart" | "file";

export type ThreadMail = {
  name: string;
  role: string;
  subject: string;
  body: string;
  action: PhoneAction;
  initials: string;
  tint: string;
};

export type ShiftStep = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  body: string;
  mail: ThreadMail;
};

export const SHIFT_STEPS: ShiftStep[] = [
  {
    id: "reply",
    index: "01",
    kicker: "Someone is waiting",
    title: "Send the reply.",
    body: "A coworker needs an answer. Send a reply. Do not archive this one.",
    mail: {
      name: "Sarah Chen",
      role: "Coworker",
      subject: "Review the plan before the meeting",
      body: "Can you look before we walk in? I need a yes or a note on what is blocking it.",
      action: "reply",
      initials: "SC",
      tint: "#E8EFFA",
    },
  },
  {
    id: "star",
    index: "02",
    kicker: "Boss and clients",
    title: "Star, then reply.",
    body: "Elena Vasquez is your boss. Lisa Hartmann is a client. Tap the star first, then send the reply.",
    mail: {
      name: "Elena Vasquez",
      role: "Boss",
      subject: "Q3 numbers before Friday",
      body: "I need the figures on my desk before Friday. Star this, then reply.",
      action: "star",
      initials: "EV",
      tint: "#FCE8E6",
    },
  },
  {
    id: "archive",
    index: "03",
    kicker: "Receipts and alerts",
    title: "Archive it.",
    body: "News, renewals, and automatic mail. Archive them. A reply usually costs office money.",
    mail: {
      name: "Netflix",
      role: "Automatic",
      subject: "Your plan renewed",
      body: "A receipt. Read it if you want. Do not reply. Archive it.",
      action: "archive",
      initials: "N",
      tint: "#F3F4F6",
    },
  },
  {
    id: "spam",
    index: "04",
    kicker: "Fake prizes",
    title: "Report spam.",
    body: "Amazing Deal and fake security warnings. Report spam. Do not reply or archive.",
    mail: {
      name: "Amazing Deal",
      role: "Scam",
      subject: "You won a gift card",
      body: "Claim the prize now. This is fake. Report it as spam.",
      action: "spam",
      initials: "!",
      tint: "#FEE2E2",
    },
  },
  {
    id: "heart",
    index: "05",
    kicker: "Personal mail",
    title: "Tap the heart.",
    body: "Alex Morgan is your partner. Leave the message, and the next one takes $10 for every unanswered mail out of office money.",
    mail: {
      name: "Alex Morgan",
      role: "Personal",
      subject: "Did you get home alright",
      body: "Just checking in. Tap the heart. Do not leave this sitting in the inbox.",
      action: "heart",
      initials: "AM",
      tint: "#FCE7F3",
    },
  },
  {
    id: "file",
    index: "06",
    kicker: "Attached work",
    title: "Finish the file, then reply.",
    body: "Word, Excel, PDF, and drawings work the same way. Open the file, finish it, close it, then reply. A finished file pays. An unfinished file costs office money.",
    mail: {
      name: "David Kim",
      role: "Coworker",
      subject: "Excel budget attached",
      body: "Fill the blank amounts, close the sheet, then reply. This is not the note you only archive.",
      action: "file",
      initials: "DK",
      tint: "#E8EFFA",
    },
  },
];

export const RULES = [
  {
    name: "Elena Vasquez",
    role: "Boss",
    action: "Star, then reply",
    detail: "Do not archive her mail.",
  },
  {
    name: "Lisa Hartmann",
    role: "Client",
    action: "Star, then reply",
    detail: "A client invoice is different. Finish that file, then reply.",
  },
  {
    name: "James Whitfield",
    role: "CEO",
    action: "Reply",
    detail: "Send a reply. Do not archive.",
  },
  {
    name: "Alex Morgan",
    role: "Personal",
    action: "Heart",
    detail: "Ignored mail costs $10 for every unanswered message.",
  },
  {
    name: "Amazing Deal",
    role: "Scam",
    action: "Report spam",
    detail: "Fake prizes and fake security warnings. Trash works too.",
  },
  {
    name: "Netflix · Stripe",
    role: "Automatic",
    action: "Archive",
    detail: "Receipts and renewals. LinkedIn, Notion, Calendar, Amazon, and Airbnb too.",
  },
] as const;

export const LIST_ROWS = [
  {
    name: "Elena Vasquez",
    role: "Boss",
    subject: "Q3 numbers before Friday",
    initials: "EV",
    tint: "#FCE8E6",
    hot: true,
  },
  {
    name: "Sarah Chen",
    role: "Coworker",
    subject: "Review the plan before the meeting",
    initials: "SC",
    tint: "#E8EFFA",
    hot: true,
  },
  {
    name: "Alex Morgan",
    role: "Personal",
    subject: "Did you get home alright",
    initials: "AM",
    tint: "#FCE7F3",
    hot: true,
  },
  {
    name: "Netflix",
    role: "Automatic",
    subject: "Your plan renewed",
    initials: "N",
    tint: "#F3F4F6",
    hot: false,
  },
  {
    name: "Amazing Deal",
    role: "Scam",
    subject: "You won a gift card",
    initials: "!",
    tint: "#FEE2E2",
    hot: false,
  },
] as const;
