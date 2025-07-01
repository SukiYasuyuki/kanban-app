'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { boardQueries, columnQueries } from '@/lib/db';
import { createBoardSchema, type CreateBoardInput } from '@/lib/validations/board';

export async function createBoard(data: CreateBoardInput) {
  try {
    // Validate input
    const validatedData = createBoardSchema.parse(data);

    // Create board
    const board = boardQueries.create(validatedData.title, validatedData.description);

    // Create default columns
    columnQueries.createDefaultColumns(board.id);

    // Revalidate the home page to show new board
    revalidatePath('/');

    // Redirect to the new board
    redirect(`/boards/${board.id}`);
  } catch (error) {
    console.error('Failed to create board:', error);
    throw new Error('ボードの作成に失敗しました');
  }
}

export async function getBoards() {
  try {
    return boardQueries.getAll();
  } catch (error) {
    console.error('Failed to fetch boards:', error);
    return [];
  }
}

export async function getBoardById(id: string) {
  try {
    const board = boardQueries.getById(id);
    if (!board) {
      throw new Error('Board not found');
    }

    const columns = columnQueries.getByBoardId(id);
    
    return {
      ...board,
      columns
    };
  } catch (error) {
    console.error('Failed to fetch board:', error);
    throw new Error('ボードが見つかりません');
  }
}