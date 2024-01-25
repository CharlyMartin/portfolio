import Image from "next/image";
import { Metadata } from "next";

import Container from "@/components/blocks/container";
import Title from "@/components/atoms/title";
import SocialLinkText from "@/components/blocks/social-link-text";
import { getContacts } from "@/data/contact";
import { getBio } from "@/data/bio";
import Prose from "@/components/atoms/prose";
import { metadata as globalMeta } from "@/app/layout";

export const metadata: Metadata = {
  ...globalMeta,
  title: "About",
  description:
    "Hi, I’m Charly. I live in sunny Lisbon where I design and build apps",
};

export default async function About() {
  const contacts = getContacts();
  const bio = await getBio();

  return (
    <Container>
      <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-3">
        <div className="lg:pl-20">
          <div className="image-ring mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl">
            <Image {...bio.avatar} alt="Avatar of the author" />
          </div>
        </div>
        <div className="w-full lg:order-first lg:row-span-2">
          <Title>
            Hi, I’m Charly. I live in sunny Lisbon ☀️ where I design and build
            apps.
          </Title>
          <Prose html={bio.long} />
        </div>
        <div className="lg:pl-20">
          <ul role="list" className="lg:pt-4">
            {contacts.map((contact, i) => {
              const { url, icon: Icon, action } = contact;

              return (
                <SocialLinkText
                  key={i}
                  href={url}
                  icon={Icon}
                  action={action}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </Container>
  );
}
