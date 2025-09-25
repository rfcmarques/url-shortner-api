import { CodeGenerator } from '../CodeGenerator.js';

describe('CodeGenerator', () => {
  it('should generate a code with 8 characters by default', () => {
    const codeGenerator = new CodeGenerator();
    const code = codeGenerator.generate();

    expect(code).toEqual(expect.any(String));
    expect(code.length).toBe(8);
  });
});
