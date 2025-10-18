import { useState } from "react";
import { AvatarCustomization } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Avatar from "./Avatar";

interface AvatarCreationProps {
  onComplete: (customization: AvatarCustomization) => void;
}

export default function AvatarCreation({ onComplete }: AvatarCreationProps) {
  const [customization, setCustomization] = useState<AvatarCustomization>({
    hairColor: 'brown',
    eyeColor: 'brown',
    noseSize: 'medium',
    mouthType: 'smile',
    facialHair: 'none',
    gender: 'male',
  });

  const updateCustomization = <K extends keyof AvatarCustomization>(
    key: K,
    value: AvatarCustomization[K]
  ) => {
    setCustomization(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center gap-6 p-8 bg-card rounded-lg border border-card-border">
          <h2 className="text-2xl font-bold text-foreground">Preview</h2>
          <Avatar customization={customization} balance={100000} className="w-80" />
        </div>

        <div className="space-y-6 p-8 bg-card rounded-lg border border-card-border overflow-y-auto max-h-[600px]">
          <h1 className="text-3xl font-bold text-center text-foreground mb-6">Create Your Avatar</h1>

          <div className="space-y-4">
            <div>
              <Label className="text-base font-semibold mb-3 block">Gender</Label>
              <RadioGroup value={customization.gender} onValueChange={(v) => updateCustomization('gender', v as any)}>
                <div className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" data-testid="radio-gender-male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" data-testid="radio-gender-female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">Hair Color</Label>
              <RadioGroup value={customization.hairColor} onValueChange={(v) => updateCustomization('hairColor', v as any)}>
                <div className="grid grid-cols-4 gap-3">
                  {['black', 'brown', 'blonde', 'red', 'gray', 'blue', 'green', 'purple'].map(color => (
                    <div key={color} className="flex items-center space-x-2">
                      <RadioGroupItem value={color} id={`hair-${color}`} data-testid={`radio-hair-${color}`} />
                      <Label htmlFor={`hair-${color}`} className="capitalize">{color}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">Eye Color</Label>
              <RadioGroup value={customization.eyeColor} onValueChange={(v) => updateCustomization('eyeColor', v as any)}>
                <div className="grid grid-cols-3 gap-3">
                  {['brown', 'blue', 'green', 'hazel', 'gray', 'amber'].map(color => (
                    <div key={color} className="flex items-center space-x-2">
                      <RadioGroupItem value={color} id={`eye-${color}`} data-testid={`radio-eye-${color}`} />
                      <Label htmlFor={`eye-${color}`} className="capitalize">{color}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">Nose Size</Label>
              <RadioGroup value={customization.noseSize} onValueChange={(v) => updateCustomization('noseSize', v as any)}>
                <div className="flex gap-4">
                  {['small', 'medium', 'large'].map(size => (
                    <div key={size} className="flex items-center space-x-2">
                      <RadioGroupItem value={size} id={`nose-${size}`} data-testid={`radio-nose-${size}`} />
                      <Label htmlFor={`nose-${size}`} className="capitalize">{size}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">Mouth Type</Label>
              <RadioGroup value={customization.mouthType} onValueChange={(v) => updateCustomization('mouthType', v as any)}>
                <div className="grid grid-cols-3 gap-3">
                  {['smile', 'neutral', 'frown', 'smirk', 'grin'].map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={`mouth-${type}`} data-testid={`radio-mouth-${type}`} />
                      <Label htmlFor={`mouth-${type}`} className="capitalize">{type}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            <div>
              <Label className="text-base font-semibold mb-3 block">Facial Hair</Label>
              <RadioGroup value={customization.facialHair} onValueChange={(v) => updateCustomization('facialHair', v as any)}>
                <div className="grid grid-cols-2 gap-3">
                  {['none', 'beard', 'mustache', 'goatee'].map(type => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type} id={`facial-${type}`} data-testid={`radio-facial-${type}`} />
                      <Label htmlFor={`facial-${type}`} className="capitalize">{type === 'none' ? 'Clean Shaven' : type}</Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>

          <Button 
            onClick={() => onComplete(customization)} 
            className="w-full mt-8"
            size="lg"
            data-testid="button-start-playing"
          >
            Start Playing
          </Button>
        </div>
      </div>
    </div>
  );
}
