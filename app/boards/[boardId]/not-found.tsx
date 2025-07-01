import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <AlertTriangle className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">ボードが見つかりません</h2>
        <p className="text-muted-foreground mb-6">
          指定されたボードは存在しないか、削除されている可能性があります。
        </p>
        <Link href="/">
          <Button>ホームに戻る</Button>
        </Link>
      </div>
    </div>
  );
}