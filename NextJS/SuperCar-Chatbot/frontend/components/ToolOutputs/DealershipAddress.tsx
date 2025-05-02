import React from "react";
import { MapPin } from "lucide-react";
import ChipLabel from "@/components/ChipLabel";

interface DealershipAddressProps {
  data: string;
}

const DealershipAddress: React.FC<DealershipAddressProps> = ({ data }) => {
  return (
    <div className="tool-card">
      <ChipLabel variant="primary" className="mb-2">
        Dealership Information
      </ChipLabel>
      <div className="flex flex-col space-y-2">
        <div className="flex items-start space-x-2">
          <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <p>{data}</p>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(`${data}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="button-secondary inline-flex items-center text-sm"
        >
          <MapPin className="mr-1 h-4 w-4" />
          View on Map
        </a>
      </div>
    </div>
  );
};

export default DealershipAddress;
