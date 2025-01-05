"use client";

import React, { useState } from "react";
import { Button } from "../../../../components/ui/button";
import EditProfileDialog from "./EditProfileDialog";
import { UserData } from "@/lib/types";

interface EditButtonProps {
  user: UserData;
}

const EditButton = ({ user }: EditButtonProps) => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <Button
        type="button"
        onClick={() => setShowDialog(true)}
        variant="secondary"
      >
        Edit <span className="hidden sm:inline">Profile</span>
      </Button>
      {showDialog && (
        <EditProfileDialog
          user={user}
          open={showDialog}
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

export default EditButton;
