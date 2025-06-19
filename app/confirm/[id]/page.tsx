import { Navigation } from "@/components/navigation";
import { AccountActivation } from "@/components/account-activation";

interface PostDetailProps {
  params: { id: string };
}
export default function ActivateAccount({ params }: PostDetailProps) {
  const { id } = params;
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <AccountActivation id={id} />
    </div>
  );
}
