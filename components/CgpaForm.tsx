"use client";

import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getGpaMessage } from "@/lib/utils";
import { Terminal } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const formSchema = z.object({
  pastGpa: z.object({
    gpa: z.string(),
    credits: z.string(),
  }),
  currentGpa: z.object({
    gpa: z.string(),
    credits: z.string(),
  }),
});

const CgpaForm = () => {
  const [gpa, setGpa] = useState<number>(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentGpa: {
        credits: "",
        gpa: "",
      },
      pastGpa: {
        credits: "",
        gpa: "",
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    let result =
      (Number(values.pastGpa.gpa) * Number(values.pastGpa.credits) +
        Number(values.currentGpa.gpa) * Number(values.currentGpa.credits)) /
      (Number(values.pastGpa.credits) + Number(values.currentGpa.credits));

    setGpa(result);
  }

  return (
    <div className="w-full flex flex-col gap-2 container-fix py-4">
      {gpa ? (
        <Alert className="shadow-md dark:shadow-white/10">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="underline underline-offset-4 decoration-primary">
            Your CGPA is <span>{gpa.toFixed(3)}</span>
          </AlertTitle>
          <AlertDescription className="mt-4">
            {getGpaMessage(gpa)}
          </AlertDescription>
        </Alert>
      ) : null}

      <p>
        Visit{" "}
        <Button className="px-0" variant={"link"}>
          <Link href={"https://sp.srmist.edu.in/"} target="_blank">
            SRM ERP
          </Link>
        </Button>{" "}
        to check your total CGPA and Total Credits Earned
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 mt-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <span className="font-bold ">Past CGPA</span>
            <FormField
              control={form.control}
              name={`pastGpa.credits`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Total Credits"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`pastGpa.gpa`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Total CGPA" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="font-bold ">Current GPA</span>
            <FormField
              control={form.control}
              name={`currentGpa.credits`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Current Sem Total Credits"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`currentGpa.gpa`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Current Sem GPA" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="md:ml-auto">
            Submit
          </Button>
        </form>
      </Form>
      <Image
        src={"/images/cgpa.png"}
        priority
        width={1920}
        height={1080}
        alt="cgpa-image"
        className="mt-4 rounded-md shadow-md dark:shadow-white/20"
      />
    </div>
  );
};

export default CgpaForm;
