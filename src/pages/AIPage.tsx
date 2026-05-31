import AIChat from "../components/AIChat";

type AIPageProps = {
  userQuery: string;
  setUserQuery: (value: string) => void;
  aiResponse: string;
  handleAskAI: () => void;
};

export default function AIPage({
  userQuery,
  setUserQuery,
  aiResponse,
  handleAskAI,
}: AIPageProps) {
  return (
    <AIChat
      userQuery={userQuery}
      setUserQuery={setUserQuery}
      aiResponse={aiResponse}
      handleAskAI={handleAskAI}
    />
  );
}