import Archived from "~/components/archived";
import MainLayout from "~/components/layouts/mainLayout";
import Timelines from "~/components/timelines";

export default function Page() {
  return (
    <div class="w-screen">
      <MainLayout>
        <Archived />
      </MainLayout>
    </div>
  );
}
