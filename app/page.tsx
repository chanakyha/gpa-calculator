import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="container-fix">
      <h1 className="text-center text-primary">SRM GPA CALCULATOR</h1>
      <div className="py-4">
        <Tabs
          defaultValue="sgpa"
          className="w-full md:max-w-4xl lg:max-w-2xl xl:max-w-xl mx-auto"
        >
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="sgpa">
              SGPA Calculator
            </TabsTrigger>
            <TabsTrigger className="w-full" value="cgpa">
              CGPA Calculator
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
