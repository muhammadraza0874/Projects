import React from "react";
import { Sun } from "lucide-react";
import ChipLabel from "@/components/ChipLabel";

interface WeatherInfoProps {
  data: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ data }) => {
  return (
    <div className="tool-card">
      <ChipLabel variant="primary" className="mb-2">
        Weather Information
      </ChipLabel>
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-full bg-secondary">
          <Sun className="h-8 w-8 text-yellow-500" />
        </div>
        <div>
          <p className="text-muted-foreground">{data}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
