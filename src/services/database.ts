import { createClient } from '@libsql/client';
import type { Student, SearchResult } from '../types/student';

const DB_URL = import.meta.env.VITE_DB_URL;
const DB_TOKEN = import.meta.env.VITE_DB_TOKEN;

class DatabaseService {
  private client;

  constructor() {
    this.client = createClient({
      url: DB_URL,
      authToken: DB_TOKEN,
    });
  }

  async searchStudents(query: string): Promise<SearchResult> {
    try {
      // Search by student ID or name
      const result = await this.client.execute({
        sql: `
          SELECT * FROM students 
          WHERE STUDENT_ID LIKE ? OR E_NAME LIKE ?
          ORDER BY E_NAME
          LIMIT 50
        `,
        args: [`%${query}%`, `%${query}%`],
      });

      return {
        students: result.rows as unknown as Student[],
        count: result.rows.length,
      };
    } catch (error) {
      console.error('Database search error:', error);
      return { students: [], count: 0 };
    }
  }

  async getStudentById(studentId: string): Promise<Student | null> {
    try {
      const result = await this.client.execute({
        sql: 'SELECT * FROM students WHERE STUDENT_ID = ?',
        args: [studentId],
      });

      if (result.rows.length === 0) return null;
      return result.rows[0] as unknown as Student;
    } catch (error) {
      console.error('Database fetch error:', error);
      return null;
    }
  }

  async getAllStudents(limit: number = 50): Promise<SearchResult> {
    try {
      const result = await this.client.execute({
        sql: 'SELECT * FROM students ORDER BY E_NAME LIMIT ?',
        args: [limit],
      });

      return {
        students: result.rows as unknown as Student[],
        count: result.rows.length,
      };
    } catch (error) {
      console.error('Database fetch error:', error);
      return { students: [], count: 0 };
    }
  }
}

export default new DatabaseService();
