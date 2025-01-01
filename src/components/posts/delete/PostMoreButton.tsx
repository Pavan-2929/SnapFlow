import { PostData } from "@/lib/types";
import { MoreHorizontal, Trash2 } from "lucide-react";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeletePostDialog from "./DeletePostDialog";

interface PostMoreButtonProps {
  post: PostData;
}

const PostMoreButton = ({ post }: PostMoreButtonProps) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <MoreHorizontal className="size-5 cursor-pointer text-muted-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setShowDialog(true)}>
            <Trash2 className="mr-3 text-destructive" />
            <p className="text-destructive">Delete</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {showDialog && (
        <DeletePostDialog
          post={post}
          open={showDialog}
          onClose={() => setShowDialog(false)}
        />
      )}
    </>
  );
};

export default PostMoreButton;
