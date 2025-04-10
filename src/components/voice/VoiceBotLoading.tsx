
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const VoiceBotLoading = () => {
  return (
    <div className="flex flex-col space-y-2 p-4 bg-black/30 rounded-lg border border-gray-700">
      <div className="flex items-center space-x-2">
        <Skeleton className="h-4 w-4 rounded-full bg-gray-700" />
        <p className="text-gray-300 text-sm">Verbindung wird hergestellt...</p>
      </div>
      <div className="w-full bg-gray-800 h-1 rounded-full overflow-hidden">
        <div className="bg-primary h-full w-1/2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default VoiceBotLoading;
