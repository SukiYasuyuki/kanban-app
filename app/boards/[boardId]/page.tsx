import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Kanban } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getBoardById } from '@/app/actions/boards';

interface BoardPageProps {
  params: Promise<{ boardId: string }>;
}

export default async function BoardPage({ params }: BoardPageProps) {
  const { boardId } = await params;
  
  try {
    const board = await getBoardById(boardId);

    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  戻る
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <Kanban className="h-6 w-6 text-primary" />
                <h1 className="text-2xl font-bold">{board.title}</h1>
              </div>
            </div>
          </div>

          {board.description && (
            <div className="mb-8">
              <p className="text-muted-foreground">{board.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {board.columns.map((column) => (
              <div
                key={column.id}
                className="bg-card rounded-lg border p-4"
              >
                <h3 className="font-semibold mb-4 text-center">
                  {column.title}
                </h3>
                <div className="min-h-[200px] bg-muted/30 rounded border-2 border-dashed border-muted-foreground/20 flex items-center justify-center">
                  <p className="text-muted-foreground text-sm">
                    カードがありません
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-sm text-muted-foreground">
            作成日: {new Date(board.created_at).toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}