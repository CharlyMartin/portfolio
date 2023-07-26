import { SiGithub, SiLinkedin, SiTelegram } from "react-icons/si";
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
} from "react-icons/hi2";

// https://icons8.com/
const Icons = {
  GitHub: SiGithub,
  LinkedIn: SiLinkedin,
  Telegram: SiTelegram,
  Email: HiEnvelope,
  Work: HiOutlineBriefcase,
  Stack: HiOutlineSquare3Stack3D,
  Team: FiUserPlus,
  Link: FiLink2,
  Clipboard: FiCopy,
  Check: FiCheck,
  ArrowRightOutline: HiOutlineArrowRight,
  Back: FiArrowLeft,
  Moon: HiOutlineMoon,
  Sun: HiOutlineSun,
  ChevronRight: HiChevronRight,
  ChevronDown: HiChevronDown,
  X: HiXMark,
};

export default Icons;

export type Props = React.ComponentProps<"svg">;
