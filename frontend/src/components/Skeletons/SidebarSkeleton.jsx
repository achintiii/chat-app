import React from "react";
import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="w-72 h-full bg-base-200 p-4 border-r border-base-300 flex flex-col transition-all duration-200">
      {/* Header Section */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-8 h-8 text-primary" />
          <h2 className="text-lg font-semibold">Chats</h2>
        </div>
      </div>

      {/* Skeleton Contacts Section */}
      <div className="overflow-y-auto w-full py-3">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="relative mx-auto lg:mx-0 flex items-center gap-3 mb-4">
            <div className="skeleton size-12 rounded-full" />
            <div className="hidden lg:block text-left flex-1">
              <div className="skeleton h-4 w-24 mb-1"></div>
              <div className="skeleton h-4 w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
