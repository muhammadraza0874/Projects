import React, { useState } from "react";
import { Clock, Check } from "lucide-react";
import ChipLabel from "@/components/ChipLabel";

interface AppointmentAvailabilityProps {
  data: string;
}

const AppointmentAvailability: React.FC<AppointmentAvailabilityProps> = ({
  data,
}) => {
  const matchResult = data?.match(/\[(.*)\]/);
  const arrayContent = matchResult ? matchResult[1] : "";

  const timeArray = arrayContent.split(",").map((timeStr) => {
    return timeStr.replace(/['\\]/g, "").trim();
  });

  return (
    <div className="tool-card">
      <ChipLabel variant="primary" className="mb-2">
        Available Appointments
      </ChipLabel>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
        {timeArray?.length > 0 ? (
          timeArray?.map((time: any) => (
            <div
              key={time}
              className={`flex items-center justify-between p-2 rounded-lg border transition-all hover:bg-secondary hover:border-primary/50`}
            >
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{time}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No available appointments</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentAvailability;
