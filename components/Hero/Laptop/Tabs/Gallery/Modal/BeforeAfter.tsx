import { GalleryContent } from "@/types/project";

export function BeforeAfter({ content }: { content: GalleryContent }) {
    return (
        <div className="border-ui-glass flex rounded-b-lg">
        <div className="relative overflow-hidden rounded-bl-lg">
            <video
            src={content?.media[0]?.src}
            width={content?.media[0]?.width}
            height={content?.media[0]?.height}
            className="object-contain"
            style={{ clipPath: "inset(0 50% 0 0)" }}
            autoPlay
            muted
            loop />
        </div>
        <div className="absolute inset-0 overflow-hidden rounded-br-lg">
            <video
            src={content?.media[1]?.src}
            width={content?.media[1]?.width}
            height={content?.media[1]?.height}
            className="object-contain"
            style={{ clipPath: "inset(0 0 0 50%)" }}
            autoPlay
            muted
            loop />
        </div>
        </div>
    )
}
