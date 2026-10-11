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
    "An inbox survival game. Finish each message the way the label says, before office money hits $0 or 100 messages are still waiting.",
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
  "Your love",
  "David Kim",
  "Priya Nair",
  "Marcus Webb",
  "John Okonkwo",
  "Nexora",
  "Stria",
  "Soniva",
  "Amazing Deal",
  "Linquer",
  "Notiva",
  "Marazo",
  "Airelo",
] as const;

export type InboxRow = {
  name: string;
  subject: string;
  preview: string;
  time: string;
  initials: string;
  tint: string;
  unread?: boolean;
  starred?: boolean;
  needsReply?: boolean;
  support?: boolean;
  danger?: boolean;
};

export type ThreadMail = {
  name: string;
  role: string;
  action: string;
  subject: string;
  body: string;
  initials: string;
  tint: string;
  starred?: boolean;
};

export type OfficeSnap = {
  balance: string;
  speed: string;
  speedDetail: string;
  unanswered: string;
  correct: string;
  mistakes: string;
  received: string;
  elapsed: string;
};

export type ShiftStep = {
  id: string;
  index: string;
  kicker: string;
  title: string;
  body: string;
  screen: "inbox" | "thread" | "office";
  rows?: readonly InboxRow[];
  gauge?: number;
  streak?: number;
  mail?: ThreadMail;
  office?: OfficeSnap;
};

export const OPENING_INBOX: InboxRow[] = [
  {
    name: "John Okonkwo",
    subject: "Mail Boss tutorial",
    preview: "Hi. I'm John, your support manager.",
    time: "9:41",
    initials: "JO",
    tint: "#E8F0FE",
    unread: true,
    support: true,
  },
  {
    name: "Elena Vasquez",
    subject: "Q3 numbers before Friday",
    preview: "I need the figures on my desk before Friday.",
    time: "9:38",
    initials: "EV",
    tint: "#FEE2E2",
    unread: true,
    needsReply: true,
  },
  {
    name: "Sarah Chen",
    subject: "Review the plan before the meeting",
    preview: "Can you look before we walk in?",
    time: "9:22",
    initials: "SC",
    tint: "#EDE9FE",
    unread: true,
    needsReply: true,
  },
  {
    name: "Your love",
    subject: "Did you get home alright",
    preview: "Just checking in.",
    time: "8:14",
    initials: "♥",
    tint: "#FCE8E6",
    unread: true,
    needsReply: true,
  },
  {
    name: "Nexora",
    subject: "Your plan renewed",
    preview: "A receipt. Archive it.",
    time: "7:02",
    initials: "N",
    tint: "#F3F4F6",
  },
];

const HOT_INBOX: InboxRow[] = [
  {
    name: "Elena Vasquez",
    subject: "Q3 numbers before Friday",
    preview: "I need the figures on my desk before Friday.",
    time: "9:58",
    initials: "EV",
    tint: "#FEE2E2",
    unread: true,
    needsReply: true,
  },
  {
    name: "Amazing Deal",
    subject: "You won a gift card",
    preview: "Claim the prize now.",
    time: "9:57",
    initials: "!",
    tint: "#FEE2E2",
    unread: true,
    danger: true,
  },
  {
    name: "Your love",
    subject: "Did you get home alright",
    preview: "Just checking in.",
    time: "9:56",
    initials: "♥",
    tint: "#FCE8E6",
    unread: true,
    needsReply: true,
  },
  {
    name: "David Kim",
    subject: "Excel budget attached",
    preview: "Fill the blank amounts, then reply.",
    time: "9:55",
    initials: "DK",
    tint: "#F3F4F6",
    unread: true,
    needsReply: true,
  },
  {
    name: "Lisa Hartmann",
    subject: "Invoice for the vendor",
    preview: "Star this, then reply.",
    time: "9:51",
    initials: "LH",
    tint: "#FFEDD5",
    unread: true,
    starred: true,
    needsReply: true,
  },
];

export const SHIFT_STEPS: ShiftStep[] = [
  {
    id: "start",
    index: "01",
    kicker: "Start",
    title: "Reply to John.",
    body: "John is already in the inbox. Send that reply and the shift starts. Office money is $1,000. New mail begins on a three-second gap.",
    screen: "inbox",
    gauge: 0.12,
    rows: OPENING_INBOX,
  },
  {
    id: "label",
    index: "02",
    kicker: "The label",
    title: "Read who sent it.",
    body: "Open the message. The line under the name is the step. Star then reply, reply, archive, report spam, the heart, or finish the file and send.",
    screen: "thread",
    mail: {
      name: "Elena Vasquez",
      role: "Boss",
      action: "Star + reply",
      subject: "Q3 numbers before Friday",
      body: "I need the figures on my desk before Friday. Star this, then reply. Do not archive it.",
      initials: "EV",
      tint: "#FEE2E2",
    },
  },
  {
    id: "pace",
    index: "03",
    kicker: "The pace",
    title: "Watch the gauge.",
    body: "Work mail starts near 8 seconds. Every 10 seconds that gap tightens a little, and every two minutes it jumps faster, down toward 3.5. The red end means mail is fast enough to end the shift. A correct streak pays extra office money. A wrong move resets it. A red dot means that message is still waiting.",
    screen: "inbox",
    gauge: 0.86,
    streak: 5,
    rows: HOT_INBOX,
  },
  {
    id: "office",
    index: "04",
    kicker: "Office",
    title: "Check the card.",
    body: "Office shows the balance, how fast mail is arriving, and this shift. At $0 the card is empty. At 100 messages still waiting, the inbox collapses. Restart is on this tab.",
    screen: "office",
    office: {
      balance: "$1,240",
      speed: "5.2s",
      speedDetail: "A new message about every 5.2s.",
      unanswered: "9/100",
      correct: "14",
      mistakes: "2",
      received: "23",
      elapsed: "2:40",
    },
  },
];

export const RULES = [
  {
    name: "Elena Vasquez",
    role: "Boss",
    action: "Star + reply",
    detail: "Tap the star, then reply. Do not archive her mail.",
  },
  {
    name: "Lisa Hartmann",
    role: "Client",
    action: "Star + reply",
    detail: "A client invoice is different. Finish that file, then reply.",
  },
  {
    name: "James Whitfield",
    role: "CEO",
    action: "Reply",
    detail: "Send a reply. Do not archive.",
  },
  {
    name: "Your love",
    role: "Personal",
    action: "Emoji",
    detail: "Tap the heart. Leave it, and a later message takes $4.50 for every unanswered mail, up to $90.00. That rises to $6.00 and $7.50, up to $120.00 and $150.00.",
  },
  {
    name: "Amazing Deal",
    role: "Scam",
    action: "Report spam",
    detail: "Fake prizes and fake security warnings. Trash works too.",
  },
  {
    name: "Nexora · Stria",
    role: "Automatic",
    action: "Archive",
    detail: "Receipts and renewals. Linquer, Notiva, Calivo, Marazo, and Airelo too.",
  },
] as const;
