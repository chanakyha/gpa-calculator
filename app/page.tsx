import CgpaForm from "@/components/CgpaForm";
import SgpaForm from "@/components/SgpaForm";
import ThemeTogglerBtn from "@/components/ThemeTogglerBtn";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Home() {
  return (
    <main className="container-fix">
      <ThemeTogglerBtn className="fixed top-2 right-2" />
      <h1 className="text-center text-primary">SRM GPA CALCULATOR</h1>
      <div className="py-4 ">
        <Tabs defaultValue="sgpa" className=" mx-auto">
          <TabsList className="w-full md:max-w-4xl lg:max-w-2xl xl:max-w-xl mx-auto">
            <TabsTrigger className="w-full" value="sgpa">
              SGPA Calculator
            </TabsTrigger>
            <TabsTrigger className="w-full" value="cgpa">
              CGPA Calculator
            </TabsTrigger>
          </TabsList>
          <TabsContent value="sgpa">
            <SgpaForm />
          </TabsContent>
          <TabsContent value="cgpa">
            <CgpaForm />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
