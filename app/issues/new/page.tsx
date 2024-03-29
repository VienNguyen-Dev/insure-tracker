"use client";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import React, { useState } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      setIsSubmiting(true);

      await axios.post("/api/issues/", data);
      router.push("/issues");
    } catch (error) {
      setError("an unexpected error occured");
      setIsSubmiting(false);
    }
  });
  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-6" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input placeholder="Title" id="title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller name={"description"} control={control} render={({ field }) => <SimpleMDE placeholder="Description" {...field} />} />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmiting}>Submit New Issue {isSubmiting && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
