import { nanoid } from 'nanoid';

export class CodeGenerator {
  public generate(): string {
    return nanoid(8);
  }
}
