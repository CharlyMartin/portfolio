import React from "react";

import Container from "../../blocks/container";
import Avatar from "../../atoms/avatar";
import ThemeToggle from "../../atoms/theme-toggle";
import DesktopNavigation from "../../blocks/navigation/desktop";
import MobileNavigation from "../../blocks/navigation/mobile";

export default function Header() {
  return (
    <header className="mb-20 sm:mb-24 md:mb-28">
      <div className="pt-6">
        <Container>
          <div className="flex gap-4">
            <div className="flex flex-1">
              <Avatar.Container>
                <Avatar />
              </Avatar.Container>
            </div>
            <div className="flex flex-1 justify-end md:justify-center">
              <MobileNavigation className="md:hidden" />
              <DesktopNavigation className="hidden md:block" />
            </div>
            <div className="flex justify-end md:flex-1">
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
