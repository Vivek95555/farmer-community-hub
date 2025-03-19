
import { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  includeControls?: boolean;
  className?: string;
}

export function QRCodeGenerator({
  value,
  size = 200,
  includeControls = true,
  className,
}: QRCodeGeneratorProps) {
  const [qrValue, setQrValue] = useState<string>(value);

  useEffect(() => {
    setQrValue(value);
  }, [value]);

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = "agritrust-qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR Code downloaded successfully");
  };

  const handleShare = async () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        if (navigator.share) {
          const file = new File([blob], "agritrust-qrcode.png", {
            type: "image/png",
          });

          await navigator.share({
            title: "AgriTrust QR Code",
            text: "Scan this QR code to view my ecoPassport",
            files: [file],
          });
          toast.success("Shared successfully");
        } else {
          // Fallback for browsers that don't support native sharing
          const url = URL.createObjectURL(blob);
          navigator.clipboard.writeText(url);
          toast.success("QR code URL copied to clipboard");
        }
      }, "image/png");
    } catch (error) {
      console.error("Error sharing QR code:", error);
      toast.error("Failed to share QR code");
    }
  };

  return (
    <Card className={cn("overflow-hidden bg-transparent shadow-none", className)}>
      <CardContent className="flex flex-col items-center p-6">
        <div className="mb-4 rounded-xl border bg-white p-4 shadow-subtle">
          <QRCodeCanvas
            value={qrValue}
            size={size}
            level="H"
            includeMargin={true}
            imageSettings={{
              src: "", // Can add a logo in the center if needed
              excavate: true,
              width: size * 0.2,
              height: size * 0.2,
            }}
          />
        </div>
        {includeControls && (
          <div className="mt-4 flex gap-2">
            <Button size="sm" variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
            <Button size="sm" variant="outline" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
