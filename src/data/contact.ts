import Icons from "@/components/atoms/icons";
import { Contact } from "@/types";

export const EMAIL = "charly@hey.com";

const data: Array<Contact> = [
  {
    name: "telegram",
    url: "https://t.me/charlymartin",
    action: "DM on Telegram",
    icon: Icons.Telegram,
  },
  {
    name: "github",
    url: "https://github.com/CharlyMartin",
    action: "Follow me on Github",
    icon: Icons.GitHub,
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/charlymartin/",
    action: "Connect on LinkedIn",
    icon: Icons.LinkedIn,
  },
  {
    name: "email",
    url: `mailto:${EMAIL}?subject=${encodeURIComponent(
      "Contact from your Portfolio"
    )}&body=${encodeURIComponent("Hi Charly,")}`,
    action: "Open email app",
    icon: Icons.Email,
  },
];

export function getContacts() {
  return data;
}

export function getContact(name: Contact["name"]) {
  const contact = data.find((contact) => contact.name == name);
  if (!contact) throw new Error(`Contact ${name} not found`);
  return contact;
}
