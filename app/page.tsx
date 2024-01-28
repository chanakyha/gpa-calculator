import SgpaForm from "@/components/SgpaForm";

import { TabsContent } from "@/components/ui/tabs";

export default function Home() {
  return (
    <TabsContent value="sgpa">
      <SgpaForm />
    </TabsContent>
  );
}
