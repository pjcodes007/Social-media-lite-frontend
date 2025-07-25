import { Camera, Image, Heart, Clapperboard, Palette, Flower, Sun, Cloud, Rainbow } from "lucide-react";

const DoodleBackground = () => {
  return (
    <>
    <div className="z-[-100]">
      {/* Top Left */}
      <Camera className="absolute top-6 left-6 w-20 h-20 opacity-10 text-muted-foreground rotate-[-15deg]" />
      <Heart className="absolute top-[12%] left-[20%] w-14 h-14 opacity-10 text-muted-foreground rotate-[5deg]" />

      <Image className="absolute top-[18%] left-[8%] w-16 h-16 opacity-10 text-muted-foreground rotate-[20deg]" />
      <Flower className="absolute top-100 left-100 w-16 h-16 opacity-10 text-muted-foreground rotate-[20deg]" />
      <Flower className="absolute bottom-30 left-130 w-16 h-16 opacity-10 text-muted-foreground rotate-[20deg]" />
      <Flower className="absolute top-20 left-180 w-16 h-16 opacity-10 text-muted-foreground rotate-[20deg]" />

      <Sun className="absolute bottom-100 left-140 w-16 h-16 opacity-10 text-muted-foreground rotate-[20deg]" />
      <Camera className="absolute bottom-100 left-200 w-24 h-24 opacity-10 text-muted-foreground rotate-[20deg]" />
      <Cloud className="absolute bottom-50 right-170 w-16 h-16 opacity-10 text-muted-foreground rotate-[20deg]" />
      <Rainbow className="absolute top-50 left-100 w-16 h-16 opacity-10 text-muted-foreground rotate-[20deg]" />
      <Image className="absolute bottom-20 right-140 w-16 h-16 opacity-10 text-muted-foreground rotate-[20deg]" />

      {/* Top Right */}
      <Image className="absolute top-4 right-6 w-20 h-20 opacity-10 text-muted-foreground rotate-[30deg]" />
      <Clapperboard className="absolute top-[20%] right-[18%] w-16 h-16 opacity-10 text-muted-foreground rotate-[12deg]" />
      <Palette className="absolute top-[10%] right-[5%] w-14 h-14 opacity-10 text-muted-foreground rotate-[-10deg]" />

      {/* Middle */}
      <Camera className="absolute top-[45%] left-[10%] w-24 h-24 opacity-10 text-muted-foreground rotate-[10deg]" />
      <Heart className="absolute top-[50%] right-[15%] w-20 h-20 opacity-10 text-muted-foreground rotate-[-20deg]" />

      {/* Bottom Left */}
      <Palette className="absolute bottom-[15%] left-[8%] w-20 h-20 opacity-10 text-muted-foreground rotate-[25deg]" />
      <Clapperboard className="absolute bottom-[8%] left-[18%] w-16 h-16 opacity-10 text-muted-foreground rotate-[5deg]" />

      {/* Bottom Right */}
      <Image className="absolute bottom-10 right-10 w-24 h-24 opacity-10 text-muted-foreground rotate-[-25deg]" />
      <Heart className="absolute bottom-[20%] right-[25%] w-16 h-16 opacity-10 text-muted-foreground rotate-[15deg]" />
      <Camera className="absolute bottom-[5%] right-[15%] w-20 h-20 opacity-10 text-muted-foreground rotate-[8deg]" />
    </div>
    </>
  );
};

export default DoodleBackground;
