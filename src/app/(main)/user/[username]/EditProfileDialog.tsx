import { UserData } from "@/lib/types";
import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  updateUserProfileSchema,
  UpdateUserProfileValues,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import LoadingButton from "@/components/controls/LoadingButton";
import { useProfileUpdateMutation } from "./mutations";

interface EditProfileDialogProps {
  user: UserData;
  open: boolean;
  onClose: () => void;
}

const EditProfileDialog = ({ user, open, onClose }: EditProfileDialogProps) => {
  const mutation = useProfileUpdateMutation();

  const form = useForm<UpdateUserProfileValues>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      displayName: user.displayName,
      bio: user.bio || "",
    },
  });
  const onSubmit = (values: UpdateUserProfileValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Name</FormLabel>
                  <FormControl>
                    <Input placeholder="displayName" {...field} />
                  </FormControl>
                  <FormDescription />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Bio..."  {...field} />
                  </FormControl>
                  <FormDescription />
                </FormItem>
              )}
            />
            <div className="w-full pt-3">
              <LoadingButton
                loading={mutation.isPending}
                type="submit"
                className="w-full"
              >
                Update Profile
              </LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
