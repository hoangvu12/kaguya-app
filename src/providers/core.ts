/* eslint-disable unused-imports/no-unused-vars */
import { z } from 'zod';

import type { SaveMediaListEntryMutationVariables } from '@/gql/graphql';

export interface ProviderProps {
  name: string;
  icon: React.ComponentType<any>;
}

export const BasicInfoSchema = z.object({
  name: z.string(),
  avatar: z.string().optional(),
});

export type BasicInfo = z.infer<typeof BasicInfoSchema>;

export interface Token {
  refreshToken?: string;
  accessToken: string;
}

export default class Provider {
  name: string;
  icon: React.ComponentType<{ className: string }>;

  constructor({ icon, name }: ProviderProps) {
    this.icon = icon;
    this.name = name;
  }

  async signIn() {
    throw new Error('Method not implemented.');
  }

  async handleCode(url: string): Promise<Token> {
    throw new Error('Method not implemented.');
  }

  async refreshToken(refreshToken: string): Promise<Token> {
    throw new Error('Method not implemented.');
  }

  async getInfo(accessToken: string): Promise<BasicInfo & Record<string, any>> {
    throw new Error('Method not implemented.');
  }

  updateEntry(
    ids: {
      malId: number;
      anilistId: number;
    },
    entry: Partial<SaveMediaListEntryMutationVariables>
  ): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
