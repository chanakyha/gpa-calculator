import SgpaForm from "@/components/SgpaForm";

import { TabsContent } from "@/components/ui/tabs";
import LoadingPage from "./loading";

export default function Home() {
  return (
    <TabsContent value="sgpa">
      <SgpaForm />
    </TabsContent>
  );
}
