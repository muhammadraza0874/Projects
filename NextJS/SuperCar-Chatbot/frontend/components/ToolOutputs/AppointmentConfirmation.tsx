import React from "react";
import { Calendar, Clock, CheckCircle, Car, Ticket } from "lucide-react";
import ChipLabel from "@/components/ChipLabel";

interface AppointmentConfirmationProps {
  data: string;
}

const AppointmentConfirmation: React.FC<AppointmentConfirmationProps> = ({
  data,
}) => {
  // Parse the string data if it's a string
  const parsedData = React.useMemo(() => {
    if (typeof data === "string") {
      try {
        // Extract the JSON-like object from the string with backticks and quotes
        const match = data.match(/```({.*?})```/s);
        if (match && match[1]) {
          // Replace single quotes with double quotes to make it valid JSON
          const validJson = match[1].replace(/'/g, '"');
          return JSON.parse(validJson);
        }
      } catch (error) {
        console.error("Error parsing appointment data:", error);
      }
    }
    return data;
  }, [data]);

  const appointmentData = {
    carModel: parsedData?.modelo || "",
    date: parsedData?.fecha || "",
    time: parsedData?.hora || "",
    confirmationCode: parsedData?.confirmacion_id || "",
    message: parsedData?.mensaje || "",
  };

  return (
    <div className="tool-card">
      <div className="flex items-center justify-between mb-2">
        <ChipLabel variant="primary">Appointment Confirmed</ChipLabel>
        <CheckCircle className="h-5 w-5 text-green-500" />
      </div>

      <div className="space-y-3">
        <div className="flex items-start">
          <Car className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Vehicle</p>
            <p className="font-medium">{appointmentData.carModel}</p>
          </div>
        </div>

        <div className="flex items-start">
          <Calendar className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Date</p>
            <p className="font-medium">
              {appointmentData.date || "Not specified"}
            </p>
          </div>
        </div>

        <div className="flex items-start">
          <Clock className="h-5 w-5 mr-3 text-primary shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">Time</p>
            <p className="font-medium">{appointmentData.time}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t">
        <div className="flex items-center">
          <Ticket className="h-5 w-5 mr-2 text-primary" />
          <p className="text-sm">
            Confirmation Code:{" "}
            <span className="font-mono font-medium">
              {appointmentData.confirmationCode}
            </span>
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          {appointmentData.message}
        </p>
      </div>
    </div>
  );
};

export default AppointmentConfirmation;
