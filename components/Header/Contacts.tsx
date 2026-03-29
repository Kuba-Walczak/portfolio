import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Card } from "../ui/card";
import { FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";
import { FileUser, User } from "lucide-react";

export default function Contacts() {
  return (
    <Card className="pointer-events-auto divide-ui-x-glass flex w-fit flex-row items-center bg-glass p-2 text-muted-foreground vsm:p-4 vmd:p-5 vlg:p-6 vxl:p-7 v2xl:p-8">
        <div className="flex flex-row gap-2 pr-2 vsm:gap-4 vsm:pr-4 vmd:gap-5 vmd:pr-5 vlg:gap-6 vlg:pr-6 vxl:gap-6 vxl:pr-7 v2xl:gap-7 v2xl:pr-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <FaGithub
                className="h-5 w-5 cursor-pointer transition-colors duration-300 hover:text-white vsm:h-8 vsm:w-8 vmd:h-10 vmd:w-10 vlg:h-12 vlg:w-12 vxl:h-14 vxl:w-14 v2xl:h-16 v2xl:w-16"
                onClick={() => window.open('https://github.com/kuba-walczak', '_blank')}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={48}>GitHub</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <FaLinkedin
                className="h-5 w-5 cursor-pointer transition-colors duration-300 hover:text-white vsm:h-8 vsm:w-8 vmd:h-10 vmd:w-10 vlg:h-12 vlg:w-12 vxl:h-14 vxl:w-14 v2xl:h-16 v2xl:w-16"
                onClick={() => window.open('https://linkedin.com/in/jakubwalczak', '_blank')}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={48}>LinkedIn</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <FaDiscord
                className="h-5 w-5 cursor-pointer transition-colors duration-300 hover:text-white vsm:h-8 vsm:w-8 vmd:h-10 vmd:w-10 vlg:h-12 vlg:w-12 vxl:h-14 vxl:w-14 v2xl:h-16 v2xl:w-16"
                onClick={() => window.open('https://discord.com/users/1234567890', '_blank')}
              />
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={48}>Discord</TooltipContent>
          </Tooltip>
        </div>
      </Card>
  )
}