"use client";

import * as z from "zod";
import { gradePoints } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { cn } from "@/lib/utils";

const formSchema = z.object({
  gpa: z.array(
    z.object({
      grade: z.string(),
      points: z.string(),
    })
  ),
});

const SgpaForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gpa: [
        {
          grade: "",
          points: "",
        },
        {
          grade: "",
          points: "",
        },
        {
          grade: "",
          points: "",
        },
        {
          grade: "",
          points: "",
        },
        {
          grade: "",
          points: "",
        },
        {
          grade: "",
          points: "",
        },
      ],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const { fields, append, remove } = useFieldArray({
    name: "gpa",
    control: form.control,
  });

  return (
    <div className="w-full flex flex-col gap-2 container-fix py-4">
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
                  name={`gpa.${index}.grade`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Enter Credits" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`gpa.${index}.points`}
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
              points: "",
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
