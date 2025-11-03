import { Chat } from '@/components/chat';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-br from-background to-muted">
      <Chat />
    </div>
  );
}
