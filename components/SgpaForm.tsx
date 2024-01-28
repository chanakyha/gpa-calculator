"use client";

import * as z from "zod";
import { gradePoints } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn, getGpaMessage } from "@/lib/utils";
import { Terminal } from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  gpa: z.array(
    z.object({
      grade: z.string(),
      credits: z.string(),
    })
  ),
});

const SgpaForm = () => {
  const [gpa, setGpa] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gpa: [
        {
          grade: "",
          credits: "",
        },
        {
          grade: "",
          credits: "",
        },
        {
          grade: "",
          credits: "",
        },
        {
          grade: "",
          credits: "",
        },
        {
          grade: "",
          credits: "",
        },
        {
          grade: "",
          credits: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: "gpa",
    control: form.control,
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    let points = 0;
    let sumCredit = 0;

    values.gpa.forEach((value, index) => {
      if (value.credits === "" || value.grade === "") return;
      sumCredit += Number(value.credits);
      const pt = gradePoints.find((gradePoint, index) => {
        return gradePoint.grade === value.grade;
      })?.points;
      points += Number(value.credits) * Number(pt);
    });
    let gpa = points / sumCredit;
    setGpa(gpa);
  }

  return (
    <div className="w-full flex flex-col gap-2 container-fix py-4">
      {gpa ? (
        <Alert className="shadow-md dark:shadow-white/10">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="underline underline-offset-4 decoration-primary">
            Your GPA is <span>{gpa.toFixed(3)}</span>
          </AlertTitle>
          <AlertDescription className="mt-4">
            {getGpaMessage(gpa)}
          </AlertDescription>
        </Alert>
      ) : null}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 mt-4"
        >
          {fields.map((field1, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
              >
                <span className="font-bold ">Subject {index + 1}</span>
                <FormField
                  control={form.control}
                  name={`gpa.${index}.credits`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter Credits"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`gpa.${index}.grade`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              key={index}
                              placeholder="Chose Grade"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {gradePoints.map((point, index) => {
                              return (
                                <SelectItem key={index} value={point.grade}>
                                  {point.grade}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            );
          })}

          <Button type="submit" className="md:ml-auto">
            Submit
          </Button>
        </form>
      </Form>
      <div className="flex items-center flex-row-reverse md:mr-auto bg-black rounded-md">
        {fields.length > 1 && (
          <Button
            variant={"destructive"}
            className="w-full border-none rounded-l-none"
            onClick={() => remove(fields.length - 1)}
          >
            Remove
          </Button>
        )}
        <Button
          variant={"secondary"}
          className={cn(
            fields.length < 2 ? "rounded-md" : " rounded-r-none",
            "w-full"
          )}
          onClick={() =>
            append({
              grade: "",
              credits: "",
            })
          }
        >
          Add
        </Button>
      </div>
    </div>
  );
};

export default SgpaForm;
