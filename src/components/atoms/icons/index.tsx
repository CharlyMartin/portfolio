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

// https://icons8.com/
const Icons = {
  GitHub: SiGithub,
  LinkedIn: FaLinkedinIn,
  Telegram: SiTelegram,
  Email: HiEnvelope,
  Work: HiOutlineBriefcase,
  Stack: HiOutlineSquare3Stack3D,
  Team: FiUserPlus,
  Link: FiLink2,
  Clipboard: FiCopy,
  Check: FiCheck,
  ArrowRightOutline: HiOutlineArrowRight,
  ArrowRightCircle: HiArrowRightCircle,
  Back: FiArrowLeft,
  Moon: HiOutlineMoon,
  Sun: HiOutlineSun,
  ChevronRight: HiChevronRight,
  ChevronLeft: HiChevronLeft,
  ChevronDown: HiChevronDown,
  X: HiXMark,
  Article: HiOutlineFolderOpen,
  Star: HiMiniStar,
  Heart: HiHeart,
  Calendar: LuCalendarPlus,
};

export default Icons;

export type Props = React.ComponentProps<"svg">;
