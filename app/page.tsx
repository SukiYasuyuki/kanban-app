import Link from 'next/link';
import { Kanban } from 'lucide-react';

import { BoardCreationDialog } from '@/components/board-creation-dialog';
import { ThemeToggle } from '@/components/theme-toggle';
import { getBoards } from '@/app/actions/boards';

export default async function Home() {
  const boards = await getBoards();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Kanban className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Kanban Boards</h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <BoardCreationDialog />
          </div>
        </div>

        {boards.length === 0 ? (
          <div className="text-center py-12">
            <Kanban className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold text-muted-foreground mb-2">
              ボードがありません
            </h2>
            <p className="text-muted-foreground mb-6">
              最初のKanbanボードを作成して始めましょう
            </p>
            <BoardCreationDialog />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board) => (
              <Link
                key={board.id}
                href={`/boards/${board.id}`}
                className="block p-6 bg-card rounded-lg border hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{board.title}</h3>
                {board.description && (
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {board.description}
                  </p>
                )}
                <div className="mt-4 text-xs text-muted-foreground">
                  作成日: {new Date(board.created_at).toLocaleDateString('ja-JP')}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
