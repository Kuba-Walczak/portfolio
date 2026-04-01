import { TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tabs } from "@/components/ui/tabs";
import { gsap } from "gsap";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Showcase } from "./Tabs/Showcase";
import { Details } from "./Tabs/Details";
import { Gallery } from "./Tabs/Gallery";

export function Screen() {
    const { selectedProject, setSelectedProject, setProjectView } = useApp()
    const [activeTab, setActiveTab] = useState("showcase")

    const handleClose = () => {
      const element = document.getElementById('projects')
      if (!element) return
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const targetPosition = elementPosition + 200
      const scrollProxy = { y: window.pageYOffset }
      gsap.to(scrollProxy, {
        y: targetPosition,
        duration: 2,
        overwrite: "auto",
        onUpdate: () => {
          window.scrollTo(0, scrollProxy.y)
        },
      })
      setTimeout(() => {
        setSelectedProject(null)
        setProjectView(false)
      }, 1500)
    }

    if (!selectedProject) return null
    const withOpacity50 = (color: string) => `color-mix(in srgb, ${color} 10%, transparent)`
    const rawColorBase = selectedProject.laptop.colors[0] ?? '#000000'
    const colorBase = withOpacity50(rawColorBase)
    const colorAccent = withOpacity50(selectedProject.laptop.colors[1] ?? rawColorBase)
    return (
            <div
              className="w-full h-full flex flex-col rounded-t-xl vsm:rounded-t-2xl vmd:rounded-t-3xl vlg:rounded-t-4xl"
              style={{
                backgroundColor: colorBase,
                backgroundImage: `radial-gradient(circle at top left, ${colorAccent} 0%, transparent 100%)`,
              }}
            > {/* inset-shadow-pseudo */}
        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            if (value === "close") {
              handleClose()
              setActiveTab("showcase")
              return
            }
            setActiveTab(value)
          }}
          className="w-full h-full"
        >
          <div className="flex justify-center w-full bg-white/3 rounded-t-xl vsm:rounded-t-2xl vmd:rounded-t-3xl vlg:rounded-t-4xl">
            <TabsList>
              <TabsTrigger value="showcase" className="text-sm vsm:text-lg vmd:text-2xl vlg:text-3xl">Showcase</TabsTrigger>
              <TabsTrigger value="details" className="text-sm vsm:text-lg vmd:text-2xl vlg:text-3xl">Details</TabsTrigger>
              <TabsTrigger value="gallery" className="text-sm vsm:text-lg vmd:text-2xl vlg:text-3xl">Gallery</TabsTrigger>
              <TabsTrigger value="close" className="text-sm vsm:text-lg vmd:text-2xl vlg:text-3xl hover:text-red-500 dark:hover:text-red-400">
                Close
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="p-1 vsm:p-2 vmd:p-3 vlg:p-4">
          <TabsContent value="showcase"><Showcase title={selectedProject.title} date={selectedProject.laptop.startDate} duration={selectedProject.laptop.duration} /></TabsContent>
            <TabsContent value="details"><Details description={selectedProject.laptop.description} techStack={selectedProject.laptop.techStack} /></TabsContent>
            <TabsContent value="gallery"><Gallery /></TabsContent>
          </div>
        </Tabs>
                </div>
    )
}
