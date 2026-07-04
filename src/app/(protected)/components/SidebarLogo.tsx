import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/assets";
import { cn } from "@/lib/utils";

const SidebarLogo = ({ isCollapsed, isMobile }: { isCollapsed: boolean; isMobile: boolean;}) => {
  return (
    <div>
      <Link
        href="/dashboard"
        className={cn(
          "flex items-center gap-2 mb-8",
          isCollapsed && !isMobile ? "justify-center" : "justify-center"
        )}
      >
        <Image
          src={Logo}
          className={cn(
            "h-6 4xl:h-[28px]",
            isCollapsed && !isMobile ? "w-6" : "w-9 4xl:w-[40px]"
          )}
          alt="DevCollab-rgb"
        />
        {(!isCollapsed || isMobile) && (
          <span className="font-medium 4xl:text-lg text-heading! whitespace-nowrap">
            DevCollab
          </span>
        )}
      </Link>
    </div>
  )
}

export default SidebarLogo