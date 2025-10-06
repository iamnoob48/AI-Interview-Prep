import React from "react";
import { LuUser } from "react-icons/lu";
import { Button } from "@/components/ui/button";

function ProfileDetails({ user }) {
  return (
    <div>
      {user.profilePic ? (
        <div className="flex items-center justify-center">
          <Button>
            <img
              src={user.profilePic}
              alt="User profile picture"
              className="w-11 h-11 rounded-full object-cover"
            />
          </Button>

          <p>{user.username}</p>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button>
            <LuUser />
          </Button>
          <p className="py-1">{user.username}</p>
        </div>
      )}
    </div>
  );
}

export default ProfileDetails;
