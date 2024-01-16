import Icons from "@/components/atoms/icons";
import { Contact } from "@/types";

export const EMAIL = "charly@hey.com";

const data: Array<Contact> = [
  {
    id: "telegram",
    name: "Telegram",
    url: "https://t.me/charlymartin",
    action: "DM on Telegram",
    icon: Icons.Telegram,
  },
  {
    id: "github",
    name: "Github",
    url: "https://github.com/CharlyMartin",
    action: "Follow me on Github",
    icon: Icons.GitHub,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/charlymartin/",
    action: "Connect on LinkedIn",
    icon: Icons.LinkedIn,
  },
  {
    id: "email",
    name: "Email",
    url: `mailto:${EMAIL}?subject=${encodeURIComponent(
      "Contact from your Portfolio"
    )}&body=${encodeURIComponent("Hi Charly,")}`,
    action: "Open email app",
    icon: Icons.Email,
  },
  {
    id: "cal",
    name: "Cal.com",
    url: "https://cal.com/charlymartin/discovery-call",
    action: "Schedule a call",
    icon: Icons.Calendar,
  },
];

export function getContacts() {
  return data;
}

export function getContact(id: Contact["id"]) {
  const contact = data.find((contact) => contact.id == id);
  if (!contact) throw new Error(`Contact ${id} not found`);
  return contact;
}
