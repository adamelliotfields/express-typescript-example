export interface Message {
  message: string;
}

export default class DB {
  private static db: DB;

  private messages: Message[];

  private constructor() {
    this.messages = [];
  }

  public static getDB() {
    if (DB.db === undefined) {
      DB.db = new DB();
    }

    return DB.db;
  }

  public addMessage(message: Message): void {
    this.messages.push(message);
  }

  public getMessages(): Message[] {
    return this.messages;
  }
}
