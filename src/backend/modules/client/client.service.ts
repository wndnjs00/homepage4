import 'server-only';

import { findHomeClientRows } from './client.repository';

export async function getHomeClientRows(): Promise<string[][]> {
  return findHomeClientRows();
}
