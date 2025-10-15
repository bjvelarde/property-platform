// lib/__tests__/utils.test.ts
import { describe, it, expect } from 'vitest';

import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('px-4', 'py-2', 'bg-blue-500');
    expect(result).toBe('px-4 py-2 bg-blue-500');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class', 'always-class');
    expect(result).toBe('base-class active-class always-class');
  });
});
