import React from "react";
import type { IconBaseProps, IconType } from "react-icons";
import { SiGithub, SiTelegram } from "react-icons/si";
import {
  FiCopy,
  FiCheck,
  FiLink2,
  FiUserPlus,
  FiArrowLeft,
} from "react-icons/fi";
import {
  HiOutlineSquare3Stack3D,
  HiOutlineBriefcase,
  HiEnvelope,
  HiOutlineArrowRight,
  HiOutlineMoon,
  HiOutlineSun,
  HiChevronRight,
  HiChevronDown,
  HiXMark,
  HiOutlineFolderOpen,
  HiMiniStar,
  HiArrowRightCircle,
  HiHeart,
  HiChevronLeft,
} from "react-icons/hi2";
import { FaLinkedinIn } from "react-icons/fa6";
import { LuCalendarPlus } from "react-icons/lu";

// Icons are decorative: the surrounding element carries the accessible name.
function decorative(Icon: IconType) {
  return function DecorativeIcon(props: IconBaseProps) {
    return <Icon aria-hidden="true" focusable="false" {...props} />;
  };
}

// https://icons8.com/
const Icons = {
  GitHub: decorative(SiGithub),
  LinkedIn: decorative(FaLinkedinIn),
  Telegram: decorative(SiTelegram),
  Email: decorative(HiEnvelope),
  Work: decorative(HiOutlineBriefcase),
  Stack: decorative(HiOutlineSquare3Stack3D),
  Team: decorative(FiUserPlus),
  Link: decorative(FiLink2),
  Clipboard: decorative(FiCopy),
  Check: decorative(FiCheck),
  ArrowRightOutline: decorative(HiOutlineArrowRight),
  ArrowRightCircle: decorative(HiArrowRightCircle),
  Back: decorative(FiArrowLeft),
  Moon: decorative(HiOutlineMoon),
  Sun: decorative(HiOutlineSun),
  ChevronRight: decorative(HiChevronRight),
  ChevronLeft: decorative(HiChevronLeft),
  ChevronDown: decorative(HiChevronDown),
  X: decorative(HiXMark),
  Article: decorative(HiOutlineFolderOpen),
  Star: decorative(HiMiniStar),
  Heart: decorative(HiHeart),
  Calendar: decorative(LuCalendarPlus),
};

export default Icons;

export type Props = React.ComponentProps<"svg">;
