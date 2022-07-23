export default class LoggerOptions {
  label = '';
  filePath: string | undefined = undefined;

  constructor(label?: string) {
    if (label) {
      this.label = label;
    }
  }
}
